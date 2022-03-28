import React, { useEffect, useState } from "react";
import BasicLayout from "../../layouts/basicLayout";
import { spotifyApi, checkStatusCode } from "../../service";
import { useDispatch, useSelector } from "react-redux";
import { currentUserActions, currentUserData } from "../../reduxToolkit";
import AlertNotification from "../../components/alertNotifacation";
import { useParams } from "react-router";
import { UserDataType } from "../../type/userDataType";
import SpotifyWebApi from "spotify-web-api-js";
import Details from "./details";
import Main from "./main";

type OperationType = "create" | "delete";

export default function MyPlayLists(){
    const ref = React.useRef(null);
    const token = useSelector(currentUserData.token);
    const userPlayLists = useSelector(currentUserData.userPlayLists);
    const urlParams = useParams();
    const dispatch = useDispatch();
    const [ loading, setLoading ] = useState(false);
    const [ searchValue, setSearchValue ] = useState("");
    const [ searchResults, setSearchResults ] = useState<SpotifyApi.TrackObjectFull[]>([]);
    const [ playListData, setPlayListData ] = useState<UserDataType>();
    const [ offset, setOffset ] = useState(0);

    useEffect(() => {
        const currentUserPlayList = userPlayLists.find(item => item.id === urlParams.playListId);
        setPlayListData(currentUserPlayList);
    }, [urlParams.playListId, userPlayLists])

    const onSearch = (value: string, preResults: SpotifyApi.TrackObjectFull[] = []) => {
        setLoading(true);
        spotifyApi().setAccessToken(token);
        spotifyApi().searchTracks(value||"a", { limit: 10, offset: offset })
        .then(res => {
            const getPreviewUrlData = res.tracks.items.filter(item => item.preview_url !== null);
            const appendData = preResults.concat(getPreviewUrlData);
            setSearchResults(appendData);
            
        }).catch((err: SpotifyWebApi.ErrorObject) => {
            console.log("api searchTracks err: ",err);
            checkStatusCode(err.status, dispatch);
            AlertNotification({
                type: "error",
                title: "搜尋失敗！",
                description: "請重新輸入！"
            })
        }).finally(() => setLoading(false))
    }
    useEffect(() => {
        if(searchValue){
            onSearch(searchValue, searchResults)
        }else{
            onSearch("a");
        }
    }, [offset])

    useEffect(()=> {
        setSearchValue("");
        setOffset(0);
        onSearch("a");
    }, [urlParams.playListId])

    const getArtistNames = (artistsData: SpotifyApi.ArtistObjectSimplified[]): string => {
        const artistNames = artistsData.map(item => item.name);
        return artistNames.join();
    }

    const transferResults = (operation: OperationType, item: SpotifyApi.TrackObjectFull) => {
        const tempResults = [...searchResults];
        const targetIndex = searchResults.findIndex(item => item.id === item.id);
        if(operation === "create"){
            tempResults.splice(targetIndex, 1);
        }else if(operation === "delete"){
            tempResults.push(item);
        }
        setSearchResults(tempResults);
    }

    const handleAddItemToPlayList = (item: SpotifyApi.TrackObjectFull) => {
        const updateCurrentPlayList = {
            ...playListData as UserDataType,
            playList: (playListData?.playList) ? [...playListData.playList, item] : [item]
        };
        dispatch(currentUserActions.updateUserPlayList(updateCurrentPlayList));
        transferResults( "create", item);
    }

    const handleDeleteItemToPlayList = (row: SpotifyApi.TrackObjectFull) => {
        const currentPlayListData = (playListData?.playList) ? [...playListData.playList] : [];
        const targetDataIndex = currentPlayListData.findIndex(item => item.id === row.id);
        if(targetDataIndex !== -1){
            currentPlayListData.splice(targetDataIndex, 1);
        }
        const updateCurrentPlayList = {
            ...playListData as UserDataType,
            playList: currentPlayListData
        };
        dispatch(currentUserActions.deleteUserPlayList(updateCurrentPlayList));
        transferResults("delete", row);
    }

    return(
        <BasicLayout
            title={playListData?.name||""}
            main={
                <Main 
                    playListData={playListData}
                    getArtistNames={getArtistNames}
                    handleDeleteItemToPlayList={handleDeleteItemToPlayList}
                />
            }
            details={
                <Details 
                    loading={loading}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    onSearch={onSearch}
                    searchResults={searchResults}
                    handleAddItemToPlayList={handleAddItemToPlayList}
                    getArtistNames={getArtistNames}
                    offset={offset}
                    setOffset={setOffset}
                />
            }
        />
    )
}
