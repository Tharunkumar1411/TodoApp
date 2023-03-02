const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    userDetails: {}
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action) {
            state.userDetails = action.payload
        },
    }
});

export const { setUser } = userSlice.actions;

export const getUserDetails = (state) => state.user.userDetails;

export default userSlice.reducer;
