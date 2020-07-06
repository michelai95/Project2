'use strict';
module.exports = (sequelize, DataTypes) => {
  const userSongs = sequelize.define('userSongs', {
    userId: DataTypes.INTEGER,
    songId: DataTypes.INTEGER
  }, {});
  userSongs.associate = function(models) {
    // associations can be defined here
  };
  return userSongs;
};