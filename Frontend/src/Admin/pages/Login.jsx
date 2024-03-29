import React, { Component } from 'react'
import axios from 'axios'

export default class Login extends Component {
  constructor() {
    super()
    this.state = {
      username: "",
      password: "",
      isModalOpen: false,
      user: [],
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleLogin = (e) => {
    e.preventDefault()
    let data = {
      username: this.state.username,
      password: this.state.password
    }
    let url = "http://localhost:8080/user/auth"
    axios.post(url, data)
      .then(res => {
        if (res.data.logged === true) {
          let name = res.data.data.nama
          let user = res.data.data
          let token = res.data.token
          let id = res.data.data.id_user
          let role = res.data.data.role
          let outlet = res.data.data.outlet.nama_outlet
          let id_outlet = res.data.data.outlet.id_outlet
          localStorage.setItem("name", name)
          localStorage.setItem("id", id)
          localStorage.setItem("user", JSON.stringify(user))
          localStorage.setItem("token", token)
          localStorage.setItem("role", role)
          localStorage.setItem("outlet", outlet)
          localStorage.setItem("id_outlet", id_outlet)
          window.location = "/"
        }
        else {
          window.alert(res.data.message)
        }
      })
  }
  render() {
    return (
      <div className="contain"><br /><br /><br /><br />
        <div className="card mx-auto d-block" id="card-forgot">
          <div className="card-body ms-4 me-4">
            <img src="/assets/logo.png" className="mt-4 mb-4" alt="" id="logo" width={80} />
            <h4 className='fs-3 fw-bold'>Nomi Laundry</h4>
            <h5 className='fs-6 fw-light mb-5'>Hello, welcome back! Login Here!</h5>
            <form onSubmit={(e) => this.handleLogin(e)}>

              <label htmlFor="" className='mb-2'>Username</label>
              <input type="text" className='form-control' value={this.state.username} onChange={this.handleChange} placeholder='Input your username' name="username"/><br />

              <label htmlFor="" className='mb-2' >Password</label>
              <input type="password" className='form-control' value={this.state.password} onChange={this.handleChange} placeholder='Input your password' name="password"/><br />
              <input type="submit" className='btn btn-dark w-100' id="blue" value="Login" />
            </form>
          </div>
        </div>
      </div>
    )
  }
}
