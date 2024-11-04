import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Text, Spinner, Alert, AlertIcon, Button, Img, AccordionPanel, AccordionIcon, AccordionButton, AccordionItem, Accordion, Heading } from '@chakra-ui/react';
import { getDiary } from '../services/api';
import { FaRegEdit, FaSpeakerDeck } from "react-icons/fa";
import CreateDiary from './CreateDiary';
import { CiMicrophoneOff, CiMicrophoneOn, CiSpeaker } from "react-icons/ci";
import buttonAnim from './assets/volume.gif'
import MusicPlayer from './Music';
import night2 from '../components/assets/musicBg.png'
import { GiSpeakerOff } from "react-icons/gi";
const DiaryDetail = () => {
  const { id } = useParams(); // Extract the diary ID from the route
  const [diary, setDiary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false); // Track if speech synthesis is active
  const synth = useRef(window.speechSynthesis); // Reference for speech synthesis
  const utterance = useRef(null); // To store the speech utterance

  useEffect(() => {
    const fetchDiary = async () => {
      try {
        const response = await getDiary(id); // Fetch diary from API by ID
        setDiary(response.data.diary);
      } catch (error) {
        setError('Failed to fetch diary');
      } finally {
        setLoading(false);
      }
    };

    fetchDiary();
  }, [id, isEdit]);

  const toggleEdit = () => setIsEdit(!isEdit);

  // Function to handle speech synthesis toggle
  const toggleSpeech = () => {
    if (isSpeaking) {
      synth.current.cancel(); // Stop speech
      setIsSpeaking(false);
    } else {
      // Set up the speech utterance and start speaking
      utterance.current = new SpeechSynthesisUtterance(diary.story);
      utterance.current.lang = 'hi-IN'; // Set language to Hindi accent
      utterance.current.pitch = 1;
      utterance.current.rate = 1;

      synth.current.speak(utterance.current);
      setIsSpeaking(true);

      // Set up event listeners to update the state when speech ends
      utterance.current.onend = () => {
        setIsSpeaking(false);
      };
    }
  };

  return (
    <Box display={'flex'} className='Details' alignItems={'center'} justifyContent={'center'} flexDir={'column'}>
 { !isEdit && <> 
 
  <Heading textAlign={'center'} size={'lg'} mt={5} mb={10}>  Now you can listen soothing music while reading !! </Heading>
  <Accordion defaultIndex={[0]} allowMultiple borderRadius={5} border={'1.5px solid grey'}  w={'100%'} >
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
     </>}  
      {loading ? (
        <Spinner size="xl" />
      ) : error ? (
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      ) : (
        (diary && !isEdit )&& (
          <Box p={6} mt={7}  display={'flex'} alignItems={'center'} justifyContent={'center'} flexDir={'column'} w={'100%'}>
          <Box borderWidth="1px" borderRadius="lg" p={4} boxShadow="md" w={'100%'}>

  

            <Box w={'100%'} display={'flex'} justifyContent={'space-between'} alignItems={'center'} flexWrap={'wrap'} gap={'1rem'}>
              <Text fontWeight="bold" background={'#EDF2F7'} p={'10px 0px'} textAlign={'center'} width={'7rem'} borderRadius={'6px'}>
                {diary.date.substring(0, 10)}
              </Text>
              <Box display={'flex'} alignItems={'center'} justifyContent={'end'} gap={5}>

                {
                   isSpeaking ? 
                  <Img src={buttonAnim}  onClick={toggleSpeech} width={'50px'} /> :
                   <Button onClick={toggleSpeech} 
                     borderRadius={'35px'}
                     p={'5px 5px'}
                     fontSize={'23px'}
                    > <GiSpeakerOff/>  </Button>
                }
         

         
                <Button onClick={toggleEdit} rightIcon={<FaRegEdit />}>
                  Edit
                </Button>
              </Box>
            </Box>
            <Text minH={'8rem'} background={'#EDF2F7'} marginTop={'1rem'} padding={'15px 15px'} borderRadius={'10px'}>
              {diary.story}
            </Text>
            {
              diary.specialNote && <Text fontStyle="italic" background={'#EDF2F7'} marginTop={'1rem'} width={'max-content'} padding={'7px 10px'} borderRadius={'10px'}>
              {diary.specialNote}
            </Text>
            }
            
          
          </Box>
    </Box>
        )
      )}
      {isEdit && <CreateDiary diary={diary} isEdit={isEdit} setIsEdit={setIsEdit} />}
    </Box>
  );
};

export default DiaryDetail;
