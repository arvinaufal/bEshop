'use strict';
const {
  Model
} = require('sequelize');
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
  }
  UserDetail.init({
    fullName: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    birthDate: DataTypes.STRING,
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