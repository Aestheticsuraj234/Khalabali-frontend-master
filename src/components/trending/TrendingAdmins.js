import React from "react";
import { Avatar, Wrap, WrapItem, VStack, Heading, Text} from '@chakra-ui/react'


const adminList=[
    {   id:1,
        admin:'Nitish',
        username:'nitish92'
    },
    {
        id:2,
        admin:'Taylor',
        username:'tails23'
    },
    {
        id:3,
        admin:'Kevin',
        username:'kelvin27'
    },
    {
        id:4,
        admin:'Green',
        username:'green36'
    },
    {
        id:5,
        admin:'Nitish',
        username:'nitish92'
    },
    {   id:6,
        admin:'Taylor',
        username:'tails23'
    },
    {
        id:7,
        admin:'Kevin',
        username:'kelvin27'
    },
    {   id:8,
        admin:'Green',
        username:'green36'
    },
    {
        id:9,
        admin:'Nitish',
        username:'nitish92'
    },
    {
        id:10,
        admin:'Taylor',
        username:'tails23'
    },
    {
        id:11,
        admin:'Kevin',
        username:'kelvin27'
    },
    {
        id:12,
        admin:'Green',
        username:'green36'
    }
]

function TrendingAdmins() {
  return (
    <Wrap>
    {adminList.map((eachAdmin) =>(
        <WrapItem m={5} p={5} key={eachAdmin.id}>
            <Avatar name={eachAdmin.admin} mr={3} />
            
            <VStack>
                <Heading as='h1' size='sm' textAlign={"left"}>
                    {eachAdmin.admin}
                </Heading>
                <Text size='sm' textAlign={"left"}>
                    @{eachAdmin.username}
                </Text>

            </VStack>

        </WrapItem>
))}
    </Wrap>
  );
}

export default TrendingAdmins;
