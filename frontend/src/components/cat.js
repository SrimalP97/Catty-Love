import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Review from './Review';
import Like from './Like';

function Cat(props) {
  const { cat } = props;

  return (
    <Card>
      <Link to={`/cat/${cat.Cat_id}`}>
        <img src={cat.image} className="card-img-top" alt={cat.name} />
      </Link>

      <Card.Body>
        <Link to={`/cat/${cat.Cat_id}`}>
          <Card.Title>{cat.name}</Card.Title>
        </Link>

        <Like Likes={cat.Likes} />
        <Review numReviews={cat.numReviews} />
        <div className="col  mb-2">
          <div className="card h-100"></div>
        </div>
        <Card.Text>• {cat.age}</Card.Text>
        <Card.Text>• {cat.gender}</Card.Text>
        <Card.Text>• {cat.description}</Card.Text>
        <Button> Add to wishlist</Button>
      </Card.Body>
    </Card>
  );
}
export default Cat;
