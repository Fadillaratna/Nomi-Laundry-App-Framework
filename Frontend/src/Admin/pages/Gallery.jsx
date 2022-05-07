import React, { Component } from 'react'
import Card from '../component/Card'
import $ from 'jquery'
import Navigation from '../component/Navbar'

export default class Gallery extends Component {

    constructor() {
        super()
        this.state = {
            buku: [
                {
                    isbn: "010351", judul: "November 9: A Novel", penulis: "Colleen Hoover",
                    penerbit: "Atria", harga: 156000,
                    cover: "https://i.pinimg.com/564x/e3/33/92/e33392a550e6fd07802a6bf507bb6334.jpg"
                },
                {
                    isbn: "010352", judul: "Amor and Sorte", penulis: "Jenna Evans Welch",
                    penerbit: "Resenha", harga: 129000,
                    cover: "https://i.pinimg.com/564x/a5/0a/cc/a50accae0cf4fd5630233ace8fb2a19d.jpg"
                },
                {
                    isbn: "010353", judul: "Are You Listening?", penulis: "Tillie Walden",
                    penerbit: "First Second", harga: 70000,
                    cover: "https://i.pinimg.com/564x/bc/be/91/bcbe918916a5d4f213eb0282bb240fe3.jpg"
                },
            ],

            action: "",
            isbn: "",
            judul: "",
            penulis: "",
            penerbit: "",
            harga: 0,
            cover: "",
            selectedItem: null,
        }
        this.state.filterBuku = this.state.buku


    }

    setUser = () => {
        // cek eksistensi dari session storage
        if (sessionStorage.getItem("user") === null) {
            // kondisi jika session storage "user" belum dibuat
            let prompt = window.prompt("Masukkan Nama Anda", "")
            if (prompt === null || prompt === "") {
                // jika user tidak mengisikan namanya
                this.setUser()
            } else {
                // jika user telah mengisikan namanya
                // simpan nama user ke session storage
                sessionStorage.setItem("user", prompt)
                // simpan nama user ke state.user
                this.setState({ user: prompt })
            }
        } else {
            // kondisi saat session storage "user" telah dibuat
            // akses nilai dari session storage "user"
            let name = sessionStorage.getItem("user")
            this.setState({ user: name })
        }
    }

    componentDidMount() {
        this.setUser()
    }


    Add = () => {
        $("#modal").show()
        // menampilkan komponen modal
        // $("#modal").modal("show")
        this.setState({
            isbn: Math.random(1, 10000000),
            judul: "",
            penulis: "",
            penerbit: "",
            cover: "",
            harga: 0,
            action: "insert"
        })
    }

    Edit = (item) => {
        $("#modal").show()
        // menampilkan komponen modal
        // $("#modal").modal("show")
        this.setState({
            isbn: item.isbn,
            judul: item.judul,
            penulis: item.penulis,
            penerbit: item.penerbit,
            cover: item.cover,
            harga: item.harga,
            action: "update",
            selectedItem: item
        })
    }


    Save = (event) => {
        event.preventDefault();
        // menampung data state buku
        let tempBuku = this.state.buku

        if (this.state.action === "insert") {
            // menambah data baru
            tempBuku.push({
                isbn: this.state.isbn,
                judul: this.state.judul,
                penulis: this.state.penulis,
                penerbit: this.state.penerbit,
                cover: this.state.cover,
                harga: this.state.harga,
            })
        } else if (this.state.action === "update") {
            // menyimpan perubahan data
            let index = tempBuku.indexOf(this.state.selectedItem)
            tempBuku[index].isbn = this.state.isbn
            tempBuku[index].judul = this.state.judul
            tempBuku[index].penulis = this.state.penulis
            tempBuku[index].penerbit = this.state.penerbit
            tempBuku[index].cover = this.state.cover
            tempBuku[index].harga = this.state.harga
        }

        this.setState({ buku: tempBuku })

        // menutup komponen modal_buku
        $("#modal").hide()
    }

