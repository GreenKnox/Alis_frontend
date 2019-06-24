import React, { Component } from 'react';
import './css/App.css';
import './css/index.css';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

import {
  Link,
} from 'react-router-dom'

const styles = {
  style1: {
    fontFamily: 'Lucida Sans Unicode',
    color: '#636e72'
  },
  style2: {
    marginTop: '10px',
  }
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.addNotification = this.addNotification.bind(this);
    this.notificationDOMRef = React.createRef();
  }

  addNotification() {
    this.notificationDOMRef.current.addNotification({
      title: "Awesomeness",
      message: "Awesome Notifications!",
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: { duration: 2000 },
      dismissable: { click: true }
    });
  }
  render() {
    return (
        <div>
          <div className="app-content">
          <ReactNotification ref={this.notificationDOMRef} />
          <button onClick={this.addNotification} className="btn btn-primary">
            Add Awesome Notification
          </button>
         </div>

        </div>
    )
  }
}









