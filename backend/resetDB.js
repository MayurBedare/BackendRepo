require('dotenv').config();
const { sequelize } = require('./config/db');
const User = require('./models/User');
const Article = require('./models/Article');

const resetDB = async () => {
    try {
        console.log('🔄 Resetting database for fresh signup...');

        // Disable foreign key checks to ensure clean drop
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

        // sync({ force: true }) drops then recreates all tables defined in models
        await sequelize.sync({ force: true });

        // Optional: Clean up any extra tables not managed by models if they exist
        await sequelize.query('DROP TABLE IF EXISTS article_tags');
        await sequelize.query('DROP TABLE IF EXISTS tags');

        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

        console.log('✅ Database is now empty and ready for fresh signups.');
        process.exit(0);
    } catch (error) {
        console.error('❌ Reset failed:', error);
        process.exit(1);
    }
};

resetDB();
