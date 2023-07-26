import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import BuyListReducer from "./ProductSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["buylist"],
};

const rootReducer = combineReducers({
  buylist: BuyListReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default store;
