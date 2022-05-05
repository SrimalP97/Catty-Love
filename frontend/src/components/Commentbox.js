import React, { useEffect, useState } from 'react';
//import StylishButton from "../stylishButton/StylishButton";
import axios from 'axios';
import { APIURI } from '../configur';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import jwt_decode from 'jwt-decode';

function Commentbox(props) {
  console.log('cat comment props', props);
  const [ setProssComment] = useState([]);
  const catId = props.catId;
  const [addecomment, setAddecomment] = useState('');

  const config = {
    header: {
      'Content-Type': 'application/json',
    },
  };

  useEffect(() => {
    if (props.comentObject != null || props.comentObject !== undefined) {
      setProssComment();
    }
  }, []);
  const addCommentHandler = async (e) => {
    try {
      if (window.confirm('Are you sure !')) {
        if (
          localStorage.getItem('authToken') &&
          localStorage.getItem('currentSessionUserID')
        ) {
          let userId = localStorage.getItem('currentSessionUserID');
          let userName = localStorage.getItem('currentSessionUsename');
          console.log('userId', userId);
          console.log('catId', catId);
          console.log('userName', userName);
          console.log('addecomment', addecomment);

          const result = await axios.post(
            `${APIURI}/commnet/${catId}`,
            {
              userId,
              catId,
              userName,
              comment: addecomment,
            },
            config
          );
          console.log('result', result);
          if (result.data.status === 'OK') {
            toast.success('Successfull', {
              position: 'top-right',
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            debugger;
            props.comentObject.push({
              userId,
              catId,
              userName,
              comment: addecomment,
              commentedOn: Date.now,
            });
          } else if (result.data.status === 'error') {
            toast.success(result.data.error, {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        }
      }
    } catch (error) {
      toast.error('Somthing wrong', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(error);
    }
  };
  return (
    <div>
      <div className="container mt-5 ">
        <div className="d-flex justify-content-center row">
          <div className="col-md-8 shadow-sm p-3 mb-5 bg-white rounded">
            <div className="d-flex flex-column comment-section">
              {props.comentObject &&
                props.comentObject.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="bg-white  shadow p-3 mb-5 bg-white rounded"
                    >
                      <div className="d-flex flex-row user-info">
                        <img
                          className="rounded-circle"
                          src="https://i.imgur.com/RpzrMR2.jpg"
                          width="40"
                          alt=""
                        />
                        <div className="d-flex flex-column justify-content-start ml-2">
                          <span className="d-block font-weight-bold name">
                            {item.userName}
                          </span>
                          <span className="date text-black-50">
                            {item.commentedOn}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="comment-text">{item.comment}</p>
                      </div>
                    </div>
                  );
                })}
              <div className="bg-white">
                <div className="d-flex flex-row fs-12">
                  {/* <div className="like p-2 cursor">
                    <i className="fa fa-thumbs-o-up"></i>
                    <span className="ml-1">Like</span>
                  </div> */}
                  <div className="like p-2 cursor">
                    <i className="fa fa-commenting-o"></i>
                    <span className="ml-1">Comment</span>
                  </div>
                  {/* <div className="like p-2 cursor">
                    <i className="fa fa-share"></i>
                    <span className="ml-1">Share</span>
                  </div> */}
                </div>
              </div>
              <div className="bg-light p-2 mb-5">
                <div className="d-flex flex-row align-items-start">
                  <img
                    className="rounded-circle"
                    src="https://i.imgur.com/RpzrMR2.jpg"
                    width="40"
                    alt=""
                  />
                  <textarea
                    className="form-control ml-1 shadow-none textarea"
                    onChange={(e) => setAddecomment(e.target.value)}
                  ></textarea>
                </div>
                <div className="mt-2 text-right">
                  <button
                    className="btncl fourth"
                    onClick={(e) => addCommentHandler(e)}
                  >
                    Post Comment
                  </button>
                  <button className="btncl fourth">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Commentbox;
