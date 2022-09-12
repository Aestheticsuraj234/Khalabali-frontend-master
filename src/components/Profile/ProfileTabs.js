import React from 'react'
import Post from '../posts/Post'
import { Box ,
    Tabs, 
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Text,
    Flex,
    Spacer,
    Image,
    Badge,
    Icon,
    Button,
    Center
       } from '@chakra-ui/react'
       import {IoMdSettings} from 'react-icons/io'
       import {FaDharmachakra} from 'react-icons/fa'
       import {GiCakeSlice} from 'react-icons/gi'
       import {AiOutlinePlus,AiTwotoneFire,AiOutlineToTop} from 'react-icons/ai'
       import {ImNewTab} from 'react-icons/im'

     


      
       



const ProfileTabs = () => {
  return (
    <div>
          <Box bg='black.600'  position="absolute" top="20"  left="0" w='100%' p={4} color='white'>
      <Tabs align='start' border='[0.5px]' borderColor='gray.200'  >
  <TabList>

    {
    ['OverView','Posts','Saved','Hidden','UpVoted','DownVoted',"Awards-Received",'Awards-Given'].map((items)=>(
      <Tab fontWeight={700} fontSize={'md'}>{items}</Tab>
    )) 
   }
  

  </TabList>

  <TabPanels>
    <TabPanel>
    <Box  position='relative' mb={2} width="60%" height={50}  left='0' top='1' border='1px' borderRadius={'md'} >

    <Flex direction='row'  mx={3} my={2} px={6} justifyContent='space-between'>

      <Flex >
    <Icon fontSize={'lg'} position='relative' m={2}  bottom={1.6} as={ImNewTab}/>   
  <Text fontSize={'lg'} mr={2} ml={1}  position='relative' bottom={0.8} fontWeight={700}>
     NEW
  </Text>
  
  </Flex>

  <Flex>
   
    <Icon fontSize={'lg'} position='relative' m={2}  bottom={1.6} as={AiTwotoneFire}/>   
  <Text fontSize={'lg'} mr={2} ml={1}  position='relative' bottom={0.8} fontWeight={700}>
     HOT
  </Text>
  </Flex>

  <Flex>
    <Icon fontSize={'lg'} position='relative' m={2}  bottom={1.6} as={AiOutlineToTop}/>   
  <Text fontSize={'lg'} mr={2} ml={1}  position='relative' bottom={0.8} fontWeight={700}>
     TOP
  </Text>
  </Flex>


  </Flex>
  <Flex position ='relative' top={4} m={4}>
    <Post/>
  </Flex>  
  <Flex position ='relative' top={4} m={4}>
    <Post/>
  </Flex> 
  <Flex position ='relative' top={4} m={4}>
    <Post/>
  </Flex> 
    </Box>

    </TabPanel>
    <TabPanel>
      <p>two!</p>
    </TabPanel>
    <TabPanel>
      <p>three!</p>
    </TabPanel>
    <TabPanel>
      <p>three!</p>
    </TabPanel>
    <TabPanel>
      <p>three!</p>
    </TabPanel>
    <TabPanel>
      <p>three!</p>
    </TabPanel>
    <TabPanel>
      <p>three!</p>
    </TabPanel>
  </TabPanels>
</Tabs>
    </Box>

   

    </div>
  )
}

export default ProfileTabs