import React from 'react';
import Navbar from '../component/Navbar'
import axios from 'axios';
import { Modal, Button, Form, Badge } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'



class Transaction extends React.Component {
  constructor() {
    super();
    this.state = {
      transaksi: [],
      isModalOpen: false,
      token: "",
      outletId: 0,
      search: "",
      userName: "",
      isModalPw: false,
      action: "",
      outletName: "",
      id_transaksi: 0,
      dibayar: "",
      status: "",
      kode_invoice: "",
      namaMember: "",
      tgl: "",
      tgl_bayar: "",

    }
    if (localStorage.getItem('token')) {
      if (localStorage.getItem('role') === "admin" || localStorage.getItem('role') === "kasir") {
        this.state.role = localStorage.getItem('role')
        this.state.token = localStorage.getItem('token')
        this.state.userName = localStorage.getItem('name')
        this.state.outletId = localStorage.getItem('id_outlet')
        this.state.outletName = localStorage.getItem('outlet')
      } else {
        window.alert("You are not an admin")
        window.location = '/login'
      }
    } else {
      window.location = "/login"
    }
  }

  getTransaksi = () => {
    let url = 'http://localhost:8080/transaksi/' + this.state.outletId
    axios.get(url)
      .then(res => {
        this.setState({
          transaksi: res.data.transaksi
        })
        console.log(this.state.transaksi)
      })
      .catch(error => {
        console.log(error)
      })
  }

