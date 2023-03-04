const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    activelist: [],
    activecount: '',
};

const activeSlice = createSlice({
    name: "active",
    initialState,
    reducers: {
        setActive(state, action) {
            state.activelist = action.payload;
        },
        removeActive(state, action){
            state.activelist = action.payload;
        },
        setActiveCount(state, action){
            state.activecount = action.payload;
        }
    }
});

export const { setActive, removeActive, setActiveCount } = activeSlice.actions;

export const getActive = (state) => state.active.activelist;
export const getActiveCount = (state) => state.active.activecount;

export default activeSlice.reducer;
