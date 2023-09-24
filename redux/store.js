// import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// import storage from 'redux-persist/lib/storage';
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist';
// import { productsReducer} from './productsSlice'
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const middleware = [
//   ...getDefaultMiddleware({
//     serializableCheck: {
//       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//     },
//   }),
// ];

// const persistConfig = {
//   key: "products",
//   storage: AsyncStorage,
// };

// export const store = configureStore({
//   reducer: {
//     products: persistReducer(persistConfig, productsReducer)
//   },
//   middleware,
//   devTools: process.env.NODE_ENV === 'development',
// });

// export const persistor = persistStore(store);

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { productsReducer } from './productsSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const rootReducer = combineReducers({
  products: productsReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedProductsReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedProductsReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
