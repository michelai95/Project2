'use strict';
module.exports = (sequelize, DataTypes) => {
  const playlist = sequelize.define('playlist', {
    name: DataTypes.STRING,
    songId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  playlist.associate = function(models) {
    // associations can be defined here
    models.playlist.belongsTo(models.user)
    models.playlist.hasMany(models.song)
  };
  return playlist;
};