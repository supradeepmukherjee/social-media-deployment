import { configureStore } from '@reduxjs/toolkit';
import post from './api/post';
import user from './api/user';
import authSlice from './reducers/auth';

const store = configureStore({
    reducer: {
        [post.reducerPath]: post.reducer,
        [user.reducerPath]: user.reducer,
        [authSlice.name]: authSlice.reducer,
    },
    middleware: d => d().concat([
        user.middleware,
        post.middleware,
    ]),
    devTools: import.meta.env.NODE_ENV !== 'production',
})

export default store