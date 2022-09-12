// import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';
// import { tokenSelector } from '../selectors';

const PublicRoute = ({ children, ...rest }) =>{
  const authDetails= JSON.parse(localStorage.getItem('authState'))
  let token=''
  if (authDetails===null){
    token=undefined
  }
  else{
    token=authDetails.token
  }

  return(
    <Route {...rest}>{token ? <Redirect to="/" /> : children}</Route>
  );
} 

// const mapStateToProps = (state) => ({
//   token: tokenSelector(state),
// });

export default PublicRoute;
