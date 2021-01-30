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
    const [shiftPressed, setShiftPressed] = useState(false);
    const [commentText, setCommentText] = useState('');
    const dispatch = useDispatch();

    const postComment = () => {
        const newComment = {
            name: 'Logged in username',
            body: commentText,
            postId: postId,
        };
        dispatch(addComment(newComment));
        setCommentText('');
    }
    const handleChange = (evt) => {
        if (evt.nativeEvent.inputType !== 'insertLineBreak') setCommentText(evt.target.value);
        else if (shiftPressed) setCommentText(`${commentText}\n`);
    }
    const shiftDown = (evt) => { if (evt.key === 'Shift') setShiftPressed(true) }
    const shiftUp = (evt) => { if (evt.key === 'Shift') setShiftPressed(false) }
    const enterComment = (evt) => { if (!shiftPressed && (evt.key === 'Enter' || evt.key === 'Return')) postComment() }

    return (
        <div className="CommentForm" onKeyDown={shiftDown} onKeyUp={shiftUp}>
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
                            <Input type="textarea" name="commentText" autoComplete="off" placeholder="Add a comment" value={commentText} onChange={handleChange} onKeyPress={enterComment} />
                        </CardText>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

export default CommentForm;