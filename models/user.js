import { DataTypes } from 'sequelize';

const User = (sequelize) => {
  const UserModel = sequelize.define('User', {
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    firebaseUID: DataTypes.STRING,
  }, { timestamps: true });

  UserModel.associate = (models) => {
    UserModel.belongsTo(models.Master);
  };

  return UserModel;
};

export default User;
