
import React, { useState } from 'react';
import { AppstoreOutlined, UserAddOutlined, UserOutlined, LoginOutlined} from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';


const Header = () => {

  const SubMenu = Menu.SubMenu;
  const MenuItemGroup = Menu.ItemGroup;

  const [current, setCurrent] = useState('home');

  const onClick  = (e) => {
    setCurrent(e.key);
  };
  return ( 
    <div className='container'>
      <Menu onClick={onClick} style={{ display: "block"}} selectedKeys={[current]} mode="horizontal" items="">
        <Menu.Item key="home" style={{float: "left"}}>
          <Link to="/"><AppstoreOutlined /> Home</Link>
        </Menu.Item>
        <Menu.Item key="user" style={{float: "left"}}>
          <Link to="/user"><UserOutlined /> User</Link>
        </Menu.Item>
        <SubMenu  style={{float: "right"}} key="submenu" title={<span><LoginOutlined /> Entry</span>} >
          <MenuItemGroup >
            <Menu.Item key="login" >
              <Link to="/login" ><UserOutlined /> Login</Link>
            </Menu.Item>
            <Menu.Item key="register" >
              <Link to="/register"><UserAddOutlined /> Register</Link>
            </Menu.Item>
          </MenuItemGroup>
        </SubMenu>     
      </Menu>  
    </div>         
  );
};

export default Header;