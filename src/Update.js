import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { callAPI } from "./services/API";
const UpdatePost = ({ id, isShow, handleClose, ReloadUpdate }) => {
    const [post, setPost] = useState({});
    const OnchangeInput = (event) => {
        //todo: validation data
        setPost({ ...post, [event.target.title]: event.target.value });
    };

    const onHandelSubmit = async () => {
        const data = await callAPI(`/products/${id}`, "PUT", post);
        if(data){
            alert("Sửa post thành công");
            handleClose()
            ReloadUpdate()
        }
    };
    return (
        <Modal show={isShow} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Update post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>id</Form.Label>
            <Form.Control
              onChange={OnchangeInput} name="id" type="text" placeholder="Enter title"
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
            <Form.Control name="image" type="text" placeholder="url image"
              onChange={OnchangeInput}
              rows={3}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>description</Form.Label>
            <Form.Control name="description" as="textarea"placeholder="price"
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
                    Update post
                </Button>
            </Modal.Footer>
        </Modal>


    );
};
export default UpdatePost;
