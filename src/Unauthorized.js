import { Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import './Unauthorized.css';

const Unauthorized = () => {
    const history = useHistory();
    const goHome = () => history.push('/');

    return (
        <div className="Unauthorized">
            <h1>Unauthorized!</h1>
            <h3>You must be logged in to access that page</h3>
            <Button color="primary" outline onClick={goHome}>Back to home</Button>
        </div>
    )
}

export default Unauthorized;