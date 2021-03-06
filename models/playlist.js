'use strict';
module.exports = (sequelize, DataTypes) => {
  const playlist = sequelize.define('playlist', {
    name: DataTypes.STRING,
    songId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  playlist.associate = function(models) {
    // associations can be defined here
    models.playlist.belongsToMany(models.user, {through: 'userPlaylists'})
    models.playlist.hasMany(models.song)
    models.playlist.belongsToMany(models.song, {through: 'userSongs'})
  };
  return playlist;
};