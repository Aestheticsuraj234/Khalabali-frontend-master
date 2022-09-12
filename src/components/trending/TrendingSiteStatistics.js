import React from "react";
// import { Link } from 'react-router-dom';
import { Table, Thead, Tr, Th, TableContainer, Td, Tbody} from "@chakra-ui/react";
import "../../styles/postHeader.module.css";

const siteStastics = [
  {
    id:1,
    topic:'Topic',
    allTimeview: "22.5k",
    last7: 258,
    last30:'1.26k'
},
{ 
  id:2,
  topic:'Topic',
  allTimeview: "22.5k",
  last7: 258,
  last30:'1.26k'
},
{
  id:3,
  topic:'Topic',
  allTimeview: "22.5k",
  last7: 258,
  last30:'1.26k'
},
{
  id:4,
  topic:'Topic',
  allTimeview: "22.5k",
  last7: 258,
  last30:'1.26k'
},
{
  id:5,
  topic:'Topic',
  allTimeview: "22.5k",
  last7: 258,
  last30:'1.26k'
},
{
  id:6,
  topic:'Topic',
  allTimeview: "22.5k",
  last7: 258,
  last30:'1.26k'
},
{
  id:7,
  topic:'Topic',
  allTimeview: "22.5k",
  last7: 258,
  last30:'1.26k'
},
]
function TrendingSiteStatistics() {
  return (
    <div>
      <TableContainer>
        <Table variant='striped' colorScheme='green'>
          <Thead>
            <Tr>
              <Th >Topic</Th>
              <Th >All Time</Th>
              <Th>Last 7</Th>
              <Th>Last 30</Th>
            </Tr>
          </Thead>
          <Tbody>
          {siteStastics.map((eachTopic)=>(
              <Tr key={eachTopic.id}>
                  <Td >{eachTopic.topic}</Td>
                  <Td>{eachTopic.allTimeview}</Td>
                  <Td>{eachTopic.last7}</Td>
                  <Td>{eachTopic.last30}</Td>
              </Tr>
            )
          )}
          </Tbody>
        </Table>
             
      </TableContainer>
    </div>
  );
}

export default TrendingSiteStatistics;
