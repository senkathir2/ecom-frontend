import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer'
import { Container } from 'react-bootstrap'
import Home from './pages/home/Home';
import ProductScreen from './pages/productScreen/ProductScreen';
import Cart from './pages/cart/Cart';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Profile from './pages/profile/Profile';
import Shipping from './pages/shipping/Shipping';
import Payment from './pages/Payment/Payment';
import Placeorder from './pages/placeorder/Placeorder';
import OrderScreen from './pages/orderScreen/OrderScreen';
import UserList from './pages/userlist/UserList';
import UserEdit from './pages/userEdit/UserEdit';
import ProductList from './pages/productList/ProductList';
import ProductEdit from './pages/productEdit/ProductEdit';
import OrderList from './pages/orderList/OrderList';
import VerifyEmail from './pages/emailVerify/VerifyEmail';
import ResetPassword from './pages/resetPassword/ResetPassword';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Header />
        <main className='py-3'>
          <Container>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/login/shipping' element={<Shipping />} />
            <Route path='/placeorder' element={<Placeorder />} />
            <Route path='/order/:id' element={<OrderScreen />} />
            <Route path='/payment' element={<Payment />} />
            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path='/cart/:id?' element={<Cart />} />
            <Route path='/admin/userlist' element={<UserList />} />
            <Route path='/admin/user/:id/edit' element={<UserEdit />} />
            <Route path='/admin/productlist' element={<ProductList />} />
            <Route path='/admin/product/:id/edit' element={<ProductEdit />} />
            <Route path='/admin/orderlist' element={<OrderList />} />
            <Route path='/verifyemail' element={<VerifyEmail />} />
            <Route path='/password-reset' element={<ResetPassword />} />
          </Routes>
          </Container>
        </main>
      <Footer />
    </BrowserRouter>
    </div>
  );
}

export default App;
