import { Button, Input, Box, FormControl, FormLabel, Textarea, Img, Badge, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Heading } from '@chakra-ui/react';
import React, { useEffect, useState, useRef } from 'react';
import { createDiary, updateDiary } from '../services/api'; // Import the API call
import { CiMicrophoneOn } from "react-icons/ci";
import { GrPowerReset } from "react-icons/gr";
import buttonAnim from './assets/buttonAnim.gif';
import volume from './assets/volume.gif';
import mute from './assets/mute.png';
import { useToast } from '@chakra-ui/react';
import MusicPlayer from './Music';
import night2 from '../components/assets/musicBg.png'
export default function CreateDiary({ diary, isEdit, setIsEdit }) {

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().substring(0, 10); // Format the date to 'YYYY-MM-DD'
  };

  const [diaryData, setDiaryData] = useState({
    date: getCurrentDate(),
    story: '',
    specialNote: '',
  });

  const [isListening, setIsListening] = useState(false); // To track if listening for speech
  const [isSpeaking, setIsSpeaking] = useState(false); // To track if speech is currently playing
  const recognitionRef = useRef(null); // Reference for SpeechRecognition
  const utteranceRef = useRef(null); // Reference for SpeechSynthesisUtterance
  const toast = useToast();

  useEffect(() => {
    if (isEdit && diary) {
      setDiaryData({
        date: diary.date.substring(0, 10), // Extracting the date in 'YYYY-MM-DD' format
        story: diary.story,
        specialNote: diary.specialNote,
      });
    }
  }, [diary, isEdit]);

  // Word and character count functions
  const countCharacters = (story) => {
    return story.length;
  };

  const countWords = (story) => {
    return story.trim() === '' ? 0 : story.trim().split(/\s+/).length;
  };

  // Initialize SpeechRecognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US'; // Set the language (you can change it to 'hi-IN' for Hindi)
      
      let interimTranscript = ''; // To store interim results

      recognitionRef.current.onresult = (event) => {
        interimTranscript = ''; // Reset interim transcript

        // Process speech results
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;

          if (event.results[i].isFinal) {
            // Append only final transcript
            setDiaryData(prevData => ({
              ...prevData,
              story: prevData.story + transcript.trim() + ' ', // Append final result to existing text
            }));
          } else {
            // Store interim transcript (not appending it yet)
            interimTranscript += transcript;
          }
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
    }
  }, []);

  // Toggle listening state
  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop(); // Stop listening
      setIsListening(false);
    } else {
      recognitionRef.current.start(); // Start listening
      setIsListening(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDiaryData({ ...diaryData, [name]: value });
  };

 

  const handleSubmit = async () => {
    try {
      if (!isEdit) {
        await createDiary(diaryData);
        
      } else {
        await updateDiary(diary._id, diaryData);
        
      }
      toast({
        // title: 'Account created.',
        description: `Diary ${isEdit ? "Updated" : "Created"} successfully!`,
        status: 'success',
        position:'top',
        duration: 5000,
        isClosable: false,
      })
      setDiaryData({
        date: getCurrentDate(),
        story: '',
        specialNote: '',
      });
      setIsEdit(!isEdit);
    } catch (error) {
      
        if(diaryData.story =="" || diaryData.date=="")
           {
            toast({
              // title: 'Account created.',
              description: `Please write the crediantials properely !`,
              status: 'error',
              position:'top',
              duration: 5000,
              isClosable: false,
            })
           }
    }
  };

  const handleReset = () => {
    setDiaryData({
      date: diaryData.date.substring(0, 10),
      story: "",
      specialNote: diaryData.specialNote,
    });
  };

  // Text-to-Speech function
  const speak = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel(); // Stop the speech
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(diaryData.story); // Create a new SpeechSynthesisUtterance
      window.speechSynthesis.speak(utterance); // Speak the utterance
      setIsSpeaking(true); // Update speaking state

      // Set a listener for when the speech ends
      utterance.onend = () => {
        setIsSpeaking(false); // Reset the speaking state when finished
      };
      utteranceRef.current = utterance; // Store the utterance in a ref
    }
  };

  return (
    <Box className="Create" p={0}  borderRadius={'15px'} mt={5} width={isEdit && '100%'} >

 <Heading textAlign={'center'} size={'lg'} mt={5} mb={10}>  Now you can listen soothing music while writing !! </Heading>
  
<Accordion defaultIndex={[0]} allowMultiple borderRadius={5} border={'1.5px solid grey'}  >
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as='span' flex='1' textAlign='center'>
        🎶 Find the songs that suits you! 🎶 
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4} bgImage={night2}
          backgroundSize={'82%'}
          backgroundPosition={'4rem -6rem'}
    >
   
                   <MusicPlayer/>
    </AccordionPanel>
  </AccordionItem>
   </Accordion>
    <Box className="Create" p={0} border={'1px solid grey'} borderRadius={'15px'} mt={5} width={'100%'} >

      <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} gap={5} direction={'row'} spacing={'5'} 
        padding={'10px'}
        borderTopLeftRadius={'10px'}
        borderTopRightRadius={'10px'}
        background={'#319795'}
      >
        {/* Display character and word count */}
        <Box>
         <Badge p={2}> Characters: {countCharacters(diaryData.story)} | Words: {countWords(diaryData.story)}  </Badge> 
        </Box>

        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} gap={5} direction={'row'} spacing={'5'}>
          {isListening ?  <Img src={buttonAnim} onClick={toggleListening} width={'50px'}  cursor={'pointer'} />
            : 
            <Button onClick={toggleListening} 
              borderRadius={'35px'}
              p={'5px 5px'}
              fontSize={'23px'}
            > <CiMicrophoneOn/>  </Button> 
          }

          <Button
            background={'white'}
            color={'grey'}
            variant='outline'
            borderRadius={'50%'}
            p={'5px 5px'}
            fontSize={'2xl'}
            onClick={handleReset}
            _hover={ {color : "#319795"}}
          >
            <GrPowerReset />
          </Button>

          {isSpeaking ? 
            <Img
              width={'60px'}
              borderRadius={'50%'}
              src={volume}
              p={'5px 5px'}
              fontSize={'xl'}
              onClick={speak} 
              cursor={'pointer'}
            />
          :    
            <Img
              width={'50px'}
              borderRadius={'50%'}
              src={mute}
              p={'5px 5px'}
              fontSize={'xl'}
              onClick={speak}
              cursor={'pointer'}
              // Call speak function on click
            />     
          }
        </Box>
      </Box>

      <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} direction={'row'} spacing={'5'} w={'100%'} p={5}>
        <FormControl id="date" mb={2} width={'10rem'}>
          <FormLabel>Date</FormLabel>
          <Input
            type="date"
            name="date"
            value={diaryData.date}
            onChange={handleChange}
            placeholder="Enter date"
          />
        </FormControl>

        <FormControl id="specialNote" mb={4} width={'15rem'}>
          <FormLabel>Special Note</FormLabel>
          <Input
            name="specialNote"
            value={diaryData.specialNote}
            onChange={handleChange}
            placeholder="Enter any special notes"
          />
        </FormControl>
      </Box>

      <FormControl id="story" mb={2} pl={5} pr={5}>
        <FormLabel>Story</FormLabel>
        <Textarea
          name="story"
          value={diaryData.story}
          onChange={handleChange}
          rows={10}
          placeholder="Enter your story"
          required
        />
      </FormControl>

      <Button colorScheme="teal" onClick={handleSubmit} w={'30%'} mb={5} ml={5}>
        {isEdit ? 'Update' : 'Create'}
      </Button>
    </Box>
    </Box>
  );
}
