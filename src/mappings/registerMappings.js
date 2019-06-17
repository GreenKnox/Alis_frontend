// src/mappings/registerMappings.js

import { connect } from 'react-redux';
import Register from '../Register';

const mapStateToProps = state => {
  return {
    message: state.message,
    token: state.token
  };
};


export default connect(mapStateToProps)(Register);