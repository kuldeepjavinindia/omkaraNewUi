// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './slice/counterSlice';
import AuthSlice from './slice/AuthSlice';
import TrendlyneSlice from './slice/TrendlyneSlice';
import SingleCompnaySlice from './slice/SingleCompnaySlice';
import MasterSlice from './slice/MasterSlice';
import WatchListSlice from './slice/WatchListSlice';
import ThemeColorSlice from './slice/ThemeColorSlice';
import ExtraApiSlice from './slice/ExtraApiSlice';
import Data2Slice from './slice/Data2Slice';

const store = configureStore({
    reducer: {
        counter: counterSlice,
        Masters: MasterSlice,
        Auth: AuthSlice,
        SingleCompany: SingleCompnaySlice,
        Trendlyne: TrendlyneSlice,
        WatchList: WatchListSlice,
        ThemeColor: ThemeColorSlice,
        Data2: Data2Slice,
        ExtraApi: ExtraApiSlice
    },
});

export default store;
