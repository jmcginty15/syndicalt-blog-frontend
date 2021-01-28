import {
    Card,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button
} from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { removePost } from './actions';
import CommentSection from './CommentSection';
import './PostDetails.css';

const PostDetails = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const post = useSelector(state => state.posts[id]);

    const editPost = () => history.push(`/blog/posts/${id}/edit`);
    const deletePost = () => {
        dispatch(removePost(id));
        history.push('/blog');
    }

    const text = post.body.split('\n');

    return (
        <div className="PostDetails">
            <Card>
                <div className="PostDetails-banner">
                    <img className="PostDetails-banner-img" width="100%" src={post.bannerImage} alt={post.title} />
                </div>
                <CardBody className="PostDetails-titles">
                    <div>
                        <CardTitle tag="h2">{post.title}</CardTitle>
                        <CardSubtitle tag="h4" className="mb-2 text-muted">{post.subtitle}</CardSubtitle>
                    </div>
                    <div className="PostDetails-titles-right">
                        <CardSubtitle className="PostDetails-timestamp" tag="h6"><em>Posted {post.createdAt}</em></CardSubtitle>
                        <CardSubtitle className="PostDetails-timestamp" tag="h6"><em>Updated {post.updatedAt}</em></CardSubtitle>
                        <Button className="PostDetails-button" outline color="primary" size="sm" onClick={editPost}>Edit</Button>
                        <Button className="PostDetails-button" outline color="danger" size="sm" onClick={deletePost}>Delete</Button>
                    </div>
                </CardBody>
                <CardBody>
                    {text.map(p => <CardText>{p}</CardText>)}
                </CardBody>
                <CardBody>
                    <Card>
                        <CommentSection postId={id} />
                    </Card>
                </CardBody>
            </Card>
        </div>
    )
}

export default PostDetails;