export default (state = { rotating: true }, action) => {
    switch (action.type) {
        case "rotate":
            return {
                rotating: action.payload
            };
        default:
            return state;
    }
};
