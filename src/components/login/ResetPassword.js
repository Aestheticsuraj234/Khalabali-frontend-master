import React, {useState} from "react";
import { Navigate, useParams} from 'react-router-dom';
import {
    Box,
    Stack,
    FormControl,
    Input,
    Button,
    Image,
    Heading,
    Text
  } from '@chakra-ui/react';
  import ThemedBox from '../ThemedBox';
  import logoWhite from "../../assets/logoWhite.png";
  import axios from '../../axios-config';
  // import { useNavigate } from "react-router-dom";

const ResetPassword =()=>{
  const [password, setPassword] =useState();
  const [confirmPassword, setConfirmPassword] =useState();
  const [reset, setReset] =useState(false);
  const [msg, setMsg] = useState()
  const params = useParams()

  // handle submit
  const handleSubmit=(e)=>{
    e.preventDefault();
    if (password===confirmPassword){
      const data = {
        token: params.id,
        newPassword:password,
        
      }
      // api call and handle response
      axios.post('users/resetPass', data).then(
        res =>{
          console.log(res)
          setReset(true)
        }
      ).catch(err=>{
        console.log(err);
      })
  
    }
    else{
      setMsg('Confirm password not matched.')
    }
    
    
  }
    // jsx component
    return(
      (reset ?( <Navigate to = "/login" replace={true}/>):
      (<ThemedBox
        p={[1, 2]}
        borderRadius="md"
        light="gray.400"
        dark="gray.700"
        minWidth='300'
        maxWidth= '450'
        m={2}
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems='center'
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
              <Heading size={['lg', 'xl']} ml={5} mr={5}>Welcome to Khalabali Forum</Heading>
              <Text size={['lg', 'xl']} ml={5} mr={5}>
                Reset your password
              </Text>
              <hr></hr>
            </Box>
            <form onSubmit={handleSubmit}>
              <Stack spacing={3} m={10}>
                <FormControl>
                 New Password
                  <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password-input"
                    variant="filled"
                    type="password"
                    placeholder="Enter your new password"
                    size="md"
                    isRequired
                    mt={2}
                    
                  />
                </FormControl>   
                <FormControl>
                  Confirm Password
                  <Input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    id="confirm-password-input"
                    variant="filled"
                    type="password"
                    placeholder="Confirm password"
                    size="md"
                    isRequired
                    mt={2}
                    
                  />
                </FormControl>  
                <Button
                  type="submit"
                  backgroundColor="#2172cd"
                >
                  Submit
                </Button>
              </Stack>
              <p style={{color: "red", fontSize:'15px', textAlign:'center'}}>{msg}</p>
            </form>
          </ThemedBox>
      )
    )
    )
}

export default ResetPassword;