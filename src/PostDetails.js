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
import { useEffect } from 'react';
import { removePost, loadPost, clearCurrentPost } from './actions';
import CommentSection from './CommentSection';
import Unauthorized from './Unauthorized';
import { parseDate } from './helpers';
import './PostDetails.css';

const PostDetails = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const post = useSelector(state => state.currentPost);
    const loggedInUser = useSelector(state => state.loggedInUser);

    useEffect(() => {
        dispatch(loadPost(id));
        return () => dispatch(clearCurrentPost());
    }, [dispatch, id]);

    const editPost = () => history.push(`/blog/posts/${id}/edit`);
    const deletePost = () => {
        dispatch(removePost(id, loggedInUser.token));
        history.push('/blog');
    }

    const text = post ? post.body.split('\n') : [];

    if (loggedInUser) return (
        <div className="PostDetails">
            {post ? (
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
                            <CardSubtitle className="PostDetails-timestamp" tag="h6"><em>Posted {parseDate(post.createdAt)}</em></CardSubtitle>
                            <CardSubtitle className="PostDetails-timestamp" tag="h6"><em>Updated {parseDate(post.updatedAt)}</em></CardSubtitle>
                            {loggedInUser._id === post.user ? <Button className="PostDetails-button" outline color="primary" size="sm" onClick={editPost}>Edit</Button> : null}
                            {loggedInUser._id === post.user ? <Button className="PostDetails-button" outline color="danger" size="sm" onClick={deletePost}>Delete</Button> : null}
                        </div>
                    </CardBody>
                    <CardBody>
                        {text.map((p, i) => <CardText key={i}>{p}</CardText>)}
                    </CardBody>
                    <CardBody>
                        <Card>
                            <CommentSection comments={post.comments} postId={post.id} />
                        </Card>
                    </CardBody>
                </Card>
            ) : null}
        </div>
    )
    else return <Unauthorized />
}

export default PostDetails;