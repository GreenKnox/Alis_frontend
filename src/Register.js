import React, { Component } from 'react';
import axios from 'axios';
import { Route, Link, BrowserRouter, Redirect } from 'react-router-dom'

export default class Register extends Component {

    constructor(props) {
        super(props)


        this.handleFirstNameChange = this.handleFirstNameChange.bind(this)
        this.handleLastNameChange = this.handleLastNameChange.bind(this)
        this.handleUserNameChange = this.handleUserNameChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handlePasswordConfirmationChange = this.handlePasswordConfirmationChange.bind(this)
        this.handlePasswordChangedChange = this.handlePasswordChangedChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handleStatusChange = this.handleStatusChange.bind(this)
        this.handleStatusChange = this.handleStatusChange.bind(this)
        this.handleStaffNumberChange = this.handleStaffNumberChange.bind(this)
        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handleDesignationChange = this.handleDesignationChange.bind(this)
        this.handleCompanyIdChange = this.handleCompanyIdChange.bind(this)
        this.handleDivisionChange = this.handleDivisionChange.bind(this)
        this.handleAddressChange = this.handleAddressChange.bind(this)
        this.handlePhoneChange = this.handlePhoneChange.bind(this)
        this.handleFaxChange = this.handleFaxChange.bind(this)
        this.handleMobileChange = this.handleMobileChange.bind(this)
        this.handleWebsiteAddressChange = this.handleWebsiteAddressChange.bind(this)
        this.handleDepartmentChange = this.handleDepartmentChange.bind(this)
        this.handleLocationChange = this.handleLocationChange.bind(this)
        this.handleDistrictChange = this.handleDistrictChange.bind(this)
        this.handleRegionChange = this.handleRegionChange.bind(this)

        this.state = {
            first_name: '',
            last_name: '',
            username: '',
            password: '',
            password_confirmation: '',
            password_changed: '',
            email: '',
            status: '',
            staff_number: '',
            title: '',
            designation: '',
            company_id: '',
            division: '',
            address: '',
            phone: '',
            fax: '',
            mobile: '',
            website_address: '',
            department: '',
            location: '',
            district: '',
            region: ''
        }

        this.style1 = {
            fontFamily: 'Lucida Sans Unicode',
            color: '#636e72'
        }
        this.style2 = {
            fontFamily: 'Lucida Console',
            color: '#636e72'
        }
    }

    handleEmailChange(event) {
        const inputEmail = event.target.value
        this.setState({
            email: inputEmail
        })
    }

    handlePasswordChange(event) {
        const inputPassword = event.target.value
        this.setState({
            password: inputPassword
        })
    }

    validateUser() {

        if (this.state.email && this.state.password) {
            axios.get(`https://${this.state.password}/${this.state.password}`).then(
                res => {

                    if (res.code !== 200) {
                        console.log(`Looks like there was a problem. Status Code: ${res.status}`);
                        return;
                    }
                    else if (res.code === 400) {
                        this.setRedirect()
                        this.setState({
                            message: res.message,
                            errorCode: res.errorCode,
                            token: res.token

                        })
                    }
                }
            )

            console.log('verified');
        }
        else {
            console.log('some fields empty');
        }
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }
    }





    render() {
        return (
            <div>
                <div className="login_wrapper col-md-6 ml-auto mr-auto">
                    <br />
                        <div className="shadow-lg p-3 mb-5 bg-white rounded">
                            <header>
                                <h4 style={this.style1}>User registration Form</h4>
                            </header>
                            <br />

                            <form onSubmit={this.validateUser} method="post">

                                <ul className="nav nav-tabs" role="tablist" id="myTab">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Home</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Profile</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Contact</a>
                                    </li>
                                </ul>

                                <div className="tab-content" id="myTabContent" style="margin-top: 10px">
                                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div>
                                            <input type="text" className="form-control" placeholder="First Name" name="firstname" required="" />
                                        </div>
                                        
                                        <br/>

                                        <div>
                                            <input type="text" className="form-control" placeholder="Last Name" name="lastname" required="" />
                                        </div>

                                        <br />
                                        
                                        <div>
                                            <input type="text" className="form-control" placeholder="Username" name="username" required="" />
                                        </div>
                                        
                                         <br />
                                    </div>
                                
                                    <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                        <div>
                                            <input type="password" className="form-control" placeholder="Password " name="password" required="" />
                                        </div>
                                        
                                        <br />

                                        <div>
                                            <input type="password" className="form-control" placeholder="Confirm Password " name="confirmpassword" required="" />
                                        </div>
                                        
                                        <br />
                                
                                        <div>
                                            <input type="text" className="form-control" placeholder="Email" name="email" required="" />
                                        </div>
                
                                        <br />
                
                                        <div>
                                            <input type="text" className="form-control" placeholder="Created by" name="createdby" required="" />
                                        </div>
                                            
                                        <br />
        
                                        <div>
                                            <input type="text" className="form-control" placeholder="Staff number" name="staffnumber" required="" />
                                        </div>
            
                                        <br />

                                        <div>
                                            <input type="text" className="form-control" placeholder="Title" name="Title" required="" />
                                        </div>
                        
                                        <br />
                                        
                                        <div>
                                            <input type="text" className="form-control" placeholder="Designation" name="Designation" required="" />
                                        </div>
                                    </div>
                                                    
                                    <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                                        <div>
                                            <input type="text" className="form-control" placeholder="Company ID" name="CompanyID" required="" />
                                        </div>
                                        
                                        <br />
                                        <div>
                                            <input type="text" className="form-control" placeholder="Division" name="Division" required="" />
                                        </div>
                                        
                                        <br />
                                        <div>
                                            <input type="text" className="form-control" placeholder="Address" name="Address" required="" />
                                        </div>
                                        
                                        <br />
                                        <div>
                                            <input type="text" className="form-control" placeholder="Phone" name="Phone" required="" />
                                        </div>
                                        
                                        <br />
                                        <div>
                                            <input type="text" className="form-control" placeholder="Fax" name="Fax" required="" />
                                        </div>
                                        
                                        <br />
                                        <div>
                                            <input type="text" className="form-control" placeholder="Mobile" name="Mobile" required="" />
                                        </div>
                                        
                                        <br />
                                        <div>
                                            <input type="text" className="form-control" placeholder="Website Address" name="Website Address" required="" />
                                        </div>
                                        
                                        <br />
                                        <div>
                                            <input type="text" className="form-control" placeholder="Department" name="Department" required="" />
                                        </div>
                                        
                                        <br />
                                        <div>
                                            <input type="text" className="form-control" placeholder="Location" name="Location" required="" />
                                        </div>
                                        
                                        <br/>
                                        <div>
                                            <input type="text" className="form-control" placeholder="District" name="district" required="" />
                                        </div>
                                        
                                        <br />
                                        <div>
                                            <input type="text" className="form-control" placeholder="Region" name="Region" required="" />
                                        </div>
                                        
                                        <div>
                                            <div>
                                                <button type="button" className="btn btn-success" type="submit" value="Submit">Register</button>
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
                                            
                                            
                                            
                                            
