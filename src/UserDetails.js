import { useParams } from 'react-router-dom';
import { parseName } from './helpers';
import './UserDetails.css';

const UserDetails = () => {
    const name = parseName(useParams());

    return (
        <div className="UserDetails">
            <h1>{name.first} {name.last}</h1>
            <h3>Future user details page</h3>
        </div>
    )
}

export default UserDetails;