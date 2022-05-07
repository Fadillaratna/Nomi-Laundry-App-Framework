import React from 'react';
import Navbar from '../component/Navbar'
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'


class User extends React.Component {
  constructor() {
    super();
    this.state = {
      user: [],
      outlet: [],
      isModalOpen: false,
      token: "",
      id_user: 0,
      nama: "",
      username: "",
      password: "",
      id_outlet: "",
      role: "",
      search: "",
      userName: "",
      outletname: "",
      isModalPw: false,
      action: ""

    }
    if (localStorage.getItem('token')) {
      if (localStorage.getItem('role') === "admin") {
        this.state.role = localStorage.getItem('role')
        this.state.token = localStorage.getItem('token')
        this.state.userName = localStorage.getItem('name')
      } else {
        window.alert("You are not an admin")
        window.location = '/login'
        localStorage.removeItem("name");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("role");
        localStorage.removeItem("outlet");
        localStorage.removeItem("id_outlet");
      }
    } else {
      window.location = "/login"
    }
  }

  headerConfig = () => {
    let header = {
      headers: { Authorization: `Bearer ${this.state.token}` }
    }
    return header
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleFile = (e) => {
    this.setState({
      image: e.target.files[0]
    })
  }

  handleClose = () => {
    this.setState({
      isModalOpen: false,
      isModalPw: false,
    })
  }

  getUser = () => {
    let url = 'http://localhost:8080/user/'
    axios.get(url, this.headerConfig())
      .then(res => {
        this.setState({
          user: res.data.user
        })
        console.log(this.state.user)
      })
      .catch(error => {
        console.log(error)
      })
  }

  // findUser = (event) => {
  //     let url = "http://localhost:8080/user/find";
  //     if (event.keyCode === 13) {
  //         // menampung data keyword pencarian
  //         let form = {
  //             find: this.state.search
  //         }
  //         // mengakses api untuk mengambil data pegawai
  //         // berdasarkan keyword
  //         axios.post(url, form)
  //             .then(response => {
  //                 // mengisikan data dari respon API ke array pegawai
  //                 this.setState({ user: response.data.result });
  //             })
  //             .catch(error => {
  //                 console.log(error);
  //             });
  //     }
  // }

  handleEdit = (item) => {
    let url = "http://localhost:8080/outlet/" + item.id_outlet
    axios.get(url)
      .then(res => {
        this.setState({
          outletname: res.data.outlet.nama_outlet,
          isModalOpen: true,
          nama: item.nama,
          username: item.username,
          id_outlet: item.id_outlet,
          role: item.role,
          id_user: item.id_user,
          action: "update"
        })
        console.log(this.state.outletname)
      })
      .catch(error => {
        console.log(error)
      })

  }



  handleEditPw = (item) => {
    this.setState({
      isModalPw: true,
      id_user: item.id_user,
      password: item.password
    })
  }

  handleAdd = () => {
    this.setState({
      isModalOpen: true,
      nama: "",
      username: "",
      id_outlet: "",
      role: "",
      password: "",
      action: "insert"
    })
  }

  handleSavePw = (e) => {
    e.preventDefault()
    let data = {
      password: this.state.password
    }
    if (window.confirm("Are you sure to change password?")) {
      let url = "http://localhost:8080/user/pw/" + this.state.id_user
      axios.put(url, data, this.headerConfig())
        .then(res => {
          this.getUser()
        })
        .catch(err => {
          console.log(err)
        })
      this.setState({
        isModalPw: false
      })
    }
  }

  handleSave = e => {
    e.preventDefault()
    let form = {
      id_admin: this.state.id_admin,
      nama: this.state.nama,
      username: this.state.username,
      password: this.state.password,
      id_outlet: this.state.id_outlet,
      role: this.state.role
    }
    let url = ""
    if (this.state.action === "insert") {
      url = "http://localhost:8080/user/"
      axios.post(url, form, this.headerConfig())
        .then(response => {
          // window.alert(response.data.message)
          this.getUser()
          this.handleColse()
        })
        .catch(error => console.log(error))
    } else if (this.state.action === "update") {
      url = "http://localhost:8080/user/" + this.state.id_user
      axios.put(url, form, this.headerConfig())
        .then(response => {
          // window.alert(response.data.message)
          this.getUser()
          this.handleColse()
        })
        .catch(error => console.log(error))
    }
    this.setState({
      isModalOpen: false
    })
  }

  getOutlet = async () => {
    let url = "http://localhost:8080/outlet/"
    axios.get(url)
      .then(res => {
        this.setState({
          outlet: res.data.outlet
        })
        console.log(this.state.outlet)
      })
      .catch(error => {
        console.log(error)
      })
  }

  Drop = (id) => {
    let url = "http://localhost:8080/user/" + id
    if (window.confirm("Are you sure to delete this data?")) {
      axios.delete(url)
        .then(res => {
          console.log(res.data.message)
          this.getUser()
        })
        .catch(err => {
          console.log(err.message)
        })
    }
  }

  findUser = (event) => {
    let url = "http://localhost:8080/user/search/search";
    if (event.keyCode === 13) {
      // menampung data keyword pencarian
      let form = {
        find: this.state.search
      }
      // mengakses api untuk mengambil data pegawai
      // berdasarkan keyword
      axios.post(url, form)
        .then(response => {
          // mengisikan data dari respon API ke array pegawai
          this.setState({ user: response.data.user });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  componentDidMount() {
    this.getUser()
    this.getOutlet()
  }



  render() {
    return (
      <div>
        <Navbar />
        <div className="container my-2 py-5">
          <h1 className="display-6 fw-light text-left">User</h1>
          <div className="row">
            <div className="col-6 mb-1">
              <input type="text" name="search" className="form-control my-5 rounded" placeholder="Search User..." value={this.state.search} onChange={this.handleChange} onKeyUp={this.findUser} />
            </div>
            <div className="col-3 mt-5">
              <button className="btn btn-dark" id="blue" onClick={() => this.handleAdd()}>Add Data</button>
            </div>
          </div>


          <table className="table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Username</th>
                <th>Outlet</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.user.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.id_user}</td>
                    <td>{item.nama}</td>
                    <td>{item.username}</td>
                    <td>{item.outlet.nama_outlet}</td>
                    <td>{item.role}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-dark m-1" onClick={() => this.handleEdit(item)}><i className="fa fa-pencil"></i></button>
                      <button className="btn btn-sm btn-dark m-1" id="blue" onClick={() => this.Drop(item.id_user)}><i className="fa fa-trash"></i></button>
                      <button className="btn btn-sm btn-dark m-1" id="brown" onClick={() => this.handleEditPw(item)}>Edit Password</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <br></br>



        </div>

        <Modal show={this.state.isModalOpen} onHide={this.handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>User</Modal.Title>
          </Modal.Header>
          <Form onSubmit={e => this.handleSave(e)}>
            <Modal.Body>
              <Form.Group className="mb-2" controlId="name">
                <Form.Label>Nama</Form.Label>
                <Form.Control type="text" name="nama" placeholder="Input name"
                  value={this.state.nama} onChange={this.handleChange} />
              </Form.Group>
              <Form.Group className="mb-2" controlId="address">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name="username" placeholder="Input username"
                  value={this.state.username} onChange={this.handleChange} />
              </Form.Group>

              {this.state.action === "insert" &&
                <Form.Group className="mb-2" controlId="address">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" placeholder="Input password"
                    value={this.state.password} onChange={this.handleChange} />
                </Form.Group>
              }
              <Form.Group className="mb-2" controlId="gender">
                <Form.Label>Role</Form.Label>
                <Form.Select type="text" name="role" onChange={this.handleChange} >
                  <option value={this.state.role}>{this.state.role}</option>
                  <option value="admin">Admin</option>
                  <option value="kasir">Kasir</option>
                  <option value="owner">Owner</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-2" controlId="gender">
                <Form.Label>Outlet</Form.Label>
                <Form.Select type="text" name="id_outlet" onChange={this.handleChange}>
                  {this.state.action === "update" &&
                    <option value={this.state.id_outlet}>{this.state.outletname}</option>
                  }
                  {this.state.action === "insert" &&
                    <option value=""></option>
                  }
                  {this.state.outlet.map((item, index) => {
                    return (
                      <option value={item.id_outlet}>{item.nama_outlet}</option>
                    )
                  })}
                </Form.Select>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="dark" type="submit" id="blue">
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>


        <Modal show={this.state.isModalPw} onHide={this.handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Update Password</Modal.Title>
          </Modal.Header>
          <Form onSubmit={e => this.handleSavePw(e)}>
            <Modal.Body>
              <Form.Group className="mb-2" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" value={this.state.password} placeholder="Masukkan password"
                  onChange={this.handleChange} />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="dark" type="submit" id="blue">
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default User;