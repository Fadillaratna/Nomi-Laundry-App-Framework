import React from 'react';
import axios from 'axios';
import { withRouter } from '../../Withrouter';


class PrintBill extends React.Component {
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
                window.alert("You are not an admin or a cashier")
                window.location = '/login'
                localStorage.clear()
            }
        } else {
            window.location = "/login"
        }

        this.state.id_transaksi = this.props.params.id_transaksi

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
                window.print()

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



    render() {
        return (
            <div>
                <div className="container">
                    {/* <h3 className="display-6 fw-bold mb-5">Detail Transaction</h3> */}
                
                    <img src="/assets/logo.png" className='lg' id="nomi"/>
                    <h2 className="title-laporan">LAUNDRY BILL</h2>
                    <h4 className='laun-brand'>Nomi Laundry</h4>
                    <h6 className="header" id='em'>Email: nomilaundry@gmail.com</h6>
                    <br />
                    <hr id='line-1' /> <hr id="line-2" /> <br />
                    <h5 className="fs-5 fw-bold">Data Transaction</h5>
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

                    <br></br>



                </div>


            </div>
        );
    }
}

export default withRouter(PrintBill);