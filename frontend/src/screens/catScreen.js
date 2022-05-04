import axios from 'axios';
import { useContext, useEffect, useReducer, useState } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { useNavigate, useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Like from '../components/Like';
//import Review from '../components/Review';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';
import Unlike from '../components/Unlike';
import { catsHouse } from '../catsHouse';



const reducer = (state, action) => {
  //const [likeCount, setLikeCount] = useState(0)

  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_SUCCESS':
      return { ...state, cat: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

function CatScreen() {
   const navigate = useNavigate();
  const params = useParams();
  const [isLogIn, setisLogIn] = useState(false);
  const [catLike, setCatLike] = useState(0);
  const [catunLike, setcatunLike] = useState(0);
  const { Cat_id } = params;

  const [{ loading, error, cat }, dispatch] = useReducer(reducer, {
    cat: [],
    loading: true,
    error: '',
  });
  // const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log(localStorage.getItem('userInfo'));
    if (localStorage.getItem('userInfo')) {
      setisLogIn(true);
    } else {
      setisLogIn(false);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/cats/Cat_id/${Cat_id}`);
        setCatLike(result.data.Likes);
        console.log('result2', result.data.Likes);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        //success
        // useState -> catLike, setCatLike
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }

      // setcats(result.data);
    };
    fetchData();
  }, [Cat_id]);

  const likeCountHandler = async () => {
    let Cat_id = 'c1';
    //alert('Liked');
    const result = await axios.get(`/api/cats/cat_like/${Cat_id}`);
    console.log('likeCountHandler', result);
    let ctl = catLike;
    ctl += 1;
    setCatLike(ctl);
    // window.location.reload();
    // send request to back end to like router method
    //if axiose request  success update the ui like coutn
    //if needed add tost message
    // page refresh
  };

  const unlikeCountHandler = async () => {
    let Cat_id = 'c1';
    // alert('UnLiked');
    const result = await axios.get(`/api/cats/cat_unlike/${Cat_id}`);
    console.log('unlikeCountHandler', result);
    let ctul = catunLike;
    ctul += 1;
    setcatunLike(ctul);
    //window.location.reload();
    // send request to back end to Unlike router method
    //if axiose request  success update the ui Unlike coutn
    //if needed add tost message
    // page refresh
    //window.location.reload()
  };

  // const { state, dispatch: ctxDispatch } = useContext(catsHouse);
  //const { wishlist } = state;
  //const addToWishListHandler = async() => {
  // ctxDispatch({ type: 'WISHLIST_ADD_ITEM', payload: { ...cat, quantity: 1 },
  // });
  // const existItem = wishlist.wishlistItems.find((x) => x._id === cat._id);
  //   const quantity = existItem ? existItem.quantity + 1 : 1;
  // const { data } = await axios.get(`/api/cats/${cat._id}`);

  //};
  const { state, dispatch: ctxDispatch } = useContext(catsHouse);
  const { wishlist } = state;
  const addToWishListHandler = async () => {
    const existItem = wishlist.wishlistItems.find((x) => x._id === cat._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/cats/${cat._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Cat is out of stock');
      return;
    }
    ctxDispatch({
      type: 'WISHLIST_ADD_ITEM',
      payload: { ...cat, quantity },
    });
    navigate('/wishlist');
  };
  
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <Row>
        <Col md={6}>
          <img className="img-large" src={cat.image} alt={cat.name}></img>
        </Col>

        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{cat.name}</title>
              </Helmet>
              <h1>{cat.name}</h1>
            </ListGroup.Item>

            <ListGroup.Item>
              <Col>Age : {cat.age} </Col>
            </ListGroup.Item>

            <ListGroup.Item>
              <Col> Gender : {cat.gender}</Col>
            </ListGroup.Item>

            <ListGroup.Item>
              <Col> Description : {cat.description}</Col>
            </ListGroup.Item>

            <ListGroup.Item>
              <Col> Contact No : {cat.contact}</Col>
            </ListGroup.Item>

            <ListGroup.Item>
              <Col> Location : {cat.Geolocation} </Col>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Like>Likes:</Like>
                    <Col>{catLike}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Unlike>unlikes:</Unlike>
                    <Col>{cat.unlikes}</Col>
                  </Row>
                </ListGroup.Item>
                {isLogIn === true ? (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <button
                        onClick={likeCountHandler}
                        className="btn-primary1"
                      >
                        Like 👍
                      </button>
                      <button
                        onClick={unlikeCountHandler}
                        className="btn-primary2"
                      >
                        Dislike 👎
                      </button>

                      <Button onClick={addToWishListHandler} variant="primary">
                        Add to Wishlist
                      </Button>
                    </div>
                  </ListGroup.Item>
                ) : (
                  <></>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row> 
        <br />
        <div className="mapouter">
          <div className="gmap_canvas">
            <iframe
              width="100%"
              height="500"
              id="gmap_canvas"
              src="https://maps.google.com/maps?q=piliyandala&t=&z=13&ie=UTF8&iwloc=&output=embed"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
              title="aaaa"
            ></iframe>
            {/* <a href="https://fmovies-online.net"></a> */}
            <br />
          </div>
        </div>
        <br />
      </div>
  );
}
export default CatScreen;
