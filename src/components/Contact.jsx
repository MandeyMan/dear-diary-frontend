import React, { useState } from 'react';
import { sendEmail } from '../services/api';  
import { 
  Box, 
  FormControl, 
  FormLabel, 
  Input, 
  Textarea, 
  Button, 
  Text, 
  VStack, 
  Flex, 
  Image, 
  Heading 
} from '@chakra-ui/react';
import { EmailIcon } from '@chakra-ui/icons';
import { useToast } from '@chakra-ui/react';
import profile from './assets/profile.png'
const ContactForm = () => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();  
    setSending(true);
    try {
      const response = await sendEmail(formData);  
      console.log('Email sent successfully', response.data);
      toast({
        description: "Email sent successfully",
        status: 'info',
        duration: 3000,
        isClosable: false,
        position:'top'
      });
    } catch (error) {
      console.error('Error sending email', error);
      toast({
        description: "Error sending email",
        status: 'error',
        duration: 3000,
        isClosable: false,
        position:'top'
      });
    }
    setFormData({
      name: '',
      email: '',
      message: '',
    });
    setSending(false);
  };

  return (
    <Box maxW="800px" mx="auto" p={5} >
      {/* Creator Section */}
      <Flex justifyContent="center" alignItems="center" mb={8}>
        <Flex alignItems={'center'} flexDir={'column'} textAlign="center">
          <Image
            src={profile}  
            alt="Creator"
            borderRadius="full"
            boxSize="150px"
            objectFit="cover"
            mb={4}
            border={'1px solid grey'}
            boxShadow={'md'}
          />
          <Heading as="h3" size="lg">Prakash Prajapati</Heading>
          <Text fontSize="md" mt={2}>
            Welcome to the "Dear Diary" app! This is a space where you can record your daily thoughts, emotions, and ideas. 
            If you have any suggestions or feedback, feel free to fill out the form below.
          </Text>
        </Flex>
      </Flex>

      {/* Contact Form */}
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} boxShadow="md" borderRadius={'lg'} p={10} >
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="message" isRequired>
            <FormLabel>Suggestions / Feedback</FormLabel>
            <Textarea
              name="message"
              placeholder="Your Message or Suggestion"
              value={formData.message}
              onChange={handleChange}
            />
          </FormControl>

          <Button
            type="submit" w="full"
            isLoading={sending}  
            colorScheme='teal'
            loadingText='Submitting'
            variant='outline'
            rightIcon={<EmailIcon />}
          >
            Submit
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default ContactForm;
