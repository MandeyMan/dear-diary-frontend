import React from 'react';
import { Box, Container, Stack, Text, Link, HStack, IconButton } from '@chakra-ui/react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <Box bg="teal.500" color="white" pt={5}  pb={4}  mt={20} w={'100%'}>
      <Container maxW="6xl">
        <Stack direction={{ base: 'column', md: 'row' }} justifyContent="center" alignItems="center">
       

          {/* Right Side: Social Media */}
          <HStack spacing={4}>
            <IconButton 
              as="a" 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Facebook" 
              icon={<FaFacebook />} 
              bg="white" 
              color="teal.500" 
              _hover={{ bg: 'teal.400', color: 'white' }}
            />
            <IconButton 
              as="a" 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Twitter" 
              icon={<FaTwitter />} 
              bg="white" 
              color="teal.500" 
              _hover={{ bg: 'teal.400', color: 'white' }}
            />
            <IconButton 
              as="a" 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram" 
              icon={<FaInstagram />} 
              bg="white" 
              color="teal.500" 
              _hover={{ bg: 'teal.400', color: 'white' }}
            />
            <IconButton 
              as="a" 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn" 
              icon={<FaLinkedin />} 
              bg="white" 
              color="teal.500" 
              _hover={{ bg: 'teal.400', color: 'white' }}
            />
          </HStack>
        </Stack>

        {/* Footer Bottom: Copyright */}
        <Text textAlign="center" mt={3} fontSize="sm">
          © {new Date().getFullYear()} Dear Diary. All rights reserved.
        </Text>
      </Container>
    </Box>
  );
}
