import { useCallback, useContext } from "react";
import { Col, Row, Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { callAPI } from "./services/API.js";
import { Link } from "react-router-dom";
import UpdatePost from './Update'
import React, { useState } from "react";
import "./App.css";
import { ACTION } from "./const";
import { CartContext } from "./context";


const Posts = ({ posts, keyword, onReload, onReloadUpdate }) => {
  const [isShowUpdate, setIsShowUpdate] = useState(false);
  const [id, setId] = useState(0);
  const [post, setpost] = useState([]);
  const [Loading, setloading] = useState(false);  

  const testData = useCallback(() => {
    console.log("Posts here", keyword);
  }, [keyword]);

  const { cartReducer: carts, cartDispatch: dispatch } =
    useContext(CartContext);
  if (posts.length === 0) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  const SortASC = async () => {
    try {
      const data = await callAPI(`/products?sortBy=name&order=asc`, "GET");
      setpost(data)
      setloading(false)
    } catch (error) {
      console.error(error);
    }
  }

  const SortDESC = async () => {
    try {
      const data = await callAPI(`/products?sortBy=name&order=desc`, "GET");
      setpost(data)
      setloading(false)
    } catch (error) {
      console.error(error);
    }
  }


  return (

    <Row>
        <div className="sort" >
              <Button className="sorts" onClick={SortASC}>sort up</Button>
              <Button className="sorts" onClick={SortDESC}>sort down</Button>
            </div>
      <UpdatePost id={id} isShow={isShowUpdate} handleClose={() => setIsShowUpdate(false)} ReloadUpdate={onReloadUpdate} />
      {posts.map((post) => {

        return (
          <Col xs={12} md={4} key={post.id} className="post">

            <div className="img">
              <img
                src={post.image || "https://via.placeholder.com/150"} alt="" />
            </div>
            <Button
              onClick={() => {
                dispatch({
                  type: ACTION.ADD_ITEM,
                  payload: { item: post, },
                });
              }}
              style={{ width: 60, height: 40 }}> Mua
            </Button>
            <div>
              <p style={{ fontWeight: "bold", marginBottom: 5 }}>
                <Link to={`/post/${post.id}`}> {post.title}</Link>
              </p>

              <p>{post.description}</p>
              <p>$ {post.price}</p>
            </div>
          </Col>
        );
      })}
    </Row>
  );
};
export default Posts;
