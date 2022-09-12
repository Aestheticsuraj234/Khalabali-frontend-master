import { connect } from 'react-redux';
import {Navigate, Outlet} from 'react-router-dom'
import { tokenSelector } from '../states/selectors';

const PrivateRoute = ({token, children, ...rest }) => {

  return (token?<Outlet/>: <Navigate to="/login"/>);
};

// token from redux
const mapStateToProps = (state) => ({
  token: tokenSelector(state),
});

export default connect(mapStateToProps)(PrivateRoute);