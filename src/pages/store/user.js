const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    username: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action) {
            state.username = action.payload;
        },
    }
});

export const { setUser } = userSlice.actions;

export const getUser = (state) => state.user.username;

export default userSlice.reducer;
