
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
        required: true
    },
    status: {
        type: String,
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