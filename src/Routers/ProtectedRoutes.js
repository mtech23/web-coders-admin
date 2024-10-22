import React, { useEffect } from "react";
import { useNavigate } from "react-router";
export const ProtectedRoutes = (props) => {
  const { Components } = props;
  const navigate = useNavigate();
  useEffect(() => {
    let login = localStorage.getItem("token");
    if (!login) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <>
      <Components />
    </>
  );
};
