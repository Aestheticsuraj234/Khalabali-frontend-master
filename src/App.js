import React, { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import theme from "./theme";
// import PublicRoute from "./components/PublicRoute";

import PrivateRoute from "./routes/PrivateRoute";
import HomePage from "./components/posts/HomePage";
import Navbar from "./components/navbar/Navbar";
import CommentsPage from "./components/posts/CommentsPage";
import LoginPage from "./components/login/LoginPage";
import RegisterPage from "./components/login/RegisterPage";
import CreatePostPage from "./components/posts/CreatePostPage";
import PostList from "./components/posts/PostList";
import ThemedBox from "./components/ThemedBox";
import CreateSubredditPage from "./components/posts/CreateSubredditPage";
import GoogleAuthToken from "./components/login/GoogleAuthToken";
import ResetPassword from "./components/login/ResetPassword";
import ForgotPassword from "./components/login/ForgotPassword";
import PageCategories from "./components/pages/PageCategories";
import Activity from "./components/pages/Activity";
import Loading from "./components/Loading";
import Profile from './components/Profile/Profile'

// lazy component import
const Categories = lazy(() => import("./components/categories/Categories"));
const TrendingAbout = lazy(() => import("./components/trending/TrendingAbout"));
const TrendingGuideline = lazy(() =>
  import("./components/trending/TrendingGuideline")
);
const TrendingFaq = lazy(() => import("./components/trending/TrendingFaq"));
const TermsOfServices = lazy(() =>
  import("./components/trending/TermsOfServices")
);
const TrendingPrivacy = lazy(() =>
  import("./components/trending/TrendingPrivacy")
);
const New = lazy(() => import("./components/new/New"));

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <ThemedBox minHeight="100vh" light="gray.300" dark="gray.800">
          <Navbar />
          <Flex display={"flex"} justifyContent="center">
            <Flex width={["92%", "80%"]} mb={10} justifyContent="center">
              <Routes>
                <Route
                  path="/r/:subreddit/comments/:id"
                  element={<CommentsPage />}
                />

                <Route
                  path="/categories"
                  element={
                    <React.Suspense fallback={<Loading />}>
                      <Categories />
                    </React.Suspense>
                  }
                />

                <Route
                  path="/trending/about"
                  element={
                    <React.Suspense fallback={<Loading />}>
                      <TrendingAbout />
                    </React.Suspense>
                  }
                />

                <Route
                  path="/trending/guidelines"
                  element={
                    <React.Suspense fallback={<Loading />}>
                      <TrendingGuideline />
                    </React.Suspense>
                  }
                />

                <Route
                  path="/trending/guidelines"
                  element={
                    <React.Suspense fallback={<Loading />}>
                      <TrendingGuideline />
                    </React.Suspense>
                  }
                />

                <Route
                  path="/trending/terms"
                  element={
                    <React.Suspense fallback={<Loading />}>
                      <TermsOfServices />
                    </React.Suspense>
                  }
                />

                <Route
                  path="/trending/faq"
                  element={
                    <React.Suspense fallback={<Loading />}>
                      <TrendingFaq />
                    </React.Suspense>
                  }
                />
                <Route
                  path="/trending/privacy"
                  element={
                    <React.Suspense fallback={<Loading />}>
                      <TrendingPrivacy />
                    </React.Suspense>
                  }
                />
                <Route path="/pages" element={<Activity />} />

                <Route path="/pages/activity" element={<Activity />} />
                <Route path="/pages/categories" element={<PageCategories />} />

                <Route
                  path="/new"
                  element={
                    <React.Suspense fallback={<Loading />}>
                      <New />
                    </React.Suspense>
                  }
                />

                <Route exact={true} path="/login" element={<LoginPage />} />

                <Route
                  exact={true}
                  path="/register"
                  element={<RegisterPage />}
                />

                <Route path="/submit" element={<PrivateRoute />}>
                  <Route path="/submit" element={<CreatePostPage />} />
                </Route>
                <Route path="/subreddits/create" element={<PrivateRoute />}>
                  <Route
                    path="/subreddits/create"
                    element={<CreateSubredditPage />}
                  />
                </Route>
                <Route path="/Profile" element={<PrivateRoute />}>
                  <Route
                    path="/Profile"
                    element={<Profile />}
                  />
                </Route>

                <Route path="/forgotPassword/*" element={<ForgotPassword />} />

                <Route path="/resetpassword/:id" element={<ResetPassword />} />

                <Route path="/r/:subreddit" element={<PostList />} />

                <Route path="/" element={<HomePage />} />

                <Route path="/token/:token" element={<GoogleAuthToken />} />
              </Routes>
            </Flex>
          </Flex>
        </ThemedBox>
      </Router>
    </ChakraProvider>
  );
}

export default App;
