import {
    Button,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addPost, editPost } from './actions';
import { findItem } from './helpers';
import Unauthorized from './Unauthorized';
import './PostForm.css';

const PostForm = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const post = useSelector(state => findItem(id, state.posts));
    const loggedInUser = useSelector(state => state.loggedInUser);

    const [formData, setFormData] = useState({
        title: post ? post.title : '',
        subtitle: post ? post.subtitle : '',
        description: post ? post.description : '',
        body: post ? post.body : ''
    });
    const history = useHistory();

    const submitPost = (evt) => {
        evt.preventDefault();
        if (post) {
            dispatch(editPost(id, {
                ...formData,
                userId: loggedInUser._id,
                bannerImage: 'https://blog.apastyle.org/.a/6a01157041f4e3970b01b7c82eb758970b-320wi'
            }, loggedInUser.token));
            history.push(`/blog/posts/${id}`);
        } else {
            dispatch(addPost({
                ...formData,
                userId: loggedInUser._id,
                bannerImage: 'https://blog.apastyle.org/.a/6a01157041f4e3970b01b7c82eb758970b-320wi'
            }, loggedInUser.token));
            history.push('/blog');
        }
    }
    const cancelPost = () => post ? history.push(`/blog/posts/${id}`) : history.push('/blog');
    const handleChange = (evt) => {
        const field = evt.target.name;
        let value = evt.target.value;
        if (field === 'body' && evt.nativeEvent.inputType === 'insertNewLine') value = `${formData.body}\n`;
        const newFormData = {
            ...formData,
            [field]: value
        };
        setFormData(newFormData);
    }

    if (loggedInUser) return (
        <div className="PostForm">
            <Form onSubmit={submitPost}>
                <FormGroup>
                    <Label for="title">Title</Label>
                    <Input type="text" name="title" autoComplete="off" placeholder="Post title" value={formData.title} onChange={handleChange} required />
                </FormGroup>
                <FormGroup>
                    <Label for="subtitle">Subtitle</Label>
                    <Input type="text" name="subtitle" autoComplete="off" placeholder="Post subtitle" value={formData.subtitle} onChange={handleChange} required />
                </FormGroup>
                <FormGroup>
                    <Label for="description">Description</Label>
                    <Input type="text" name="description" autoComplete="off" placeholder="Post description" value={formData.description} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="body">Body</Label>
                    <Input type="textarea" name="body" autoComplete="off" placeholder="Post content" value={formData.body} onChange={handleChange} />
                </FormGroup>
                <Button type="submit" color="primary" outline>{post ? 'Save' : 'Submit'}</Button>
                <Button type="button" color="danger" outline id="cancel-button" onClick={cancelPost}>Cancel</Button>
            </Form>
        </div>
    )
    else return <Unauthorized />
}

export default PostForm;