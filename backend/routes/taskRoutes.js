const express = require('express');
const { isAuthenticated } = require('../middlewares/authMiddleware');
const {
  getTasks, createTask, updateTask, deleteTask
} = require('../controllers/taskController');

const router = express.Router();

router.use(isAuthenticated);

router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
