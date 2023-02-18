import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { callAPI } from "../services/API.js";
const CreatePost = ({ isShow, handleClose, onReloadCreate }) => {
  const [post, setPost] = useState({});
  const OnchangeInput = (event) => {
    //todo: validation data
    setPost({ ...post, [event.target.id]: event.target.value });

  };

  const onHandelSubmit = async () => {
    const data = await callAPI(`/products`,"POST", { ...post, createdAt: new Date(), });

    if (data) {
      alert("thêm post thành công");
      handleClose()
      onReloadCreate({ type: "create", item: data });
    }
  };
  console.log("post", post);
  return (
    <Modal show={isShow} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Create post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>id</Form.Label>
            <Form.Control
              onChange={OnchangeInput} name="id" type="text" placeholder="Enter id"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>image</Form.Label>
            <Form.Control name="image" type="text" placeholder="url image"
              onChange={OnchangeInput}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>title</Form.Label>
            <Form.Control name="image" type="text" placeholder="Enter tỉle"
              onChange={OnchangeInput}
              rows={3}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>description</Form.Label>
            <Form.Control name="description" as="textarea" placeholder="Description"
              onChange={OnchangeInput}
              rows={3}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>price</Form.Label>
            <Form.Control name="image" type="text" placeholder="price"
              onChange={OnchangeInput}
              rows={3}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onHandelSubmit}>
          Save post
        </Button>
      </Modal.Footer>
    </Modal>


  );
};
export default CreatePost;
