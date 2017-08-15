import React from 'react';

import MenuComponent from './menu'
import LogoComponent from './logo'

export default class AsideComponent extends React.Component {
    render() {
        return (
            <div>
                <LogoComponent collapsed={this.props.collapsed}/>
                <MenuComponent collapsed={this.props.collapsed}/>
            </div>
        )
    }
}
