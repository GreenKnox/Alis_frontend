import React, {Component} from 'react';


const styles = {
    style1: {
        fontFamily: 'Lucida Sans Unicode',
        color: '#636e72'
    },
    style2: {
        marginTop: '10px',
    }
};

var errorTexts = {
    password: '',
    phone: '',
    fax: '',
    mobile: '',
    websiteaddress: '',
    error: false
};

export default class Register extends Component {

    constructor(props) {
        super(props);

        //todo store registration requirements into a object and call it wherever needed
        this.state = {
            firstname: '',
            lastname: '',
            username: '',
            password: '',
            passwordconfirmed: '',
            email: '',
            status: '',
            staffnumber: '',
            title: '',
            designation: '',
            companyid: '',
            division: '',
            address: '',
            phone: '',
            fax: '',
            mobile: '',
            websiteaddress: '',
            department: '',
            location: '',
            district: '',
            region: ''
        }
    }


    handleInputChange = (event) => {
        const target = event.target;
        const value = (target.type === 'checkbox') ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    };


    handleClearForm = () => {
        this.setState({
            firstname: '',
            lastname: '',
            username: '',
            password: '',
            passwordconfirmed: '',
            email: '',
            status: '',
            staffnumber: '',
            title: '',
            designation: '',
            companyid: '',
            division: '',
            address: '',
            phone: '',
            fax: '',
            mobile: '',
            websiteaddress: '',
            department: '',
            location: '',
            district: '',
            region: ''
        })
    };


    // regex to validate urls
    validateUrl = (value) => {
        return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
    };


    validateUser = () => {
        // initially set errorText.status to false
        errorTexts.status = false;
        // loop through state vars to check if specific fields meet requirements
        // set errorText.status to true if at least one does not meet its requirement 
        // set error message for specific field
        for (var temp in this.state) {
            switch (temp.name) {
                case "password":
                    if (temp.value.length < 8) {
                        errorTexts.password = "password length must be more than 8";
                        errorTexts.error = true
                    }
                    break;
                case "phone":
                    if (temp.value.length < 10) {
                        errorTexts.phone = "phone number must be more than 10";
                        errorTexts.error = true
                    }
                    break;
                case "fax":
                    if (temp.value.length < 10) {
                        errorTexts.fax = "fax number must be more than 10";
                        errorTexts.error = true
                    }
                    break;
                case "mobile":
                    if (temp.value.length < 10) {
                        errorTexts.mobile = "mobile number must be more than 10";
                        errorTexts.error = true
                    }
                    break;
                case "websiteaddress":
                    if (!this.validateUrl(temp.value)) {
                        errorTexts.websiteaddress = "incorrect website address\n"
                            + "url should be in the format 'https://www.example.com'";
                        errorTexts.error = true
                    }
                    break;
                default:
                    return temp;
            }
        }
    };


    sendRequest = (event) => {
        event.preventDefault();
        // check if user passwords match
        if (this.state.password.trim() === this.state.passwordconfirmed.trim()) {
            // validate user inputs to check if accepted values has been entered
            this.validateUser();
            // if errorTexts.status = false,  make post request to api and submit user details
            if (errorTexts.error === false) {
                this.props.registerUser(this.state);
                // this.handleClearForm()
            }
            else{
                //Display errors
                console.log(errorTexts)
            }

        }
        else {
            alert('Password Mismatch');
        }
    };


