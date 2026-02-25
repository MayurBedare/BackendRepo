const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');

const Article = sequelize.define('Article', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    summary: {
        type: DataTypes.TEXT,
    },
    category: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'articles',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
});

Article.belongsTo(User, { foreignKey: 'author_id' });
User.hasMany(Article, { foreignKey: 'author_id' });

module.exports = Article;
