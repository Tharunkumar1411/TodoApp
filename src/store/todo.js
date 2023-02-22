const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    todolist: [],
};

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        setTodo(state, action) {
            state.todolist = [...state.todolist,action.payload];
        },
    }
});

export const { setTodo } = todoSlice.actions;

export const getTodo = (state) => state.todo.todolist;

export default todoSlice.reducer;
