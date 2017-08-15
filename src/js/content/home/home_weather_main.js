import React from 'react';
import {Col} from 'antd';

export default class HomeWeatherMainComponent extends React.Component{
    render(){
        return (
            <Col span={24}>
                <p className="w_main">
                    <img src={this.props.pic} alt={this.props.weather} />
                    <span className="big">{this.props.big}</span>
                    <span className="small">{this.props.small}</span>
                </p>
            </Col>
        )
    }
}