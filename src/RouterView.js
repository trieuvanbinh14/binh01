import { BrowserRouter as Router, Routes, Route, useRoutes } from "react-router-dom";
import App from "./App";
import Layout from "./Layout";
import PostDetail from "./components/DetailPost";
import Login from "./login";
import Register from "./Register";
import About from "./About";
import Cart from "./cart";


const RouteList = () => {
  let routes = useRoutes([
    {path:"/Register",element:<Register/>},
    {path:"/about",element:<About/>},
    {path:"/login",element:<Login/>},
    { path: "/", element: <App /> },
    // { path: "/", element: <h1>about</h1> },
    { path: "/post/:id", element: <PostDetail /> },
    { path: "/cart", element: <Cart/> },
  ]);
  return routes;
};

const RouterView = () => {
  return (
    <Router>
      <Layout>
        <RouteList />
      </Layout>
    </Router>
  );
};
export default RouterView;
