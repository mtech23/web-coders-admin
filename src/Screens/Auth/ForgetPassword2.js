import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./style.css";

import { AuthLayout } from "../../Components/Layout/AuthLayout";
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";
import { verifyOTP } from "../../services/authServices";
import CustomModal from "../../Components/CustomModal";
import { appTitle } from "../../utils/commonUtils";

const ForgetPassword2 = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ code: ["", "", "", ""] });
  const [showModal, setShowModal] = useState(false);
  const [modalHeading, setmodalHeading] = useState("");
  useEffect(() => {
    document.title = `${appTitle} | Password Recovery`;
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    document.querySelector(".loaderBox").classList.remove("d-none");

    try {
      const combinedCode = formData.code.join("");
      const response = await verifyOTP(combinedCode);
      console.log("response", response);
      navigate("/forget-password3");
    } catch (error) {
      setmodalHeading(error.message);
      setShowModal(true);

      console.log("error", error);
    } finally {
      document.querySelector(".loaderBox").classList.add("d-none");
    }
  };

  const handleInputChange = (index, value) => {
    const newCode = [...formData.code];
    newCode[index] = value;
    setFormData({ code: newCode });
  };

  console.log("otp", formData);

  return (
    <>
      <AuthLayout
        authTitle="Verification Code"
        authPara="Please Check Your Email For Verification Code."
        subauthPara="Your Code is 4 digit in Length"
        backOption={true}
      >
        <form>
          <div className="inputWrapper">
            <label htmlFor="verificationCode" className="mainLabel">
              Verification Code<span>*</span>
            </label>
          </div>
          <div className="verification-box justify-content-between">
            {formData.code.map((_, index) => (
              <CustomInput
                key={index}
                required
                id={`verificationCode-${index}`}
                type="number"
                labelClass="mainLabel"
                inputClass="mainInput text-center"
                onChange={(event) =>
                  handleInputChange(index, event.target.value)
                }
              />
            ))}
          </div>
          <div className="d-flex align-items-baseline justify-content-between mt-1">
            <p className="text-danger fw-bold">Resending in 00:50</p>
            <button
              type="button"
              className="notButton primaryColor fw-bold text-decoration-underline"
            >
              Resend Code
            </button>
          </div>
          <div className="mt-4 text-center">
            <CustomButton
              type="button"
              variant="primaryButton"
              text="Continue"
              onClick={handleClick}
            />
          </div>
        </form>
        <CustomModal
          show={showModal}
          success={false}
          heading={modalHeading}
          close={() => setShowModal(false)}
        />
      </AuthLayout>
    </>
  );
};

export default ForgetPassword2;
