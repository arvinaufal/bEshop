'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.UserDetail);
      User.hasMany(models.Product);
      User.belongsToMany(models.Product, { through: 'Orders' })
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        isEmail : {
          msg : `Must be an email!`
        },
        notNull : {
          msg : `Email is required!`
        },
        notEmpty : {
          msg : `Email is required!`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        notNull : {
          msg : `Password is required!`
        },
        notEmpty : {
          msg : `Password is required!`
        },
        len: {
          args: [6, Infinity],
          msg: "Password must be at least 6 characters"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        notNull : {
          msg : `Role is required!`
        },
        notEmpty : {
          msg : `Role is required!`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(async (user, options) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);

    user.password = hash;
  });
  
  return User;
};