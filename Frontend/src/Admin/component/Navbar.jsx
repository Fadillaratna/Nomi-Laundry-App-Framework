import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class Navbar extends Component {
  constructor() {
    super()
    this.state = {
      token: "",
      role: "",
    }

    if (localStorage.getItem('token')) {
      this.state.role = localStorage.getItem('role')
      
    } else {
      window.location = "/login"
    }

  }
  out = () => {
    if (window.confirm("Are you sure to logout?")) {
      window.location = '/login'
      localStorage.clear()
      // localStorage.removeItem("name");
      // localStorage.removeItem("user");
      // localStorage.removeItem("token");
      // localStorage.removeItem("id");
      // localStorage.removeItem("role");
      // localStorage.removeItem("outlet");
      // localStorage.removeItem("id_outlet");
    }
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-white shadow" bg="dark" variant="dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand fs-4" to="/">
            <img src="/assets/logo.png" className='ms-5' width={50}></img>
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          {this.state.role === "admin" &&
            <div className="collapse navbar-collapse ms-5" id="navbarSupportedContent">
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                <li className="nav-item" id={this.props.home}>
                  <NavLink className="nav-link" to="/" id={this.props.home}>Home</NavLink>
                </li>
                <li className="nav-item ms-4" id={this.props.user}>
                  <NavLink className="nav-link" to="/user" id={this.props.user}>User</NavLink>
                </li>
                <li className="nav-item ms-4" id={this.props.member}>
                  <NavLink className="nav-link" to="/member" id={this.props.member}>Member</NavLink>
                </li>
                <li className="nav-item ms-4" id={this.props.outlet}>
                  <NavLink className="nav-link" to="/outlet" id={this.props.outlet}>Outlet</NavLink>
                </li>
                <li className="nav-item ms-4" id={this.props.package}>
                  <NavLink className="nav-link" to="/package" id={this.props.package}>Package</NavLink>
                </li>
                <li className="nav-item ms-4" id={this.props.transaction}>
                  <NavLink className="nav-link" to="/transaction" id={this.props.transaction}>Transaction</NavLink>
                </li>
              </ul>
              <div className="buttons me-5">
                <NavLink to="/cart" className="btn ms-2"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-cart2" viewBox="0 0 16 16" id="icon">
                  <path id={this.props.cart} d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                </svg></NavLink>
                <NavLink to="/profile" className="btn ms-2" id={this.props.profile}>
                  <i className="fa fa-user" id="signout" ></i></NavLink>
                <button onClick={() => this.out()} className="btn ms-2"><i className="fa fa-sign-out" id="signout"></i></button>
              </div>
            </div>
          }
          {this.state.role === "kasir" &&
            <div className="collapse navbar-collapse ms-5" id="navbarSupportedContent">
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                <li className="nav-item" id={this.props.home}>
                  <NavLink className="nav-link" to="/" id={this.props.home}>Home</NavLink>
                </li>
                
                <li className="nav-item ms-4" id={this.props.member}>
                  <NavLink className="nav-link" to="/member" id={this.props.member}>Member</NavLink>
                </li>
                <li className="nav-item ms-4" id={this.props.package}>
                  <NavLink className="nav-link" to="/choosePackage" id={this.props.package}>Package</NavLink>
                </li>
                <li className="nav-item ms-4">
                  <NavLink className="nav-link" to="/transaction" id={this.props.transaction}>Transaction</NavLink>
                </li>
              </ul>
              <div className="buttons me-5">
                <NavLink to="/cart" className="btn ms-2"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-cart2" viewBox="0 0 16 16">
                  <path id={this.props.cart} d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                </svg></NavLink>
                <NavLink to="/profile" className="btn ms-2" id={this.props.profile}>
                  <i className="fa fa-user" id="signout"></i></NavLink>
                <button onClick={() => this.out()} className="btn ms-2"><i className="fa fa-sign-out" id="signout"></i></button>
              </div>
            </div>
          }
          {this.state.role === "owner" &&
            <div className="collapse navbar-collapse ms-5" id="navbarSupportedContent">
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                <li className="nav-item" id={this.props.home}>
                  <NavLink className="nav-link" to="/" id={this.props.home}>Home</NavLink>
                </li>
                <li className="nav-item ms-4" id={this.props.report}>
                  <NavLink className="nav-link" to="/report" id={this.props.report}>Report</NavLink>
                </li>
                
              </ul>
              <div className="buttons me-5">
                {/* <NavLink to="/cart" className="btn ms-2"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-cart2" viewBox="0 0 16 16">
                  <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                </svg></NavLink> */}
                <NavLink to="/profile" className="btn ms-2" id={this.props.profile}>
                  <i className="fa fa-user" id="signout"></i></NavLink>
                <button onClick={() => this.out()} className="btn ms-2"><i className="fa fa-sign-out" id="signout"></i></button>
              </div>
            </div>
          }
        </div>
      </nav>
    )
  }
}