    render() {
        return (
            <div>
                <div className="login_wrapper col-md-6 ml-auto mr-auto">
                    <br />
                    <div className="shadow-lg p-3 mb-5 bg-white rounded">
                        <header>
                            <h4 style={styles.style1}>User registration Form</h4>
                        </header>
                        <br />

                        <form onSubmit={this.sendRequest} method="post">

                            <ul className="nav nav-tabs" role="tablist" id="myTab">
                                <li className="nav-item">
                                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home"
                                       role="tab" aria-controls="home" aria-selected="true">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile"
                                       role="tab" aria-controls="profile" aria-selected="false">Profile</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="contact-tab" data-toggle="tab" href="#contact"
                                       role="tab" aria-controls="contact" aria-selected="false">Contact</a>
                                </li>
                            </ul>

                            <div className="tab-content" id="myTabContent" style={styles.style2}>
                                <div className="tab-pane fade show active" id="home" role="tabpanel"
                                     aria-labelledby="home-tab">
                                    <div>
                                        <label>Firstname</label>
                                        <input type="text" className="form-control" placeholder="First Name"
                                               name="firstname" value={this.state.firstname}
                                               onChange={this.handleInputChange} required autoFocus/>
                                    </div>

                                    <br />

                                    <div>
                                        <label>Lastname</label>
                                        <input type="text" className="form-control" placeholder="Last Name"
                                               name="lastname" value={this.state.lastname}
                                               onChange={this.handleInputChange} required/>
                                    </div>

                                    <br />

                                    <div>
                                        <label>Username</label>
                                        <input type="text" className="form-control" placeholder="Username"
                                               name="username" value={this.state.username}
                                               onChange={this.handleInputChange} required/>
                                        <div>
                                            <br/>
                                            {/*<a href="#profile" className="btn btn-outline-success pull-right"*/}
                                            {/*   data-toggle="tab">Next</a>*/}
                                        </div>
                                    </div>

                                    <br />
                                </div>

                                <div className="tab-pane fade" id="profile" role="tabpanel"
                                     aria-labelledby="profile-tab">
                                    <div>
                                        <label>Password</label>
                                        <input type="password" className="form-control" placeholder="Password "
                                               name="password" value={this.state.password}
                                               onChange={this.handleInputChange} required/>
                                    </div>

                                    <br />

                                    <div>
                                        <label>Confirm Password</label>
                                        <input type="password" className="form-control" placeholder="Confirm Password "
                                               name="passwordconfirmed" value={this.state.passwordconfirmed}
                                               onChange={this.handleInputChange} required/>
                                    </div>

                                    <br />

                                    <div>
                                        <label>Email</label>
                                        <input type="text" className="form-control" placeholder="Email" name="email"
                                               value={this.state.email} onChange={this.handleInputChange} required/>
                                    </div>

                                    <br />

                                    <div>
                                        <label>Staff Number</label>
                                        <input type="text" className="form-control" placeholder="Staff number"
                                               name="staffnumber" value={this.state.staffnumber}
                                               onChange={this.handleInputChange} required/>
                                    </div>

                                    <br />

                                    <div>
                                        <label>Title</label>
                                        <input type="text" className="form-control" placeholder="Title" name="title"
                                               value={this.state.title} onChange={this.handleInputChange} required/>
                                    </div>

                                    <br />

                                    <div>
                                        <label>Designation</label>
                                        <input type="text" className="form-control" placeholder="Designation"
                                               name="designation" value={this.state.designation}
                                               onChange={this.handleInputChange} required/>
                                        <div>
                                            <br/>
                                            {/*<a href="#contact" className="btn btn-outline-success pull-right"*/}
                                            {/*   data-toggle="tab">Next</a>*/}
                                        </div>
                                    </div>
                                </div>

                                <div className="tab-pane fade" id="contact" role="tabpanel"
                                     aria-labelledby="contact-tab">
                                    <div>
                                        <label>Company ID</label>
                                        <input type="text" className="form-control" placeholder="Company ID"
                                               name="companyid" value={this.state.companyid}
                                               onChange={this.handleInputChange} required/>
                                    </div>

                                    <br />
                                    <div>
                                        <label>Division</label>
                                        <input type="text" className="form-control" placeholder="Division"
                                               name="division" value={this.state.division}
                                               onChange={this.handleInputChange} required/>
                                    </div>

                                    <br />
                                    <div>
                                        <label>Address</label>
                                        <input type="text" className="form-control" placeholder="Address" name="address"
                                               value={this.state.address} onChange={this.handleInputChange} required/>
                                    </div>

                                    <br />
                                    <div>
                                        <label>Phone</label>
                                        <input type="text" className="form-control" placeholder="Phone" name="phone"
                                               value={this.state.phone} onChange={this.handleInputChange} required/>
                                    </div>

                                    <br />
                                    <div>
                                        <label>Fax</label>
                                        <input type="text" className="form-control" placeholder="Fax" name="fax"
                                               value={this.state.fax} onChange={this.handleInputChange} required/>
                                    </div>

                                    <br />
                                    <div>
                                        <label>Mobile</label>
                                        <input type="text" className="form-control" placeholder="Mobile" name="mobile"
                                               value={this.state.mobile} onChange={this.handleInputChange} required/>
                                    </div>

                                    <br />
                                    <div>
                                        <label>Website Address</label>
                                        <input type="text" className="form-control" placeholder="Website Address"
                                               name="websiteaddress" value={this.state.websiteaddress}
                                               onChange={this.handleInputChange} required/>
                                    </div>

                                    <br />
                                    <div>
                                        <label>Department</label>
                                        <input type="text" className="form-control" placeholder="Department"
                                               name="department" value={this.state.department}
                                               onChange={this.handleInputChange} required/>
                                    </div>

                                    <br />
                                    <div>
                                        <label>Location</label>
                                        <input type="text" className="form-control" placeholder="Location"
                                               name="location" value={this.state.location}
                                               onChange={this.handleInputChange} required/>
                                    </div>

                                    <br />
                                    <div>
                                        <label>District</label>
                                        <input type="text" className="form-control" placeholder="District"
                                               name="district" value={this.state.district}
                                               onChange={this.handleInputChange} required/>
                                    </div>

                                    <br />
                                    <div>
                                        <label>Region</label>
                                        <input type="text" className="form-control" placeholder="Region" name="region"
                                               value={this.state.region} onChange={this.handleInputChange} required/>
                                    </div>

                                    <div>
                                        <br/>
                                        <div>
                                            <button className="btn btn-outline-success" type="submit" value="Submit">Register
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}




