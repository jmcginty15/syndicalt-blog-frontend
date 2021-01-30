import sampleComments from './sampleComments';
import {
    ADD_COMMENT,
    DELETE_COMMENT,
    DELETE_POST,
    EDIT_COMMENT,
    ADD_POST,
    EDIT_POST,
    LOAD_POSTS,
    LOAD_POST,
    CLEAR_CURRENT_POST,
    LOGIN,
    LOGOUT
} from './actionTypes';
import { findItem, findIndex } from './helpers';

const INITIAL_STATE = {
    posts: [],
    currentPost: null,
    loggedInUser: null,
    comments: sampleComments
};

const rootReducer = (state = INITIAL_STATE, action) => {
    const posts = [ ...state.posts ];
    const currentPost = state.currentPost ? { ...state.currentPost } : null;
    const comments = { ...state.comments };

    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                loggedInUser: { ...action.payload.user }
            };
        case LOGOUT:
            return {
                ...state,
                loggedInUser: null
            }
        case LOAD_POST:
            const newCurrentPost = { ...action.payload.currentPost };
            newCurrentPost.bannerImage = newCurrentPost.banner_image;
            delete newCurrentPost.banner_image;
            return {
                ...state,
                currentPost: newCurrentPost
            };
        case LOAD_POSTS:
            const newPosts = [ ...action.payload.posts ];
            for (let post of newPosts) {
                post.bannerImage = post.banner_image;
                delete post.banner_image;
            }
            return {
                ...state,
                posts: newPosts
            };
        case ADD_POST:
            const newPost = action.payload.post;
            return {
                ...state,
                posts: {
                    ...posts,
                    [action.payload.id]: newPost
                }
            };
        case EDIT_POST:
            const editedPost = action.payload.post;
            return {
                ...state,
                posts: {
                    ...posts,
                    [action.payload.id]: editedPost
                }
            };
        case DELETE_POST:
            delete posts[action.payload.id];
            return {
                ...state,
                posts: posts
            };
        case CLEAR_CURRENT_POST:
            return {
                ...state,
                currentPost: null
            };
        case ADD_COMMENT:
            const newComment = action.payload.comment;
            currentPost.comments.push(newComment);
            return {
                ...state,
                currentPost: currentPost
            };
        case EDIT_COMMENT:
            comments[action.payload.id].body = action.payload.body;
            return {
                ...state,
                comments: comments
            };
        case DELETE_COMMENT:
            const idx = findIndex(action.payload.id, currentPost.comments);
            currentPost.comments.splice(idx, 1);
            return {
                ...state,
                currentPost: currentPost
            };
        default:
            return { ...state };
    }
}

export default rootReducer;