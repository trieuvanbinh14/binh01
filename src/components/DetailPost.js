import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { callAPI } from "../services/API.js";
import { useParams } from "react-router-dom";
const PostDetail = (props) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    fetchDetail();
  }, []);

  const fetchDetail = async () => {
    console.log("Fetching detail");
    const data = await callAPI(`/products/${id}`, "GET");
    if (data) {
      console.log(data);
      setPost(data);
      setLoading(false);
    }
  };

  if (loading) {
    <Row>
      <h1>loading</h1>
    </Row>;
  }
  if (post) {
    return (
      <Row>

        <Col xs={12} md={3} className="post">
          <div className="detail">  
            <img
              src={`${post.image || "https://via.placeholder.com/150"} `}
              alt=""
            />
            <div>
              <p style={{ fontWeight: "bold", marginBottom: 5 }}>{post.title}</p>
              <p>{post.description}</p>
            </div>
          </div>
        </Col>
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

      </Row>
    );
  }
};
export default PostDetail;
