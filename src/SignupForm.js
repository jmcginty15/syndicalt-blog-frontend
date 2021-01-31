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
import { registerUser } from './actions';
import { useDispatch, useSelector } from 'react-redux';
import './LoginForm.css';

const SignupForm = () => {
    const dispatch = useDispatch();
    const registerError = useSelector(state => state.registerError);
    const [mismatch, setMismatch] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (evt) => {
        setFormData({
            ...formData,
            [evt.target.name]: evt.target.value
        });
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (formData.password === formData.confirmPassword) {
            setMismatch(false);
            const user = {
                ...formData,
                role: 'guest'
            };
            dispatch(registerUser(user));
        } else setMismatch(true);
    }

    return (
        <div className="SignupForm">
            <Card>
                <CardBody>
                    <CardTitle tag="h3">Sign Up</CardTitle>
                </CardBody>
                <CardBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label htmlFor="firstName">First name:</Label>
                            <Input type="text" name="firstName" placeholder="First name" autoComplete="off" required value={formData.firstName} onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="lastName">Last name:</Label>
                            <Input type="text" name="lastName" placeholder="Last name" autoComplete="off" required value={formData.lastName} onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="email">Email:</Label>
                            <Input type="email" name="email" placeholder="Email" autoComplete="off" required value={formData.email} onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="password">Password</Label>
                            <Input type="password" name="password" placeholder="Password" autoComplete="off" required value={formData.password} onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="confirmPassword">Confirm password</Label>
                            <Input type="password" name="confirmPassword" placeholder="Confirm password" autoComplete="off" required value={formData.confirmPassword} onChange={handleChange} />
                        </FormGroup>
                        {mismatch ? <Alert color="danger">Passwords don't match!</Alert> : null}
                        {registerError ? <Alert color="danger">{registerError}</Alert> : null}
                        <Button type="submit" color="primary" outline>Sign Up</Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}

export default SignupForm;