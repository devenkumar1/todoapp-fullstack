const path = require('path');
const express=require("express");
const router=express.Router();

const { v4: uuidv4 } = require('uuid');

router.get('/getTodos',);

router.post('/addTodo', );

router.post('/deleteTodo', (req, res) => {
    const { id } = req.body;
    todos = todos.filter(task => task.id !== id);
    res.json(todos);
});

router.post('/updatePriority', (req, res) => {
    const { id, direction } = req.body;
    const index = todos.findIndex(task => task.id === id);
    
    if (index !== -1) {
        const [removed] = todos.splice(index, 1);
        if (direction === 'up' && index > 0) {
            todos.splice(index - 1, 0, removed);
        } else if (direction === 'down' && index < todos.length) {
            todos.splice(index + 1, 0, removed);
        }
    }
    res.json(todos);
});




module.exports = router;