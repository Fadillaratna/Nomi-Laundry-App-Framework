import React, { Component } from 'react'
import axios from 'axios';


export default class PrintReport extends Component {
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
            start: null,
            end: null,
            sumTotal: 0,
            sumGrand: 0,
            maxDate: null,
            minDate: null


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
                localStorage.clear()
            }
        } else {
            window.location = "/login"
        }

        this.state.start = localStorage.getItem("start")
        this.state.end = localStorage.getItem("end")
    }


    convertTime = (time) => {
        let date = new Date(time)
        return `${date.getDate()}/${Number(date.getMonth()) + 1}/${date.getFullYear()}`
    }

    getTransaksiDate = () => {
        if(this.state.start === "" && this.state.end === ""){
            this.getTransaksi()
        }else{
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
                    sumGrand: res.data.sumGrand,
                    maxDate: res.data.maxDate,
                    minDate: res.data.minDate
                })
                window.print()
                console.log(this.state.start)
            })
            .catch(error => {
                console.log(error)
            })
        }
    }

    getTransaksi = () => {
        let url = 'http://localhost:8080/transaksi/lunas/' + this.state.outletId
        axios.get(url)
            .then(res => {
                this.setState({
                    transaksi: res.data.transaksi,
                    sumTotal: res.data.sumTotal,
                    sumGrand: res.data.sumGrand,
                    minDate: res.data.minDate,
                    maxDate: res.data.maxDate
                })
                window.print()
                console.log(this.state.sumTotal)
            })
            .catch(error => {
                console.log(error)
            })
    }

    componentDidMount() {
        this.getTransaksiDate()
    }

    render() {
        return (
            <div>
                <div>
                    <div className="dash-1">
                        {/* <h3 className="display-6 fw-bold mb-5">Detail Transaction</h3> */}
                        <img src="/assets/logo.png" className='lg' id='nomi'/>
                        <h2 className="title-laporan">TRANSACTION REPORT</h2>
                        <h4 className='laun-brand'>Nomi Laundry</h4>
                        <h6 className="header" id='em'>Email: nomilaundry@gmail.com</h6>
                        <br />
                        <hr id='line-1' /> <hr id="line-2" /> <br />
                        <h5 className="fs-5 fw-bold">Transaction Data at {this.state.outletName}</h5>
                        {this.state.start === "" && this.state.end === "" ? (<h6 className='text-muted'>{this.convertTime(this.state.minDate)} - {this.convertTime(this.state.maxDate)}</h6>): (<h6 className='text-muted'>{this.convertTime(this.state.start)} - {this.convertTime(this.state.end)}</h6>)}
                        <table className="table table-bordered mt-5">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Invoice Code</th>
                                    <th>Date</th>
                                    <th>Customer</th>
                                    {/* <th>User</th> */}
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
                            <tbody >
                                {this.state.transaksi.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.kode_invoice}</td>
                                            <td>{this.convertTime(item.tgl)}</td>
                                            <td>{item.member.nama}</td>
                                            {/* <td>{item.user.nama} ({item.user.role})</td> */}
                                            <td>
                                                <ol>
                                                    {item.detail_transaksi.map((it, index) => {
                                                        return (
                                                            <li className='text-left'>{index + 1}. {it.paket.nama_paket}</li>
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
                                                            <li className='text-left'>Rp {it.paket.harga}</li>
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
                                <tr >
                                    <td colSpan="8" className="align-self-end fw-bold">Total</td>
                                    <td className="text-right fw-bold">Rp {this.state.sumTotal}</td>
                                    <td className="text-right fw-bold">Rp {this.state.sumGrand}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>


                </div>
            </div>
        )
    }
}
