const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

router.get('/', indexController.list);
router.post('/save', indexController.save);
router.post('/delete/:id', indexController.delete);



module.exports = router;