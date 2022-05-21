'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class paket extends Model {
    static associate(models) {
      this.hasMany(models.detail_transaksi,{
        foreignKey: "id_paket",
        as: "paket"
      })

      this.belongsTo(models.outlet,{
        foreignKey: "id_outlet",
        as: "outlet"
      })
    }
  }
  paket.init({
    id_paket: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    id_outlet: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
    },
    jenis: DataTypes.ENUM('kiloan', 'selimut', 'bed_cover', 'kaos', 'lain'),
    nama_paket: DataTypes.STRING,
    harga: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'paket',
    tableName: 'paket'
  });
  return paket;
};