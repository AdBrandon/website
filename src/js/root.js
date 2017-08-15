import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux'
import {store} from './redux/reducer'

import AsideComponent from "./aside/aside"
import RightSideComponent from "./content/right_side"

import 'antd/dist/antd.css'
import {Layout} from 'antd';

class Root extends React.Component {
    constructor() {
        super();
        this.state = {
            collapsed: false
        }
    }

    onCollapse() {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    render() {
        return (
            <Provider store={store}>
                <HashRouter>
                    <Layout>
                        <Layout.Sider collapsible breakpoint="sm" collapsedWidth="65"
                                      onCollapse={this.onCollapse.bind(this)} className="aside">
                            <AsideComponent collapsed={this.state.collapsed}/>
                        </Layout.Sider >
                        <RightSideComponent collapsed={this.state.collapsed}/>
                    </Layout>
                </HashRouter>
            </Provider>
        )
    }
}
ReactDOM.render(<Root />, document.getElementById('app'))
