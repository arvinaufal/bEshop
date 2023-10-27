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

            await User.create({email, password, role});
            // await UserDetail.create({UserId : newUser.id});

            const notif = `Successfully Registered!`;
            res.redirect(`/auth/login?notif=${notif}`);
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                let errors = error.errors.map(er => {
                    return er.message;
                });

                res.redirect(`/auth/register?errors=${errors}`);
            } else {       
                console.log(error);
                res.redirect(`/auth/register?errors=${error.message}`);
            }
        }
    }

    static async loginPage(req, res) {
        const {errors, notif} = req.query;
        try {

            res.render('auth/login', {errors, notif});
        } catch (error) {
            console.log(error);
            res.redirect(`/auth/login?errors=${error.message}`);
        }
    }

    static async login(req, res) {
        try {
            const {email, password} = req.body;

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
                include : {
                    model : UserDetail
                }
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
                    if (!user.UserDetail) {
                        req.session.profileEmpty = true;
                    }
            
                    if (user.role === 'seller') {

                        res.redirect(`/sellers/${user.id}/products`);
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

                res.redirect(`/auth/login?errors=${errors}`);
            } else {       
                console.log(error);
                res.redirect(`/auth/login?errors=${error.message}`);
            }
        }
        
    }


    static logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                res.send('Logout Failed!');
            } else {
                res.redirect('/auth/login');
            }
        })
    }



}

module.exports = AuthController;