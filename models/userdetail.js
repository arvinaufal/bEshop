'use strict';
const {
  Model
} = require('sequelize');
const helper = require('../helpers');
module.exports = (sequelize, DataTypes) => {
  class UserDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserDetail.belongsTo(models.User);
    }


    get formattedDate() {
      return helper.formattedDate(this.birthDate);
    }
  }
  UserDetail.init({
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull : {
          msg : `Full Name is required!`
        },
        notEmpty : {
          msg : `Full Name is required!`
        }
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull : {
          msg : `Phone is required!`
        },
        notEmpty : {
          msg : `Phone is required!`
        },
        len: {
          args: [0, 16],
          msg: "Max 16 characters"
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull : {
          msg : `Address is required!`
        },
        notEmpty : {
          msg : `Address is required!`
        }
      }
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull : {
          msg : `Address is required!`
        },
        notEmpty : {
          msg : `Address is required!`
        },
        ageCheck(input) {
          const today = new Date();
          const inputDate = new Date(input);
    
          const age = today.getFullYear() - inputDate.getFullYear();
                      
          if (age < 18) {
            throw new Error(`Age Must Be More Than 17 Years!`);
          }
        }
      }
    },
    gender: DataTypes.STRING,
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull : {
          msg : `UserId is required!`
        },
        notEmpty : {
          msg : `UserId is required!`
        }
      }
    },
    photoProfile: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserDetail',
  });
  return UserDetail;
};