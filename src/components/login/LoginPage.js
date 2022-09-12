import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import loginStyle from "../../styles/form.module.css";
import GoogleLoginButton from "./GoogleLoginButton";
import ThemedBox from "../ThemedBox";
import logoWhite from "../../assets/logoWhite.png";

import {
  Box,
  Stack,
  FormControl,
  Input,
  Button,
  Alert,
  AlertIcon,
  Image,
  Heading,
  Text,
} from "@chakra-ui/react";

import { createLoadingAndErrorSelector } from "../../states/selectors";
import { startLogin } from "../../states/actions/auth";
import { userSelector } from "../../states/selectors";

import { Link } from "react-router-dom";

const LoginPage = ({ isLoading, error, startLogin, user, location }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const requireAuth = location && location.state && location.state.requireAuth;
  // console.log(user);

  const navigate = useNavigate();

  // handle login submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    await startLogin(username, password);
  };
  if (user && !error) {
    navigate("/", { replace: true });
  }

  // jsx element
  return (
    <ThemedBox
      p={[1, 2]}
      borderRadius="md"
      light="gray.400"
      dark="gray.700"
      minWidth="300"
      maxWidth="450"
      m={2}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems="center"
    >
      <Image boxSize={55} src={logoWhite} alt="logo" m={5} pt={3} />
      <Box>
        <Heading textAlign={"center"} size={["lg", "xl"]} ml={5} mr={5}>
          Welcome to Khalabali Forum
        </Heading>
        <Text textAlign={"center"} size={["lg", "xl"]} ml={5} mr={5}>
          Log into your account to unlock true power of community.
        </Text>
        <hr></hr>
      </Box>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3} m={10}>
          <FormControl>
            Username
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="username-input"
              variant="filled"
              type="text"
              placeholder="Enter your username"
              size="md"
              isRequired
              mt={2}
            />
          </FormControl>
          <FormControl>
            Password
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password-input"
              variant="filled"
              type="password"
              placeholder="Enter your password"
              size="md"
              isRequired
              mt={2}
            />
          </FormControl>
          <Text fontWeight={"bold"} textAlign="right">
            <Link to="/ForgotPassword">Forgot Password</Link>
          </Text>

          <Button
            type="submit"
            isLoading={isLoading || null}
            backgroundColor="#2172cd"
          >
            Login
          </Button>
          {requireAuth && (
            <Alert status="warning" mb={2}>
              <AlertIcon />
              {requireAuth}
            </Alert>
          )}
          {error && (
            <Alert status="error" mb={2}>
              <AlertIcon />
              Username and password not matched
            </Alert>
          )}
          <Text size={["lg", "xl"]} ml={5} mr={5}>
            Or login with social network
          </Text>
          <GoogleLoginButton />
          <Text size={["lg", "xl"]} ml={5} mr={5}>
            Don't have an account?
            <Link to="/register" className={loginStyle.term}>
              Signup Here
            </Link>
          </Text>
          <Text size={["lg", "xl"]} ml={5} mr={5}>
            By Logging in, signing in or continuing, I agree to Khalabali{" "}
            <Link to="#" className={loginStyle.term}>
              {" "}
              Terms of Use
            </Link>{" "}
            and{" "}
            <Link to="#" className={loginStyle.term}>
              Privacy Policy
            </Link>
            .
          </Text>
        </Stack>
      </form>
    </ThemedBox>
  );
};

// redux selectors for loading and error messages
const { loadingSelector, errorSelector } = createLoadingAndErrorSelector(
  ["LOGIN"],
  false
);

// redux mapping state to props
const mapStateToProps = (state) => ({
  isLoading: loadingSelector(state),
  error: errorSelector(state),
  user: userSelector(state),
});

// redux dispatch when called
const mapDispatchToProps = (dispatch) => ({
  startLogin: (username, password) => dispatch(startLogin(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
