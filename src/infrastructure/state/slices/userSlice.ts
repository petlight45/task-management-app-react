import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from "../../../core/entities/User";

export interface UserState {
    user: User | null;
    allUsers: User[];

}

const initialState: UserState = {
    user: null,
    allUsers: []
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
        },
        logoutUser(state) {
            state.user = null;
        },
        setAllUsers(state, action: PayloadAction<User[]>) {
            state.allUsers = action.payload as [];
        },
    },
});

export const {setUser, logoutUser, setAllUsers} = userSlice.actions;

export default userSlice.reducer;
