import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var todo = new Schema({
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
    },
    timeEnd: {
        type: Date,
        default: Date.now,
        required: true
    }
});

mongoose.models = {};

var ExpiredTodo = mongoose.model('ExpiredTodo', todo);

export default ExpiredTodo;