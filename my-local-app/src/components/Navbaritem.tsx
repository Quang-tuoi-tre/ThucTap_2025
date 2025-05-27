import React, { useEffect, useState } from 'react';
import { Menu, notification,  } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LoginOutlined } from "@ant-design/icons";
import { SearchItem } from './SearchItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Badge } from 'antd';
import { cartStore } from '../views/Store/CartStore';
import { observer } from 'mobx-react-lite';


const items = [
  { label: <Link to="/">Home</Link>, key: '/' },
  { label: <Link to="/login">Login</Link>, key: '/login',icons:<LoginOutlined/> },
  { label: <Link to="/register">Register</Link>, key: '/register' },
  { label: <Link to="/profile">Profile</Link>, key: '/profile' },
  { label: <Link to="/logout">Logout</Link>, key: '/logout' },
];

export const Navbar: React.FC = observer(() => {
  const location = useLocation();
    const [not, contextHolder] = notification.useNotification();
  const [current, setCurrent] = useState(location.pathname);
  const navigate = useNavigate();

  const openNotification = (
    type: "success" | "error",
    pauseOnHover: boolean,
    message: string,
    description: string
  ) => {
    return () => {
      not.open({
        message,
        description,
        showProgress:true,
        type,
        pauseOnHover,
        placement: "topRight",
      });
    };
  };

   useEffect(() => {
    setCurrent(location.pathname);
  }, [location.pathname]);


const onClick = (e: any) => {
  if (e.key === '/logout') {
    localStorage.removeItem('token')
    navigate('/')
    openNotification(
      "success",
      true,
      "Logout successful",
      "You have been logged out of your account. See you again soon!"
    )();
  } else if (e.key === '/login') {
    const token = localStorage.getItem('token');
    if (token) {
      e.preventDefault();
      openNotification(
        "error",
        true,
        "Already Logged In",
        "You are already logged in to your account!"
      )();
      
    }
    setCurrent(e.key);
  } else {
    setCurrent(e.key);
  }
};

  const handleClick = ()=>{
    const token = localStorage.getItem('token');
    if (!token) {
      // Nếu chưa đăng nhập thì chuyển về trang login
      navigate('/login');
    } else {
      navigate('/cart');
    }
  }
  

  return (
    
     <div className='navbar-container'>
      {contextHolder}
     <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        style={{
          flex: 1,
          boxShadow: 'none', 
          fontWeight: 500,
          fontSize: 16,
          borderBottom: 'none',
          backgroundColor: 'transparent' 
        }}
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
  <div style={{ width: 300 }}> 
    <SearchItem />
  </div>
  <div
    onClick={handleClick}
    style={{ cursor: 'pointer', position: 'relative', marginTop:'15px' }} /* Thêm position relative cho badge */
  >
    <Badge
      count={cartStore.itemCount}
      overflowCount={99}
      className="cursor-pointer"
      color='white'
      style={{
        backgroundColor: '#1890ff', 
        color:'black',
        boxShadow: '0 0 0 1px #1890ff', 
        fontSize: '12px',
        minWidth: '20px',
        height: '20px', 
        lineHeight: '20px', 
        borderRadius: '10px',
        textAlign: 'center',
        padding: '0 7px',
        position: 'absolute',
        right:'-2px'
      }}
    >
      <FontAwesomeIcon icon={faCartShopping} color="#333" size="2x" style={{ marginTop: '0' }} />
    </Badge>
  </div>
</div>

    </div>
  );
});


