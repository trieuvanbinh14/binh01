

import React, { useState, useEffect} from "react";
import "./App.css";
import Post from "./post";
import Form from "react-bootstrap/Form";
import { callAPI } from "./services/API.js";
import { paginate } from "./utils/helper";
import CreatePost from "./components/CreatePost";

import {
  Container,
  Button,
  Row,
  InputGroup,
  Pagination,
} from "react-bootstrap";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
} from "react-router-dom";

function About() {
  const [nganhName, setNganhName] = useState("");
  const limit = 9;
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState(null);
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);



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
    const data = await callAPI(url, "GET");
    setData(data);
  };
  if (data.length > 0) {
    console.log(paginate(data, limit, 5));
  }

  let items = [];
  for (let number = 1; number <= Math.ceil(data.length / limit); number++) {
    items.push(
      <Pagination.Item
        onClick={() => {
          setPage(number);
        }}
        key={number}
        active={number === page}
      >
        {number}
      </Pagination.Item>
    );
  }
  const handleReload = ({ type, item }) => {
    console.log("item", item);
    switch (type) {
      case "create":
        const newData = [...data];
        setData([item, ...newData]);
        break;
      case "update":
        break;
      case "delete":
        break;
      default:
        new Error("not found type");
    }
  };
  return (
    <Container>
      <Row>
        <div className="button">
          <InputGroup style={{ width: "50%" }} className="mb-2 mt-2">
            <Form.Control
              onChange={handleOnChangeInput}
              type="text"
              placeholder="search"
            />
           
          </InputGroup>
          <div className="buton">
            <Button onClick={() => setIsOpen(!isOpen)} variant="primary">
              create post
            </Button>
          </div>
        </div>
       
        <Post
          keyword={keyword}
          onReload={handleReload}
          post={paginate(data, limit, page)}
        />
        
        <Pagination>{items}</Pagination>
      </Row>
      <CreatePost
        onReload={handleReload}
        isShow={isOpen}
        handleClose={() => setIsOpen(false)}
      />
      <div className="cha">
        <div className="cha1">
          <h1 className="cha2">
            Th??ng tin doanh nghi???p
          </h1>
          <p className="cha3">
            C??NG TY TNHH TH????NG M???I V?? DICH V??? PH??T TI???N <br />
            S??? ????ng k?? kinh doanh: 0301049150. <br />
            ????ng k?? l???n ?????u: ng??y 10/01/1998. <br />
            ????ng k?? thay ?????i l???n th??? 28: ng??y 19/10/2019. <br />
            C?? quan c???p: S??? K??? Ho???ch V?? ?????u T?? TP. H??? Ch?? Minh. <br />
            Tr??? s???: 16 L??? Gia, P.15, Q.11, H??? Ch?? minh. <br />
            V??n ph??ng: 220 L?? Th?????ng Ki???t, P.14, Q.10, H??? Ch?? Minh. <br />
            Th???i gian l??m vi???c: t??? 08h00 ?????n 20h00 h???ng ng??y (tr??? d???p t???t nguy??n ????n) <br />
            ??i???n tho???i: (028) 3866-1953 <br />
            Email: info@phattien.com <br />
          </p>
        </div>
        <div className="cha1">
          <h1 className="cha2">
            Gi???i thi???u & ch??nh s??ch
          </h1>
          <ul className="cha3">
            ????i n??t v??? Ph??t Ti???n <br />
            H??? th???ng c???a h??ng Honda Ph??t Ti???n <br />
            Ch??nh s??ch thanh to??n t???i Honda Ph??t Ti???n<br />
            Ch??nh s??ch bsor m???t s???n ph???m <br />
            Ch??nh s??ch b???o m???t th??ng tin kh??ch h??ng <br />
            <a href="http://127.0.0.1:5500/02-form-bl.html"> B??nh lu???n c???a kh??ch h??ng</a>
          </ul>
        </div>
        <div className="cha1">
          <div className="logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/768px-Facebook_f_logo_%282019%29.svg.png"
              alt="" srcset="" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/768px-Instagram_logo_2016.svg.png"
              alt="" srcset="" />
            <img src="https://cdn.pixabay.com/photo/2016/04/24/14/34/youtube-1349699_960_720.png" alt="" srcset="" />
            <img src="https://inkythuatso.com/uploads/images/2021/09/zalo-logo-inkythuatso-14-15-03-04.jpg" alt=""
              srcset="" />
          </div>
          <div className="chaa1">
            <p id="mxh"> M???ng X?? H???i</p>
          </div>
          <div className="logo1">
            <img src="https://itm-management.vn/wp-content/uploads/2018/09/logo-gov.png" alt="" srcset="" />
          </div>
        </div>
      </div>
      <div className="cha4">
          <p>
            ?? B???n quy???n thu???c v??? Honda Ph??t Ti???n
          </p>
        </div>
    </Container>
  );
}

export default About;
