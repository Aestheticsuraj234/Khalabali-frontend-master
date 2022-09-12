import React from 'react';
import { Flex, CircularProgress } from '@chakra-ui/react';

const Loading = () => {
  return (
    <Flex m={10} justifyContent="center" alignItems="center">
        <CircularProgress isIndeterminate />
      </Flex>
  )
}
export default Loading;