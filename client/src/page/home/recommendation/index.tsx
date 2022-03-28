import { Card, Tabs, Typography} from "antd";
import Meta from "antd/lib/card/Meta";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AlertNotification from "../../../components/alertNotifacation";
import { Container } from "../../../components/container";
import { ThemeContext } from "../../../theme";
import { currentPlayingActions, currentUserData } from "../../../reduxToolkit";
import { spotifyApi, checkStatusCode } from "../../../service";
import { Genrees } from "../../../type/genrees";
import { DetailList } from "./detailList";


export default function Recommendation(){
    const theme = useContext(ThemeContext);
    const dispatch = useDispatch();
    const token = useSelector(currentUserData.token);
    const [ recommendationList, setRecommendationList ] = useState<SpotifyApi.TrackObjectFull[]>([]);
    const [ genresKey, setGenresKey ] = useState<string>(Genrees.NEW_RELEASE);
    const [ loading, setLoading ] = useState(false);

    const categoryTags = [
        {
            key: Genrees.NEW_RELEASE,
            title: "最新發行",
        },
        {
            key: Genrees.MOVIE,
            title: "電影主題曲",
        },
        {
            key: Genrees.RNB,
            title: "R&B",
        },
        {
            key: Genrees.HIP_HOP,
            title: "Hip Hop",
        },
        {
            key: Genrees.ROCK,
            title: "搖滾樂",
        },
        {
            key: Genrees.STUDY,
            title: "專注",
        },
        {
            key: Genrees.WORK_OUT,
            title: "健身",
        },
    ];

    useEffect(()=> {
        if(token){
            setLoading(true);
            spotifyApi().setAccessToken(token);
            spotifyApi().getRecommendations({ seed_genres: genresKey })
            .then(res => {
                const dataWithPreviewUrl = res.tracks.filter(item => item.preview_url !== null) as SpotifyApi.TrackObjectFull[];
                setRecommendationList(dataWithPreviewUrl);
            }).catch(err => {
                console.log("api getRecommendations err: ",err);
                checkStatusCode(err.status, dispatch);

                AlertNotification({
                    type: "error",
                    title: "取得資料失敗！"
                })
            }).finally(() => setLoading(false))
        }
    }, [token, genresKey])
    
    return(
        <Container theme={theme}>
            <Typography.Title level={3}>今天想聽什麼歌？</Typography.Title>
            <Tabs onChange={(key: string)=> setGenresKey(key)}>
                {categoryTags.map(tag => (
                    <Tabs.TabPane tab={tag.title} key={tag.key}>
                        <DetailList>
                            {recommendationList?.map(item => (
                                <Card
                                    loading={loading}
                                    key={item.id}
                                    hoverable
                                    cover={loading ? null : <img alt={item.name} src={item.album.images[0].url} />}
                                    onClick={()=>  {
                                        dispatch(currentPlayingActions.showPlayBar());
                                        dispatch(currentPlayingActions.recordPlayingData(item));
                                        dispatch(currentPlayingActions.recordPlayingList(recommendationList));
                                    }}
                                >
                                    <Meta title={item.name} description={item.artists[0].name} />
                                </Card>
                            ))}
                        </DetailList>
                    </Tabs.TabPane>
                ))}
            </Tabs>
        </Container>
    )
}