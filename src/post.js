import { useCallback, useContext } from "react";
import {  Row, Table } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { BsArchive, BsFillBagDashFill,BsFillPlusCircleFill } from "react-icons/bs";
import { callAPI } from "./services/API.js";
import { Link } from "react-router-dom";
import UpdatePost from './Update'
import React, { useState } from "react";
import "./App.css";
import { ACTION } from "./const";
import { CartContext } from "./context";

const Post = ({ post, keyword, onReloadUpdate }) => {
  const [isShowUpdate, setIsShowUpdate] = useState(false);
  const [id, setId] = useState(0);


  const testData = useCallback(() => {
    console.log("Posts here", keyword);
  }, [keyword]);

  const { cartReducer: carts, cartDispatch: dispatch } =
    useContext(CartContext);
  if (post.length === 0) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  return (

    <Row>
      <UpdatePost id={id} isShow={isShowUpdate} handleClose={() => setIsShowUpdate(false)} ReloadUpdate={onReloadUpdate} />
      {post.map((post) => {
        return (
          <Table>
            <thead>
              <tr>
                <th>id</th>
                <th>image</th>
                <th>title</th>
                <th>description</th>
                <th>price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="id">{post.id}</td>
                <td className="image">
                  <img
                    src={post.image || "https://via.placeholder.com/150"} alt="" />
                </td>
                <td className="image"> <Link to={`/post/${post.id}`}> {post.title}</Link></td>
                <td className="mota">{post.description}</td>
                <td >{post.price}</td>
                <td>
                  <BsFillPlusCircleFill
                      onClick={() => {
                        dispatch({
                          type: ACTION.ADD_ITEM,
                          payload: { item: post, },
                        });
                      }} style={{ width: 100 }}
                  />
                </td>
                <td className="icon">
                   <BsArchive
                  onClick={async () => {
                    const response = await callAPI(
                      `/products/${post.id}`, "DELETE"
                    );
                    if (response) {
                      alert("delete thành công");
                    }
                  }}
                  style={{ cursor: "pointer" }} color={"red"}
                />
                  <BsFillBagDashFill onClick={() => {
                    setIsShowUpdate(!isShowUpdate)
                    setId(post.id)
                  }}
                    style={{ cursor: "pointer" }}
                    color={"blue"}
                  />
                  </td>
              </tr>
            </tbody>
          </Table>
        );
      })}
    </Row>
  );
};
export default Post;