import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    analyticsData: [],
};

const analyticsSlice = createSlice({
    name: "analyticsData",
    initialState,
    reducers: {
        setAnalyticsData: (state, action) => {
            state.analyticsData = action.payload;
        },
    },
});

export const { setAnalyticsData } = analyticsSlice.actions;
export default analyticsSlice.reducer;