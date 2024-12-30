const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin } = require('../controllers/AdminController');
const {  adminMiddleware } = require('../middlewares/AdminMiddleware');


router.post('/register', adminMiddleware, registerAdmin); 
router.post('/login', loginAdmin);


module.exports = router;
