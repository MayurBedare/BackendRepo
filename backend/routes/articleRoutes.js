const express = require('express');
const {
    getArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle,
} = require('../controllers/articleController');
const { improveArticle, suggestTags, summarizeArticle } = require('../controllers/aicontroller');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getArticles);
router.get('/:id', getArticleById);
router.post('/', protect, createArticle);
router.put('/:id', protect, updateArticle);
router.delete('/:id', protect, deleteArticle);

// AI Routes
router.post('/ai/improve', protect, improveArticle);
router.post('/ai/tags', protect, suggestTags);
router.post('/ai/summarize', protect, summarizeArticle);

module.exports = router;
