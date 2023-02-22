const { combineReducers, configureStore } = require("@reduxjs/toolkit");
import UserReducer from "./user";
import TodoReducer from "./todo";
import ActiveReducer from "./active";
import ExpireReducer from "./expire";

const reducers = combineReducers({
    user: UserReducer,
    todo: TodoReducer,
    active: ActiveReducer,
    expire: ExpireReducer,
});

const Store = configureStore({
    reducer: reducers
});

export default Store;