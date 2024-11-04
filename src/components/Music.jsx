import React from "react";
import {
  Box,
  Button,
  Text,
  Image,
  Flex,
  Stack,
  Heading,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
  DrawerOverlay,
} from "@chakra-ui/react";
import { FaPause, FaPlay, FaStepBackward, FaStepForward } from "react-icons/fa";
import { BiSolidPlaylist } from "react-icons/bi";
import s1 from '../components/songs/s1.mp3';
import s2 from '../components/songs/s2.mp3';
import s3 from '../components/songs/s3.mp3';
import s4 from '../components/songs/s4.mp3';
import s5 from '../components/songs/s5.mp3';
import s6 from '../components/songs/s6.mp3';
import s7 from '../components/songs/s7.mp3';

class MusicPlayer extends React.Component {
  state = {
    index: 0,
    currentTime: "0:00",
    isDrawerOpen: false,  // Manage drawer state in the class
    musicList: [
      {
        name: "Stellar Catharsis",
        author: "Royalty",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Record-Album-02.jpg/330px-Record-Album-02.jpg",
        audio:s1,
        duration: "2:02",
      },
      {
        name: "Vanishing hope",
        author: "Acoustic",
        img: "https://www.bensound.com/bensound-img/sunny.jpg",
        audio: s2,
        duration: "2:20",
      },
      {
        name: "Relaxing",
        author: "Corporate",
        img: "https://www.bensound.com/bensound-img/energy.jpg",
        audio: s3,
        duration: "2:59",
      },
      {
        name: "Slow cinematic",
        author: "Royalty",
        img: "https://www.bensound.com/bensound-img/slowmotion.jpg",
        audio: s4,
        duration: "3:26",
      },
      {
        name: "Slow cinematic",
        author: "Royalty",
        img: "https://www.bensound.com/bensound-img/buddy.jpg",
        audio: s5,
        duration: "3:26",
      },
      {
        name: "Slow cinematic",
        author: "Royalty",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Compact_disc_album.jpg/330px-Compact_disc_album.jpg",
        audio: s6,
        duration: "3:26",
      },
      {
        name: "Slow cinematic",
        author: "Royalty",
        img: "https://cdn.bensound.com/image/cover/relaxing.webp",
        audio:s7,
        duration: "3:26",
      },
    ],
    isPlaying: false,
  };

  audioRef = React.createRef();

  componentDidMount() {
    this.audioRef.current.addEventListener("timeupdate", this.updateTime);
    this.audioRef.current.addEventListener("ended", this.nextSong);
  }

  componentWillUnmount() {
    this.audioRef.current.removeEventListener("timeupdate", this.updateTime);
    this.audioRef.current.removeEventListener("ended", this.nextSong);
  }

  updateTime = () => {
    const { currentTime } = this.audioRef.current;
    this.setState({ currentTime: this.formatTime(currentTime) });
  };

  formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  playPause = () => {
    const { isPlaying } = this.state;
    if (isPlaying) {
      this.audioRef.current.pause();
    } else {
      this.audioRef.current.play();
    }
    this.setState({ isPlaying: !isPlaying });
  };

  nextSong = () => {
    this.setState((prevState) => ({
      index: (prevState.index + 1) % prevState.musicList.length,
      isPlaying: false,
    }));
  };

  prevSong = () => {
    this.setState((prevState) => ({
      index:
        (prevState.index - 1 + prevState.musicList.length) %
        prevState.musicList.length,
      isPlaying: false,
    }));
  };

  // Functions to control the drawer state
  openDrawer = () => {
    this.setState({ isDrawerOpen: true });
  };

  closeDrawer = () => {
    this.setState({ isDrawerOpen: false });
  };

  render() {
    const { musicList, index, isPlaying, currentTime, isDrawerOpen } = this.state;
    const currentSong = musicList[index];

    return (
      <Box
        className="card"
        p={4}
        borderRadius="md"
        boxShadow="sm"
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        w={"100%"}
        flexDir={"row"}
         flexWrap={'wrap'}
      >
        <Box>
          <audio ref={this.audioRef} src={currentSong.audio} />
          <Flex flexDirection="row" flexWrap={"wrap"} alignItems="center" gap={5} justifyContent={"center"}
                background={'#000000c2'}
                p={'7px'}
                borderRadius={'17px'}
            
           >
            <Image src={currentSong.img} borderRadius="md" boxSize="100px" />
            <Flex flexDir={"column"} alignItems={"center"} gap={2}>
              <Text fontSize="l" color={'white'} mt={2}>
                {currentSong.name}
              </Text>
              <Heading size={"sm"} mt={1} color={'white'} >
                {currentTime} / {currentSong.duration}
              </Heading>
              <Flex mt={2} gap={1}>
                <Button onClick={this.prevSong} colorScheme="teal" size={"sm"} variant={'outline'}>
                  <FaStepBackward />
                </Button>
                <Button onClick={this.playPause} colorScheme="teal" size={"sm"}>
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </Button>
                <Button onClick={this.nextSong} colorScheme="teal" size={"sm"} variant={'outline'} >
                  <FaStepForward />
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Box>

        <Box     background={'#000000c2'}
                p={'12px'}
                borderRadius={'17px'}>
          <Text fontSize="xl" color="white">
            Suggestive Songs:
          </Text>
          <Button colorScheme="teal" onClick={this.openDrawer} rightIcon={<BiSolidPlaylist/>} variant={'solid'} >
            Open Playlist
          </Button>

          {/* Drawer for suggestive songs */}
          <Drawer isOpen={isDrawerOpen} placement="right" onClose={this.closeDrawer}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Suggestive Songs</DrawerHeader>
              <DrawerBody>
                <Box display={"flex"} flexDirection={"column"} gap={4}>
                  {musicList.map((song, idx) => (
                    <Box
                      key={idx}
                      p={2}
                      borderRadius="md"
                      border="2px solid"
                      borderColor="gray.300"
                      onClick={() => this.setState({ index: idx, isPlaying: true })}
                      display="flex"
                      alignItems="center"
                      gap={4}
                      cursor={'pointer'}
                      _hover={{background:"#319795" , color : "white"}}
                    >
                      <Image src={song.img} borderRadius="md" width={10} />
                      <Stack>
                        <Text fontSize="sm">
                          {song.name}
                        </Text>
                        <Text fontSize="xs">
                          {song.author}
                        </Text>
                      </Stack>
                    </Box>
                  ))}
                </Box>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Box>
      </Box>
    );
  }
}

export default MusicPlayer;
