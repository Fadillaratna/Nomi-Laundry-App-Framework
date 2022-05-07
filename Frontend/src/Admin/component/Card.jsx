import React from "react"

class Card extends React.Component {
    constructor() {
        super()
        this.state = {
            token: "",
            role: "",
        }

        if (localStorage.getItem('token')) {
            this.state.role = localStorage.getItem('role')

        } else {
            window.location = "/login"
        }
    }

    render() {
        return (
            <div className="col-lg-6 col-sm-12 p-2" key={this.props.key}>
                <div className="card" id="card">
                    <div className="card-body row" id="crd">
                        {/* menampilkan Gambar / cover */}
                        <div className="col-5 mt-3">
                            <img src={this.props.cover} className="img"
                                id="buku" />
                        </div>

                        {/* menampilkan deskripsi */}
                        <div className="col-7 mt-3" id="text">
                            <h4 className="judul fs-3">
                                {this.props.judul}
                            </h4>
                            <h6 className="fs-6 fw-lighter mb-4">
                                Type : {this.props.jenis}
                            </h6>
                            <h6 className="fs-6 fw-lighter">
                                Package at {this.props.outlet} Outlet
                            </h6>
                            <h6 className="price fs-5 fw-normal mb-4">
                                Rp {this.props.harga},00
                            </h6>
                            {this.state.role === "admin" &&
                                <button className="btn btn-sm btn-dark m-1"
                                    onClick={this.props.onEdit} data-toggle="modal" data-target="#modal" id="brown">
                                    <i className="fa fa-pencil"></i>
                                </button>
                            }
                            {this.state.role === "admin" &&
                                <button className="btn btn-sm btn-danger m-1" id="blue"
                                    onClick={this.props.onDrop}><i className="fa fa-trash"></i>
                                </button>
                            }
                            {/* button untuk choose package */}
                            <button className="btn btn-sm btn-outline-dark m-1"
                                onClick={this.props.onChoose}>Choose
                            </button>

                            {/* <button className="btn btn-sm btn-outline-dark m-1"
                                onClick={this.props.onCart}>
                                Add to cart
                            </button> */}

                        </div>
                    </div>
                </div>
            </div>


        )
    }
}
export default Card;



