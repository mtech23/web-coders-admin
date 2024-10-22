import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./style.css";

import { AuthLayout } from "../../Components/Layout/AuthLayout";
import CustomButton from "../../Components/CustomButton";
import CustomInput from "../../Components/CustomInput";
import { loginUser } from "../../services/authServices";
import CustomModal from "../../Components/CustomModal";
import { appTitle } from "../../utils/commonUtils";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [modalHeading, setmodalHeading] = useState("");
  const [edit, setEdit] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  console.log(formData.password);

  useEffect(() => {
    document.title = `${appTitle} | Login`;
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    document.querySelector(".loaderBox").classList.remove("d-none");

    try {
      const response = await loginUser(formData);
      console.log("response", response);
      if (response.status) {
   

        console.log("Login Response:", response);
        document.querySelector(".loaderBox").classList.add("d-none");
        navigate("/dashboard");
      } else {
        setmodalHeading(response.message);
        setSuccess(false);
        setEdit(true);
        document.querySelector(".loaderBox").classList.add("d-none");
        alert("Invalid Credentials");

        console.error("Login failed");
      }
    } catch (error) {
      setSuccess(false);
      setEdit(true);
      setmodalHeading(error.message);
      document.querySelector(".loaderBox").classList.add("d-none");
      console.error("Error:", error);
    } finally {
      document.querySelector(".loaderBox").classList.add("d-none");
    }
  };

  return (
    <>
      <AuthLayout authTitle="Login" authPara="Login into your Account">
        <form onSubmit={handleSubmit}>
          <CustomInput
            label="Email Address"
            required
            id="userEmail"
            type="email"
            placeholder="Enter Your Email Address"
            labelClass="mainLabel text-white"
            inputClass="mainInput rounded-pill"
            onChange={(event) => {
              setFormData({ ...formData, email: event.target.value });
              console.log(event.target.value);
            }}
          />
          <CustomInput
            label="Password"
            required
            id="pass"
            type="password"
            placeholder="Enter Password"
            labelClass="mainLabel text-white"
            inputClass="mainInput rounded-pill"
            onChange={(event) => {
              setFormData({ ...formData, password: event.target.value });
              console.log(event.target.value);
            }}
          />
          {/* <div className="d-flex align-items-baseline justify-content-between mt-1">
            <div className="checkBox">
              <input
                type="checkbox"
                name="rememberMe"
                id="rememberMe"
                className="me-1"
              />
              <label htmlFor="rememberMe" className="fw-semibold">
                Remember Me
              </label>
            </div>
            <Link
              to={"/forget-password"}
              className="text-dark text-decoration-underline"
            >
              Forget Password?
            </Link>
          </div> */}
          <div className="mt-4 text-center">
            <CustomButton
              variant="primaryButton"
              text="Login"
              type="submit"
              className="w-100 rounded-pill"
            />
          </div>
        </form>
        <CustomModal
          autoClose={false}
          show={edit}
          success={success}
          close={() => setEdit(false)}
          heading={modalHeading}
        ></CustomModal>
      </AuthLayout>
    </>
  );
};

export default AdminLogin;
