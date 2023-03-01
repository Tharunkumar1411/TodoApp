const { combineReducers, configureStore } = require("@reduxjs/toolkit");
import storage from "./storage";
import UserReducer from "./user";
import TodoReducer from "./todo";
import ActiveReducer from "./active";
import ExpireReducer from "./expire";
import { persistReducer, persistStore } from "redux-persist";

const reducers = combineReducers({
    user: UserReducer,
    todo: TodoReducer,
    active: ActiveReducer,
    expire: ExpireReducer,
});

const persistedReducers = persistReducer(
    { key: "todo-web-dev", storage },
    reducers
  );

const Store = configureStore({
    reducer: persistedReducers,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: ["persist/PERSIST"],
          },
        });
      },
});

export const persistor = persistStore(Store);

export default Store;