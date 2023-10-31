
import React, { useState } from 'react';
import { AppstoreOutlined, UserAddOutlined, UserOutlined,} from '@ant-design/icons';
import { Menu } from 'antd';
//import SubMenu from 'antd/es/menu/SubMenu';


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
        <Menu.Item key="home" style={{float: "left"}}><AppstoreOutlined />Home</Menu.Item>
        <SubMenu  style={{float: "right"}} key="submenu" title={<span><UserOutlined />User</span>} >
          <MenuItemGroup >
            <Menu.Item key="login" ><UserOutlined />Login</Menu.Item>
            <Menu.Item key="register" ><UserAddOutlined />Register</Menu.Item>
          </MenuItemGroup>
        </SubMenu>     
      </Menu>  
    </div>         
  );
};

export default Header;