import React, {Component} from 'react';
import '../css/App.css';
import * as env from '../config'


export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      url: env.API_URL
    }

  }

  render() {
    return (
      <div>
        {this.state.url}
      </div>

    )
  }
}


