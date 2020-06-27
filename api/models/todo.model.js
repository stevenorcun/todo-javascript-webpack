const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const schemaTodo = new mongoose.Schema({
    message: {
        type: String,
        minlength: 5,
        maxlength: 100,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    },
    isEditMode: {
        type: Boolean,
        default: false
    }
});

const Todo = mongoose.model('Todo', schemaTodo);

const validateSchema = (todo) => {
    const schema = Joi.object({
        message: Joi.string().min(5).max(100),
        done: Joi.boolean(),
        isEditMode: Joi.boolean()
    });

    return schema.validate(todo);
}

module.exports.Todo = Todo;
module.exports.validate = validateSchema;