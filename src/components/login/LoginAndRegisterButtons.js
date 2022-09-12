// import { Link, useLocation } from 'react-router-dom';
import { HStack, Button } from "@chakra-ui/react";
import { Link, useLocation } from 'react-router-dom';
// import navbar from ".././styles/navbar.module.css";

const LoginAndRegisterButtons = () => {
  const location = useLocation();
  return (
    <HStack >
      <Button
        as={Link}
        to={{
          pathname: '/login',
          state: {
            prevPathname: location.pathname,
          },
        }}
        h={8}
      >
        Login
      </Button>
      <Button
        as={Link}
        to={{
          pathname: '/register',
          state: {
            prevPathname: location.pathname,
          },
        }}
        h={8}
      >
        Sign Up
      </Button>
    </HStack>
  )
};

export default LoginAndRegisterButtons;
