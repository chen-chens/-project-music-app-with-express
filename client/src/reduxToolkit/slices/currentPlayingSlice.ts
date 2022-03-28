import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface CurrentPlayingType {
    showPlayBar: boolean;
    currentPlayingItem: SpotifyApi.TrackObjectFull|null;
    currentPlayingList: SpotifyApi.TrackObjectFull[];
}

const initialState: CurrentPlayingType = {
    showPlayBar: false,
    currentPlayingItem: null,
    currentPlayingList: []
};

export const currentPlayingSlice = createSlice({
    name: "currentPlaying",
    initialState,
    reducers: {
        showPlayBar: (state)=> {
            state.showPlayBar = true;
        },
        closePlayBar: (state)=> {
            return initialState;
        },
        recordPlayingData: (state, action: PayloadAction<SpotifyApi.TrackObjectFull>)=> {
            state.currentPlayingItem = action.payload;
        },
        recordPlayingList: (state, action: PayloadAction<SpotifyApi.TrackObjectFull[]>)=> {
            state.currentPlayingList = [...action.payload];
        },
    }
});

