import React from "react";
import ReactNotification from "react-notifications-component";

export default class Notification extends React.Component {
    constructor(props) {
        super(props);
        this.notificationDOMRef = React.createRef();
    }

    addNotification = ({title, message, type, position, delay}) => {
        this.notificationDOMRef.current.addNotification({
            title: "Awesomeness",
            message: "Awesome Notifications!",
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {duration: 9000},
            dismissable: {click: true}
        });
    };

    render() {
        return (
            <div className="app-content">
                <ReactNotification ref={this.notificationDOMRef}/>
                <button onClick={this.addNotification} className="btn btn-primary">
                    Add Awesome Notification
                </button>
            </div>
        );
    }
}
