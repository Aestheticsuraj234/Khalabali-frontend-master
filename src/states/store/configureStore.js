import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import authReducer from "../reducers/auth";
import loadingReducer from "../reducers/loading";
import errorReducer from "../reducers/error";
import postReducer from "../reducers/post";
import postListReducer from "../reducers/postList";
import commentsReducer from "../reducers/comments";
import { saveState } from "../../localStorage";
import subredditsReducer from "../reducers/subreddits";
import totalPagesReducer from "../reducers/totalPages";
import editPostReducer from "../reducers/edit";
import deleteIdReducer from "../reducers/delete";

// for redux web develop tool
const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
// combine reducers
const configureStore = () => {
  const rootReducer = combineReducers({
    auth: authReducer,
    loading: loadingReducer,
    error: errorReducer,
    post: postReducer,
    postList: postListReducer,
    comments: commentsReducer,
    subreddits: subredditsReducer,
    totalPages: totalPagesReducer,
    editpost: editPostReducer,
    deleteId: deleteIdReducer,
  });

  // store in redux
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );

  // saving auth state in local storage
  store.subscribe(() => {
    saveState(store.getState().auth, "authState");
  });

  return store;
};

const store = configureStore();

export default store;
