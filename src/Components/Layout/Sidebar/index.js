import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { logo } from "../../../Assets/images";

import "./style.css";

export const Sidebar = (props) => {
  const location = useLocation();
  return (
    <div className={`sidebar ${props.sideClass}`} id="sidebar">
      <div className="sidebar-title">
    {/* <h1>
      Admin
      <span>
        Panel
      </span>
    </h1> */}
    <Link to="/">
      <img src={logo} alt="logo" />
    </Link>
      </div>
      <ul className="list-unstyled">
        <li className="sidebar-li">
          <Link
            className={`sideLink ${
              location.pathname.includes("/dashboard") ? "active" : ""
            }`}
            to="/dashboard"
          >
            <span className="sideIcon"></span>
            <span className="sideLinkText">Dashboard</span>
          </Link>
        </li>

        <li className="sidebar-li">
          <Link
            className={`sideLink ${
              location.pathname.includes("product") ? "active" : ""
            }`}
            to="/product-management"
          >
            <span className="sideIcon"></span>
            <span className="sideLinkText">Product Management</span>
          </Link>
        </li>

        <li className="sidebar-li">
          <Link
            className={`sideLink ${
              location.pathname.includes("category") ? "active" : ""
            }`}
            to="/category-management"
          >
            <span className="sideIcon"></span>
            <span className="sideLinkText">Category Management</span>
          </Link>
        </li>

        <li className="sidebar-li">
          <Link
            className={`sideLink ${
              location.pathname.includes("order") ? "active" : ""
            }`}
            to="/order-management"
          >
            <span className="sideIcon"></span>
            <span className="sideLinkText">Order Management</span>
          </Link>
        </li>

        <li className="sidebar-li">
          <Link
            className={`sideLink ${
              location.pathname.includes("user") ? "active" : ""
            }`}
            to="/users-management"
          >
            <span className="sideIcon"></span>
            <span className="sideLinkText">Users Management</span>
          </Link>
        </li>

        <li className="sidebar-li">
          <Link
            className={`sideLink ${
              location.pathname.includes("tag") ? "active" : ""
            }`}
            to="/tags-management"
          >
            <span className="sideIcon"></span>
            <span className="sideLinkText">Tags Management</span>
          </Link>
        </li>
        
        {/* <li className="sidebar-li">
          <Link
            className={`sideLink ${
              location.pathname.includes("color") ? "active" : ""
            }`}
            to="/color-management"
          >
            <span className="sideIcon"></span>
            <span className="sideLinkText">Color Management</span>
          </Link>
        </li>
        <li className="sidebar-li">
          <Link
            className={`sideLink ${
              location.pathname.includes("blogs") ? "active" : ""
            }`}
            to="/blogs-management"
          >
            <span className="sideIcon"></span>
            <span className="sideLinkText">Blogs Management</span>
          </Link>
        </li>
        <li className="sidebar-li">
          <Link
            className={`sideLink ${
              location.pathname.includes("portfolio") ? "active" : ""
            }`}
            to="/portfolio-management"
          >
            <span className="sideIcon"></span>
            <span className="sideLinkText">Portfolio Management</span>
          </Link>
        </li>
        <li className="sidebar-li">
          <Link
            className={`sideLink ${
              location.pathname.includes("gallery") ? "active" : ""
            }`}
            to="/gallery-management"
          >
            <span className="sideIcon"></span>
            <span className="sideLinkText">Gallery Management</span>
          </Link>
        </li>
        <li className="sidebar-li">
          <Link
            className={`sideLink ${
              location.pathname.includes("#") ? "active" : ""
            }`}
            to="#"
          >
            <span className="sideIcon"></span>
            <span className="sideLinkText">Subscription Management</span>
          </Link>
        </li> */}

      </ul>
    </div>
  );
};
