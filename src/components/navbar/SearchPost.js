import React from 'react'
import { Stack, InputGroup, InputLeftElement, Input } from '@chakra-ui/react';
import { SearchIcon } from "@chakra-ui/icons";
import { useSearchParams } from "react-router-dom";



const SearchPost = () => {
    // setting search parameters
    const [searchParams, setSearchParams] = useSearchParams('');

    // on click enter setting search params
    const handleKeyDown =(e)=>{
        if(e.key === 'Enter'){
            setSearchParams({search:e.target.value.toLowerCase()})
        }
    }

  return ( 
    <Stack spacing={4}>
        <InputGroup>
        <InputLeftElement
            pointerEvents='none'
            children={<SearchIcon color='gray.300' />}
        />
        <Input type='search'
         placeholder='Search'  
         onKeyDown={handleKeyDown}
         />
        </InputGroup>
    </Stack>
  )
}

export default SearchPost;
