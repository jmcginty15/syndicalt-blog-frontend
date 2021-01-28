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
    const [editing, setEditing] = useState(false);
    const [commentText, setCommentText] = useState(comment.body);
    const dispatch = useDispatch();

    const startEdit = () => setEditing(true);
    const cancelEdit = () => setEditing(false);
    const saveEdit = () => {
        dispatch(editComment(id, commentText));
        setEditing(false);
    }
    const deleteComment = () => dispatch(removeComment(id));
    const handleChange = (evt) => setCommentText(evt.target.value);

    return (
        <div className="Comment">
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
                                <Input type="textarea" name="commentText" autoComplete="off" placeholder="Add a comment" value={commentText} onChange={handleChange} />
                            </CardText>
                        </div>
                    ) : (
                            <div>
                                <CardText>{comment.body}</CardText>
                            </div>
                        )}
                </CardBody>
            </Card>
        </div>
    )
}

export default Comment;