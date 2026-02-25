const Article = require('../models/Article');
const User = require('../models/User');

const getArticles = async (req, res) => {
    try {
        const articles = await Article.findAll({ include: User });
        res.json(articles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getArticleById = async (req, res) => {
    try {
        const article = await Article.findByPk(req.params.id, { include: User });
        if (!article) return res.status(404).json({ message: 'Article not found' });
        res.json(article);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createArticle = async (req, res) => {
    try {
        const { title, content, category } = req.body;
        // Automatically generate summary
        const summary = content.replace(/<[^>]*>?/gm, '').substring(0, 100) + '... (AI Summary)';
        const article = await Article.create({
            title,
            content,
            category,
            summary,
            author_id: req.user.id,
        });
        res.status(201).json(article);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateArticle = async (req, res) => {
    try {
        const article = await Article.findByPk(req.params.id);
        if (!article) return res.status(404).json({ message: 'Article not found' });
        if (article.author_id !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });

        const { title, content, category, summary } = req.body;
        await article.update({ title, content, category, summary });
        res.json(article);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteArticle = async (req, res) => {
    try {
        const article = await Article.findByPk(req.params.id);
        if (!article) return res.status(404).json({ message: 'Article not found' });
        if (article.author_id !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });

        await article.destroy();
        res.json({ message: 'Article deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle,
};
