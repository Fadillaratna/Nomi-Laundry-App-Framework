import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Navbar from '../component/Navbar'

export default class Home extends Component {
  constructor() {
    super()
    this.state = {
      token: "",
      username: "",
      userId: 0,
      role: "", 
      outletname: "",
      peran: "pp"
    }

    if (localStorage.getItem('token')) {
      // if (localStorage.getItem('role') === "admin") {
        this.state.role = localStorage.getItem('role')
        this.state.token = localStorage.getItem('token')
        this.state.username = localStorage.getItem('name')
        this.state.outletname = localStorage.getItem('outlet')
      // }else{
      //   window.alert("You are not an admin")
      //   window.location = '/login'
      // }
    } else {
      window.location = "/login"
    }

  

  }
  render() {
    return (
      <div>
        <Navbar />
        <div className="container">

          <br /><br />
          <div className="row">
            <div className="col-6">
              <div className="d-flex justify-content-between align-items-center mt-3">
                <h5 className="display-6 fw-bolder mt-5">Hello, {this.state.username}! Here's<br />Kleen n' Clean Laundry</h5>
              </div>
              <h6 className='fs-5 fw-light mb-3 mt-3'>You're as {this.state.role} here, <br></br>manage the laundry outlet at <b>{this.state.outletname}</b><br></br>Give your best service to customers!</h6>
              <NavLink to="/transaction" className="btn btn-dark mt-3" id="blue">Serves<i className="fa fa-arrow-right ms-2"></i></NavLink>
            </div>
            <div className="col-6">
              <img src='https://cdn.dribbble.com/users/2448553/screenshots/16862230/media/01cddec9e733c41248e64ed6748d8cf8.jpg?compress=1&resize=1200x900&vertical=top' id="illus"></img>
            </div>
          </div>
        </div>
      </div>
    )
  }
}