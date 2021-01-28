import {
    Card,
    CardBody,
    CardSubtitle,
    CardText,
    Button,
    Input
} from 'reactstrap';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from './actions';
import './CommentForm.css';

const CommentForm = ({ postId }) => {
    const [commentText, setCommentText] = useState('');
    const dispatch = useDispatch();

    const postComment = () => {
        const newComment = {
            body: commentText,
            postId: +postId,
            userId: 69,
            createdAt: '42069',
            updatedAt: '42069'
        };
        dispatch(addComment(newComment));
        setCommentText('');
    }
    const handleChange = (evt) => setCommentText(evt.target.value);

    return (
        <div className="CommentForm">
            <Card>
                <CardBody>
                    <div className="CommentForm-titles">
                        <div>
                            <CardSubtitle tag="h6">Logged in username</CardSubtitle>
                        </div>
                        <div className="CommentForm-button-container">
                            <Button className="CommentForm-button" outline color="primary" size="sm" onClick={postComment}>Post</Button>
                        </div>
                    </div>
                    <div className="CommentForm-input">
                        <CardText>
                            <Input type="textarea" name="commentText" autoComplete="off" placeholder="Add a comment" value={commentText} onChange={handleChange} />
                        </CardText>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

export default CommentForm;