const { DELETE_POST, DELETE_COMMENT, EDIT_COMMENT, ADD_COMMENT } = require("./actionTypes");

let i = 6;

const removePost = (id) => {
    return {
        type: DELETE_POST,
        payload: {
            id: id
        }
    }
}

const removeComment = (id) => {
    return {
        type: DELETE_COMMENT,
        payload: {
            id: id
        }
    }
}

const editComment = (id, body) => {
    return {
        type: EDIT_COMMENT,
        payload: {
            id: id,
            body: body
        }
    }
}

const addComment = (comment) => {
    i += 1;
    return {
        type: ADD_COMMENT,
        payload: {
            comment: comment,
            id: i
        }
    }
}

module.exports = { removePost, removeComment, editComment, addComment };