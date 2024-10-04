import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";

const UserContext = React.createContext();

axios.defaults.withCredentials = true;

export const UserContextProvider = ({ children }) => {
  const serverUrl = "http://localhost:8000";

  const router = useRouter();

  const [user, setUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [userState, setUserState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const registerUser = async (e) => {
    e.preventDefault();
    if (
      !userState.email.includes("@") ||
      !userState.password ||
      userState.password.length < 6
    ) {
      toast.error("Please enter a valid email and password (min 6 characters)");
      return;
    }

    try {
      const res = await axios.post(`${serverUrl}/api/v1/register`, userState);
      console.log("User registered successfully", res.data);

      toast.success("User registered successfully!");

      setUserState({
        name: "",
        email: "",
        password: "",
      });

      router.push("/login");
    } catch (error) {
      console.log("Error registering user", error);
      toast.error(error.response.data.message);
    }
  };

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/login`,
        {
          email: userState.email,
          password: userState.password,
        },
        {
          withCredentials: true, // send the cookies to the server
        }
      );
      console.log("User logged in successfully", res.data);
      toast.success("User logged in successfully!");

      setUserState({ email: "", password: "" });
      await getUser();
      router.push("/");
    } catch (error) {
      console.log("Error logging in user", error);
      toast.error(error.response.data.message);
    }
  };

  const userLoginStatus = async () => {
    setLoading(true);
    let loggedIn = false;
    try {
      const res = await axios.get(`${serverUrl}/api/v1/login-status`, {
        withCredentials: true,
      });

      loggedIn = !!res.data;
      setLoading(false);
    } catch (error) {
      console.log("Error getting user login status", error);
      setLoading(false);
    }

    return loggedIn;
  };

  const logoutUser = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/v1/logout`, {
        withCredentials: true,
      });
      toast.success("User logged out successfully!");
      setUser({});
      router.push("/login");
    } catch (error) {
      console.log("Error logging out user", error);
      toast.error(error.response.data.message);
    }
  };

  const getUser = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${serverUrl}/api/v1/user`, {
        withCredentials: true,
      });

      setUser((prevState) => {
        return {
          ...prevState,
          ...res.data,
        };
      });

      setLoading(false);
    } catch (error) {
      console.log("Error getting user details", error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const updateUser = async (e, data) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.patch(`${serverUrl}/api/v1/user`, data, {
        withCredentials: true,
      });

      setUser((prevState) => {
        return {
          ...prevState,
          ...res.data,
        };
      });

      toast.success("User updated successfully!");
      setLoading(false);
    } catch (error) {
      console.log("Error updating user details", error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const emailVerification = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${serverUrl}/api/v1/verify-email`, {
        withCredentials: true,
      });

      toast.success("Email verification sent successfully!");
      setLoading(false);
    } catch (error) {
      console.log("Error sending email verification", error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const verifyUser = async (token) => {
    setLoading(true);
    try {
      const res = await axios.post(`${serverUrl}/api/v1/verify-user/${token}`, {
        withCredentials: true,
      });
      toast.success("User verified successfully!");
      await getUser();
      setLoading(false);
      router.push("/");
    } catch (error) {
      console.log("Error verifying user", error);
      toast.error(error.response.data.message);
      serLoading(false);
    }
  };

  const forgotPasswordEmail = async (email) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/forgot-password`,
        { email },
        { withCredentials: true }
      );
      toast.success("Forgot password email sent successfully!");
      setLoading(false);
    } catch (error) {
      console.log("Error sending forgot password email", error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const resetPassword = async (token, password) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/reset-password/${token}`,
        { password },
        { withCredentials: true }
      );

      toast.success("Password reset successfully!");
      setLoading(false);
      router.push("/login");
    } catch (error) {
      console.log("Error resetting password", error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/change-password`,
        { currentPassword, newPassword },
        { withCredentials: true }
      );
      toast.success("Password reset successfully!");
      setLoading(false);
    } catch (error) {
      console.log("Error changing password", error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  // admin routes
};
