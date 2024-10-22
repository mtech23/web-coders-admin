import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";

import { logo, authImage } from "../../../Assets/images";
import "./style.css";

export const AuthLayout = (props) => {
  return (
    <>
      <section className="authBg">
        <div className="container">
          <div className="row g-0">
            <div className="col-lg-6 authBox  m-auto">
              <div className="authFormWrapper">
                <div className="authForm">
                  <div class="logo text-center" bis_skin_checked="1">
                    <figure>
                      <a href="#">
                        <h2>
                          Admin <span>Login</span>
                        </h2>
                      </a>
                    </figure>
                  </div>
                  <div className="authFormHeader">
                    <h2 className="authTitle text-white">{props?.authTitle}</h2>
                    <p
                      className={
                        props.subauthPara != "" ? "authPara mb-0" : "authPara"
                      }
                    >
                      {props?.authPara}
                    </p>
                    <p className="authPara">{props?.subauthPara}</p>
                  </div>
                  {props?.children}
                  {props?.backOption && (
                    <div className="text-center mt-4">
                      <Link
                        to={"/login"}
                        className="grayColor text-decoration-none fw-bold"
                      >
                        <FontAwesomeIcon
                          icon={faLeftLong}
                          className="primaryColor me-2"
                        />
                        Back To <span class="text-theme-primary"> Login</span>{" "}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* <div className="col-lg-6 d-none d-lg-block">
                            <div className='authImage'>
                                <img src={authImage} alt="authImage" className="h-100" />
                            </div>
                        </div> */}
          </div>
        </div>
      </section>
    </>
  );
};
