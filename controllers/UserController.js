'use strict';

const {User, UserDetail} = require("../models");

class UserController {

    static async formProfileAdd(req, res) {
        const {errors, notif} = req.query;

        try {

            res.render('users/profileFormCreate', {errors, notif});
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }


    static async addProfile(req, res) {
        try {
            const {photoProfile, fullName, phone, address, birthDate, gender} = req.body;
            const UserId = req.params.id;

            const isProfileExist = await UserDetail.findOne({
                where : {
                    UserId : UserId
                }
            });
            
            if (isProfileExist) {
                const errors = `You're already have profile!`
                res.redirect(`/profile/edit/${req.params.id}?errors=${errors}`);
            }

            await UserDetail.create({photoProfile, fullName, phone, address, birthDate, gender, UserId});

            const notif = `Successfully update profile!`
            req.session.profileEmpty = false;
            res.redirect(`/profile/edit/${req.params.id}?notif=${notif}`);
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                let errors = error.errors.map(er => {
                    return er.message;
                });

                res.redirect(`/profile/add/${req.params.id}?errors=${errors}`);
            } else {       
                console.log(error);
                res.redirect(`/profile/add/${req.params.id}?errors=${error}`);
            }
        }
    }










    static async formProfileEdit(req, res) {
        const {errors, notif} = req.query;

        try {
            const userId = req.params.id;
            const user = await User.findByPk(userId, {
                include : UserDetail
            });

            res.render('users/profileFormEdit', {user, errors, notif});
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }

    static async editProfile(req, res) {
        try {
            const {photoProfile, fullName, phone, address, birthDate, gender} = req.body;

            console.log({photoProfile, fullName, phone, address, birthDate, gender});

            await UserDetail.update({photoProfile, fullName, phone, address, birthDate, gender}, {
                where : {
                    UserId : req.params.id
                }
            });

            const notif = `Successfully update profile!`
            res.redirect(`/profile/edit/${req.params.id}?notif=${notif}`);
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                let errors = error.errors.map(er => {
                    return er.message;
                });

                res.redirect(`/profile/edit/${req.params.id}?errors=${errors}`);
            } else {       
                console.log(error);
                res.redirect(`/profile/edit/${req.params.id}?errors=${error}`);
            }
        }
    }










}

module.exports = UserController