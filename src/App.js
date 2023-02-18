
import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import "./App.css";
import Posts from "./Posts";
import Form from "react-bootstrap/Form";
import { callAPI } from "./services/API.js";
import { paginate } from "./utils/helper";
import CreatePost from "./components/CreatePost";


import {
  Container,
  Row,
  InputGroup,
  Pagination,
} from "react-bootstrap";


function App() {
  const [nganhName, setNganhName] = useState("");
  const limit = 9;
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState(null);
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleOnChangeInput = (event) => {
    setTimeout(() => {
      setKeyword(event.target.value);
    }, [3001]);
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
              onChange={handleOnChangeInput} type="text" placeholder="Search" />

          </InputGroup>
        </div>
        <Posts
          keyword={keyword}
          onReload={handleReload}
          posts={paginate(data, limit, page)}
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
            Thông tin doanh nghiệp
          </h1>
          <p className="cha3">
            CÔNG TY TNHH THƯƠNG MẠI VÀ DICH VỤ PHÁT TIẾN <br />
            Số đăng ký kinh doanh: 0301049150. <br />
            Đăng ký lần đầu: ngày 10/01/1998. <br />
            Đăng ký thay đổi lần thứ 28: ngày 19/10/2019. <br />
            Cơ quan cấp: Sở Kế Hoạch Và Đầu Tư TP. Hồ Chí Minh. <br />
            Trụ sở: 16 Lữ Gia, P.15, Q.11, Hồ Chí minh. <br />
            Văn phòng: 220 Lý Thường Kiệt, P.14, Q.10, Hồ Chí Minh. <br />
            Thời gian làm việc: từ 08h00 đến 20h00 hằng ngày (trừ dịp tết nguyên đán) <br />
            Điện thoại: (028) 3866-1953 <br />
            Email: info@phattien.com <br />
          </p>
        </div>
        <div className="cha1">
          <h1 className="cha2">
            Giới thiệu & chính sách
          </h1>
          <ul className="cha3">
            Đôi nét về Phát Tiến <br />
            Hệ thống cửa hàng Honda Phát Tiến <br />
            Chính sách thanh toán tại Honda Phát Tiến<br />
            Chính sách bsor mật sản phẩm <br />
            Chính sách bảo mật thông tin khách hàng <br />
            <a href="http://127.0.0.1:5500/02-form-bl.html"> Bình luận của khách hàng</a>
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
            <p id="mxh"> Mạng Xã Hội</p>
          </div>
          <div className="logo1">
            <img src="https://itm-management.vn/wp-content/uploads/2018/09/logo-gov.png" alt="" srcset="" />
          </div>
        </div>
      </div>
      <div className="cha4">
          <p>
            © Bản quyền thuộc về Honda Phát Tiến
          </p>
        </div>
    </Container>
  );
};
export default App;