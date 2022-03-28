import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDataType } from "../../type/userDataType";


interface CurrentUserType {
    userPlayLists: UserDataType[];
    token: string|null;
    expired: boolean;
}

const initialState: CurrentUserType = {
    userPlayLists: [{id: "1", name: "我的播放清單 #1", playList:[]}],
    token: null,
    expired: false
}

export const currentUserSlice = createSlice({
    name: "currentUser",
    initialState,
    reducers: {
        getToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        userExpired: (state, action: PayloadAction<boolean>) => {
            state.expired = action.payload;
        },
        logout: (state) => {
            return initialState;
        },
        getUserPlayList: (state, action: PayloadAction<UserDataType[]>) => {
            state.userPlayLists = action.payload;
        },
        createUserPlayList: (state, action: PayloadAction<UserDataType>) => {
            state.userPlayLists = [...state.userPlayLists, action.payload];
        },
        updateUserPlayList: (state, action: PayloadAction<UserDataType>) => {
            const targetUserPlayListIndex = state.userPlayLists.findIndex(item => item.id === action.payload.id);
            if(targetUserPlayListIndex !== -1){
                state.userPlayLists.splice(targetUserPlayListIndex, 1, action.payload);
            }
        },
        deleteUserPlayList: (state, action: PayloadAction<UserDataType>) => {
            const targetUserPlayListIndex = state.userPlayLists.findIndex(item => item.id === action.payload.id);
            if(targetUserPlayListIndex !== -1){
                state.userPlayLists.splice(targetUserPlayListIndex, 1, action.payload);
            }
        },
    }
});
