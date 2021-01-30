import { Card, CardBody, CardTitle, Button } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './actions';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import './Home.css';

const Home = () => {
    const dispatch = useDispatch();
    const loggedInUser = useSelector(state => state.loggedInUser);

    const handleLogout = () => dispatch(logout());

    return (
        <div className="Home">
            <h1>Welcome to SyndicALT!</h1>
            <h3>The place you come when you get yeeted from Twitter</h3>
            {loggedInUser ? (
                <Card className="Home-card-container">
                    <CardBody>
                        <CardTitle tag="h4">
                            Welcome {loggedInUser.firstName} {loggedInUser.lastName}
                        </CardTitle>
                        <Button color="danger" outline onClick={handleLogout}>Logout</Button>
                    </CardBody>
                </Card>
            ) : (
                    <Card className="Home-card-container">
                        <div className="Home-card">
                            <div className="Home-form-container">
                                <LoginForm />
                            </div>
                            <div className="Home-form-container">
                                <SignupForm />
                            </div>
                        </div>
                    </Card>
                )}
        </div>
    )
}

export default Home;