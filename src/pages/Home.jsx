import { Box, Heading, Img } from '@chakra-ui/react'
import React from 'react'
import DiaryList from '../components/DiaryList'
import bg1 from '../components/assets/bg1.jpg'
import { useNavigate } from 'react-router-dom'; 
import an1 from '../components/assets/an1.gif'
import write from '../components/assets/write.jpeg'
import night from '../components/assets/night.jpg'
import night2 from '../components/assets/night2.jpg'
export default function Home(){ 
         const navigate = useNavigate();
    return(
         <div className="Home">
                  <Box mt={7} mb={7} display={'flex'} alignItems={'center'} flexDir={'column'}>
                <Heading textAlign={'center'}> Welcome Dear Diary App </Heading>
                <Img width={'10%'} src={an1}/>
         <Heading size={'md'} mt={3}  textAlign={'center'}> Now create your diaries in an interactive way   </Heading>
                  </Box>
                  <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} flexWrap={'wrap'} w={'100%'}>
                
                  <Img src={bg1} minW={'40%'} maxW={'50%'}/>


          <Box display={'flex'} alignItems={'center'} flexDir={'column'} justifyContent={'center'} w={'50%'} gap={5} height={'100%'} aspectRatio={'1/1'}>
                   <Box display={'flex'} alignItems={'center'} justifyContent={'center'} w={'100%'} gap={5} height={'50%'} aspectRatio={'1/1'}>
                   <Box 
  position="relative" 

  width={'50%'} 
  textAlign={'center'} 
  display={'flex'} 
  alignItems={'center'} 
  justifyContent={'center'} 
  borderRadius={'10px'} 
  fontSize={'2xl'} 
  pt={7} 
  pb={7} 
  backdropFilter= {'blur(8px)'}
  height={'88%'} 
  transition={'all ease 0.5s'} 
  overflow="hidden"
  _hover={{ 
    _before: {
      content: '"Create"', 
      color: 'black', 
      fontSize: '5xl', 
      fontFamily: "Merienda",
      display: 'block', 
      position: 'absolute', 
      width:'100%',
      height:'100%',
      top: '0', 
      left: '0', 
      // transform: 'translate(-50%, -50%)',
      zIndex: 2,
    }, 
    transform: 'scale(1.2)',
    cursor: "pointer" 
  }} 
  onClick={() => navigate('/diaries/create')} 
  backgroundImage={write} 
  backgroundSize={'cover'} 
  _before={{ 
    content: '""', 
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    background: 'transparent', 
    zIndex: 1, 
    transition: 'all ease 0.5s' 
  }}
> 
  {/* Empty text or any other content if needed */}
</Box>

<Box 
  position="relative" 

  width={'50%'} 
  textAlign={'center'} 
  display={'flex'} 
  alignItems={'center'} 
  justifyContent={'center'} 
  borderRadius={'10px'} 
  fontSize={'2xl'} 
  pt={7} 
  pb={7} 
  backdropFilter= {'blur(8px)'}
  height={'88%'} 
  transition={'all ease 0.5s'} 
  overflow="hidden"
  _hover={{ 
    _before: {
      content: '"Read"', 
      color: 'white', 
      fontSize: '5xl', 
      fontFamily: "Merienda",
      display: 'block', 
      position: 'absolute', 
      width:'100%',
      height:'100%',
      top: '0', 
      left: '0', 
      // transform: 'translate(-50%, -50%)',
      zIndex: 2,
    }, 
    transform: 'scale(1.2)',
    cursor: "pointer" 
  }} 
  onClick={() => navigate('/diaries')} 
  backgroundImage={night} 
  backgroundSize={'cover'} 
  _before={{ 
    content: '""', 
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    background: 'transparent', 
    zIndex: 1, 
    transition: 'all ease 0.5s' 
  }}
> 
  {/* Empty text or any other content if needed */}
</Box>
                         </Box>
                       {/* <Box 
                       background={'grey'} textAlign={'center'} w={'100%'}
                         borderRadius={'10px'}
                         fontSize={'2xl'}
                         display={'flex'} alignItems={'center'}
                         justifyContent={'center'}
                         pt={5}
                         height={'29%'}
                         pb={5}
                         transition={'all ease 0.5s'}
                         _hover={{ transform: 'scale(1.2)' , cursor:"pointer" }}
                         onClick={()=> navigate('/diaries')}
                         backgroundImage={night2}
                         backgroundSize={'cover'}
                          backgroundPosition={'0rem -2rem'}
                       > Delete </Box> */}


<Box 
  position="relative" 

  width={'100%'} 
  textAlign={'center'} 
  display={'flex'} 
  alignItems={'center'} 
  justifyContent={'center'} 
  borderRadius={'10px'} 
  fontSize={'2xl'} 
  pt={7} 
  pb={7} 
  backdropFilter= {'blur(8px)'}
  height={'35%'} 
  transition={'all ease 0.5s'} 
  overflow="hidden"
  _hover={{ 
    _before: {
      content: '"Delete"', 
      color: 'black', 
      fontSize: '5xl', 
      fontFamily: "Merienda",
      display: 'block', 
      position: 'absolute', 
      width:'100%',
      height:'100%',
      top: '0', 
      left: '0', 
      // transform: 'translate(-50%, -50%)',
      zIndex: 2,
    }, 
    transform: 'scale(1.2)',
    cursor: "pointer" 
  }} 
  onClick={() => navigate('/diaries')} 
  backgroundImage={night2} 
  backgroundSize={'cover'} 
  _before={{ 
    content: '""', 
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    background: 'transparent', 
    zIndex: 1, 
    transition: 'all ease 0.5s' 
  }}
> 
  {/* Empty text or any other content if needed */}
</Box>
                    </Box>
                    </Box>
                  
                     
 
                      {/* Recent Diaries */}
                    
                          <DiaryList/>  
                     
         </div>
    )
}