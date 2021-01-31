import PostCard from './PostCard';
import Unauthorized from './Unauthorized';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadPosts } from './actions';
import './PostList.css';

const PostList = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts);
    const loggedInUser = useSelector(state => state.loggedInUser);

    useEffect(() => {
        dispatch(loadPosts());
    }, [dispatch]);

    if (loggedInUser) return (
        <div className="PostList">
            {posts.map(post => <PostCard key={post.id} post={post} />)}
        </div>
    )
    else return <Unauthorized />
}

export default PostList;