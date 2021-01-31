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

// change this to your server location
const BASE_URL = 'http://localhost:3001';

const removePost = (id, token) => {
    return async (dispatch) => {
        try {
            await axios.delete(`${BASE_URL}/api/v1/posts/${id}`, { headers: { authorization: `Bearer ${token}` } });
            dispatch({
                type: DELETE_POST,
                payload: {
                    id: id
                }
            });
        } catch (err) {
            console.log(err);
        }
    }
}

const removeComment = (id, token) => {
    console.log(token);
    return async (dispatch) => {
        try {
            await axios.delete(`${BASE_URL}/api/v1/comments/${id}`, { headers: { authorization: `Bearer ${token}` } });
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

const editComment = (id, body, token) => {
    console.log(token);
    return async (dispatch) => {
        try {
            await axios.put(`${BASE_URL}/api/v1/comments/${id}`, { body: body }, { headers: { authorization: `Bearer ${token}` } });
            dispatch({
                type: EDIT_COMMENT,
                payload: {
                    id: id,
                    body: body
                }
            });
        } catch (err) {
            console.log(err);
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

const addPost = (post, token) => {
    post.banner_image = post.bannerImage;
    return async (dispatch) => {
        try {
            const res = await axios.post(`${BASE_URL}/api/v1/posts`, post, { headers: { authorization: `Bearer ${token}` } });
            dispatch({
                type: ADD_POST,
                payload: {
                    post: res.data.data,
                }
            });
        } catch (err) {
            console.log(err);
        }
    }
}

const editPost = (id, post, token) => {
    post.banner_image = post.bannerImage;
    return async (dispatch) => {
        try {
            const postRes = await axios.put(`${BASE_URL}/api/v1/posts/${id}`, post, { headers: { authorization: `Bearer ${token}` } });
            const commentRes = await axios.get(`${BASE_URL}/api/v1/posts/${id}/comments`);
            dispatch({
                type: EDIT_POST,
                payload: {
                    id: id,
                    post: {
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
            const loginRes = await axios.post(`${BASE_URL}/api/v1/auth/register`, user);
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