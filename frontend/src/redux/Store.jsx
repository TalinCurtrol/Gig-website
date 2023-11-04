import { configureStore } from '@reduxjs/toolkit'
import userReducer from './UserSlice'
import adminReducer from './AdminSlice'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';


const persistConfig = {
  key: 'root',
  storage,
}

const persistedUserReducer = persistReducer(persistConfig, userReducer)
const persistedAdminReducer = persistReducer(persistConfig, adminReducer)


export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    admin: persistedAdminReducer
  },
  // devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
})

export const persistor = persistStore(store)

// export default configureStore({
//   reducer: {
//     user: userReducer,
//     admin: adminReducer
//   }
// })