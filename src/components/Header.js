import "./header.scss";
import { Link, useNavigate } from "react-router-dom";
import { Button, Nav } from "react-bootstrap";
import { ThemeContext } from "../context";
import { useContext } from "react";
import About from "../About";
import Cart from "../cart";
// import { callAPI } from "./services/API";
import Form from "react-bootstrap/Form";
import React, { useState, useEffect } from "react";

import {
    Row,
    InputGroup,
} from "react-bootstrap";

const Header = ({ auth }) => {
    const Navigate = useNavigate();
    const themeValue = useContext(ThemeContext);
    const [keyword, setKeyword] = useState(null);
    const [data, setData] = useState([]);
    const renderLogout = () => {
        return (
            <div>
                <Button style={{ color: themeValue.theme.color }} variant="link" onClick={Logout} >{auth.username} : logout</Button>
            </div>
        );
    };
    const Logout = () => {
        localStorage.removeItem("user");
        Navigate("/login");
    };
    const handleOnChangeInput = (event) => {
        setTimeout(() => {
            setKeyword(event.target.value);
        }, [3000]);
    };
    useEffect(() => {
        fetchBlog();
    }, [keyword]);

    const fetchBlog = async () => {
        let url = "/products?_sort=createdAt&_order=desc";
        if (keyword) {
            url = `/products?q=${keyword}`;
        }
    };
    return (

        <Nav className="navigation" activeKey="/home">
            <div class="menu">
                <ul class="menu-cap-1">
                    <li class="menu-cap1">
                        <Link to="/" className="dk1" style={{ marginRight: 5 }} >Home</Link>
                    </li>
                    <li class="menu-cap1">
                        <Link to="/About" className="dk1" style={{ marginRight: 5 }}>About</Link>
                    </li>
                    <li class="menu-cap1">
                        <Link to="/Register" className="dk" style={{ marginRight: 5 }}>Register</Link>
                    </li>
                    <li class="menu-cap1">
                        <Link to="/login" className="dk" style={{ marginRight: 5 }}>Login</Link>
                    </li>
                    <li class="menu-cap1">
                        <Link to="/cart" className="dk" style={{ marginRight: 5 }}>Cart</Link>
                    </li>
                    <li class="menu-cap1">
                            {auth && renderLogout()}
                    </li>
                </ul>
            </div>
        </Nav>

    );
};

export default Header;
