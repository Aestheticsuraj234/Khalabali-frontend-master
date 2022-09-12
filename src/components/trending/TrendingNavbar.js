import { NavLink } from "react-router-dom"
import {
  List,
  UnorderedList,
} from '@chakra-ui/react'
import trendStyle from '../../styles/trendStyle.module.css'

const TrendingNavbar=()=>{
// className
  let activeStyle={
    textDecoration: "underline",
    fontSize: 'large',
    color: '#2e2eb8',
    fontWeight: '600',
  };
  let inActiveStyle={
    color:'#2e2eb8',
  }

  // jsx component  
    return(
        
      <UnorderedList className={trendStyle.navOptions} >
        <List mr={3}>
        <NavLink style={({ isActive }) =>
              isActive ? activeStyle : inActiveStyle
            } to="/trending/about">About</NavLink>
        </List>
        <List mr={3}>
        <NavLink style={({ isActive }) =>
              isActive ? activeStyle : inActiveStyle
            } to="/trending/guidelines">Guidelines</NavLink>
        </List>
        <List mr={3}>
        <NavLink style={({ isActive }) =>
              isActive ? activeStyle : inActiveStyle
            } to="/trending/faq">FAQ</NavLink>
        </List>
        <List display={['none', 'block']} mr={3}>
          <NavLink style={({ isActive }) =>
              isActive ? activeStyle : inActiveStyle
            } to='/trending/terms'>Terms of Service</NavLink></List>
        <List display={['none', 'block']} mr={3}>
          <NavLink style={({ isActive }) =>
              isActive ? activeStyle : inActiveStyle
            } to="/trending/privacy">Privacy</NavLink>
        </List>
      </UnorderedList>
  
    )
}

export default TrendingNavbar