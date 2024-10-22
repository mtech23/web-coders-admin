import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { logo, userImage, mtech } from "./../../../Assets/images/";

import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomModal from "../../CustomModal";
import { useNavigate } from "react-router-dom";
import {
  faBell,
  faUser,
  faBars,
  faEllipsisV,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";

import { notifications } from "../../../Config/Data";

import "./style.css";
import { logoutUser } from "../../../services/authServices";

export const Header = (props) => {
  const [notificationState, setNotificationState] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const navigate = useNavigate();

  const Continue = () => {
    setShowModal(false);
    setShowModal2(true);
  };

  const handleClickPopup = async () => {
    // setShowModal(true)
    try {
      const response = await logoutUser();
      console.log("response", response);

      localStorage.removeItem("accessToken");
      setShowModal(true);
      navigate("/");
      console.log("response", response);
    } catch (error) {
      navigate("/");

      console.log("error", error);
    }
  };

  const handleRedirect = () => {
    // const LogoutData = localStorage.getItem('login');
    // fetch(`https://custom2.mystagingserver.site/food-stadium/public/api/logout`,
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${LogoutData}`
    //     },
    //   },
    // )
    //   .then((response) => {
    //     return response.json()
    //   })
    //   .then((data) => {
    //     console.log(data)
    //     localStorage.removeItem('login');
    //     navigate('/');
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })

    navigate("/");
  };

  useEffect(() => {
    setNotificationState(notifications);
  }, []);

  return (
    <header>
      <Navbar className="customHeader" expand="md">
        <Container fluid>
      
          <Navbar.Toggle className="order-4 order-lg-2 notButton">
            <FontAwesomeIcon className="bell-icon" icon={faEllipsisV} color="white" />
          </Navbar.Toggle>
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="customCollapse order-3"
          >
            <Nav className="ms-auto">
             
              <Dropdown className="userDropdown">
                <Dropdown.Toggle
                color="white"
                  variant="transparent"
                  className="notButton toggleButton text-white"
                >
                  <div className="userImage">
                    <img src={userImage} alt="" className="img-fluid" />
                  </div>
                  {/* <img src={images.profilePic} alt="" className="img-fluid" /> */}
                </Dropdown.Toggle>
                <Dropdown.Menu className="userMenu" align="end">
                  {/* <Link className="userMenuItem" to={'/profile'}>
                    <FontAwesomeIcon
                      className="me-2 yellow-text"
                      icon={faUser}
                    />{" "}
                    Profile
                  </Link> */}
                  <Link
                    to="#"
                    className="userMenuItem"
                    onClick={handleClickPopup}
                  >
                    <FontAwesomeIcon
                      className="me-1 yellow-text"
                      icon={faSignOut}
                      color="white"
                    />{" "}
                    Logout
                  </Link>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
          <button className="notButton ms-md-2 order-lg-4 order-md-4 order-4 d-md-none ">
            <FontAwesomeIcon
              className="bell-icon"
              onClick={props.sidebarToggle}
              icon={faBars}
              color="white"
            />
          </button>
        </Container>
      </Navbar>

      {/* <CustomModal
        show={showModal}
        close={() => {
          setShowModal(false);
        }}
        action={Continue}
        heading="Are you sure you want to logout?"
      /> */}
      <CustomModal
        show={showModal}
        close={() => setShowModal(false)}
        success
        heading="Successfully Logged Out"
      />
    </header>
  );
};
