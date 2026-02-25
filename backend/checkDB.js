require('dotenv').config();
const { sequelize } = require('./config/db');
const Article = require('./models/Article');
const User = require('./models/User');

const checkDB = async () => {
    try {
        const userCount = await User.count();
        const articleCount = await Article.count();
        const articles = await Article.findAll({ include: User });

        console.log('--- Database Check ---');
        console.log('Total Users:', userCount);
        console.log('Total Articles:', articleCount);

        articles.forEach(a => {
            console.log(`- [${a.category}] ${a.title} (Author: ${a.User?.username})`);
        });

        process.exit(0);
    } catch (error) {
        console.error('Check failed:', error);
        process.exit(1);
    }
};

checkDB();
