import React from 'react';
import {Layout} from 'antd';
import ContentComponent from './body'
import FooterComponent from './footer'

export default class RightSideComponent extends React.Component {
    render() {
        return (
            <div className="rightSide">
                <Layout className={this.props.collapsed ? "lay_small" : "lay_big"}>
                    <ContentComponent />
                    <FooterComponent />
                </Layout>
            </div>
        )
    }
}