    Drop = (item) => {
        // beri konfirmasi untuk menghapus data
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            // menghapus data
            let tempBuku = this.state.buku
            // posisi index data yg akan dihapus
            let index = tempBuku.indexOf(item)

            // hapus data
            tempBuku.splice(index, 1)

            this.setState({ buku: tempBuku })
        }
    }

    searching = event => {
        if (event.keyCode === 13) {
            // 13 adalah kode untuk tombol enter

            let keyword = this.state.keyword.toLowerCase()
            let tempBuku = this.state.buku
            let result = tempBuku.filter(item => {
                return item.judul.toLowerCase().includes(keyword) ||
                    item.penulis.toLowerCase().includes(keyword) ||
                    item.penerbit.toLowerCase().includes(keyword)
            })

            this.setState({ filterBuku: result })
        }
    }

    addToCart = (selectedItem) => {
        // membuat sebuah variabel untuk menampung cart sementara
        let tempCart = []
        // cek eksistensi dari data cart pada localStorage
        if (localStorage.getItem("cart") !== null) {
            tempCart = JSON.parse(localStorage.getItem("cart"))
            // JSON.parse() digunakan untuk mengonversi dari string -> array object
        }
        // cek data yang dipilih user ke keranjang belanja
        let existItem = tempCart.find(item => item.isbn === selectedItem.isbn)
        if (existItem) {
            // jika item yang dipilih ada pada keranjang belanja
            window.alert("Anda telah memilih item ini")
        } else {
            // user diminta memasukkan jumlah item yang dibeli
            let promptJumlah = window.prompt("Masukkan jumlah item yang beli", "")
            if (promptJumlah !== null && promptJumlah !== "") {
                // jika user memasukkan jumlah item yg dibeli
                // menambahkan properti "jumlahBeli" pada item yang dipilih
                selectedItem.jumlahBeli = promptJumlah
                // masukkan item yg dipilih ke dalam cart
                tempCart.push(selectedItem)
                // simpan array tempCart ke localStorage
                localStorage.setItem("cart", JSON.stringify(tempCart))
            }
        }
    }

    Close = () => {
        $("#modal").hide()
    }



    render() {
        return (
            <div>
            <Navigation/>
            <div className="container mb-5">
                
                <h4 className="display-6 fw-light mt-5">
                    Hello, {this.state.user}
                </h4>
                <h5 className="display-6 fw-lighter fs-5 mb-5">Explore and get your new book collection with the best price</h5>
                <div className="tombol">
                    <div className='tambah'>
                        <button type="button" className='btn btn-dark' id="blue" onClick={() => this.Add()} data-toggle="modal" data-target="#modal"><i className="fa fa-plus me-2"></i>Add Book</button>
                    </div>
                    <div className="input">
                        <input type="text" className="form-control my-2 rounded mb-3" id="search" placeholder="Explore your favourite books here"
                            value={this.state.keyword}
                            onChange={ev => this.setState({ keyword: ev.target.value })}
                            onKeyUp={ev => this.searching(ev)}
                        />
                    </div>

                </div>

                <div className="row">
                    {this.state.filterBuku.map((item, index) => (
                        <Card
                            key={index}
                            judul={item.judul}
                            penulis={item.penulis}
                            penerbit={item.penerbit}
                            harga={item.harga}
                            cover={item.cover}
                            onEdit={() => this.Edit(item)}
                            onDrop={() => this.Drop(item)}
                            onCart={() => this.addToCart(item)}
                        />
                    ))}
                </div>

                {/* component modal sbg control manipulasi data */}
                <div className="modal" id="modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title"><b>Book's Data</b></h4>
                                <button type="button" className="btn-close" data-dismiss="modal" onClick={() => this.Close()}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={ev => this.Save(ev)}>
                                    Title
                                    <input type="text" className="form-control mb-2"
                                        value={this.state.judul}
                                        onChange={ev => this.setState({ judul: ev.target.value })}
                                        required />

                                    Writer
                                    <input type="text" className="form-control mb-2"
                                        value={this.state.penulis}
                                        onChange={ev => this.setState({ penulis: ev.target.value })}
                                        required />

                                    Publisher
                                    <input type="text" className="form-control mb-2"
                                        value={this.state.penerbit}
                                        onChange={ev => this.setState({ penerbit: ev.target.value })}
                                        required />

                                    Price
                                    <input type="number" className="form-control mb-2"
                                        value={this.state.harga}
                                        onChange={ev => this.setState({ harga: ev.target.value })}
                                        required />

                                    Cover
                                    <input type="url" className="form-control mb-2"
                                        value={this.state.cover}
                                        onChange={ev => this.setState({ cover: ev.target.value })}
                                        required />

                                    <button className="btn btn-dark btn-block" id="blue" type="submit">
                                        Save
                                    </button>
                                </form>
                                <br></br>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>

        )
    }
}