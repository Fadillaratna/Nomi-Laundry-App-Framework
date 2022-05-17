import React from 'react';
import Navbar from '../component/Navbar'
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'


class ChooseMember extends React.Component {
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
                localStorage.clear()
            }
        } else {
            window.location = "/login"
        }
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

    choose = item => {
        if (window.confirm(`Choose ${item.nama} ?`)) {
            localStorage.setItem("id_member", item.id_member)
            window.location = "/choosePackage"
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

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }



    componentDidMount() {
        this.getMember()
    }



    render() {
        return (
            <div>
                <Navbar 
                    member = "content-act"
                />
                <div className="container my-5 py-5">
                    <br /><br />
                    <h1 className="display-6 fw-light text-left">Member</h1>
                    <div className="row">
                        <div className="col-6 mb-1">
                            <input type="text" name="search" className="form-control my-5 rounded" placeholder="Search member..." value={this.state.search} onChange={this.handleChange} onKeyUp={this.findMember} />

                        </div>
                        <div className="col-3 mt-5">
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
                                            <button className="btn btn-sm btn-dark m-1" onClick={() => this.choose(item)} id="brown"><i class="fa fa-check me-2"></i>Confirm</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <br></br>



                </div>

            </div>
        );
    }
}

export default ChooseMember;