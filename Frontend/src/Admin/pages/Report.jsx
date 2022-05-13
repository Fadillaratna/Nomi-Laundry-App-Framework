import React, { Component } from 'react'
import Navbar from '../component/Navbar'
import axios from 'axios';
import { Modal, Button, Form, Badge } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'


export default class Report extends Component {
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
            detail_transaksi: [],
            start: "",
            end: "",
            sumTotal: 0,
            sumGrand: 0


        }
        if (localStorage.getItem('token')) {
            if (localStorage.getItem('role') === "owner") {
                this.state.role = localStorage.getItem('role')
                this.state.token = localStorage.getItem('token')
                this.state.userName = localStorage.getItem('name')
                this.state.outletId = localStorage.getItem('id_outlet')
                this.state.outletName = localStorage.getItem('outlet')
            } else {
                window.alert("You are not an owner")
                window.location = '/login'
            }
        } else {
            window.location = "/login"
        }

    }

    getTransaksi = () => {
        let url = 'http://localhost:8080/transaksi/lunas/' + this.state.outletId
        axios.get(url)
            .then(res => {
                this.setState({
                    transaksi: res.data.transaksi,
                    sumTotal: res.data.sumTotal,
                    sumGrand: res.data.sumGrand

                })
                console.log(this.state.sumTotal)
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    convertTime = (time) => {
        let date = new Date(time)
        return `${date.getDate()}/${Number(date.getMonth()) + 1}/${date.getFullYear()}`
    }

    getTransaksiDate = (e) => {
        e.preventDefault()
        let form = {
            start: this.state.start,
            end: this.state.end
        }
        console.log(this.state.start)
        let url = 'http://localhost:8080/transaksi/laporan/' + this.state.outletId
        axios.post(url, form)
            .then(res => {
                this.setState({
                    transaksi: res.data.transaksi,
                    sumTotal: res.data.sumTotal,
                    sumGrand: res.data.sumGrand
                })
                console.log(this.state.detail_transaksi)
            })
            .catch(error => {
                console.log(error)
            })
    }

    Print = () => {
        localStorage.setItem("start", this.state.start)
        localStorage.setItem("end", this.state.end)
        window.open('/printReport', '_blank');
    }

    componentDidMount() {
        this.getTransaksi()
    }
    render() {
        return (
            <div>
                <Navbar />
                <div className='container my-3 py-3'>
                    <h1 className="display-6 fw-light text-left mb-5">Report</h1>
                    <form>
                        <div className="row mb-4 mt-2">
                            <div className="col-4">
                                <h6 className='fs-6'>Start</h6>
                                <input type="date" className='form-control' value={this.state.start} onChange={this.handleChange} name="start" />
                            </div>
                            <div className="col-4">
                                <h6 className='fs-6'>End</h6>
                                <input type="date" className='form-control' value={this.state.end} onChange={this.handleChange} name="end" />
                            </div>
                            <div className="col-4">
                                <br />
                                <button className='btn btn-dark' id="brown" onClick={(e) => this.getTransaksiDate(e)}>Set</button>
                            </div>
                            

                        </div>
                    </form>
                    <table className="table table-bordered mt-5">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Invoice Code</th>
                                <th>Date</th>
                                <th>Customer</th>
                                <th>User</th>
                                <th>Package</th>
                                <th>Qty</th>
                                <th>Price</th>
                                <th>Subtotal</th>
                                <th>Total</th>
                                {/* <th>Discount</th>
                                <th>Add Cost</th>
                                <th>Tax</th> */}
                                <th>Grand Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.transaksi.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.kode_invoice}</td>
                                        <td>{this.convertTime(item.tgl)}</td>
                                        <td>{item.member.nama}</td>
                                        <td>{item.user.nama} ({item.user.role})</td>
                                        <td>
                                            <ol>
                                                {item.detail_transaksi.map((it, index) => {
                                                    return (
                                                        <li>{index + 1}. {it.paket.nama_paket}</li>
                                                    )
                                                })}
                                            </ol>
                                        </td>
                                        <td>
                                            <ol>
                                                {item.detail_transaksi.map((it, index) => {
                                                    return (
                                                        <li>{it.qty}</li>
                                                    )
                                                })}
                                            </ol>
                                        </td>
                                        <td>
                                            <ol>
                                                {item.detail_transaksi.map((it, index) => {
                                                    return (
                                                        <li>Rp {it.paket.harga}</li>
                                                    )
                                                })}
                                            </ol>
                                        </td>
                                        <td>
                                            <ol>
                                                {item.detail_transaksi.map((it, index) => {
                                                    return (
                                                        <li>Rp {it.subtotal}</li>
                                                    )
                                                })}
                                            </ol>
                                        </td>
                                        <td>
                                            <ol>
                                                <li>Rp {item.total}</li>
                                            </ol>
                                        </td>
                                        {/* <td>
                                            Rp {item.diskon}
                                        </td>
                                        <td>
                                            Rp {item.biaya_tambahan}
                                        </td>
                                        <td>
                                            Rp {item.pajak}
                                        </td> */}
                                        <td>
                                            Rp {item.grandTotal}
                                        </td>
                                    </tr>
                                )
                            })}
                            <tr>
                                <td colSpan="9" className="align-self-end fw-bold">Total</td>
                                <td className="text-right fw-bold">Rp {this.state.sumTotal}</td>
                                <td className="text-right fw-bold">Rp {this.state.sumGrand}</td>
                            </tr>
                        </tbody>
                    </table>

                    <button className='btn btn-dark' id="brown" onClick={() => this.Print()}>Print</button>

                </div>
            </div>

        )
    }
}
