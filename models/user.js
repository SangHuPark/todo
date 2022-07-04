const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      user_id: {
        type: Sequelize.STRING(15),
        allowNull: false,
        unique: true,
      },
      user_pw: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      user_name: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.User.hasMany(db.Todo);
  }
};
