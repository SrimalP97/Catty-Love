import { useContext } from 'react';
import { catsHouse } from '../catsHouse';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MessageBox from '../components/MessageBox';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export default function WishListScreen() {
 // const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(catsHouse);
  const {
    wishlist: { wishlistItems },
  } = state;

  const removeItemHandler = (item) => {
    ctxDispatch({ type: 'WISHLIST_REMOVE_ITEM', payload: item });
  };

  return (
    <div>
      <Helmet>
        <title>WishList</title>
      </Helmet>
      <h1>WishList</h1>
      <Row>
        <Col md={8}>
          {wishlistItems.length === 0 ? (
            <MessageBox>
              WishList is empty. <Link to="/">Go To Home</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {wishlistItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      ></img>{' '}
                      <Link to={`/cat/${item._id}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>{item.contact}</Col>
                      {}
                    <Col md={3}>{item.Geolocation}</Col>
                    <Col md={2}>
                      <Button
                        onClick={() => removeItemHandler(item)}
                        variant="light"
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        {}
      </Row>
    </div>
  );
}
