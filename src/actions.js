const {
    DELETE_POST,
    DELETE_COMMENT,
    EDIT_COMMENT,
    ADD_COMMENT,
    ADD_POST,
    EDIT_POST
} = require("./actionTypes");

let cid = 6;
let pid = 6;

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
    cid += 1;
    return {
        type: ADD_COMMENT,
        payload: {
            comment: comment,
            id: cid
        }
    }
}

const addPost = (post) => {
    pid += 1;
    return {
        type: ADD_POST,
        payload: {
            post: post,
            id: pid
        }
    }
}

const editPost = (id, post) => {
    return {
        type: EDIT_POST,
        payload: {
            id: id,
            post: {
                ...post
            }
        }
    }
}

module.exports = {
    removePost,
    removeComment,
    editComment,
    addComment,
    addPost,
    editPost
};