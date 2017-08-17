import React from 'react';
import {Col, Tooltip} from 'antd';
import CardsBtnComponent from "./cards_btn"

export default class CardsComponent extends React.Component{
    createTooltip(item){
        if(item.classes !== 'books'){
            return(
                <Tooltip placement="top" title={item.link} arrowPointAtCenter>
                    <p><a href={item.link} target="_blank">{item.title}</a></p>
                </Tooltip>
            )
        }else{
            return(
                <p><a href={item.link} target="_blank">{item.title}</a></p>
            )
        }
    }
    createTips(tips){
        if(tips && tips !== 'undefined'){
            return(
                <div className="tips">
                    <p>{tips}</p>
                </div>
            )
        }
    }
    render(){
        return(
            <div>{
                this.props.sites.map((item, index) => {
                    return (
                        <Col xs={12} sm={12} md={8} xl={6} key={index} className="it_col">
                            <div className="it_card">
                                <div className="box">
                                    <div className="img_box">
                                        <a href={item.link} target="_blank"><img alt={item.title} width="100%" src={item.img}/></a>
                                    </div>
                                    <div className="title">
                                        {this.createTooltip(item)}
                                    </div>
                                    <div className="manageBtn">
                                        <CardsBtnComponent title={item.title} classes={this.props.classes} didSite={this.props.sites} confirm={this.props.confirm}/>
                                    </div>
                                    <div className="desc">
                                        <p>{item.desc}</p>
                                    </div>
                                    {this.createTips(item.tips)}
                                </div>
                            </div>
                        </Col>
                    )
                })
            }
            </div>
        )
    }
}
