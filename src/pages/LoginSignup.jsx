import React, { useState } from 'react';
import {
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Button,
    Box,
    Text,
    Heading
} from '@chakra-ui/react';
import { FaDoorClosed, FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { loginUser, registerUser } from '../services/api'; // Import loginUser API call
import { useNavigate } from 'react-router-dom'; 
export default function LoginSignup({ setIsAuth }) {
     
    const [show, setShow] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
     const [haveAccount , setHaveAccount] = useState(true);
    const navigate = useNavigate();
    const handleClick = () => setShow(!show);

    const handleLogin = async () => {
        try {
            const response = await loginUser({ username, password });
            localStorage.setItem('token', response.data.token); // Save JWT token to localStorage
            setMessage('Login successful!');
            setUsername("");
            setPassword("");
               setIsAuth(true);
            navigate('/home')
        } catch (error) {
             setMessage( error.response?.data?.message || error.message);
          
        }

    };

    const handleSignUp = async () => {
        try {
            const response = await registerUser({ username, password });
            // localStorage.setItem('token', response.data.token); // Save JWT token to localStorage
            setMessage('SignUp Successfull successful!');
                setUsername("");
                setPassword("");
               setHaveAccount(!haveAccount);
        } catch (error) {
             setMessage(error.response?.data?.message || error.message);
          
        }

    };

    return (
        <div className="LoginSignup">
              
            <Box width={'100%'} mx="auto" mt={10} p={5} borderWidth="1px" borderRadius="lg" display={'flex'} alignItems={'center'} flexDir={'column'} justifyContent={'center'}>
                    <Heading size='lg' textAlign={'center'}> {haveAccount ?  "Login Form" :"SignUp Form"} </Heading>
                {message && (
                    <Text mb={4} mt={1} color={message.includes('successful') ? 'green.500' : 'red.500'}>
                        {message}
                    </Text>
                )}
                <FormControl mb={4}>
                    <FormLabel>Email</FormLabel>
                    <Input
                        type="email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </FormControl>

                <FormControl mb={4}>
                    <FormLabel>Password</FormLabel>
                    <InputGroup size="md">
                        <Input
                            pr="4.5rem"
                            type={show ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            required
                        />
                        <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" onClick={handleClick}>
                                {show ?   <FaEye/>: <FaEyeSlash/>  }
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>

      <Button colorScheme="teal" variant="solid" onClick={haveAccount? handleLogin : handleSignUp} width={'60%'}>
                    {haveAccount ? "Login" : "Signup"}
                </Button>


            <Heading onClick={()=>setHaveAccount(!haveAccount) }
               size={'xs'}
               mt={'1rem'}
               width={'100%'}
               textAlign={'end'}
               fontWeight={'normal'}
               color={'blue.300'}
               _hover={{ color: 'blue' , cursor:'pointer' }}
               
            >
                { haveAccount ?  "Dont have account ??" : "Login to proceed..."}  
                  </Heading>
            </Box>



        </div>
    );
}   

//please do this in front iend like checking is email has @ gmail .com and the password must contain special charachter and min length 6