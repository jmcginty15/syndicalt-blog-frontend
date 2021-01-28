import { CardTitle, CardBody } from 'reactstrap';
import { useSelector } from 'react-redux';
import Comment from './Comment';
import CommentForm from './CommentForm';

const CommentSection = ({ postId }) => {
    const comments = useSelector(state => {
        const allComments = state.comments;
        const postComments = {}
        for (let key in allComments) if (allComments[key].postId === +postId) postComments[key] = allComments[key];
        return postComments;
    });
    const keys = Object.keys(comments);

    return (
        <div className="CommentSection">
            <CardBody>
                <CardTitle tag="h3">Comments</CardTitle>
            </CardBody>
            {keys.map(key => <Comment key={key} id={key} comment={comments[key]} />)}
            <CommentForm postId={postId} />
        </div>
    )
}

export default CommentSection;