import React from 'react';
import { Layout } from 'antd';
import HomePageComponent from './home/home';
import FormPageComponent from "./admin/form";
import SiteComponent from "./page/site"
import AdminComponent from './admin/admin'
import {Route} from 'react-router-dom';
import AboutComponent from './admin/about'

const { Content} = Layout;

export default class ContentComponent extends React.Component{
    render(){
        return(
            <Content>
                    <div className="rightSideBody">
                        <Route exact path="/" component={HomePageComponent} />
                        <Route path="/admin" component={AdminComponent} />
                        <Route path="/form" component={FormPageComponent} />
                        <Route path="/about" component={AboutComponent} />
                        <Route path="/s/:classes" component={SiteComponent} />
                    </div>
            </Content>
        )
    }
}