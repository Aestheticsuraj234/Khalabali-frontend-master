import React from 'react'
import { Avatar, Wrap, WrapItem, VStack, Heading, UnorderedList, ListItem, Text} from '@chakra-ui/react'

const moderatorList=[
    {   id:101,
        moderator:'Nitish',
        username:'nitish92'
    },
    {
        id:102,
        moderator:'Taylor',
        username:'tails23'
    },
    {
        id:103,
        moderator:'Kevin',
        username:'kelvin27'
    },
    {
        id:104,
        moderator:'Green',
        username:'green36'
    },
    {
        id:105,
        moderator:'Nitish',
        username:'nitish92'
    },
    {
        id:106,
        moderator:'Taylor',
        username:'tails23'
    },
    {   id:107,
        moderator:'Kevin',
        username:'kelvin27'
    },
    {id:108,
        moderator:'Green',
        username:'green36'
    },
    {
        id:109,
        moderator:'Nitish',
        username:'nitish92'
    },
    {
        id:110,
        moderator:'Taylor',
        username:'tails23'
    },
    {
        id:111,
        moderator:'Kevin',
        username:'kelvin27'
    },
    {
        id:112,
        moderator:'Green',
        username:'green36'
    }
]
const TrendingModerators = () => {
  return (
    <Wrap>
    {moderatorList.map((eachModerator) =>(
        <WrapItem m={5} p={5} key={eachModerator.id}>
            <Avatar name={eachModerator.moderator} mr={3} />
            
            <VStack>
                <Heading as='h1' size='sm' textAlign={"left"}>
                    {eachModerator.moderator}
                </Heading>
                <Text size='sm' textAlign={"left"}>
                    @{eachModerator.username}
                </Text>

            </VStack>

        </WrapItem>
))}
    </Wrap>
  )
}
export default TrendingModerators
