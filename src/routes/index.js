const express = require('express');
const controller = require('../controllers/indexController');
const router = express.Router();
const indexController = require('../controllers/indexController');

router.get('/', indexController.list);
router.get('/getStatus', indexController.getStatus);
router.post('/save', indexController.save);
router.post('/delete/:id', indexController.delete);
router.post('/update/:id', indexController.update);



module.exports = router;