import React from 'react'
import { Box ,
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
     import {AiOutlinePlus} from 'react-icons/ai'
     import ProfileTabs from './ProfileTabs'

const Profile =  (
  
) => {
    
  return (
    <>
     <ProfileTabs/>
    
      {/* second box for adding Tabs Variants and user Profile */}
      <Box  boxShadow='xs'  position='relative' width="40%" height={450}  left='380' top='35' border='1px' borderRadius={'md'} >

 
  <Image
  borderRadius='full'
  boxSize='80px'
  src='	https://www.artnews.com/wp-content/uploads/2021/08/BAYC-8746.png'
  alt='Dan Abramov'
  m={2}
  position='relative'
  top='23px'
 />
 
 <Flex>
 <Box mt={8} mb={1} ml={2} display='flex' alignItems='baseline'>

       <Badge borderRadius='full' px='2' colorScheme='yellow'>
             ALEX WASHINGTON👋 
        </Badge>  
           <Spacer/> 

         <Icon position='absolute' right='0' fontSize={20} mr={2} as={IoMdSettings} />
            

 </Box>       
    </Flex>
    <Center>

    <Button  mt={1}  borderRadius='full'  size='lg' width='70%' position='relative'  bgGradient='linear(to-r, blue.400, blue.600)' variant='outline'>
    Create Avatar
  </Button>
  </Center>

  <Flex direction='row' justify='space-between'>

  <Box mt={4} mb={1} ml={6} display='flex' alignItems='baseline'>

  <Flex direction='column'>
  <Text fontSize={'xl'} fontWeight={600}>
  Karma
  </Text>

<Flex direction='row' mt={2}>
    <Icon fontSize={'sm'} position='relative'  bottom={1} as={FaDharmachakra}/>   
  <Text fontSize={'sm'} mr={2} ml={1} position='relative' bottom={1.5} fontWeight={300}>
  1
  </Text>
</Flex>  
  </Flex>
  
  </Box>

  <Box mt={4} mb={1} mr={6} display='flex' alignItems='baseline'>

  <Flex direction='column'>
  <Text fontSize={'xl'} fontWeight={600}>
  Cake-day
  </Text>

<Flex direction='row' mt={2}>
    <Icon fontSize={'sm'} position='relative'  bottom={1} as={GiCakeSlice}/>   
  <Text fontSize={'sm'} mr={2} ml={1} position='relative' bottom={1.5} fontWeight={300}>
  22 sep 2022
  </Text>
</Flex>  
  </Flex>
  
  </Box>
  </Flex>
  




  <Flex direction='row' mt={2}>
  <Button  mt={1}  borderRadius='full'  ml={2} size='lg'  position='relative'  bgGradient='linear(to-r, black.400, white.600)' variant='outline'>
  <Icon fontSize={'sm'} position='relative' m={2} top={1} left={0} right={0} bottom={2} as={AiOutlinePlus}/>       
Add Social Links
  </Button>
</Flex>  
 
            <Center>

          <Button  mt={3}  borderRadius='full'  colorScheme='blue' size='lg' width='90%' position='relative'>
          NEW POST
          </Button>
          </Center>




 
 
    </Box>

    </>
  )
}

  

export default Profile