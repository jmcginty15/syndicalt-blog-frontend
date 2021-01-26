import {
    Button,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './NewPost.css';

const NewPost = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        body: ''
    });
    const history = useHistory();

    const submitPost = (evt) => {
        evt.preventDefault();
        console.log('submitted');
        history.push('/blog');
    }

    const cancelPost = () => history.push('/blog');

    const handleChange = (evt) => {
        const field = evt.target.name;
        const value = evt.target.value;
        const newFormData = {
            ...formData,
            [field]: value
        };
        setFormData(newFormData);
    }

    return (
        <div className="NewPost">
            <Form onSubmit={submitPost}>
                <FormGroup>
                    <Label for="title">Title</Label>
                    <Input type="text" name="title" autoComplete="off" placeholder="Post title" value={formData.title} onChange={handleChange} required />
                </FormGroup>
                <FormGroup>
                    <Label for="description">Description</Label>
                    <Input type="text" name="description" autoComplete="off" placeholder="Post description" value={formData.description} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="body">Body</Label>
                    <Input type="textarea" name="body" autoComplete="off" placeholder="Post content" value={formData.body} onChange={handleChange} />
                </FormGroup>
                <Button type="submit" color="primary">Submit</Button>
                <Button type="button" color="danger" id="cancel-button" onClick={cancelPost}>Cancel</Button>
            </Form>
        </div>
    )
}

export default NewPost;