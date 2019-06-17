// src/mappings/registerMappings.js

import { connect } from 'react-redux';
import passwordReset from '../passwordReset';

const mapStateToProps = state => {
  return {
    message: state.message,
    token: state.token
  };
};


export default connect(mapStateToProps)(passwordReset);