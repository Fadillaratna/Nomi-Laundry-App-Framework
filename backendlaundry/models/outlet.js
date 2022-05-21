'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class outlet extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.transaksi,{
        foreignKey: "id_outlet",
        as: "outlet"
      })
      this.hasMany(models.user,{
        foreignKey: "id_outlet",
        as: "user"
      })
      this.hasMany(models.paket,{
        foreignKey: "id_outlet",
        as: "paket"
      })
    }
  }
  outlet.init({
    id_outlet: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    nama_outlet: DataTypes.STRING,
    alamat: DataTypes.TEXT,
    tlp: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'outlet',
    tableName: 'outlet'
  });
  return outlet;
};