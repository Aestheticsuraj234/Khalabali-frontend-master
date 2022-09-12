import React from 'react'
import { Box, Heading, Text} from '@chakra-ui/react'
import TrendingNavbar from './TrendingNavbar' 

export const TrendingGuideline = () => {
  return (
    <Box width={'100%'}>
      <TrendingNavbar/>
        <Heading as='h1' size='sm' mb={3}>Community Rules</Heading>
        <Text>
        We invite you to join in, but do have a few rules. The rules and values below exist to help you understand what it means to be a member of the community and cover all aspects of community interaction on Envato forums, blogs, contests and events.
        We're committed to upholding them, and we hope you will be too.
        
        </Text>
    </Box>
  )
}
export default TrendingGuideline