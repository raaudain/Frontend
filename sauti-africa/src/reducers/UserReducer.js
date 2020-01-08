export const UserReducer = (state, action) => {

    switch (action.type) {
        case 'USERNAME':
            return action.username;
        default:
            return state;
    }
}