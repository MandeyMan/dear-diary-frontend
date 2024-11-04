import React, { useEffect } from 'react';
import { 
  Box, 
  Flex, 
  Button, 
  IconButton, 
  useDisclosure, 
  VStack, 
  HStack 
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';  // Import the useNavigate hook
import { CiLogout } from "react-icons/ci";
export default function Navbar({ setIsAuth , isAuth}) {
    
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();  // Initialize the useNavigate hook

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuth(!!token); // Convert token to boolean
  }, [setIsAuth]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuth(false);
    navigate('/login');  // Navigate to the home page after logout
  };

  return (
    <Box bg="teal.500" px={4} boxShadow="md" w={'100%'}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        {/* Logo/Title */}
        <Box _hover={{cursor : "pointer"}} onClick={()=>navigate('/home')} >
        <p fontSize="2xl" fontWeight="bold" color="white" className='title'>
          Dear Diary
        </p>

        </Box>

        {/* Desktop Menu */}
        <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            {
                isAuth ?  <>
                
          <Button variant="ghost" color="white" _hover={{ bg: 'teal.600' }} onClick={() => navigate('/diaries/create')}>
            Create
          </Button>
          <Button variant="ghost" color="white" _hover={{ bg: 'teal.600' }} onClick={() => navigate('/diaries')}>
            Read
          </Button>
        
                </> : 
                 <Button variant="ghost" color="white" _hover={{ bg: 'teal.600' }} onClick={() => navigate('/login')}>
                 Login/Signup
               </Button>

            }
          <Button variant="ghost" color="white" _hover={{ bg: 'teal.600' }} onClick={() => navigate('/contact')}>
            Contact Us
          </Button>
          {
             isAuth && <Button variant="ghost" rightIcon={<CiLogout />}  color="white" _hover={{ bg: 'teal.600' }} onClick={handleLogout}>
            Logout
          </Button>
          }
          
        </HStack>

        {/* Burger Menu for Mobile */}
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
          color="black"
          boxShadow={'md'}
          background={'white'}
          _hover={{ bg: 'teal.600' }}
        />
      </Flex>

      {/* Mobile Menu (shown when burger icon is clicked) */}
      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <VStack as={'nav'} spacing={4}>

            {
                isAuth ? <> <Button w="full" variant="ghost" color="white" _hover={{ bg: 'teal.100', color: "white" }} onClick={() => {navigate('/diaries/create'); onClose();}}>
              Create
            </Button>
            <Button w="full" variant="ghost" color="white" _hover={{ bg: 'teal.100', color: "white" }} onClick={() => {navigate('/diaries'); onClose();}}>
              Read
            </Button>
              </>
             : 
             <Button w="full" variant="ghost" color="white" _hover={{ bg: 'teal.100', color: "white" }} onClick={() => {navigate('/login'); onClose();}}>
              Login/Signup
            </Button> 
            }
          
          
            <Button w="full" variant="ghost" color="white" _hover={{ bg: 'teal.100', color: "white" }} onClick={() => {navigate('/contact'); onClose();}}>
              Contact Us
            </Button>
            {
                isAuth && 
                  <Button w="full" rightIcon={<CiLogout />}  variant="ghost" color="white" _hover={{ bg: 'teal.100', color: "white" }} onClick={() => {handleLogout(); onClose();}}>
              Logout
            </Button>
            }
          
          </VStack>
        </Box>
      ) : null}
    </Box>
  );
}
