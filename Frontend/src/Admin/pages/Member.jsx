import React from 'react';
import Navbar from '../component/Navbar'
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'


class Member extends React.Component {
  constructor() {
    super();
    this.state = {
      member: [],
      isModalOpen: false,
      token: "",
      id_outlet: 0,
      nama_paket: "",
      jenis: "",
      harga: "",
      image: null,
      search: "",
      userName: "",
      isModalPw: false,
      action: ""

    }
    if (localStorage.getItem('token')) {
      if (localStorage.getItem('role') === "admin" || localStorage.getItem('role') === "kasir") {
        this.state.role = localStorage.getItem('role')
        this.state.token = localStorage.getItem('token')
        this.state.userName = localStorage.getItem('name')
      } else {
        window.alert("You are not an admin or a cashier")
        window.location = '/login'
      }
    } else {
      window.location = "/login"
    }
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

  getMember = () => {
    let url = 'http://localhost:8080/member/'
    axios.get(url)
      .then(res => {
        this.setState({
          member: res.data.member
        })
        console.log(this.state.member)
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleAdd = () => {
    this.setState({
      isModalOpen: true,
      nama: "",
      alamat: "",
      tlp: "",
      jenis_kelamin: "",
      action: "insert"
    })
  }

  handleEdit = (item) => {
    this.setState({
      id_member: item.id_member,
      nama: item.nama,
      alamat: item.alamat,
      tlp: item.tlp,
      jenis_kelamin: item.jenis_kelamin,
      isModalOpen: true,
      action: "update"
    })
  }

  handleSave = e => {
    e.preventDefault()
    let form = {
      nama: this.state.nama,
      alamat: this.state.alamat,
      tlp: this.state.tlp,
      jenis_kelamin: this.state.jenis_kelamin,
    }
    let url = ""
    if (this.state.action === "insert") {
      url = "http://localhost:8080/member/"
      axios.post(url, form)
        .then(response => {
          // window.alert(response.data.message)
          this.getMember()
          this.handleClose()
        })
        .catch(error => console.log(error))
    } else if (this.state.action === "update") {
      url = "http://localhost:8080/member/" + this.state.id_member
      axios.put(url, form)
        .then(response => {
          // window.alert(response.data.message)
          this.getMember()
          this.handleClose()
        })
        .catch(error => console.log(error))
    }
    this.setState({
      isModalOpen: false
    })
  }

  Drop = (id) => {
    let url = "http://localhost:8080/member/" + id
    if (window.confirm("Are you sure to delete this data?")) {
      axios.delete(url)
        .then(res => {
          console.log(res.data.message)
          this.getMember()
        })
        .catch(err => {
          console.log(err.message)
        })
    }
  }

  findMember = (event) => {
    let url = "http://localhost:8080/member/search/search";
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
          this.setState({ member: response.data.member });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  componentDidMount() {
    this.getMember()
  }



  render() {
    return (
      <div>
        <Navbar />
        <div className="container my-2 py-5">
          <h1 className="display-6 fw-light text-left">Member</h1>
          <div className="row">
            <div className="col-6 mb-1">
              <input type="text" name="search" className="form-control my-5 rounded" placeholder="Search User..." value={this.state.search} onChange={this.handleChange} onKeyUp={this.findMember} />
            </div>
            <div className="col-3 mt-5">
              <button className="btn btn-dark" id="blue" onClick={() => this.handleAdd()}>Add Data</button>
            </div>
          </div>


          <table className="table">
            <thead>
              <tr>
                <th>Member ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>Telephone Number</th>
                <th>Gender</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.member.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.id_member}</td>
                    <td>{item.nama}</td>
                    <td>{item.alamat}</td>
                    <td>{item.tlp}</td>
                    <td>{item.jenis_kelamin}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-dark m-1" onClick={() => this.handleEdit(item)}><i className="fa fa-pencil"></i></button>
                      <button className="btn btn-sm btn-dark m-1" id="blue" onClick={() => this.Drop(item.id_member)}><i className="fa fa-trash"></i></button>
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
            <Modal.Title>Member</Modal.Title>
          </Modal.Header>
          <Form onSubmit={e => this.handleSave(e)}>
            <Modal.Body>
              <Form.Group className="mb-2" controlId="name">
                <Form.Label>Nama</Form.Label>
                <Form.Control type="text" name="nama" placeholder="Input name"
                  value={this.state.nama} onChange={this.handleChange} />
              </Form.Group>
              <Form.Group className="mb-2" controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" name="alamat" placeholder="Input username"
                  value={this.state.alamat} onChange={this.handleChange} />
              </Form.Group>
              <Form.Group className="mb-2" controlId="address">
                <Form.Label>Telephone</Form.Label>
                <Form.Control type="text" name="tlp" placeholder="Input username"
                  value={this.state.tlp} onChange={this.handleChange} />
              </Form.Group>
              <Form.Group className="mb-2" controlId="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Select type="text" name="jenis_kelamin" onChange={this.handleChange} >
                  <option value={this.state.jenis_kelamin}>{this.state.jenis_kelamin}</option>
                  <option value="P">P</option>
                  <option value="L">L</option>
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

      </div>
    );
  }
}

export default Member;