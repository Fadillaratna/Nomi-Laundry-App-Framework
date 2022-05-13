import React, { Component } from 'react';
import Navbar from '../component/Navbar';
import Card from '../component/Card';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';


class ChoosePackage extends Component {
  constructor() {
    super();
    this.state = {
      paket: [],
      isModalOpen: false,
      token: "",
      id_member: 0,
      nama: "",
      alamat: "",
      tlp: "",
      jenis_kelamin: "",
      search: "",
      userName: "",
      action: "",
      outletname: "",
      outletid: 0

    }
    if (localStorage.getItem('token')) {
      if (localStorage.getItem('role') === "admin") {
        this.state.role = localStorage.getItem('role')
        this.state.token = localStorage.getItem('token')
        this.state.userName = localStorage.getItem('name')
        this.state.outletname = localStorage.getItem('outlet')
        this.state.outletid = localStorage.getItem('id_outlet')
      } else {
        window.alert("You are not an admin")
        window.location = '/login'
      }
    } else {
      window.location = "/login"
    }
  }


  getPacket = () => {
    let url = "http://localhost:8080/paket/getByOut/" + this.state.outletid
    axios.get(url)
      .then(res => {
        this.setState({
          paket: res.data.paket
        })
      })
      .catch(error => {
        console.log(error)
      })
  }


  componentDidMount() {
    this.getPacket()
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container my-2 py-5">
          <h4 className="display-6 fw-light">
            Hello, {this.state.userName}!
          </h4>
          <h5 className="display-6 fw-lighter fs-5">Here're {this.state.outletname}'s Package</h5>

          <div className="row">
            <div className="col-6 mb-1">
              <input type="text" name="search" className="form-control my-5 rounded" placeholder="Search Category..." value={this.state.search} onChange={this.handleChange} onKeyUp={this.findClass} />

            </div>
            <div className="col-3 mt-5">
              <button onClick={() => this.handleAdd()} className="btn btn-dark" id="blue">Add Data</button>
            </div>
          </div>

          <div className="row">
            {this.state.paket.map((item, index) => (
              <Card
                key={index}
                judul={item.nama_paket}
                jenis={item.jenis}
                harga={item.harga}
                outlet={item.outlet.nama}
                cover={"http://localhost:8080/image/paket/" + item.image}
                onChoose={() => this.handleChoose(item)}
              // onCart={() => this.addToCart(item)}
              />
            ))}
          </div>
        </div>
        <Modal show={this.state.isModalOpen} onHide={this.handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Package</Modal.Title>
          </Modal.Header>
          <Form onSubmit={e => this.handleSave(e)}>
            <Modal.Body>
              <Form.Group className="mb-2" controlId="name">
                <Form.Label>Package Name</Form.Label>
                <Form.Control type="text" name="nama_paket" placeholder="Input package name"
                  value={this.state.nama_paket} onChange={this.handleChange} required />
              </Form.Group>
              <Form.Group className="mb-2" controlId="address">
                <Form.Label>Price</Form.Label>
                <Form.Control type="text" name="harga" placeholder="Input price"
                  value={this.state.harga} onChange={this.handleChange} required />
              </Form.Group>
              <Form.Group className="mb-2" controlId="gender">
                <Form.Label>Type</Form.Label>
                <Form.Select type="text" name="jenis" onChange={this.handleChange} >
                  <option value={this.state.jenis}>{this.state.jenis}</option>
                  <option value="kiloan">Kiloan</option>
                  <option value="selimut">Selimut</option>
                  <option value="kaos">Kaos</option>
                  <option value="bed_cover">Bed Cover</option>
                  <option value="lain">Lain</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-2" controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" name="image" placeholder="Input image"
                  onChange={this.handleFile} />
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

export default ChoosePackage;