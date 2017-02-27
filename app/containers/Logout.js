import { connect } from 'react-redux';
import { userLogout } from '../actions/actions';
import Logout from '../components/Logout';
import socket from '../main';
import Exponent from 'exponent';


const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => {
    	console.log('DISPATCH LOGOUT')
      dispatch(userLogout());
      Exponent.WebBrowser.openBrowserAsync('https://originalorcs.auth0.com/v2/logout');
      Exponent.WebBrowser.dismissBrowser();
      Exponent.Util.reload();
    },
  };
};

const LogoutButton = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Logout);

export default LogoutButton;