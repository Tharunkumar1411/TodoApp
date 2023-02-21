const { combineReducers, configureStore } = require("@reduxjs/toolkit");
import UserReducer from "./user";
import TodoReducer from "./todo";

const reducers = combineReducers({
    user: UserReducer,
    todo: TodoReducer,
});

const store = configureStore({
    reducer: reducers
});

export default store;