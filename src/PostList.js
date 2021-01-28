import PostCard from './PostCard';
import { useSelector } from 'react-redux';
import './PostList.css';

const PostList = () => {
    const posts = useSelector(state => state.posts);
    const postKeys = Object.keys(posts);

    return (
        <div className="PostList">
            {postKeys.map(key => <PostCard key={key} id={key} post={posts[key]} />)}
        </div>
    )
}

export default PostList;