  findTransaksi = (event) => {
    let url = "http://localhost:8080/transaksi/search/" + this.state.outletId
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
          this.setState({ transaksi: response.data.transaksi });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  convertTime = (time) => {
    let date = new Date(time)
    return `${date.getDate()}/${Number(date.getMonth()) + 1}/${date.getFullYear()}`
  }

  handleEdit = (item) => {
    this.setState({
      id_transaksi: item.id_transaksi,
      dibayar: item.dibayar,
      status: item.status,
      kode_invoice: item.kode_invoice,
      namaMember: item.member.nama,
      tgl: item.tgl,
      tgl_bayar: item.tgl_bayar,
      isModalOpen: true,
    })
  }

  handleSave = e => {
    e.preventDefault()
    let form = []
    if (this.state.tgl_bayar !== null) {
      form = {
        status: this.state.status,
      }
    } else {
      form = {
        status: this.state.status,
        dibayar: this.state.dibayar
      }
    }

    let url = "http://localhost:8080/transaksi/" + this.state.id_transaksi
    axios.put(url, form)
      .then(response => {
        // window.alert(response.data.message)
        this.getTransaksi()
        this.handleColse()
      })
      .catch(error => console.log(error))
    this.setState({
      isModalOpen: false
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  handleClose = () => {
    this.setState({
      isModalOpen: false,
      isModalPw: false,
    })
  }

  componentDidMount() {
    this.getTransaksi()
  }



  render() {
    return (
      <div>
        <Navbar />
        <div className="container my-2 py-5">
          <h1 className="display-6 fw-light text-left">Transaction</h1>
          <div className="row">
            <div className="col-6 mb-1">
              <input type="text" name="search" className="form-control my-5 rounded" placeholder="Search User..." value={this.state.search} onChange={this.handleChange} onKeyUp={this.findTransaksi} />
            </div>
            <div className="col-3 mt-5">
              <NavLink to="/choosemember"><button className="btn btn-dark" id="blue">Add Transaction</button></NavLink>
            </div>
          </div>


          <table className="table">
            <thead>
              <tr>
                <th>Kode Invoice</th>
                <th>Date</th>
                <th>Deadline</th>
                <th>Payment Date</th>
                <th>Payment Status</th>
                <th>Status Order</th>
                <th>Customer</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.transaksi.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.kode_invoice}</td>
                    <td>{this.convertTime(item.tgl)}</td>
                    <td>{this.convertTime(item.batas_waktu)}</td>
                    {item.tgl_bayar !== null &&
                      <td>{this.convertTime(item.tgl_bayar)}</td>
                    }
                    {item.tgl_bayar === null &&
                      <td>{item.tgl_bayar}</td>
                    }
                    <td>
                      {item.dibayar == "belum_bayar" &&
                        <Badge bg="danger">{item.dibayar}</Badge>
                      }
                      {item.dibayar == "dibayar" &&
                        <Badge bg="success">{item.dibayar}</Badge>
                      }
                    </td>
                    <td>
                      {item.status == "baru" &&
                        <Badge bg="danger">{item.status}</Badge>
                      }
                      {item.status == "proses" &&
                        <Badge bg="warning">{item.status}</Badge>
                      }
                      {item.status == "selesai" &&
                        <Badge bg="info">{item.status}</Badge>
                      }
                      {item.status == "diambil" &&
                        <Badge bg="success">{item.status}</Badge>
                      }
                    </td>
                    <td>{item.member.nama}</td>
                    <td>
                      {item.status !== "diambil" && item.dibayar == "belum_bayar" &&
                        <button className="btn btn-sm btn-dark m-1" id="blue" onClick={() => this.handleEdit(item)}><i className="fa fa-pencil"></i></button>
                      }
                      {item.status !== "diambil" && item.dibayar == "dibayar" &&
                        <button className="btn btn-sm btn-dark m-1" id="blue" onClick={() => this.handleEdit(item)}><i className="fa fa-pencil"></i></button>
                      }
                      {item.status == "diambil" && item.dibayar == "belum_bayar" &&
                        <button className="btn btn-sm btn-dark m-1" id="blue" onClick={() => this.handleEdit(item)}><i className="fa fa-pencil"></i></button>
                      }
                      <NavLink to={`/detail/${item.id_transaksi}`} ><button className="btn btn-sm btn-dark m-1" id="brown"><i className="fa fa-info-circle"></i></button></NavLink>
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
            <Modal.Title>Transaction</Modal.Title>
          </Modal.Header>
          <Form onSubmit={e => this.handleSave(e)}>
            <Modal.Body>
              <Form.Group className="mb-2" controlId="name">
                <Form.Label>Invoice Code</Form.Label>
                <Form.Control type="text" name="kode_invoice"
                  value={this.state.tgl} readOnly />
              </Form.Group>
              <Form.Group className="mb-2" controlId="address">
                <Form.Label>Transaction Date</Form.Label>
                <Form.Control type="text" name="tgl" placeholder="Input username"
                  value={this.state.tgl} readOnly />
              </Form.Group>
              <Form.Group className="mb-2" controlId="address">
                <Form.Label>Member's Name</Form.Label>
                <Form.Control type="text" name="namamember" placeholder="Input username"
                  value={this.state.namaMember} readOnly />
              </Form.Group>
              <Form.Group className="mb-2" controlId="gender">
                <Form.Label>Order Status</Form.Label>
                <Form.Select type="text" name="status" onChange={this.handleChange} >
                  <option value={this.state.status}>{this.state.status}</option>
                  <option value="baru">Baru</option>
                  <option value="proses">Proses</option>
                  <option value="selesai">Selesai</option>
                  <option value="diambil">diambil</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-2" controlId="gender">
                <Form.Label>Payment Status</Form.Label>
                {this.state.dibayar !== "dibayar" &&
                  <Form.Select type="text" name="dibayar" onChange={this.handleChange} >
                    <option value={this.state.dibayar}>{this.state.dibayar}</option>
                    <option value="dibayar">Dibayar</option>
                  </Form.Select>
                }
                {this.state.dibayar === "dibayar" &&
                  <Form.Select type="text" name="dibayar" onChange={this.handleChange} >
                    <option value={this.state.dibayar}>{this.state.dibayar}</option>
                  </Form.Select>
                }

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

export default Transaction;