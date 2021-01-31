import {
    Card,
    CardBody,
    CardTitle,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Alert
} from 'reactstrap';
import { useState } from 'react';
import { login } from './actions';
import { useDispatch, useSelector } from 'react-redux';
import './LoginForm.css';
import axios from 'axios';

const LoginForm = () => {
    const dispatch = useDispatch();
    const loginError = useSelector(state => state.loginError);
    const [noEmail, setNoEmail] = useState(false);
    const [resetEmail, setResetEmail] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
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
        setNoEmail(false);
        setResetEmail(null);
        dispatch(login(formData.email, formData.password));
    }

    const resetPassword = () => {
        if (!formData.email) setNoEmail(true);
        else {
            axios.post('http://localhost:3001/api/v1/auth/forgotpassword', { email: formData.email });
            setNoEmail(false);
            setResetEmail(formData.email);
        }
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
                        {loginError ? <Alert color="danger">Incorrect email or password!</Alert> : null}
                        {noEmail ? <Alert color="warning">Please enter an email to reset your password</Alert> : null}
                        {resetEmail ? <Alert color="info">If {resetEmail} exists in our database, an email will be sent with a password reset link</Alert> : null}
                        <Button type="submit" color="primary" outline>Login</Button>
                        <Button id="LoginForm-button" type="button" color="secondary" outline onClick={resetPassword}>Forgot password</Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}

export default LoginForm;