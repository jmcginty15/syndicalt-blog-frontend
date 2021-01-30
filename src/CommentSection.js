import { CardTitle, CardBody } from 'reactstrap';
import Comment from './Comment';
import CommentForm from './CommentForm';

const CommentSection = ({ comments, postId }) => {
    return (
        <div className="CommentSection">
            <CardBody>
                <CardTitle tag="h3">Comments</CardTitle>
            </CardBody>
            {comments.map(comment => <Comment key={comment.id} comment={comment} />)}
            <CommentForm postId={postId} />
        </div>
    )
}

export default CommentSection;