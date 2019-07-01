import React, {Component} from 'react';
import axios from 'axios/index';
import '../css/App.css';
import * as env from "../config";


export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            token: localStorage["appState"] ? JSON.parse(localStorage["appState"]).user.token : "",
            email: localStorage["appState"] ? JSON.parse(localStorage["appState"]).user.email : "",
            user: {}
        };

    }

    componentDidMount() {
        axios.defaults.headers.common = {'Authorization': `Bearer ${this.state.token}`};
        axios.post(`${env.API_URL}/users/email`, {
            email: this.state.email
        })
            .then(response => {
                console.log(response);
                return response;
            })
            .then(json => {
                if (json.status === 200) {
                    this.setState({user: json.data.data});
                    console.log("You're logged in!");
                } else {
                    console.log("Login Failed!");
                }
            })
            .catch(error => {
                console.log(`An Error Occurred! ${error}`);
            });
    }

    render() {
        return (
            <div>
                Home

                {/*<div>*/}
                {/*    <button className="btn btn-outline-success" onClick={this.props.logoutUser}>Log Out*/}
                {/*    </button>*/}
                {/*</div>*/}
            </div>

        )
    }
}


