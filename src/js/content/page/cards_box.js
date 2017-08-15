import React from 'react';
import CardsComponent from "./cards_item"
import {connect} from 'react-redux'
import {notification} from 'antd';
import {mapStateToProps_site, mapDispatchToProps_site} from '../../redux/connet'
import FormPageComponent from '../admin/form'

class CardsBoxComponent extends React.Component{
    constructor(){
        super();
        this.state = {
            deleteResCode:null,
        }
    }
    componentDidUpdate(){
        this.searchCode()
        if(this.props.deleteResSec !== this.state.deleteResSec){
            this.setState({
                deleteResSec:this.props.deleteResSec
            });
            if(this.props.deleteResCode > 0){
                // // code 返回代码  4：用户信息有误 5:删除失败 6：删除成功 7：数据不存在
                switch (this.props.deleteResCode) {
                    case 4:
                        this.openNotification("用户信息有误！");
                        break;
                    case 5:
                        this.openNotification("删除失败！");
                        break;
                    case 6:
                        this.openNotification("删除成功！");
                        break;
                    case 7:
                        this.openNotification("数据不存在！");
                        break;
                }
            }
        }
        if(this.props.confirmSec !== this.state.confirmSec){
            this.setState({
                confirmSec:this.props.confirmSec
            });
            if(this.props.confirmCode > 0){
                //code 返回代码  52：用户信息有误 53:数据未找到 54：数据转移失败 55：数据确认成功，但删除缓存失败 56：数据确认成功
                switch (this.props.confirmCode) {
                    case 52:
                        this.openNotification("用户信息有误！");
                        break;
                    case 53:
                        this.openNotification("数据未找到！");
                        break;
                    case 54:
                        this.openNotification("数据转移失败！");
                        break;
                    case 55:
                        this.openNotification("数据确认成功，但删除缓存失败！");
                        break;
                    case 56:
                        this.openNotification("数据确认成功！");
                        break;
                }
            }
        }
    }

    openNotification(text) {
        notification.open({
            message: 'message',
            description: text,
            duration: 3,
        });
    };

    searchCode(){
        if(this.props.resCode > 0 && this.state.fixCode === 33 ){
            this.setState({
                fixCode:0
            })
        }
        if(this.state.fixCode !== 33 && this.props.fixCode === 33){
            this.setState({
                fixCode:33
            })
        }
        if( this.props.subCode === 36 || this.props.subCode === 31  && this.state.fixCode === 33){
            this.setState({
                fixCode:0
            })
        }
    }

    render(){
        if(this.state.fixCode === 33 ){
            return(
                <FormPageComponent item={this.props.fixItem} code="33"/>
            )
        } else {
            return(
                <CardsComponent sites={this.props.sites } classes={this.props.classes} confirm={this.props.confirm}/>
            )
        }
    }
}
export default connect(mapStateToProps_site, mapDispatchToProps_site)(CardsBoxComponent)