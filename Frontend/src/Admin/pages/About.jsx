import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Navigation from '../component/Navbar'

export default class About extends Component {
  render() {
    return (
      <div>
        <Navigation/>
        <div className="container py-5 my-4">
          <div className="row">
            <div className="col-md-6">
              <h1 className="display-6 fw-bolder mt-5 mb-4">About Spine</h1>
              <p className="lead mb-4">
              A marketplace platform that provides various types of books from fiction to non-fiction with high quality and the best prices. Get your new book collection now!
             </p>
              <NavLink to="/contact" id="blue" className="btn btn-dark px-3">Contact Us</NavLink>
            </div>
            <div className="col-md-6">
              <img src="https://cdn.dribbble.com/users/2254715/screenshots/10859087/media/a388c89ae9557211a120af6a8d205309.png?compress=1&resize=1200x900&vertical=top" id="img" alt="Illus" height="600px" width="800px" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
