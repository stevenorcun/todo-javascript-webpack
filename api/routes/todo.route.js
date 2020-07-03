const express = require('express');
const router = express.Router();
const { validate, Todo } = require('../models/todo.model');
const error404NotFoundId = require('../utils/error404NotFoundId');
const validateObjectId = require('../middlewares/validateObjectId');

router.get('/', async (req, res) => {
    const todos = await Todo.find();
    if(!todos.length) return res.status(404).send('No todos found in DB');

    return res.status(200).send(todos);
})
router.get('/:id', validateObjectId, async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    if(!todo) return error404NotFoundId('Todo', res);
    
    res.status(200).send({message: 'Success found todo', todo});

})

router.post('/', async (req, res) => {
    const {error} = validate(req.body)
    if(error) return res.status(404).send(error.details[0].message);

    const {message, done, isEditMode} = req.body;
    let todo = new Todo({ message, done, isEditMode });
    todo = await todo.save();
    res.status(200).send({message: 'Success create new todo', todo});
})

router.put('/:id', validateObjectId, async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);

    const {message, done, isEditMode} = req.body;
    let todo = await Todo.findByIdAndUpdate(req.params.id, {
        message, done, isEditMode
    }, { new: true, useFindAndModify: false });

    if(!todo) return error404NotFoundId('Todo', res);
    res.status(200).json({message: 'Success update todo', todo});
})

router.delete('/:id', validateObjectId, async (req, res) => {
    const todo = await Todo.findByIdAndDelete(req.params.id, {useFindAndModify: false});
    if(!todo) return error404NotFoundId('Todo', res);

    res.status(200).send({message: 'Success delete todo', todo});
})

module.exports = router;