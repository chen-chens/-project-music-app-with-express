import { useDispatch, useSelector } from "react-redux";
import { currentPlayingActions, currentPlayingData } from "../../../reduxToolkit";
import { MinusCircleOutlined, SoundOutlined } from '@ant-design/icons';
import { Avatar, List, Slider } from "antd";
import { 
    PauseCircleFilled, 
    PlayCircleFilled, 
    StepForwardFilled, 
    StepBackwardFilled,
} from '@ant-design/icons';
import { useEffect, useMemo, useRef, useState } from "react";
import AlertNotification from "../../../components/alertNotifacation";
import moment from "moment";
import { CurrentPlayingInfo } from "./currentPlayingInfo";
import { PlayTool } from "./playTool";
import { PlayController } from "./playController";
import { VolumeController } from "./volumeController";

export default function PlayBar(){
    const dispatch = useDispatch();
    const targetItem = useSelector(currentPlayingData.currentPlayingItem);
    const targetPlayList= useSelector(currentPlayingData.currentPlayingList);
    const audio = useMemo(() => new Audio(""), []); // create once
    const ref = useRef(audio);

    const [ isPaused, setIsPaused ] = useState(false);
    const [ duration, setDuration ] = useState("00:00"); // 紀錄歌曲長度
    const [ currentTime, setCurrentTime ] = useState(0); // 紀錄歌曲長度
    const [ volume, setVolume ] = useState(100); 

    useEffect(() => { // audio.addEventListener
        ref.current.addEventListener('timeupdate', () => setCurrentTime(ref.current.currentTime));
        ref.current.addEventListener('ended', () => nextAudio());
        return () => pauseAudio(); // 登出，暫停播放
    }, [])

    useEffect(() => { // change song & play
        ref.current.src = targetItem?.preview_url||"";
        if(isPaused){
            toggleAudio();
        }else{
            palyAudio();
            setVolume(ref.current.volume * 100);
        }
    }, [targetItem])

    useEffect(() => {
        if(isPaused){
            pauseAudio();
        }else{
            palyAudio();
        }
    }, [isPaused])

    const toggleAudio = () => setIsPaused(!isPaused);

    const pauseAudio = () => {
        ref.current.pause();
    }

    const palyAudio = () => {
        ref.current.play()
        .then(res => {
            setDuration(moment(ref.current.duration*1000).format("mm:ss"));
        }).catch(err => {
            console.log("audio err: ", err);
            AlertNotification({
                type: "error",
                title: "播放器有問題，請稍後再試！"
            })
        }) 
    }

    const preAudio = () => {
        const findCurrentIndex = targetPlayList.findIndex(item => item.id === targetItem?.id);
        dispatch(currentPlayingActions.recordPlayingData(targetPlayList[findCurrentIndex-1]));
    }

    const nextAudio = () => {
        const findCurrentIndex = targetPlayList.findIndex(item => item.id === targetItem?.id);
        dispatch(currentPlayingActions.recordPlayingData(targetPlayList[findCurrentIndex+1]));
    }

    const handleVolumeChange = (vol: number) => {
        ref.current.volume = vol / 100;
        setVolume(vol);
    }


    return(
        <PlayTool>
            <CurrentPlayingInfo>
                <MinusCircleOutlined
                    style={{fontSize: "1.7rem", marginRight: 15, color: "#fa5c7c"}} 
                    onClick={()=> dispatch(currentPlayingActions.closePlayBar())}
                />
                <List.Item.Meta
                    className="playBarInfo"
                    avatar={ <Avatar src={targetItem?.album?.images[2]?.url} shape="square" size={60}/> }
                    title={targetItem?.name}
                    description={targetItem?.artists[0]?.name}
                />
            </CurrentPlayingInfo>

            <PlayController>
                <StepBackwardFilled onClick={preAudio}/>
                {   isPaused 
                    ? <PlayCircleFilled onClick={toggleAudio}/> 
                    : <PauseCircleFilled onClick={toggleAudio}/>
                }
                <StepForwardFilled onClick={nextAudio}/>
                <Slider 
                    min={0} 
                    max={30} 
                    step={0.000001}
                    defaultValue={0} 
                    value={currentTime} 
                    marks={{0: "00:00", 30: duration}}
                    tooltipVisible={false}
                />
            </PlayController>

            <VolumeController>
                <SoundOutlined />
                <Slider
                    min={0} max={100} step={10} value={volume}
                    tipFormatter={(val) => `${val}%`} 
                    onChange={(vol: number) => handleVolumeChange(vol)}/>
            </VolumeController>
        </PlayTool>  
    )
}





