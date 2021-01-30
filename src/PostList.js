import PostCard from './PostCard';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadPosts } from './actions';
import './PostList.css';

const PostList = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts);

    useEffect(() => {
        dispatch(loadPosts());
    }, [dispatch]);

    return (
        <div className="PostList">
            {posts.map(post => <PostCard key={post.id} post={post} />)}
        </div>
    )
}

export default PostList;