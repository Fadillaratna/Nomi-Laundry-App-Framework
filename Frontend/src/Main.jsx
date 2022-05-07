import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Admin/pages/Home';
import About from './Admin/pages/About';
import Contact from './Admin/pages/Contact';
import Creation from './Admin/pages/Creation';
import Gallery from './Admin/pages/Gallery';
import Cart from './Admin/pages/Cart';
import User from './Admin/pages/User';
import Member from './Admin/pages/Member';
import Login from './Login';
import Outlet from './Admin/pages/Outlet';
import Packet from './Admin/pages/Packet';
import Transaction from './Admin/pages/Transaction';
import ChooseMember from './Admin/pages/ChooseMember';
import ChoosePackage from './Admin/pages/ChoosePackage';
import TransactionDetail from './Admin/pages/TransactionDetail';
import PrintBill from './Admin/pages/PrintBill';

const Main = () => {
    return (
        <Switch>
            {/* switch component --> < 6, routes element --> > 6 */}
            {/* exact (yang akan pertama ditampilkan) */}
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>
            <Route path="/contact" component={Contact}/>
            <Route path="/user" component={User}/>
            <Route path="/member" component={Member}/>
            <Route path="/login" component={Login}/>
            <Route path="/outlet" component={Outlet}/>
            <Route path="/package" component={Packet}/>
            <Route path="/transaction" component={Transaction}/>
            <Route path="/choosemember" component={ChooseMember}/>
            <Route path="/choosepackage" component={ChoosePackage}/>
            <Route path="/cart" component={Cart}/>
            <Route path="/detail/:id_transaction" component={TransactionDetail}/>
            <Route path="/printbill/:id_transaksi" component={PrintBill}/>
        </Switch>
    );
};

export default Main;