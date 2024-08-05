import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    jsonData: JSON.stringify(null, " "),
    graphData: { nodes: [], edges: [] },
};

const jsonGraphSlice = createSlice({
    name: "jsonGraph",
    initialState,
    reducers: {
        setJsonData: (state, action) => {
            console.log("Setting JSON data:");
            state.jsonData = action.payload;
        },
        setGraphData: (state, action) => {
            state.graphData = action.payload;
        },
    },
});

export const { setJsonData, setGraphData } = jsonGraphSlice.actions;
export default jsonGraphSlice.reducer;
