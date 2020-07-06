'use strict';
module.exports = (sequelize, DataTypes) => {
  const song = sequelize.define('song', {
    name: DataTypes.STRING,
    artist: DataTypes.STRING,
    genre: DataTypes.STRING,
    songId: DataTypes.INTEGER,
    length: DataTypes.INTEGER
  }, {});
  song.associate = function(models) {
    // associations can be defined here
    models.song.belongsTo(models.playlist)
  };
  return song;
};