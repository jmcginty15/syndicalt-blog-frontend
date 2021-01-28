import samplePosts from './samplePosts';
import sampleComments from './sampleComments';
import { ADD_COMMENT, DELETE_COMMENT, DELETE_POST, EDIT_COMMENT } from './actionTypes';

const INITIAL_STATE = {
    posts: samplePosts,
    comments: sampleComments
};

const rootReducer = (state = INITIAL_STATE, action) => {
    const posts = { ...state.posts };
    const comments = { ...state.comments };

    switch (action.type) {
        case DELETE_POST:
            delete posts[action.payload.id];
            return {
                ...state,
                posts: posts
            };
        case DELETE_COMMENT:
            delete comments[action.payload.id];
            return {
                ...state,
                comments: comments
            };
        case ADD_COMMENT:
            const newComment = action.payload.comment;
            return {
                ...state,
                comments: {
                    ...comments,
                    [action.payload.id]: newComment
                }
            };
        case EDIT_COMMENT:
            comments[action.payload.id].body = action.payload.body;
            return {
                ...state,
                comments: comments
            };
        default:
            return { ...state };
    }
}

export default rootReducer;