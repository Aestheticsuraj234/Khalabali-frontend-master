import React, { useState } from "react";
import loginStyle from "../../styles/form.module.css";
import {
  Box,
  Stack,
  FormControl,
  Input,
  Button,
  Image,
  Heading,
  Text,
} from "@chakra-ui/react";
import ThemedBox from "../ThemedBox";
import { Link } from "react-router-dom";
import logoWhite from "../../assets/logoWhite.png";
import axios from "../../axios-config";

const ForgotPassword = () => {
  // initialize state using hooks
  const [email, setEmail] = useState();
  const [msg, setMsg] = useState();
  const [correctEmail, setCorrectEmail] = useState(false);

  // handle submit
  const submitForm = (e) => {
    e.preventDefault();
    // console.log(email)
    const data = {
      email,
    };

    //API request
    axios
      .post("users/forgetPass", data)
      .then((res) => {
        // console.log(res)
        setMsg("please check your mail to reset password");
        setCorrectEmail(true);
      })
      .catch((err) => {
        // console.log(err);
        setMsg("Please enter correct Email");
        setCorrectEmail(false);
      });
  };

  // jsx part
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
      height="450"
    >
      {/* {requireAuth && (
            <Alert status="warning" mb={2}>
              <AlertIcon />
              {requireAuth}
            </Alert>
          )}
          {error && (
            <Alert status="error" mb={2}>
              <AlertIcon />
              {error}
            </Alert>
          )} */}

      <Image boxSize={55} src={logoWhite} alt="logo" m={5} pt={3} />
      <Box>
        <Heading size={["lg", "xl"]} ml={5} mr={5}>
          Welcome to Khalabali Forum
        </Heading>
        <Text size={["lg", "xl"]} ml={5} mr={5}>
          Log into your account to unlock true power of community.
        </Text>
        <hr></hr>
      </Box>
      <form onSubmit={submitForm}>
        {/* <form onSubmit={this.handleSubmit}> */}
        <Stack spacing={5} m={10}>
          <FormControl>
            Email
            <Input
              onChange={(e) => setEmail(e.target.value)}
              id="email-input"
              variant="filled"
              type="text"
              placeholder="Enter your email"
              size="md"
              isRequired
              mt={2}
              value={email}
            />
          </FormControl>
          <Button
            type="submit"
              // isLoading={isLoading || null}
              
            backgroundColor="#2172cd"
            width="300px"
          >
            Submit
          </Button>
        </Stack>
      </form>
      {correctEmail && (
        <p style={{ color: "green", fontSize: "15px" }}>{msg}</p>
      )}
      {!correctEmail && <p style={{ color: "red", fontSize: "15px" }}>{msg}</p>}
    </ThemedBox>
  );
};

export default ForgotPassword;
