import React from "react"

class CardChoose extends React.Component {
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
            <div className="col-lg-3 col-sm-12 p-2" key={this.props.key}>
                <div class="card" id="cards">
                    <div class="card-body p-4">
                        <img src={this.props.cover} class="card-img-top" id="produk" />

                        <h4 className="judul fs-4 fw-bold mt-3 mb-2">
                            {this.props.judul}
                        </h4>

                        <h6 className="fs-6 fw-lighter mb-3">
                            Type : {this.props.jenis}
                        </h6>
                        <h6 className="price fs-5 fw-normal mb-4">
                            Rp {this.props.harga},00
                        </h6>


                        <button className="btn btn-sm btn-dark m-1 w-100" id="blue"
                            onClick={this.props.onChoose}><i class="fa fa-check me-2"></i>Confirm Package
                        </button>

                        {/* <button className="btn btn-sm btn-outline-dark m-1"
                                onClick={this.props.onCart}>
                                Add to cart
                            </button> */}
                    </div>
                </div>
            </div>


        )
    }
}
export default CardChoose;



