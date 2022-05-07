import React from "react"
import axios from "axios"
import Navbar from '../component/Navbar'
import { NavLink } from "react-router-dom"

export default class Cart extends React.Component {
    constructor() {
        super()
        this.state = {
            token: "",
            username: "",
            id_member: 0,
            role: "",
            outletname: "",
            cart: [],
            outletid: 0,
            pajak: 0,
            diskon: 0,
            biayaTambahan: 0,
            total: 0,
            totalAwal: 0,
            member: [],
            id_user: 0
        }

        if (localStorage.getItem('token')) {
            if (localStorage.getItem('role') === "admin" || localStorage.getItem('role') === "kasir") {
                this.state.role = localStorage.getItem('role')
                this.state.token = localStorage.getItem('token')
                this.state.username = localStorage.getItem('name')
                this.state.outletname = localStorage.getItem('outlet')
                this.state.outletid = localStorage.getItem('id_outlet')
                this.state.id_user = localStorage.getItem('id')
            } else {
                window.alert("You are not an admin")
                window.location = '/login'
            }
        } else {
            window.location = "/login"
        }

        this.state.id_member = localStorage.getItem("id_member")
        console.log(this.state.id_member)
    }

    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }

    initCart = () => {
        // memanggil data cart pada localStorage
        let tempCart = []
        if (localStorage.getItem("cart") !== null) {
            tempCart = JSON.parse(localStorage.getItem("cart"))
        }

        // kalkulasi total harga
        let totalHarga = 0
        tempCart.map(item => {
            totalHarga += (item.harga * item.qty)
        })

        // memsukkan data cart, user, dan total harga pada state
        this.setState({
            cart: tempCart,
            totalAwal: totalHarga
        })

        let diskon = (5 / 100) * totalHarga
        let tambahan = 0
        if (tempCart.length === 1) {
            tambahan = 500
        } else if (tempCart.length > 1 && this.state.cart.length <= 10) {
            tambahan = 3000
        } else if (tempCart.length > 10) {
            tambahan = 5000
        }
        totalHarga = (totalHarga - diskon) + tambahan
        let pajak = (10 / 100) * totalHarga
        totalHarga = totalHarga + pajak

        this.setState({
            diskon: diskon,
            biayaTambahan: tambahan,
            pajak: pajak,
            total: totalHarga
        })

    }

    editItem = selectedItem => {
        let tempCart = []
        if (localStorage.getItem("cart") !== null) {
            tempCart = JSON.parse(localStorage.getItem("cart"))
        }

        let index = tempCart.findIndex(it => it.id_paket === selectedItem.id_paket)
        let promptJumlah = window.prompt(`Masukkan jumlah ${selectedItem.name} yang dibeli`, selectedItem.qty)
        tempCart[index].qty = promptJumlah
        tempCart[index].subtotal = promptJumlah * tempCart[index].harga

        // update localStorage
        localStorage.setItem("cart", JSON.stringify(tempCart))

        // refresh cart
        this.initCart()
    }

    dropItem = selectedItem => {
        if (window.confirm(`Are you sure to ${selectedItem.nama_paket} from cart?`)) {
            let tempCart = []
            if (localStorage.getItem("cart") !== null) {
                tempCart = JSON.parse(localStorage.getItem("cart"))
            }

            let index = tempCart.findIndex(it => it.id_paket === selectedItem.id_paket)
            tempCart.splice(index, 1)

            // update localStorage
            localStorage.setItem("cart", JSON.stringify(tempCart))

            // refresh cart
            this.initCart()
        }
    }

    getMember = () => {
        let url = 'http://localhost:8080/member/' + this.state.id_member
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

    checkOut = () => {
        let tempCart = []
        if (localStorage.getItem("cart") !== null) {
            tempCart = JSON.parse(localStorage.getItem("cart"))
        }
        let data = {
            id_outlet: this.state.outletid,
            id_member: this.state.id_member,
            biaya_tambahan: this.state.biayaTambahan,
            diskon: this.state.diskon,
            pajak: this.state.pajak,
            status: "baru",
            dibayar: "belum_bayar",
            id_user: this.state.id_user,
            detail_transaksi: tempCart,
            total: this.state.totalAwal
        }
        let url = "http://localhost:8080/transaksi"
        axios.post(url, data)
            .then(res => {
                // clear cart
                window.alert("Success Checkout")
                localStorage.removeItem("cart")
                localStorage.removeItem("id_member")
                window.location = "/transaction"
            })
            .catch(error => {
                // if (error.res) {
                //     if (error.res.status) {
                //         window.alert(error.res.data.message)
                //         this.props.history.push("/login")
                //     }
                // } else {
                //     console.log(error);
                // }
                window.alert("Failed Checkout")
            })
    }

    componentDidMount = () => {
        this.initCart()
        this.getMember()
    }

    render() {
        return (
            <div className="bgv">
                <Navbar />
                <div className="container my-2 py-5">
                    <h4 className="display-6 fw-bold mb-5">
                        __Cart
                    </h4>
                    {this.state.cart.length > 0 &&
                        <div>
                            <h5 className="fs-5 fw-bold">User Data</h5>
                            <div className="row mb-2">
                                <div className="col-4">
                                    <h6>Member Name </h6>
                                    <h6>Address</h6>
                                    <h6>Gender</h6>
                                    <h6>Telephone Number</h6>
                                </div>
                                <div className="col-6">
                                    <h6 className="text-muted">{this.state.member.nama}</h6>
                                    <h6 className="text-muted">{this.state.member.alamat}</h6>
                                    <h6 className="text-muted">{this.state.member.jenis_kelamin}</h6>
                                    <h6 className="text-muted">{this.state.member.tlp}</h6>
                                </div>
                            </div>
                            <NavLink to="/package"><button className="btn btn-dark btn-sm mb-4" id="brown">Add Product</button></NavLink>
                            <table className="table table-bordered text-black">
                                <thead>
                                    <tr>
                                        <th>Package</th>
                                        <th>Price</th>
                                        <th>Qty</th>
                                        <th>Total</th>
                                        <th>Option</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.cart.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.nama_paket}</td>
                                            <td>Rp {item.harga}</td>
                                            <td>{item.qty}</td>
                                            <td className="text-right">Rp {item.harga * item.qty}</td>
                                            <td>
                                                <button className="btn btn-sm btn-info m-1 text-white" id="blue"
                                                    onClick={() => this.editItem(item)}>
                                                    Edit
                                                </button>
                                                <button className="btn btn-sm btn-danger m-1" id="brown"
                                                    onClick={() => this.dropItem(item)}>
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan="3" className="align-self-end">Initial Total</td>
                                        <td className="text-right" colSpan={2}>Rp {this.state.totalAwal}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3">Discount 5%</td>
                                        <td className="text-right" colSpan={2}>Rp {this.state.diskon}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3">Additional Cost</td>
                                        <td className="text-right" colSpan={2}>Rp {this.state.biayaTambahan}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3">Tax 10%</td>
                                        <td className="text-right" colSpan={2}>Rp {this.state.pajak}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3">Final Total</td>
                                        <td className="text-right" colSpan={2}>Rp {this.state.total}</td>
                                    </tr>
                                    <tr >
                                        <td colSpan={5} ><button className="btn btn-dark m-1 w-100" id="blue" onClick={() => this.checkOut()}>Checkout</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    }

                    {this.state.cart.length === 0 &&
                        <h3>Cart Is Empty</h3>
                    }
                </div>
            </div>
        )

    }
}