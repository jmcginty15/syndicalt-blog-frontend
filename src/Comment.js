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
import { removeComment, editComment } from './actions';
import './Comment.css';

const Comment = ({ id, comment }) => {
    const [shiftPressed, setShiftPressed] = useState(false);
    const [editing, setEditing] = useState(false);
    const [commentText, setCommentText] = useState(comment.body);
    const dispatch = useDispatch();

    const startEdit = () => setEditing(true);
    const cancelEdit = () => {
        setCommentText(comment.body);
        setEditing(false);
    }
    const saveEdit = () => {
        dispatch(editComment(id, commentText));
        setEditing(false);
    }
    const deleteComment = () => dispatch(removeComment(id));
    const handleChange = (evt) => {
        if (evt.nativeEvent.inputType !== 'insertLineBreak') setCommentText(evt.target.value);
        else if (shiftPressed) setCommentText(`${commentText}\n`);
    }
    const shiftDown = (evt) => { if (evt.key === 'Shift') setShiftPressed(true) }
    const shiftUp = (evt) => { if (evt.key === 'Shift') setShiftPressed(false) }
    const enterComment = (evt) => { if (!shiftPressed && (evt.key === 'Enter' || evt.key === 'Return')) saveEdit() }

    const text = comment.body.split('\n');

    return (
        <div className="Comment" onKeyDown={shiftDown} onKeyUp={shiftUp}>
            <Card>
                <CardBody>
                    <div className="Comment-titles">
                        <div>
                            <CardSubtitle tag="h6">User id {comment.userId}</CardSubtitle>
                        </div>
                        {editing ? (
                            <div className="Comment-button-container">
                                <Button className="Comment-button" outline color="primary" size="sm" onClick={saveEdit}>Save</Button>
                                <Button className="Comment-button" outline color="danger" size="sm" onClick={cancelEdit}>Cancel</Button>
                            </div>
                        ) : (
                                <div className="Comment-button-container">
                                    <Button className="Comment-button" outline color="primary" size="sm" onClick={startEdit}>Edit</Button>
                                    <Button className="Comment-button" outline color="danger" size="sm" onClick={deleteComment}>Delete</Button>
                                </div>
                            )}
                    </div>
                    {editing ? (
                        <div className="Comment-input">
                            <CardText>
                                <Input type="textarea" name="commentText" autoComplete="off" placeholder="Add a comment" value={commentText} onChange={handleChange} onKeyPress={enterComment} />
                            </CardText>
                        </div>
                    ) : (
                            <div>
                                {text.map(p => <CardText>{p}</CardText>)}
                            </div>
                        )}
                </CardBody>
            </Card>
        </div>
    )
}

export default Comment;