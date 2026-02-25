const express = require('express');
const {
    getArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle,
    improveAI,
    suggestTagsAI,
    summarizeAI,
} = require('../controllers/articleController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getArticles);
router.get('/:id', getArticleById);
router.post('/', protect, createArticle);
router.put('/:id', protect, updateArticle);
router.delete('/:id', protect, deleteArticle);

// AI Routes
router.post('/ai/improve', protect, improveAI);
router.post('/ai/tags', protect, suggestTagsAI);
router.post('/ai/summarize', protect, summarizeAI);

module.exports = router;
