import Table, { ColumnsType } from "antd/lib/table";
import { PlayCircleFilled, MinusCircleOutlined } from '@ant-design/icons';
import { Avatar, List } from "antd";
import { icon_style } from "../../../theme";
import { useDispatch } from "react-redux";
import { currentPlayingActions } from "../../../reduxToolkit";
import { UserDataType } from "../../../type/userDataType";

interface MainProps{
    playListData?: UserDataType;
    getArtistNames: (artistsData: SpotifyApi.ArtistObjectSimplified[]) => string;
    handleDeleteItemToPlayList: (row: SpotifyApi.TrackObjectFull) => void;
}

export default function Main(props: MainProps) {
    const { playListData, getArtistNames, handleDeleteItemToPlayList } = props;
    const dispatch = useDispatch();
    const columns: ColumnsType<SpotifyApi.TrackObjectFull> = [
        {
            title: '',
            width: 40,
            onCell: () => ({style: {textAlign: "center"}}),
            render: (row: SpotifyApi.TrackObjectFull) => ( 
                <PlayCircleFilled style={{...icon_style, color: "#a4c4bb"}} onClick={()=> {
                    dispatch(currentPlayingActions.showPlayBar());
                    dispatch(currentPlayingActions.recordPlayingData(row));
                    dispatch(currentPlayingActions.recordPlayingList(playListData?.playList||[]));
                }}/>
            ),
        },
        {
            title: '歌名',
            width: 300,
            render: (row: SpotifyApi.TrackObjectFull) => ( 
                <List.Item.Meta
                    avatar={<Avatar src={row.album.images[1].url} shape="square" size="large"/>}
                    title={row.name}
                    description={getArtistNames(row.artists)}
                /> 
            )
        },
        {
            title: '專輯',
            width: 150,
            dataIndex: ['album', 'name'],
            responsive: ['md'],
        },
        {
            title: '發行日期',
            width: 150,
            dataIndex: ['album', 'release_date'],
            responsive: ['lg'],
        },
        {
            title: '',
            width: 60,
            onCell: () => ({style: {textAlign: "end"}}),
            render: (row: SpotifyApi.TrackObjectFull) => (
                <MinusCircleOutlined style={{...icon_style, color: "#fa5c7c"}} onClick={()=> handleDeleteItemToPlayList(row)}/>
            )
        },
    ];

    return(
        <Table 
            size="small" 
            rowKey="id"
            columns={columns}
            dataSource={playListData?.playList}
            scroll={{y: 400}}
            pagination={false}
        />
    )
    
}