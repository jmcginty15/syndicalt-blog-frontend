const {
    LOAD_POST,
    LOAD_POSTS,
    ADD_POST,
    EDIT_POST,
    DELETE_POST,
    CLEAR_CURRENT_POST,
    ADD_COMMENT,
    EDIT_COMMENT,
    DELETE_COMMENT,
    LOGIN,
    LOGOUT,
    LOGIN_ERROR,
    REGISTER_ERROR
} = require("./actionTypes");
const axios = require('axios');
const BASE_URL = 'http://localhost:3001';

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
    return async (dispatch) => {
        try {
            await axios.delete(`${BASE_URL}/api/v1/comments/${id}`);
            dispatch({
                type: DELETE_COMMENT,
                payload: {
                    id: id
                }
            });
        } catch (err) {
            console.log(err);
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
    return async (dispatch) => {
        try {
            const res = await axios.post(`${BASE_URL}/api/v1/posts/${comment.postId}/comments`, comment);
            dispatch({
                type: ADD_COMMENT,
                payload: {
                    comment: res.data.data
                }
            });
        } catch (err) {
            console.log(err);
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

const loadPost = (id) => {
    return async (dispatch) => {
        try {
            const postRes = await axios.get(`${BASE_URL}/api/v1/posts/${id}`);
            const commentRes = await axios.get(`${BASE_URL}/api/v1/posts/${id}/comments`);
            dispatch({
                type: LOAD_POST,
                payload: {
                    currentPost: {
                        ...postRes.data.data,
                        comments: commentRes.data.data
                    }
                }
            });
        } catch (err) {
            console.log(err);
        }
    }
}

const loadPosts = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${BASE_URL}/api/v1/posts`);
            dispatch({
                type: LOAD_POSTS,
                payload: {
                    posts: res.data.data
                }
            });
        } catch (err) {
            console.log(err);
        }
    }
}

const clearCurrentPost = () => {
    return {
        type: CLEAR_CURRENT_POST
    }
}

const registerUser = (user) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(`${BASE_URL}/api/v1/auth/register`, user);
            delete user.password;
            delete user.confirmPassword;
            dispatch({
                type: LOGIN,
                payload: {
                    user: {
                        ...user,
                        token: res.data.token
                    }
                }
            });
        } catch (err) {
            let errMessage = err.response.data.error;
            if (typeof errMessage !== 'string') errMessage = errMessage[0].message;
            if (errMessage === 'Must be six characters long') errMessage = 'Password must be at least six characters long';
            dispatch({
                type: REGISTER_ERROR,
                payload: {
                    message: errMessage
                }
            });
        }
    }
}

const login = (email, password) => {
    return async (dispatch) => {
        try {
            const loginRes = await axios.post(`${BASE_URL}/api/v1/auth/login`, { email: email, password: password });
            const token = loginRes.data.token;
            const userRes = await axios.post(`${BASE_URL}/api/v1/auth/me`, {}, { headers: { authorization: `Bearer ${token}` } });
            dispatch({
                type: LOGIN,
                payload: {
                    user: {
                        ...userRes.data.data,
                        token: token
                    }
                }
            });
        } catch (err) {
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }
}

const logout = () => {
    return {
        type: LOGOUT
    }
}

module.exports = {
    removePost,
    removeComment,
    editComment,
    addComment,
    addPost,
    editPost,
    loadPost,
    loadPosts,
    clearCurrentPost,
    registerUser,
    login,
    logout
};