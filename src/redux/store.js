import { combineReducers, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import utilReducer from "./reducers/UtilReducer";

const rootReducer = combineReducers({ util: utilReducer });
const persistConfig = { key: "root", storage };
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);

export default { store, persistor: persistStore(store) };
