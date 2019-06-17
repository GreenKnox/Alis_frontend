// src/modules/reducers/registerReducer.js

const Types = {
    SET_MESSAGE: "ADD_MESSAGE",
    SET_TOKEN: "ADD_TOKEN",
};

const initialState = {
    message: '',
    token: ''
}



const registerReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.ADD_MESSAGE:
            return Object.assign({}, state, {
                message: state.message.concat(action.payload)
            })
            break
        case Types.ADD_TOKEN:
            return Object.assign({}, state, {
                token: state.token.concat(action.payload)
            })
            break   
        default:
            return state;
    }
}

export default registerReducer