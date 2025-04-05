import { DataTypes, STRING } from 'sequelize';

const Master = (sequelize) => {
  const MasterModel = sequelize.define('Master', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    logo: {
        type : DataTypes.STRING,
        defaultValue : null,
        
    },
  }, { timestamps: true });

  MasterModel.associate = (models) => {
    MasterModel.hasMany(models.User);
    // MasterModel.hasMany(models.Asset);
  };

  return MasterModel;
};

export default Master;
