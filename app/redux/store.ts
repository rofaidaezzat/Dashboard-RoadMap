import { configureStore } from '@reduxjs/toolkit'
import { MemberApiSlice } from './services/crudMember'
import  AccessTokenSlice from './features/accessTokenSlice'
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import clickedIdSlice from './features/clickedIdSlice'
import { TracksApiSlice } from './services/crudTracks';
import { StatgesApiSlice } from './services/crudStatges';
import { CategoryApiSlice } from './services/crudCategory';
import { LessonApiSlice } from './services/crudLesson';
import { ProfileApiSlice } from './services/crudProfile';
import { TaskApiSlice } from './services/crudTask';



const persistAccessTokenConfig = {
    key: "accessToken",
    storage,
};

const persistclickedIdConfig = {
    key: "clickedId",
    storage,
};
const persistedaccessToken=persistReducer(persistAccessTokenConfig,AccessTokenSlice)
const persistedclickedId=persistReducer(persistclickedIdConfig,clickedIdSlice)


export const store = configureStore({
    reducer: {
        accessToken:persistedaccessToken,
        clickedId:persistedclickedId,
        [MemberApiSlice.reducerPath]:MemberApiSlice.reducer,
        [TracksApiSlice.reducerPath]:TracksApiSlice.reducer,
        [StatgesApiSlice.reducerPath]:StatgesApiSlice.reducer,
        [CategoryApiSlice.reducerPath]:CategoryApiSlice.reducer,
        [LessonApiSlice.reducerPath]:LessonApiSlice.reducer,
        [ProfileApiSlice.reducerPath]:ProfileApiSlice.reducer,
        [TaskApiSlice.reducerPath]:TaskApiSlice.reducer

    }, 
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false,
        })
        .concat(
            MemberApiSlice.middleware,
            TracksApiSlice.middleware,
            StatgesApiSlice.middleware,
            CategoryApiSlice.middleware,
            LessonApiSlice.middleware,
            ProfileApiSlice.middleware,
            TaskApiSlice.middleware
        )
})

    export const persister=persistStore(store)  
    export type RootState = ReturnType<typeof store.getState>
    export type AppDispatch = typeof store.dispatch
