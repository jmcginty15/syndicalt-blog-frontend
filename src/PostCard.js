import {
    Card,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle
} from 'reactstrap';
import { Link } from 'react-router-dom';

const PostCard = ({ id, post }) => {
    return (
        <div className="PostCard">
            <Card>
                <CardBody>
                    <CardTitle tag="h5"><Link to={`/blog/posts/${id}`}>{post.title}</Link></CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">{post.subtitle}</CardSubtitle>
                </CardBody>
                <img width="100%" src={post.bannerImage} alt={post.title} />
                <CardBody>
                    <CardText>{post.description}</CardText>
                </CardBody>
            </Card>
        </div>
    )
}

export default PostCard;