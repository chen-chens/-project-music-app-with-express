import { configureStore } from "@reduxjs/toolkit";
import {currentUserSlice} from './slices/currentUserSlice';


export const store = configureStore({
    reducer:{
        currentUser: currentUserSlice.reducer,

    }
    
})


export type RootState = ReturnType<typeof store.getState>; // Infer the `RootState` and `AppDispatch` types from the store itself
export type AppDispatch = typeof store.dispatch; // Inferred type: {currentUser: CurrentUserState, ...}
