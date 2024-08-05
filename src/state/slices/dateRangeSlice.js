import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    from: (new Date(2024, 3, 2)).toISOString().split("T")[0],
    to: (new Date(2024, 9, 1)).toISOString().split("T")[0],
};

const dateRangeSlice = createSlice({
    name: "dateRange",
    initialState,
    reducers: {
        setDateRange: (state, action) => {
            state.from = action.payload.from;
            state.to = action.payload.to;
        },
    },
});

export const { setDateRange } = dateRangeSlice.actions;
export default dateRangeSlice.reducer;
