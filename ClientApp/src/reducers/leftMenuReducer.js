export default (state = { showMenu: true }, action) => {
    switch (action.type) {
        case "menuShow":
            return {
                showMenu: action.payload
            };
        default:
            return state;
    }
};