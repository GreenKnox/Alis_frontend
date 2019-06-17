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
        this.handleEmailChange = this.handleEmailChange.bind(this)
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
            firstname: '',
            lastname: '',
            username: '',
            password: '',
            passwordconfirmation: '',
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

        this.style1 = {
            fontFamily: 'Lucida Sans Unicode',
            color: '#636e72'
        }
        this.style2 = {
            fontFamily: 'Lucida Console',
            color: '#636e72'
        }
    }

    handleFirstNameChange(event) {
        const inputFirstName = event.target.value
        this.setState({
            firstname: inputFirstName
        })
    }

    handleLastNameChange(event) {
        const inputLastName = event.target.value
        this.setState({
            lastname: inputLastName
        })
    }

    handleUserNameChange(event) {
        const inputUserName = event.target.value
        this.setState({
            username: inputUserName
        })
    }
    
    handlePasswordChange(event) {
        const inputPassword = event.target.value
        this.setState({
            password: inputPassword
        })
    }

    handlePasswordChangedChange(event) {
        const inputPasswordChanged = event.target.value
        this.setState({
            passwordchanged: inputPasswordChanged
        })
    }

    handleEmailChange(event) {
        const inputEmail = event.target.value
        this.setState({
            email: inputEmail
        })
    }

    handleStatusChange(event) {
        const inputStatus = event.target.value
        this.setState({
            status: inputStatus
        })
    }

    handleStaffNumberChange(event) {
        const inputStaffNumber = event.target.value
        this.setState({
            staffnumber: inputStaffNumber
        })
    }

    handleTitleChange(event) {
        const inputTitle = event.target.value
        this.setState({
            title: inputTitle
        })
    }

    handleDesignationChange(event) {
        const inputDesignation = event.target.value
        this.setState({
            designation: inputDesignation
        })
    }

    handleCompanyChange(event) {
        const inputCompany = event.target.value
        this.setState({
            company: inputCompany
        })
    }

    handlePasswordChange(event) {
        const inputPassword = event.target.value
        this.setState({
            password: inputPassword
        })
    }

    handleEmailChange(event) {
    }

    handleDivisionChange(event) {
        const inputDivision = event.target.value
        this.setState({
            division: inputDivision
        })
    }

    handleAddressChange(event) {
        const inputAddress = event.target.value
        this.setState({
            address: inputAddress
        })
    }

    handlePhoneChange(event) {
        const inputPhone = event.target.value
        this.setState({
            phone: inputPhone
        })
    }

    sendRequest() {

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

                            <form onSubmit={this.sendRequest} method="post">

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
                                            <input type="text" className="form-control" placeholder="First Name" name="firstname" value={this.state.firstname} onChange={this.handleFirstNameChange} required />
                                        </div>
                                        
                                        <br/>

                                        <div>
                                            <input type="text" className="form-control" placeholder="Last Name" name="lastname" value={this.state.lastname} onChange={this.handleLastNameChange} required />
                                        </div>

                                        <br />
                                        
                                        <div>
                                            <input type="text" className="form-control" placeholder="Username" name="username" value={this.state.username} onChange={this.handleUserNameChange} required />
                                        </div>
                                        
                                         <br />
                                    </div>
                                
                                    <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                        <div>
                                            <input type="password" className="form-control" placeholder="Password " name="password" value={this.state.password} onChange={this.handlePasswordChange} required />
                                        </div>
                                        
                                        <br />

                                        <div>
                                            <input type="password" className="form-control" placeholder="Confirm Password " name="confirmpassword" value={this.state.handleconfirmpassword} onChange={this.ConfirmPasswordChange} />
                                        </div>
                                        
                                        <br />
                                
                                        <div>
                                            <input type="text" className="form-control" placeholder="Email" name="email" value={this.state.email} onChange={this.handleEmailChange} required />
                                        </div>
                                            
                                        <br />
        
                                        <div>
                                            <input type="text" className="form-control" placeholder="Staff number" name="staffnumber" value={this.state.staffnumber} onChange={this.handleStaffNumberChange} required />
                                        </div>
            
                                        <br />

                                        <div>
                                            <input type="text" className="form-control" placeholder="Title" name="Title" value={this.state.title} onChange={this.handleTitleChange} required />
                                        </div>
                        
                                        <br />
                                        
                                        <div>
                                            <input type="text" className="form-control" placeholder="Designation" name="Designation" value={this.state.designation} onChange={this.handleDesignationChange} required />
                                        </div>
                                    </div>
                                                    
                                    <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                                        <div>
                                            <input type="text" className="form-control" placeholder="Company ID" name="CompanyID" value={this.state.designation} onChange={this.handleDesignationChange} required />
                                        </div>
                                        
                                        <br />
                                        <div>
                                            <input type="text" className="form-control" placeholder="Division" name="Division" required="" />
                                        </div>
                                        
                                        <br />
                                        <div>
                                            <input type="text" className="form-control" placeholder="Address" name="Address" value={this.state.address} onChange={this.handleAddressChange} required />
                                        </div>
                                        
                                        <br />
                                        <div>
                                            <input type="text" className="form-control" placeholder="Phone" name="Phone" value={this.state.phone} onChange={this.handlePhoneChange} required />
                                        </div>
                                        
                                        <br />
                                        <div>
                                            <input type="text" className="form-control" placeholder="Fax" name="Fax" value={this.state.fax} onChange={this.handleFaxChange} required />
                                        </div>
                                        
                                        <br />
                                        <div>
                                            <input type="text" className="form-control" placeholder="Mobile" name="Mobile" value={this.state.mobile} onChange={this.handleMobileChange} required />
                                        </div>
                                        
                                        <br />
                                        <div>
                                            <input type="text" className="form-control" placeholder="Website Address" name="Website Address" value={this.state.websiteaddress} onChange={this.handleWebsiteAddressChange} required />
                                        </div>
                                        
                                        <br />
                                        <div>
                                            <input type="text" className="form-control" placeholder="Department" name="Department"value={this.state.department} onChange={this.handleDepartmentChange} required />
                                        </div>
                                        
                                        <br />
                                        <div>
                                            <input type="text" className="form-control" placeholder="Location" name="Location" value={this.state.location} onChange={this.handleLocationChange} required />
                                        </div>
                                        
                                        <br/>
                                        <div>
                                            <input type="text" className="form-control" placeholder="District" name="district" value={this.state.district} onChange={this.handleDistrictChange} required />
                                        </div>
                                        
                                        <br />
                                        <div>
                                            <input type="text" className="form-control" placeholder="Region" name="Region" value={this.state.region} onChange={this.handleRegionChange} required />
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
                                            
                                            
                                            
                                            
