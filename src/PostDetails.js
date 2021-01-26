import { useParams } from 'react-router-dom';

const PostDetails = () => {
    const { id } = useParams();

    return (
        <div className="PostList">
            <h1>{id}</h1>
        </div>
    )
}

export default PostDetails;