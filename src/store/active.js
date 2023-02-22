const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    activelist: [],
};

const activeSlice = createSlice({
    name: "active",
    initialState,
    reducers: {
        setActive(state, action) {
            state.activelist = [...state.activelist,action.payload];
        },
        removeActive(state, action){
            state.activelist = action.payload;
        }
    }
});

export const { setActive, removeActive } = activeSlice.actions;

export const getActive = (state) => state.active.activelist;

export default activeSlice.reducer;
