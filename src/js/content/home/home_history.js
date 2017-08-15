import React from 'react';
import {Row,Col} from 'antd';

import {robot, server} from "../../environment";

export default class HomeHistoryComponent extends React.Component{
    constructor(){
        super();
        this.state = {
            data:[]
        }
    }
    componentDidMount(){
        const that = this;
        fetch(server.historyAPI, server.APPCODE)
            .then(res=>{ return res.json();})
            .then(data=>{
                console.log(data.showapi_res_body.list)
                that.setState({
                    data: data.showapi_res_body.list
                });
            }).catch(err=>console.log(err));
    }
    creatCard(){
        const cardList = this.state.data.map((item,index)=>{
            let Img = [];
            if(item.img){
                Img.push(item.img)
            }
            return(
                <Col xs={24} sm={12}  key={index}>
                    <div className="newsCard">
                        {Img.map((url,index)=>{
                            return (
                                <div className="img" style={{backgroundImage:'url('+ url+ ')'}} key={index}></div>
                            )
                        })}
                        <div  className="newsCardContent">
                            <p className="newsCardTitle">{item.title}</p>
                            <p className="year">{item.year + '年' + item.month + '月' + item.day + '日'}</p>
                        </div>
                    </div>
                </Col>
            )
        })
        return cardList;
    }
    render(){
        return(
            <Row>
                {this.creatCard()}
            </Row>
        )
    }
}