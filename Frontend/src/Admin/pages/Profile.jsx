import React, { Component } from 'react'
import Navbar from '../component/Navbar'
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

export default class Profile extends Component {
    constructor() {
        super();
        this.state = {
            user: [],
            outlets: [],
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
            action: "",
            userId: 0,
            id_outlet: 0,
            outlet: ""

        }
        if (localStorage.getItem('token')) {
            this.state.role = localStorage.getItem('role')
            this.state.token = localStorage.getItem('token')
            this.state.userName = localStorage.getItem('name')
            this.state.userId = localStorage.getItem('id')

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

    handlePw = () => {
        this.setState({
            isModalPw: true,
            id_user: this.state.userId,
            password: this.state.password
        })
    }

    getUser = () => {
        let url = 'http://localhost:8080/user/' + this.state.userId
        axios.get(url, this.headerConfig())
            .then(res => {
                this.setState({
                    user: res.data.user,
                    nama: res.data.user.nama,
                    role: res.data.user.role,
                    username: res.data.user.username,
                    id_outlet: res.data.user.id_outlet,
                    outlet: res.data.user.outlet.nama_outlet,
                    password: res.data.user.password
                })
                localStorage.setItem("outlet", this.state.outlet)
                console.log(this.state.user)
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleSavePw = (e) => {
        e.preventDefault()
        let data = {
            password: this.state.password
        }
        if (window.confirm("Are you sure to change password?")) {
            let url = "http://localhost:8080/user/pw/" + this.state.userId
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

    getOutlet = async () => {
        let url = "http://localhost:8080/outlet/"
        axios.get(url)
            .then(res => {
                this.setState({
                    outlets: res.data.outlet
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleClose = () => {
        this.setState({
            isModalOpen: false,
            isModalPw: false,
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleEditProfile = e => {
        e.preventDefault()
        let form = {
            nama: this.state.nama,
            username: this.state.username,
            id_outlet: this.state.id_outlet,
            role: this.state.role
        }

        let url = "http://localhost:8080/user/" + this.state.userId
        axios.put(url, form, this.headerConfig())
            .then(response => {
                // window.alert(response.data.message)
                this.getUser()
                window.alert("Success edit")
                localStorage.setItem("name", this.state.nama)
                localStorage.setItem("role", this.state.role)
                localStorage.setItem("id_outlet", this.state.id_outlet)

            })
            .catch(error => console.log(error))


    }


    componentDidMount() {
        this.getUser()
        this.getOutlet()
    }

    render() {
        return (
            <div>
                <Navbar 
                    profile = "icon-act"
                />
                <div className="container my-5 py-5">
                    <br /><br /><br />
                    <div className="row mt-2">
                        <div className="col-lg-4 col-xl-3">
                            <div className="card mb-5" id="card-profile">
                                <div className="card-body">

                                    <div className="media mb-5 mt-4 ">

                                        <img src="https://i.pinimg.com/564x/d1/51/62/d15162b27cd9712860b90abe58cb60e7.jpg" alt="" className='profile-img mx-auto d-block mb-2' />

                                        <h4 className='display-7 fw-bold text-center'>{this.state.nama}</h4>
                                        <h6 className='fs-6 fw-light text-center'>{this.state.role}</h6>
                                    </div>

                                    <input type="submit" class="btn btn-dark mx-auto d-block mb-4" value="Edit Password" id="brown" onClick={() => this.handlePw()} />

                                </div>
                            </div>
                        </div>

                        <div className="col-lg-8 col-xl-9">
                            <div className="card" id="card-profile">
                                <div className="card-body ms-3 me-3 mt-4">
                                    <h3 className='fw-bold mb-4'>Profile</h3>
                                    <form onSubmit={e => this.handleEditProfile(e)}>
                                        <div className="form-group row mb-4">
                                            <label className="col-sm-2 col-form-label fw-bold">Name</label>
                                            <div className="col-sm-10">
                                                <input type="text" name="nama" class="form-control" value={this.state.nama} onChange={this.handleChange} />
                                            </div>
                                        </div>
                                        <div className="form-group row mb-4">
                                            <label className="col-sm-2 col-form-label fw-bold">Username</label>
                                            <div className="col-sm-10">
                                                <input type="text" name="username" class="form-control" value={this.state.username} onChange={this.handleChange} />
                                            </div>
                                        </div>
                                        <div className="form-group row mb-4">
                                            <label className="col-sm-2 col-form-label fw-bold">Role</label>
                                            <div className="col-sm-10">
                                                {/* <input type="text" name="role" class="form-control" value={this.state.role} onChange={this.handleChange} /> */}
                                                <select name="role" id="" className='form-control' onChange={this.handleChange}>
                                                    <option value={this.state.role}>{this.state.role}</option>
                                                    <option value="admin">Admin</option>
                                                    <option value="owner">Owner</option>
                                                    <option value="kasir">Kasir</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group row mb-4">
                                            <label className="col-sm-2 col-form-label fw-bold">Outlet</label>
                                            <div className="col-sm-10">
                                                <select name="id_outlet" id="" className='form-control' onChange={this.handleChange}>
                                                    <option value={this.state.id_outlet}>{this.state.outlet}</option>
                                                    {this.state.outlets.map((item, index) => {
                                                        return (
                                                            <option value={item.id_outlet}>{item.nama_outlet}</option>
                                                        )
                                                    })}

                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group row mb-4">
                                            <label className="col-sm-2 col-form-label fw-bold"></label>
                                            <div className="col-sm-10">
                                                <input type="submit" className='btn btn-dark' id="brown" value="Submit" />

                                            </div>
                                        </div>

                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

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
        )
    }
}
