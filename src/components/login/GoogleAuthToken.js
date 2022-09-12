import React, { useEffect } from "react";
import axios from "../../axios-config";
import { useDispatch } from "react-redux";
import {useNavigate, useParams} from 'react-router-dom';

const GoogleAuthToken = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwtToken = useParams();

  // api request
  useEffect(() => {
    const getUserData = async () => {
      const userData = await axios.get("/users/getUserData", {
        headers: {
          Authorization: `Bearer ${jwtToken.token}`,
        },
      });

      // dispatch details
      dispatch({
        type: "LOGIN",
        token: `Bearer ${jwtToken.token}`,
        user: userData.data,
      });
    };
    getUserData();
    navigate("/", { replace: true });
  }, []);

  return <div>Google Login successfully redirecting</div>;
};

export default GoogleAuthToken;
