const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    expirelist: [],
    expirecount: '',
};

const expireSlice = createSlice({
    name: "expire",
    initialState,
    reducers: {
        setExpire(state, action) {
            state.expirelist = action.payload;
        },
        setExpireCount(state, action){
            state.expirecount = action.payload;
        },
    }
});

export const { setExpire, setExpireCount} = expireSlice.actions;

export const getExpire = (state) => state.expire.expirelist;
export const getExpireCount = (state) => state.expire.expirecount;

export default expireSlice.reducer;
