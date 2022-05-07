import React, { useRef } from 'react';
import Navbar from '../component/Navbar'
import axios from 'axios';
import { Badge } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'
import { withRouter } from '../../Withrouter';
import { useReactToPrint } from "react-to-print";

class TransactionDetail extends React.Component {
    constructor(props) {
        super(props);
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
            member: [],
            outlet: [],
            detail_transaksi: [],
            user: []

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

        this.state.id_transaksi = this.props.params.id_transaction
    }

    getTransaksi = () => {
        let url = `http://localhost:8080/transaksi/byTransaksi/${this.state.id_transaksi}/${this.state.outletId}`
        axios.get(url)
            .then(res => {
                this.setState({
                    transaksi: res.data.transaksi,
                    member: res.data.transaksi.member,
                    outlet: res.data.transaksi.outlet,
                    user: res.data.transaksi.user,
                    detail_transaksi: res.data.transaksi.detail_transaksi
                })
                console.log(this.state.detail_transaksi)
            })
            .catch(error => {
                console.log(error)
            })
    }

    convertTime = (time) => {
        let date = new Date(time)
        return `${date.getDate()}/${Number(date.getMonth()) + 1}/${date.getFullYear()}`
    }

    componentDidMount() {
        this.getTransaksi()
    }

    // Print = () => {
    //     localStorage.setItem("id_transaksi", this.state.id_transaksi)
    //     // window.print()
    // }



    render() {

        return (
            <div>
                <Navbar />
                <div className="container my-2 py-5">
                    <h1 className="display-6 fw-bold mb-5">Detail Transaction</h1>

                    <div className="row mb-4">
                        <div className="col-4">
                            <h6>Invoice Code</h6>
                            <h6>Date Transaction</h6>
                            <h6>Deadline</h6>
                            <h6>Payment Date</h6>
                            <h6>Order Status</h6>
                            <h6>Payment Status</h6>
                            <h6>Member's Name</h6>
                            <h6>Member's Telephone</h6>
                            <h6>Member's Address</h6>
                            <h6>Outlet's Name</h6>
                            <h6>User's Name ({this.state.user.role})</h6>

                        </div>
                        <div className="col-6">
                            {/* <h6 className="text-muted">{this.state.transaksi.kode_invoice}</h6>
                            <h6 className="text-muted">{this.convertTime(this.state.transaksi.tgl)}</h6>
                            <h6 className="text-muted">{this.convertTime(this.state.transaksi.batas_waktu)}</h6>
                            {this.state.transaksi.tgl_bayar === null &&
                                <h6 className="text-danger">0/0/0</h6>
                            }
                            {this.state.transaksi.tgl_bayar !== null &&
                                <h6 className="text-muted">{this.convertTime(this.state.transaksi.tgl_bayar)}</h6>
                            }
                            <h6 className="text-muted">
                                {this.state.transaksi.status == "baru" &&
                                    <Badge bg="danger">{this.state.transaksi.status}</Badge>
                                }
                                {this.state.transaksi.status == "proses" &&
                                    <Badge bg="warning">{this.state.transaksi.status}</Badge>
                                }
                                {this.state.transaksi.status == "selesai" &&
                                    <Badge bg="info">{this.state.transaksi.status}</Badge>
                                }
                                {this.state.transaksi.status == "diambil" &&
                                    <Badge bg="success">{this.state.transaksi.status}</Badge>
                                }
                            </h6>
                            <h6 className="text-muted">
                                {this.state.transaksi.dibayar == "belum_bayar" &&
                                    <Badge bg="danger">{this.state.transaksi.dibayar}</Badge>
                                }
                                {this.state.transaksi.dibayar == "dibayar" &&
                                    <Badge bg="success">{this.state.transaksi.dibayar}</Badge>
                                }
                            </h6>
                            <h6 className="text-muted">{this.state.member.nama}</h6>
                            <h6 className="text-muted">{this.state.member.tlp}</h6>
                            <h6 className="text-muted">{this.state.member.alamat}</h6>
                            <h6 className="text-muted">{this.state.outlet.nama}</h6>
                            <h6 className="text-muted">{this.state.user.nama}</h6> */}
                            <h6 className="text-muted">{this.state.transaksi.kode_invoice}</h6>
                            <h6 className="text-muted">{this.convertTime(this.state.transaksi.tgl)}</h6>
                            <h6 className="text-muted">{this.convertTime(this.state.transaksi.batas_waktu)}</h6>
                            {this.state.transaksi.tgl_bayar === null &&
                                <h6 className="text-danger">0/0/0</h6>
                            }
                            {this.state.transaksi.tgl_bayar !== null &&
                                <h6 className="text-muted">{this.convertTime(this.state.transaksi.tgl_bayar)}</h6>
                            }
                            <h6 className="text-muted">{this.state.transaksi.status}</h6>
                            <h6 className="text-muted">{this.state.transaksi.dibayar}</h6>
                            <h6 className="text-muted">{this.state.member.nama}</h6>
                            <h6 className="text-muted">{this.state.member.tlp}</h6>
                            <h6 className="text-muted">{this.state.member.alamat}</h6>
                            <h6 className="text-muted">{this.state.outlet.nama_outlet}</h6>
                            <h6 className="text-muted">{this.state.user.nama}</h6>
                        </div>
                    </div>

                    <table className="table table-bordered text-black">
                        <thead>
                            <tr>
                                <th>Package</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.detail_transaksi.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.paket.nama_paket}</td>
                                    <td>Rp {item.paket.harga}</td>
                                    <td>{item.qty}</td>
                                    <td className="text-right">Rp {item.subtotal}</td>

                                </tr>
                            ))}
                            <tr>
                                <td colSpan="3" className="align-self-end">Initial Total</td>
                                <td className="text-right" colSpan={2}>Rp {this.state.transaksi.total}</td>
                            </tr>
                            <tr>
                                <td colSpan="3">Discount 5%</td>
                                <td className="text-right" colSpan={2}>Rp {this.state.transaksi.diskon}</td>
                            </tr>
                            <tr>
                                <td colSpan="3">Additional Cost</td>
                                <td className="text-right" colSpan={2}>Rp {this.state.transaksi.biaya_tambahan}</td>
                            </tr>
                            <tr>
                                <td colSpan="3">Tax 10%</td>
                                <td className="text-right" colSpan={2}>Rp {this.state.transaksi.pajak}</td>
                            </tr>
                            <tr>
                                <td colSpan="3">Final Total</td>
                                <td className="text-right" colSpan={2}>Rp {(this.state.transaksi.total - this.state.transaksi.diskon) + (this.state.transaksi.biaya_tambahan) + (this.state.transaksi.pajak)}</td>
                            </tr>

                        </tbody>
                    </table>
                    <NavLink to="/transaction"><button className='btn btn-sm btn-dark' id="blue">Back</button></NavLink>
                    <NavLink to={`/printbill/${this.state.transaksi.id_transaksi}`} target="_blank" ><button className='btn btn-sm btn-dark ms-1' id="brown">Print</button></NavLink>
                    {/* <button className='btn btn-sm btn-dark ms-1' id="blue" onClick={() => this.Print()}>Print</button> */}
                    <br></br>


                </div>



            </div>
        );
    }
}
export default withRouter(TransactionDetail);


// render(<Example />, document.querySelector("#root"));
