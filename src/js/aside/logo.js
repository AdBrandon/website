import React from 'react';
import {Link} from 'react-router-dom';
import {website} from '../environment'

export default class LogoComponent extends React.Component{
    render(){
        return(
            <div className="logo">
                <Link to={"/"}>
                <img className={this.props.collapsed? "logo_small" : "logo_big"} src={website.logo} alt="logo"/>
                <p className="logo_p" >{website.title}</p>
                </Link>
            </div>
        )
    }
}