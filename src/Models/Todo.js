
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
        default: Date.now
    }
});

mongoose.models = {};

var Todo = mongoose.model('Todo', todo);

export default Todo;