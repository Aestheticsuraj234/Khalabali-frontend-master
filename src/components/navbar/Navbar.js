import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link, useLocation, NavLink } from "react-router-dom";
import { HamburgerIcon,EditIcon,DragHandleIcon } from "@chakra-ui/icons";
import navbar from "../../styles/navbar.module.css";
import logoWhite from "../../assets/logoWhite.png";
import SearchPost from "./SearchPost";
import { BiUserCircle } from 'react-icons/bi'
import { FiLogOut } from 'react-icons/fi'

import {
  
  Icon,
  Avatar,
  Wrap,
  WrapItem,
  Flex,
  IconButton,
  Heading,
  Spacer,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Alert,
  AlertIcon,
  CircularProgress,
  Image,
  useDisclosure,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import ThemedBox from "../ThemedBox";
import {
  userSelector,
  subredditsSelector,
  createLoadingAndErrorSelector,
} from "../../states/selectors";
import { startLogout } from "../../states/actions/auth";
import { getSubreddits } from "../../states/actions/subreddits";
import LoginAndRegisterButtons from "../login/LoginAndRegisterButtons";
// import LogOutButton from "./LogOutButton";

// functional component
const Navbar = ({
  subreddits,
  isLoading,
  error,
  user,
  startLogout,
  getSubreddits,
}) => {
  const location = useLocation();
  const subredditName = location.pathname.match(/r\/[^]+/);
  const navigate = useNavigate();

  const handleLogout = () => {
    startLogout();
    navigate("/login", { replace: true });
  };

  // request to get subreddit
  useEffect(() => {
    getSubreddits();
  }, []);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // className
  let activeStyle = {
    textDecoration: "underline",
    fontSize: "large",
    color: "#dbf1ed",
    fontWeight: "700",
  };
  // className
  let inActiveStyle = {
    color: "#dbf1ed",
  };

  // jsx component
  return (
    <ThemedBox
      py={["4", "6"]}
      px={[0, 0, 5, 5]}
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
      mb={[3, 5]}
      className={navbar.isScrolled}
    >
      <HStack spacing={[0, 0, 5, 5]}>
        {/* menu IconButton and options in mobile mode */}
    <Menu>
          <MenuButton
            fontWeight='{700}' fontSize='10pt' _hover={{bg:'blue.500'}} as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon className={navbar.menuIcon} />}
            variant="none"
            size="sm"
            color={"white"}
            className={navbar.menuBtn}
          />
          <MenuList>
            <MenuItem>
              <Link to="/categories">Categories</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/trending/about">Trending</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/new">New</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/pages">Pages</Link>
            </MenuItem>
            {!user ? (
              <>
                <MenuItem>
                  <Link to="/login">Login</Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/register">Sign Up</Link>
                </MenuItem>
              </>
            ) : null}
          </MenuList>
        </Menu>
        <Link to="/">
          <Image className={navbar.logo} src={logoWhite} alt="logo" />
        </Link>
        <Heading
          ml={[2, 4]}
          fontSize={["0.80em", "1.5em"]}
          color="white"
          fontWeight='{900}'  _hover={{bg:'blue.500'}} as={Link}
          to="/"
          className={navbar.logoTitle}
        >
          Khalbali
        </Heading>
        {/* home and subreddits */}
        <HStack>
          <Menu>
            <MenuButton
              mx={3}
              fontWeight='{700}' fontSize='10pt' _hover={{bg:'blue.500'}} as={Button}
              h={8}
              rightIcon={<ChevronDownIcon />}
              maxWidth={[20, 140]}
              overflow="hidden"
            >
              {subredditName || "Home"}
            </MenuButton>
            <MenuList>
              <MenuItem fontWeight='{700}' fontSize='10pt' _hover={{bg:'blue.500'}} as={Link} to="/">
                Home
              </MenuItem>
              <MenuDivider />

              {subreddits.map(({ name }) => (
                <MenuItem
                  key={name}
                  fontWeight='{700}' fontSize='10pt' _hover={{bg:'blue.500'}} as={Link}
                  to={`/r/${name}`}
                >{`r/${name}`}</MenuItem>
              ))}
              {error && (
                <Alert status="error">
                  <AlertIcon />
                  Error fetching subreddits
                </Alert>
              )}
              {isLoading && (
                <Flex justifyContent="center">
                  <CircularProgress isIndeterminate />
                </Flex>
              )}
            </MenuList>
          </Menu>
          {user && (
            <Button className={navbar.createPost} h={8} fontWeight='{700}' fontSize='10pt' _hover={{bg:'blue.500'}} as={Link} to="/submit">
              Create post
            </Button>
          )}
        </HStack>
        {/* desktop nav menu */}
        <HStack className={navbar.menuNavbar}>
          <UnorderedList className={navbar.desktopMenuList}>
            <ListItem className={navbar.desktopItem}>
              <NavLink
                to="/categories"
                style={({ isActive }) =>
                  isActive ? activeStyle : inActiveStyle
                }
              >
                Categories
              </NavLink>
            </ListItem>
            <ListItem className={navbar.desktopItem}>
              <NavLink
                to="/trending/about"
                style={({ isActive }) =>
                  isActive ? activeStyle : inActiveStyle
                }
              >
                Trending
              </NavLink>
            </ListItem>
            <ListItem className={navbar.desktopItem}>
              <NavLink
                to="/new"
                style={({ isActive }) =>
                  isActive ? activeStyle : inActiveStyle
                }
              >
                New
              </NavLink>
            </ListItem>
            <ListItem className={navbar.desktopItem}>
              <NavLink
                to="/pages"
                style={({ isActive }) =>
                  isActive ? activeStyle : inActiveStyle
                }
              >
                <Flex align="center" justifyContent="center">
                  <Menu isOpen={isOpen}>
                    <MenuButton onMouseEnter={onOpen} onMouseLeave={onClose}>
                      Pages
                    </MenuButton>
                    <MenuList onMouseEnter={onOpen} onMouseLeave={onClose}>
                      <MenuItem fontWeight='{700}' fontSize='10pt' _hover={{bg:'blue.500'}} as={Link} to="/" textColor="black">
                        Home
                      </MenuItem>
                      <MenuItem fontWeight='{700}' fontSize='10pt' _hover={{bg:'blue.500'}} as={Link} to="/New" textColor="black">
                        Create New Topic
                      </MenuItem>
                      <MenuItem fontWeight='{700}' fontSize='10pt' _hover={{bg:'blue.500'}} as={Link} to="/submit" textColor="black">
                        Login
                      </MenuItem>
                      <MenuItem
                        fontWeight='{700}' fontSize='10pt' _hover={{bg:'blue.500'}} as={Link}
                        to="/trending/about"
                        textColor="black"
                      >
                       
                        Trending
                      </MenuItem>
                      <MenuItem fontWeight='{700}' fontSize='10pt' _hover={{bg:'blue.500'}} as={Link} to="/register" textColor="black">
                        User Register
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
              </NavLink>
            </ListItem>
          </UnorderedList>
        </HStack>
        <SearchPost />
      </HStack>
      <Spacer />

      {user ? (
        <Menu>
          <Wrap>
            <WrapItem>
              <Avatar
                name={user.username}
                src=""
                h={[8, 10]}
                w={[8, 10]}
                ml={2}
              />
            </WrapItem>
          </Wrap>
          <MenuButton
            size="lg"
            transition="all 0.2s"
            borderRadius="md"
            borderWidth="0px"
            _hover={{ bg: "gray.400" }}
            _expanded={{ bg: "blue.400" }}
            _focus={{ boxShadow: "outline" }}
          >
            <ChevronDownIcon color={"white"} />
          </MenuButton>
          <MenuList>
            <MenuItem  >{user.username}</MenuItem>
            <MenuDivider/>
            <MenuItem fontWeight='{700}' fontSize='10pt' _hover={{bg:'blue.600',color:'white'}} as={Link} to="/submit">
            <Flex align='center'>
                <Icon fontSize={20} mr={2} as={EditIcon} />
            </Flex>
              Create post
            </MenuItem>
            <MenuDivider/>
            <MenuItem fontWeight='{700}' fontSize='10pt' _hover={{bg:'blue.600',color:'white'}} as={Link} to="/subreddits/create">
            <Flex align='center'>
                <Icon fontSize={20} mr={2} as={DragHandleIcon} />
            </Flex>
              Create subreddit
            </MenuItem>
            <MenuDivider/>
            <MenuItem fontWeight='{700}' fontSize='10pt' _hover={{bg:'blue.600',color:'white'}} as={Link} to="/Profile">
            <Flex align='center'>
                <Icon fontSize={20} mr={2} as={BiUserCircle} />
            </Flex>
                     Profile
            </MenuItem>
            <MenuDivider/>

           


            {/* <LogOutButton/> */}
            <MenuItem onClick={handleLogout}>
            <Flex align='center'>
                <Icon fontSize={20} mr={2} as={FiLogOut} />
            </Flex>
            Logout</MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Flex className={navbar.loginSignUpBtn}>
          <LoginAndRegisterButtons />
        </Flex>
      )}

      {/* {user ? <LogOutButton /> : <LoginAndRegisterButtons />} */}
      {/* <LoginAndRegisterButtons /> */}
      <ColorModeSwitcher />
    </ThemedBox>
  );
};

// redux selectors for loading and error messages
const { loadingSelector, errorSelector } = createLoadingAndErrorSelector([
  "GET_SUBREDDITS",
]);

// redux mapping state to props
const mapStateToProps = (state) => ({
  isLoading: loadingSelector(state),
  error: errorSelector(state),
  subreddits: subredditsSelector(state),
  user: userSelector(state),
});

// redux dispatch when called
const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout()),
  getSubreddits: () => dispatch(getSubreddits()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
