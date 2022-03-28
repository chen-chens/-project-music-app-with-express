import { Avatar, Input, List, Typography } from "antd";
import React from "react";
import VirtualList from 'rc-virtual-list';
import { AddButton } from "../../../components/addButton";

interface DetailsProps{
    loading: boolean;
    searchValue: string;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
    onSearch: (value: string, preResults?: SpotifyApi.TrackObjectFull[]) => void;
    searchResults: SpotifyApi.TrackObjectFull[];
    handleAddItemToPlayList: (item: SpotifyApi.TrackObjectFull) => void;
    getArtistNames: (artistsData: SpotifyApi.ArtistObjectSimplified[]) => string;
    offset: number;
    setOffset: (value: React.SetStateAction<number>) => void;
}

export default function Details(props: DetailsProps) {
    const {
        loading,
        searchValue,
        setSearchValue,
        onSearch,
        searchResults,
        handleAddItemToPlayList,
        getArtistNames,
        offset,
        setOffset
    } = props;

    const ContainerHeight = 400;

    const onScroll = (event: React.UIEvent<HTMLElement, UIEvent>) => {
        if ((event.currentTarget.scrollHeight - event.currentTarget.scrollTop) === ContainerHeight) {
            setOffset(offset+10);
        }
    }

    return(
        <>
            <Typography.Title level={4}>加入推薦清單</Typography.Title>
            <Input.Search 
                placeholder="搜尋歌曲或專輯..." 
                value={searchValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)} 
                onSearch={() => onSearch(searchValue)}
                onPressEnter={() => onSearch(searchValue)}
                enterButton 
                style={{maxWidth: 450, width: "100%"}}
            />
            {   searchResults.length > 0
                ?   (<List loading={loading}>
                        <VirtualList
                            data={searchResults}
                            height={ContainerHeight}
                            itemHeight={47}
                            itemKey="id"
                            onScroll={onScroll}
                            // ref={awesomeInputRef}
                        >
                            {item => (                                
                                <List.Item 
                                    key={item.id}
                                    extra={<AddButton style={{marginLeft: 10}} onClick={() => handleAddItemToPlayList(item)}/>}
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.album.images[1].url} />}
                                        title={item.name}
                                        description={getArtistNames(item.artists)}
                                    />
                                </List.Item>
                            )}
                        </VirtualList>
                    </List>)
                :  
                    <Typography.Title level={5}>查無資料</Typography.Title>
            }
        </>
    )
}