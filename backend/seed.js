require('dotenv').config();
const { sequelize } = require('./config/db');
const User = require('./models/User');
const Article = require('./models/Article');

const seedData = async () => {
    try {
        console.log('Disabling foreign key checks...');
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

        // Drop all tables tracked by Sequelize
        await sequelize.sync({ force: true });

        // Also drop the article_tags table created by init.sql which we aren't using yet
        await sequelize.query('DROP TABLE IF EXISTS article_tags');
        await sequelize.query('DROP TABLE IF EXISTS tags');

        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        console.log('Database synced and cleaned.');

        // Create Demo Users
        const user1 = await User.create({
            username: 'john_doe',
            email: 'john@example.com',
            password: 'password123',
        });

        const user2 = await User.create({
            username: 'jane_dev',
            email: 'jane@example.com',
            password: 'password123',
        });

        console.log('Users created.');

        // Create Demo Articles
        await Article.bulkCreate([
            {
                title: 'Getting Started with React & Vite',
                content: '<p>Vite is a build tool that significantly improves the frontend development experience. In this article, we explore how to set up a new React project using Vite and why it is faster than Create React App.</p>',
                summary: 'A quick guide to setting up React projects with Vite for better performance.',
                category: 'Frontend',
                author_id: user1.id,
            },
            {
                title: 'Mastering Node.js Express APIs',
                content: '<p>Express is the de-facto standard for building web servers in Node.js. We will cover middleware, routing, and how to connect to a MySQL database using Sequelize ORM.</p>',
                summary: 'Learn best practices for building scalable backend APIs with Express.',
                category: 'Backend',
                author_id: user1.id,
            },
            {
                title: 'The Future of AI in Content Creation',
                content: '<p>AI is transforming how we write articles. With tools like GPT-4, authors can generate summaries, improve grammar, and even brainstorm ideas in seconds.</p>',
                summary: 'Exploring how AI tools are enhancing the authoring experience.',
                category: 'AI',
                author_id: user2.id,
            },
            {
                title: 'Dockerizing your Fullstack Application',
                content: '<p>Docker allows you to package your application and its dependencies into a container. This ensures that your app runs consistently across different environments.</p>',
                summary: 'A step-by-step tutorial on using Docker Compose for MySQL and Node.js.',
                category: 'DevOps',
                author_id: user2.id,
            },
        ]);

        console.log('Demo articles created.');
        process.exit(0);
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

seedData();
