const axios = require('axios');
const fs = require('fs');
const bcrypt = require('bcryptjs');

    async function getProducts() {
        try {
            const response = await axios.get('https://dummyjson.com/products');
            let datas = response.data.products.map(el => {
                const {title, description, price, stock, thumbnail, category} = el;
                const UserId = Math.ceil(Math.random() * 10);

                return {
                    photo : thumbnail,
                    name : title,
                    description,
                    price,
                    totalSales : 0,
                    category,
                    stock,
                    UserId
                };
            });

            datas = JSON.stringify(datas, null, 2);

            fs.writeFileSync('jsons/products.json', datas);
        } catch (error) {
            console.error(error);
        }
    }


    async function getUsers() {
        try {
            const response = await axios.get('https://randomuser.me/api/?results=20');

            let users = response.data.results.map(el => {
                const {gender, name, location, email, login, picture, phone, dob} = el;
                const UserId = Math.ceil(Math.random() * 20);
                const salt = bcrypt.genSaltSync(10);
                const password = bcrypt.hashSync(login.password, salt);
                return [
                    {
                        email,
                        password
                    }
                ];
            });

            let userDetails = response.data.results.map(el => {
                const {gender, name, location, email, login, picture, phone, dob} = el;
                const UserId = Math.ceil(Math.random() * 20);
                return {
                        fullName : `${name.first} ${name.last}`,
                        phone,
                        address : `${location.street.name}, number: ${location.street.number}, ${location.city}, ${location.state}, ${location.country}`,
                        birthDate : dob.date,
                        gender,
                        UserId,
                        photoProfile : picture.thumbnail
                };
            });

            users = JSON.stringify(users, null, 2);
            fs.writeFileSync('jsons/users.json', users);

            userDetails = JSON.stringify(userDetails, null, 2);
            fs.writeFileSync('jsons/userDetails.json', userDetails);


        } catch (error) {
            console.error(error);
        }
    }

    

    getProducts();
    getUsers();