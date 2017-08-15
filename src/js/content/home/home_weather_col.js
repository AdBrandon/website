import React from 'react';
import {Col} from 'antd';

export default class HomeWeatherColComponent extends React.Component{
    render(){
        return (
            <Col span={8} className="w_col">
                <p className="w_col_h">
                    <span className="value">{this.props.value || '无数据'}</span>
                </p>
                <p className="w_col_b">
                    <span className="desc">{this.props.desc || '未知'}</span>
                </p>
            </Col>
        )
    }
}