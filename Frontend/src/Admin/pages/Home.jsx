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
      outletname: ""
    }

    if (localStorage.getItem('token')) {
      this.state.role = localStorage.getItem('role')
      this.state.token = localStorage.getItem('token')
      this.state.username = localStorage.getItem('name')
      this.state.outletname = localStorage.getItem('outlet')
    } else {
      window.location = "/login"
      localStorage.clear()
    }
  }
  render() {
    return (
      <div>
        <Navbar 
          home = "content-act"
        />
        <div className="container my-5 py-5">

          <br />
          <div className="row mt-3">
            <div className="col-6">
              <div className="d-flex justify-content-between align-items-center mt-3">
                <h5 className="display-6 fw-bolder mt-5">Hello, {this.state.username}! Here's<br />Nomi Laundry</h5>
              </div>
              <h6 className='fs-5 fw-lighter mb-3 mt-3'>You're as {this.state.role} here, <br></br>manage the laundry outlet at <b>{this.state.outletname}</b><br></br>Give your best service to customers!</h6>
              {this.state.role === "admin" &&
              <NavLink to="/transaction" className="btn btn-dark mt-3 w-50" id="blue">Service Your Customers<i className="fa fa-arrow-right ms-2"></i></NavLink>
              }
              {this.state.role === "kasir" &&
              <NavLink to="/transaction" className="btn btn-dark mt-3 w-50" id="blue">Service Your Customers<i className="fa fa-arrow-right ms-2"></i></NavLink>
              }
              {this.state.role === "owner" &&
              <NavLink to="/transaction" className="btn btn-dark mt-3 w-50" id="blue">Check Your Laundry Finances<i className="fa fa-arrow-right ms-2"></i></NavLink>
              }
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
