const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    expirelist: [],
};

const expireSlice = createSlice({
    name: "expire",
    initialState,
    reducers: {
        setExpire(state, action) {
            state.expirelist = action.payload;
        },
    }
});

export const { setExpire } = expireSlice.actions;

export const getExpire = (state) => state.expire.expirelist;

export default expireSlice.reducer;
