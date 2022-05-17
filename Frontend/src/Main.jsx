import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './Admin/pages/Home';
import About from './Admin/pages/About';
import Contact from './Admin/pages/Contact';
import Creation from './Admin/pages/Creation';
import Gallery from './Admin/pages/Gallery';
import Cart from './Admin/pages/Cart';
import User from './Admin/pages/User';
import Member from './Admin/pages/Member';
import Login from './Admin/pages/Login';
import Outlet from './Admin/pages/Outlet';
import Packet from './Admin/pages/Packet';
import Transaction from './Admin/pages/Transaction';
import ChooseMember from './Admin/pages/ChooseMember';
import TransactionDetail from './Admin/pages/TransactionDetail';
import PrintBill from './Admin/pages/PrintBill';
import Profile from './Admin/pages/Profile';
import Report from './Admin/pages/Report';
import PrintReport from './Admin/pages/PrintReport';
import ChoosePackage from './Admin/pages/ChoosePackage';

const Main = () => {
    return (
        <Routes>
            {/* switch component --> < 6, routes element --> > 6 */}
            {/* exact (yang akan pertama ditampilkan) */}
            <Route exact path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/user" element={<User />} />
            <Route path="/member" element={<Member />} />
            <Route path="/login" element={<Login />} />
            <Route path="/outlet" element={<Outlet />} />
            <Route path="/package" element={<Packet />} />
            <Route path="/transaction" element={<Transaction />} />
            <Route path="/choosemember" element={<ChooseMember />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/detail/:id_transaction" element={<TransactionDetail />} />
            <Route path="/printbill/:id_transaksi" element={<PrintBill />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/report" element={<Report />} />
            <Route path="/printReport" element={<PrintReport />} />
            <Route path="/choosePackage" element={<ChoosePackage />} />

        </Routes>
    );
};

export default Main;