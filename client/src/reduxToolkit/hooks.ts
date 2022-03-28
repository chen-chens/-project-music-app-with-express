import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './store';


export const useAppDispatch = () => useDispatch<AppDispatch>(); // type AppDispatch 加入 thunk 概念，定義 useDispatch 確保之後提示提醒。
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; // 節省定義 (state: RootState)

