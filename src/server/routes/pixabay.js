const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    console.log(`Called pixabay with path: ${req.baseUrl} and method: ${req.method}`);
    next();
});

router.get('/', ((req, res) => {
    res.json({message: 'yeah!'});
}));

module.exports = router;