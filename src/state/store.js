import { configureStore } from '@reduxjs/toolkit';

import jsonGraphReducer from './slices/jsonGraphSlice';
import analyticsDataReducer from './slices/analyticsSlice';
import dateRangeReducer from './slices/dateRangeSlice';


export const store = configureStore({
    reducer: {
        jsonGraph: jsonGraphReducer,
        analyticsData: analyticsDataReducer,
        dateRange: dateRangeReducer,
        // Other reducers...
    },
});
