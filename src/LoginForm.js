import {
    Card,
    CardBody,
    CardTitle,
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap';
import { useState } from 'react';
import { login } from './actions';
import { useDispatch } from 'react-redux';
import './LoginForm.css';

const LoginForm = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (evt) => {
        setFormData({
            ...formData,
            [evt.target.name]: evt.target.value
        });
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        dispatch(login(formData.email, formData.password));
    }

    return (
        <div className="LoginForm">
            <Card>
                <CardBody>
                    <CardTitle tag="h3">Login</CardTitle>
                </CardBody>
                <CardBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label htmlFor="email">Email</Label>
                            <Input type="text" name="email" placeholder="Email" autoComplete="off" required value={formData.email} onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="password">Password</Label>
                            <Input type="password" name="password" placeholder="Password" autoComplete="off" required value={formData.password} onChange={handleChange} />
                        </FormGroup>
                        <Button type="submit" color="primary" outline>Login</Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}

export default LoginForm;