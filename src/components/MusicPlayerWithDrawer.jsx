import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  Text,
  Image,
  Flex,
  SimpleGrid,
  Stack,
  Heading,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  DrawerOverlay,
} from "@chakra-ui/react";
import { FaPause, FaPlay, FaStepBackward, FaStepForward } from "react-icons/fa";

const MusicPlayerWithDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <Box mt={5} mb={5}>
      <MusicPlayer onOpenDrawer={onOpen} btnRef={btnRef} isDrawerOpen={isOpen} onCloseDrawer={onClose} />
      {/* Drawer content */}
      <Drawer isOpen={isOpen} placement='right' onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>D</DrawerHeader>
          <DrawerBody>
            <SuggestiveSongsList onSongClick={(idx) => console.log('Clicked song:', idx)} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

const SuggestiveSongsList = ({ musicList, onSongClick }) => (
  <Box
    display={"flex"}
    alignItems={"center"}
    justifyContent={"start"}
    flexDir={"column"}
    w={"100%"}
    gap={2}
  >
    {musicList.map((song, idx) => (
      <Box
        key={idx}
        p={1}
        borderRadius="md"
        borderColor="gray.300"
        border={"2px solid"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"start"}
        onClick={() => onSongClick(idx)}
        gap={6}
        w={"100%"}
      >
        <Image src={song.img} borderRadius="md" width={10} />
        <Stack gap={"0.1rem"}>
          <Text fontSize="sm" color="white">
            {song.name}
          </Text>
          <Text fontSize="xs" color="white">
            {song.author}
          </Text>
        </Stack>
      </Box>
    ))}
  </Box>
);

export default MusicPlayerWithDrawer;
