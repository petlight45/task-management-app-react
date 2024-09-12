import userReducer, {
    setUser, logoutUser, setAllUsers, UserState
} from "../../../../infrastructure/state/slices/userSlice";
import MockHelperUtils from "../../../mocks/index";
import {faker} from '@faker-js/faker';
import {User} from "../../../../core/entities/User";

describe('User Slice Tests', () => {
    const initialState: UserState =  {
        user: null,
        allUsers: []
    };

    it('should handle initial state', () => {
        expect(userReducer(undefined, {type: 'unknown'})).toEqual(initialState);
    });

    it('should handle setting a user', () => {
        const user = MockHelperUtils.generateMockUser();
        const newState = userReducer(initialState, setUser(user));
        expect(newState.user).toEqual(user);
    });

    it('should handle logout a user', () => {
        const user = MockHelperUtils.generateMockUser();
        let newState = userReducer(initialState, setUser(user));
        newState = userReducer(initialState, logoutUser());
        expect(newState.user).toEqual(null);
    });
    it('should handle set all users', () => {
        const user1 = MockHelperUtils.generateMockUser();
        const user2 = MockHelperUtils.generateMockUser()
        let newState = userReducer(initialState, setAllUsers([user1, user2]));
        expect(newState.allUsers).toEqual([user1, user2]);
    });
});
