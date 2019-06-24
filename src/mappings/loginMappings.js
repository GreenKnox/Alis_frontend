// src/mappings/loginMappings.js

import { connect } from 'react-redux';
import Login from '../Login';

const mapStateToProps = state => {
  return {
    message: state.message,
    token: state.token
  };
};

export default connect(mapStateToProps)(Login);