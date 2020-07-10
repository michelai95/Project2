'use strict';
module.exports = (sequelize, DataTypes) => {
  const userPlaylists = sequelize.define('userPlaylists', {
    userId: DataTypes.INTEGER,
    playlistId: DataTypes.INTEGER
  }, {});
  userPlaylists.associate = function(models) {
    // associations can be defined here
  };
  return userPlaylists;
};