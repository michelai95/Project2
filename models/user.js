'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    age: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    birthday: DataTypes.INTEGER
  }, {});
  user.associate = function(models) {
    // associations can be defined here
    models.user.belongsTo(models.song)
    models.user.belongsToMany(models.playlist, {through: 'userPlaylists'})
  };
  return user;
};