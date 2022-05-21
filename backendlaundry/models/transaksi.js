'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaksi extends Model {
    static associate(models) {
      this.hasMany(models.detail_transaksi,{
        foreignKey: "id_transaksi",
        as: "detail_transaksi"
      })

      this.belongsTo(models.member,{
        foreignKey: "id_member",
        as: "member"
      })

      this.belongsTo(models.outlet,{
        foreignKey: "id_outlet",
        as: "outlet"
      })

      this.belongsTo(models.user,{
        foreignKey: "id_user",
        as: "user"
      })
    }
  }
  transaksi.init({
    id_transaksi: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_outlet: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    kode_invoice: DataTypes.STRING,
    id_member: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tgl: DataTypes.DATE,
    batas_waktu: DataTypes.DATE,
    tgl_bayar: DataTypes.DATE,
    biaya_tambahan: DataTypes.INTEGER,
    diskon: DataTypes.DOUBLE,
    pajak: DataTypes.INTEGER,
    total: DataTypes.DOUBLE,
    grandTotal: DataTypes.DOUBLE,
    status: DataTypes.ENUM('baru', 'proses', 'selesai', 'diambil'),
    dibayar: DataTypes.ENUM('dibayar', 'belum_bayar'),
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'transaksi',
    tableName: 'transaksi'
  });
  return transaksi;
};