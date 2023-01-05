const User = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    displayName: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.INTEGER
    },
    image: {
      type: DataTypes.STRING,
    }, 
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'users'
  });

  User.associate = (models) => {
    User.hasMany(models.BlogPost, {
      foreignKey: 'userId',
      as: 'posts'
    });
  }

  return User;
};

module.exports = User;
