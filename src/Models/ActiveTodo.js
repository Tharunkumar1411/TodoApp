
import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var activetodo = new Schema({
    name: {
        type: String,
        required: true
    },
    todo: {
        type: String,
        required: true
    },
    todoId: {
        type: String,
        default: Date.now() + Math.floor(Math.random() * 100),
        required: true
    },
    status: {
        type: String,
        default: 'Active',
        required: true
    },
    timeStart: {
        type: Date,
        default: Date.now
    },
    timeEnd: {
        type: Date,
        required: true
    }
});

mongoose.models = {};

var ActiveTodo = mongoose.model('ActiveTodo', activetodo);

export default ActiveTodo;