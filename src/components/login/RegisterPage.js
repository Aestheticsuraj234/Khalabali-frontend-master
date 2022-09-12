import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import loginStyle from "../../styles/form.module.css";
import { Link } from "react-router-dom";
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
  FormErrorMessage,
  //color,
  // Checkbox,
  // Flex,
  Image,
  Heading,
  Text,
} from "@chakra-ui/react";

import { startRegister } from "../../states/actions/auth";
import { createLoadingAndErrorSelector } from "../../states/selectors";

const RegisterPage = ({ startRegister, error, isLoading }) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [doNotMatchError, setDoNotMatchError] = useState("");

  const navigate = useNavigate();
  // handle submit
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (password !== confirmPassword) {
        return setDoNotMatchError("Passwords do not match");
      }
      await startRegister(username, password, email);
      if (!error) {
        navigate("/login", { replace: true });
      }
    } catch (e) {
      setDoNotMatchError(e.message);
    }
  };

  // jsx component
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
          Register into your account to unlock true power of community.
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
            Email
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email-input"
              variant="filled"
              type="email"
              placeholder="Enter your email"
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
          <FormControl isInvalid={doNotMatchError}>
            Confirm Password
            <Input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              id="confirm-password-input"
              variant="filled"
              type="password"
              placeholder="Confirm your password"
              size="md"
              isRequired
              mt={2}
            />
            <FormErrorMessage>{doNotMatchError}</FormErrorMessage>
          </FormControl>
          <Button type="submit" isLoading={isLoading} backgroundColor="#2172cd">
            Register
          </Button>
          {error && (
            <Alert status="error" mb={2}>
              <AlertIcon />
              {error}
            </Alert>
          )}

          <Text size={["lg", "xl"]} ml={5} mr={5}>
            Or login with social network
          </Text>

          <GoogleLoginButton />
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
  ["REGISTER"],
  false
);

// redux mapping state to props
const mapStateToProps = (state) => ({
  isLoading: loadingSelector(state),
  error: errorSelector(state),
});

// redux dispatch when called
const mapDispatchToProps = (dispatch) => ({
  startRegister: (username, password, email) =>
    dispatch(startRegister(username, password, email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
