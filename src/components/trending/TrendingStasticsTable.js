import React from 'react'
import {Tr, Th, ListItem} from "@chakra-ui/react";

const TrendingStasticsTable = (props) => {
    const {id, topic, allTimeview, last7, last30}=props

  return (
    <ListItem key={id}>
        <Tr>
            <Th >{topic}</Th>
            <Th >{allTimeview}</Th>
            <Th>{last7}</Th>
            <Th>{last30}</Th>
        </Tr>
    </ListItem>
  )
}

export default TrendingStasticsTable