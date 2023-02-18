import Form from "react-bootstrap/Form";
import { Button, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  username: yup.string().required("Username không được trống"),
  email: yup.string().email().required("Email không được bỏ trống"),
  password: yup.string().required("mật khẩu phải lớn hơn 6 kí tự").min(6 ),
  confirmPassword: yup.string().oneOf([yup.ref("password")])
    .required(" mật khẩu không khớp"),
})
  .required();

const Register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });
  const navigate = useNavigate();
  // validate form
  const onSubmit = async (data) => {
    const { username, email } = data;
    const checkUserName = await axios.get(
      process.env.REACT_APP_API + `/users?username=${username}`
    );

    const checkEmail = await axios.get(
      process.env.REACT_APP_API + `/users?=${email}`
    );

    if (
      (checkUserName.status === 200 && checkUserName.data.length) ||
      (checkEmail.status === 2000 && checkEmail.data.length)
    ) {
      alert("tài khoản || email đã tồn tại");
      return;
    }


    const response = await axios.post(process.env.REACT_APP_API + `/users`, {
      ...data,
      role: "user",

    });

    if (response.status === 201) {
      alert("đăng ký thành công");
      navigate("/login");
    }
  };
  return (
    <Col md={{ span: 6, offset: 3 }}>
      <h3>Register</h3>
      <Form onSubmit={handleSubmit(onSubmit)} className="form">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            name="username"
            type="text"
            {...register("username")}
            placeholder="Enter username"
          />
          {errors?.username && (
            <p className="text-danger">{errors.username.message}</p>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            type="text"
            {...register("email")}
            placeholder="Enter email"
          />
          {errors?.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            {...register("password")}
            placeholder="password"
            rows={3}
          />
          {errors?.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            name="confirmPassword"
            type="password"
            {...register("confirmPassword")}
            placeholder="confirm Password"
            rows={3}
          />
          {errors?.confirmPassword && (
            <p className="text-danger">{errors.confirmPassword.message}</p>
          )}
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
        <a class="d-block text-center mt-2 small" href="login"> Login</a>
      </Form>
    </Col>
  );
};

export default Register;