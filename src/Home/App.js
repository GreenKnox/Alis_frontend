import React, {Component} from 'react';
import '../css/App.css';


export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      user: {}
    };

  }

  render() {
    return (
      <div>
        Home
      </div>

    )
  }
}


