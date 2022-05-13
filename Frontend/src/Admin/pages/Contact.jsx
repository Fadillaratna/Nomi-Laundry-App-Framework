import React, { Component } from 'react'
import Navigation from '../component/Navbar'

export default class Contact extends Component {
    render() {
        return (
            <div>
                <Navigation />
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center py-4 my-4">
                            <h1 className='display-6 fw-bold mt'>Have Some Question?</h1>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-5 d-flex justify-content-center" id="contact">
                            <img src="https://cdn.dribbble.com/users/1537480/screenshots/4644029/media/6f2bba6313b7ef25950e42b365a45969.jpg?compress=1&resize=800x600&vertical=top" />
                        </div>
                        <div className="col-md-6">
                            <form>
                                <div className="mb-3">
                                    <label for="exampleForm" className="form-label">Full Name</label>
                                    <input type="text" className="form-control" id="exampleForm" placeholder="Fadilla Ratna Dwita" />
                                </div>
                                <div className="mb-3">
                                    <label for="exampleForm" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                                </div>
                                <div className="mb-3">
                                    <label for="exampleFormControlTextarea1" className="form-label">Message</label>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                </div>
                                <button type="submit" className="btn btn-dark" id="blue">Send Message</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
