import React, { useEffect, useState, useRef } from 'react';
import { Heading, Box, Text, Button, Stack, Spinner, Alert, AlertIcon, Badge, InputGroup, InputLeftElement, Input } from '@chakra-ui/react';
import { getDiaries, deleteDiary } from '../services/api'; // Assuming your API functions are here
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { SearchIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

export default function DiaryList() {
  const [diaries, setDiaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchDate, setSearchDate] = useState('');  // State for search input
  const [isOpen, setIsOpen] = useState(false); // State for controlling modal
  const [selectedDiaryId, setSelectedDiaryId] = useState(null); // ID of diary to delete
  const cancelRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const response = await getDiaries();
        setDiaries(response.data.diaries);
      } catch (error) {
        setError('Failed to fetch diaries. Please try to create a diary ');
      } finally {
        setLoading(false);
      }
    };

    fetchDiaries();
  }, []);

  const handleDelete = async () => {
    try {
      await deleteDiary(selectedDiaryId);
      setDiaries(diaries.filter(diary => diary._id !== selectedDiaryId)); // Remove deleted diary from state
    } catch (error) {
      setError('Failed to delete diary. ');
    } finally {
      setIsOpen(false); // Close the modal after deletion
    }
    navigate('/diaries');
  };

  const handleView = (id) => {
    navigate(`/diary/${id}`); // Navigate to diary detail page
  };

  const openDeleteConfirmation = (id) => {
    setSelectedDiaryId(id);
    setIsOpen(true); // Open confirmation modal
  };

  const truncateStory = (story, maxLength) => {
    return story.length > maxLength ? story.slice(0, maxLength) + "..." : story;
  };

  // Filter diaries based on the searchDate input
  const filteredDiaries = diaries.filter((diary) =>
    diary.date.includes(searchDate)
  );

  return (
    <div className="DiaryList">
      <Box p={6} className="DiaryList" width={'100%'}>
        <Heading as="h1" mb={6} textAlign={'center'} mt={10}>Recent Diaries</Heading>

        {/* Date Picker Search Bar */}
        <InputGroup mb={6} width="full" maxW="400px" mx="auto">
          <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
          <Input 
            type="date"  // Change input type to "date"
            value={searchDate} 
            onChange={(e) => setSearchDate(e.target.value)}  // Update search input state
          />
        </InputGroup>

        {loading ? (
          <Spinner size="xl" />
        ) : error ? (
          <Alert status="error" mb={6}>
            <AlertIcon />
            {error}
          </Alert>
        ) : filteredDiaries.length === 0 ? (
          <Text>No diaries found.</Text>
        ) : (
          <Stack spacing={4}>
            {filteredDiaries
              .slice() // Create a shallow copy of the array to avoid mutating the original state
              .reverse() // Reverse the array to display the latest diaries first
              .map((diary) => (
                <Box 
                  key={diary._id} 
                  p={4} 
                  borderWidth="1px" 
                  borderRadius="lg" 
                  boxShadow="md"  
                  onClick={() => handleView(diary._id)} 
                  cursor={'pointer'} 
                  className='moveDiv'
                >
                  <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}> 
                    <Text fontWeight="bold">{diary.date.substring(0, 10)}</Text>
                    <Text fontStyle="italic">
                      <Badge variant='subtle' colorScheme='green'>
                        {diary.specialNote}
                      </Badge>
                    </Text>
                  </Box>
                  <Text>
                    {truncateStory(diary.story, 150)} {/* Truncate the story to 150 characters */}
                  </Text>
                  <Box display={'flex'} alignItems={'center'} justifyContent={'end'}>
                    <Button
                      colorScheme="red"
                      size="sm"
                      mt={2}
                      ml={2}
                      p={'5px 5px'}
                      onClick={(e) => { 
                        e.stopPropagation(); // Prevent triggering handleView
                        openDeleteConfirmation(diary._id); // Open confirmation modal
                      }}
                    >
                      <MdDelete fontSize={'1.5rem'} />
                    </Button>
                  </Box>
                </Box>
              ))
            }
          </Stack>
        )}

        {/* Delete Confirmation Modal */}
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={() => setIsOpen(false)}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Diary
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure you want to delete this diary? This action cannot be undone.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={handleDelete} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Box>
    </div>
  );
}
