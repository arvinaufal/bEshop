var bcrypt = require('bcryptjs');
const {User, UserDetail} = require('../models');

class AuthController {
    static async registerPage(req, res) {
        const {errors} = req.query;
        try {

            res.render('auth/register', {errors});
        } catch (error) {
            
        }
    }

    static async register(req, res) {
        try {
            const {email, password, passwordConfirm, role} = req.body;

            if (password !== passwordConfirm) {
                throw new Error('Password confimation is not match!');
            }

            const newUser = await User.create({email, password, role});
            await UserDetail.create({UserId : newUser.id});

            res.redirect('/login');
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                let errors = error.errors.map(er => {
                    return er.message;
                });

                res.redirect(`/register?errors=${errors}`);
            } else {       
                console.log(error);
                res.redirect(`/register?errors=${error.message}`);
            }
        }
    }

    static async loginPage(req, res) {
        const {errors} = req.query;
        try {

            res.render('auth/login', {errors});
        } catch (error) {
            
        }
    }

    static async login(req, res) {
        try {
            const {email, password} = req.body;
            console.log(email, password);
            console.log("email", "asxasc");

            let errorsReq = [];
            if (!email) {
                errorsReq.push('Email is required!');
            }
            if (!password) {
                errorsReq.push('Password is required!');
            }

            if (errorsReq.length > 0) {
                throw new Error(errorsReq);
            }


            const user = await User.findOne({
                where: {
                    email : email
                },
                include: UserDetail
            });

            if (!user) {
                throw new Error('Invalid email or password!');
            } else {
                const isMatch = bcrypt.compareSync(password, user.password);
                
                if (!isMatch) {
                    
                    throw new Error('Invalid email or password!');
                } else {

                    req.session.userId = user.id;
                    req.session.role = user.role;

                    const {fullName, phone, address} =  user.UserDetail;
                    if (fullName === null || phone === null || address === null) {
                        req.session.profileEmptyField = true;
                    }

                    if (user.role === 'seller') {

                        res.redirect('/seller');
                    } else if(user.role === 'buyer') {

                        res.redirect('/');
                    } else {

                        throw new Error('Unknown role!');
                    }
                    
                }
            }


        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                let errors = error.errors.map(er => {
                    return er.message;
                });

                res.redirect(`/login?errors=${errors}`);
            } else {       
                console.log(error);
                res.redirect(`/login?errors=${error.message}`);
            }
        }
    }



}

module.exports = AuthController;