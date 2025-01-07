'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Quest extends Model {
    static associate(models) {
      Quest.belongsTo(models.User, { foreignKey: 'authorId' });
    }
  }
  Quest.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      latitude: DataTypes.FLOAT,
      longitude: DataTypes.FLOAT,
      teamSize: DataTypes.STRING,
      duration: DataTypes.STRING,
      difficulty: DataTypes.STRING,
      fearLevel: DataTypes.STRING,
      ageLimit: DataTypes.STRING,
      puzzlesCount: DataTypes.INTEGER,
      features: DataTypes.TEXT,
      authorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Quest',
    }
  );
  return Quest;
};
