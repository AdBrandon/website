import React from 'react';
import {Tabs,Menu, Icon} from 'antd';
import {Link} from 'react-router-dom';
import {menus} from '../environment'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;

export default class MenuComponent extends React.Component {

    render() {
        return (
            <Menu theme="dark" mode="inline"
                  inlineCollapsed={this.props.collapsed}>
                {
                    menus.map((menu,index)=>{
                        return(
                            <Menu.Item key={index}>
                                <Link to={menu.url}>
                                    <Icon type={menu.icon}/>
                                    <span className="nav-text">{menu.name}</span>
                                </Link>
                            </Menu.Item>
                        )
                    })
                }
            </Menu>
        );
    }
}
