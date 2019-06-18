// src/modules/action/Index.js

const Types = {
    ADD_MESSAGE: "ADD_MESSAGE",
    ADD_TOKEN: "ADD_TOKEN",
};
// actions

const addMessage = message => ({
    type: Types.ADD_MESSAGE,
    payload: message
});

const addToken = token => ({
    type: Types.ADD_TOKEN,
    payload: token
});


export default {
    addMessage,
    addToken
};