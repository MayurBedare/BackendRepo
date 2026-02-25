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

// AI Mock Features
const improveAI = async (req, res) => {
    const { content } = req.body;
    if (!content) return res.json({ improvedContent: '' });

    // Mock AI Logic: Clean up and polish the text
    let improved = content
        .replace(/  +/g, ' ') // Remove double spaces
        .replace(/\.\.+/g, '.') // Fix multiple periods
        .replace(/([.?!])\s*([a-z])/g, (match, p1, p2) => `${p1} ${p2.toUpperCase()}`); // Capitalize after punctuation

    // Add a professional concluding sentence if not present
    if (!improved.toLowerCase().includes('conclusion') && !improved.toLowerCase().includes('summary')) {
        improved += "<p><em>AI Polish: This section has been refined for clarity and professional tone.</em></p>";
    }

    res.json({ improvedContent: improved });
};

const suggestTagsAI = async (req, res) => {
    const { content } = req.body;
    if (!content) return res.json({ tags: [] });

    // Mock AI Logic: Detect tags from content keywords
    const potentialTags = ['AI', 'React', 'NodeJS', 'Database', 'Frontend', 'Backend', 'DevOps', 'Cloud', 'Design'];
    const tags = potentialTags.filter(tag =>
        content.toLowerCase().includes(tag.toLowerCase())
    ).slice(0, 4);

    if (tags.length === 0) tags.push('Knowledge', 'Article');
    res.json({ tags });
};

const summarizeAI = async (req, res) => {
    const { content } = req.body;
    if (!content) return res.json({ summary: '' });

    // Mock AI Logic: Extract first few clean sentences
    const cleanContent = content.replace(/<[^>]*>?/gm, ' ');
    const summary = cleanContent.split(/[.!?]/).slice(0, 2).join('. ') + '... (AI Summary)';
    res.json({ summary });
};

module.exports = {
    getArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle,
    improveAI,
    suggestTagsAI,
    summarizeAI,
};
