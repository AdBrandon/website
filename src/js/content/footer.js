import React from 'react';
import { Layout } from 'antd';
import {website} from '../environment'
import {Link} from 'react-router-dom';

const { Footer} = Layout;

export default class FooterComponent extends React.Component{
    render(){
        return(
            <Footer style={{ textAlign: 'center' }} className="footer footerBottom">
                <Link to='/admin' className="nav-admin">
                    <span>admin</span>
                </Link>
                <a href={"https://github.com/" + website.github} target="_blank">Brandon</a> ©2017 Created by <a href="https://facebook.github.io/react/">React</a>
                <a href={website.source} className="sourceCode" target="_blank">本站源码</a>
            </Footer>
        )
    }
}