import {
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText,
    Button,
    Input
} from 'reactstrap';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeComment, editComment } from './actions';
import { parseDate } from './helpers';
import './Comment.css';

const Comment = ({ comment }) => {
    const [shiftPressed, setShiftPressed] = useState(false);
    const [editing, setEditing] = useState(false);
    const [commentText, setCommentText] = useState(comment.body);
    const dispatch = useDispatch();
    const loggedInUser = useSelector(state => state.loggedInUser);

    const startEdit = () => setEditing(true);
    const cancelEdit = () => {
        setCommentText(comment.body);
        setEditing(false);
    }
    const saveEdit = () => {
        dispatch(editComment(comment._id, commentText, loggedInUser.token));
        setEditing(false);
    }
    const deleteComment = () => dispatch(removeComment(comment._id, loggedInUser.token));
    const handleChange = (evt) => {
        if (evt.nativeEvent.inputType !== 'insertLineBreak') setCommentText(evt.target.value);
        else if (shiftPressed) setCommentText(`${commentText}\n`);
    }
    const shiftDown = (evt) => { if (evt.key === 'Shift') setShiftPressed(true) }
    const shiftUp = (evt) => { if (evt.key === 'Shift') setShiftPressed(false) }
    const enterComment = (evt) => { if (!shiftPressed && (evt.key === 'Enter' || evt.key === 'Return')) saveEdit() }

    const text = comment.body.split('\n');
    const userName = comment.name.split(' ');

    return (
        <div className="Comment" onKeyDown={shiftDown} onKeyUp={shiftUp}>
            <Card>
                <CardBody>
                    <div className="Comment-titles">
                        <div>
                            <CardTitle tag="h5"><Link to={`/users/${userName[0]}-${userName[1]}`}>{comment.name}</Link></CardTitle>
                        </div>
                        {editing ? (
                            <div className="Comment-button-container">
                                <Button className="Comment-button" outline color="primary" size="sm" onClick={saveEdit}>Save</Button>
                                <Button className="Comment-button" outline color="danger" size="sm" onClick={cancelEdit}>Cancel</Button>
                            </div>
                        ) : (
                                <div className="Comment-button-container">
                                    {`${loggedInUser.firstName} ${loggedInUser.lastName}` === comment.name ? <Button className="Comment-button" outline color="primary" size="sm" onClick={startEdit}>Edit</Button> : null}
                                    {`${loggedInUser.firstName} ${loggedInUser.lastName}` === comment.name ? <Button className="Comment-button" outline color="danger" size="sm" onClick={deleteComment}>Delete</Button> : null}
                                </div>
                            )}
                        <div className="Comment-subtitles">
                            <CardSubtitle className="Comment-timestamp" tag="h6"><em>Posted {parseDate(comment.createdAt)}</em></CardSubtitle>
                            <CardSubtitle className="Comment-timestamp" tag="h6"><em>Updated {parseDate(comment.updatedAt)}</em></CardSubtitle>
                        </div>
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