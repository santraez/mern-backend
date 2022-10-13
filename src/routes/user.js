const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const { upload } = require('../helpers/user');

router.post('/', userController.postUser);
router.post('/upload/:id', upload.single('img'), userController.postUserImage);
router.get('/:nro?', userController.getUsers);
router.get('/user/:id', userController.getByUserId);
router.get('/image/:name', userController.getUserImage);
router.get('/search/:str', userController.searchUsers);
router.put('/:id', userController.putUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;