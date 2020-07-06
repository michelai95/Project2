'use strict';
module.exports = (sequelize, DataTypes) => {
  const userPlaylist = sequelize.define('userPlaylist', {
    userId: DataTypes.INTEGER,
    playlistId: DataTypes.INTEGER
  }, {});
  userPlaylist.associate = function(models) {
    // associations can be defined here
  };
  return userPlaylist;
};