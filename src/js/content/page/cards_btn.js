import React from 'react';
import {connect} from 'react-redux'
import {Button, Modal} from 'antd';
import {mapStateToProps_site, mapDispatchToProps_site} from '../../redux/connet'

const confirm = Modal.confirm;

class CardsBtnComponent extends React.Component{
    createConfirmBtn(title){
        if(this.props.confirm){
            return(
                <Button type="primary" ghost size="small" onClick={this.props.confirmItem.bind(this,title)}>确认</Button>
            )
        }
    }
    createManageBtn(title) {
        if (sessionStorage.v && sessionStorage.name) {
            return (
                    <Button.Group>
                        {this.createConfirmBtn(title)}
                        <Button size="small" onClick={this.props.updateItem.bind(this,this.props.classes,title,this.props.didSite)}>修改</Button>
                        <Button type="danger" size="small" onClick={this.deleteItem.bind(this, title)}>删除</Button>
                    </Button.Group>
            )
        }
    }
    deleteItem(title) {
        if(!sessionStorage.v){
            return ;
        }
        const that = this;
        confirm({
            title: '真的要删除' + title + '吗？',
            content: '一旦删除，无法恢复！',
            onOk() {
                that.props.deleteItem(that.props.classes, title)
            },
            onCancel() {
            },
        });
    }

    render(){
        return(
            <div>
                {this.createManageBtn(this.props.title)}
            </div>
        )
    }
}

export default connect(mapStateToProps_site, mapDispatchToProps_site)(CardsBtnComponent)