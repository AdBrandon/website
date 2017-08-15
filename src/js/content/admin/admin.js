import React from 'react';
import {connect} from 'react-redux'
import {Form, Input,Icon, Button, Checkbox,Select, notification} from 'antd';
import {mapStateToProps_admin, mapDispatchToProps_admin} from '../../redux/connet'
import CardsBoxComponent from "../page/cards_box"

const FormItem = Form.Item;
class AdminComponent extends React.Component{
    constructor(){
        super();
        this.state = {
            sec:sessionStorage.v,
            v:0,
            name:sessionStorage.name
        }
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.login(values)
            }
        });
    }
    componentDidUpdate(){
        if(this.props.sec !== this.state.sec){
            this.setState({
                sec:this.props.sec
            });
            // code 返回代码  1：登陆成功；2：用户名或密码错误；3：数据不合法
            switch (this.props.code) {
                case 1:
                    this.openNotification("登陆成功！");
                    sessionStorage.v = this.props.v;
                    sessionStorage.name = this.props.name;
                    this.setState({
                        v:this.props.v,
                        name:this.props.name,
                    })
                    break;
                case 2:
                    this.openNotification("用户名或密码错误！");
                    break;
                case 3:
                    this.openNotification("数据不合法！");
                    break;
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
    createLogin(){
        if(this.state.name){
            return ;
        }
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                <h2 >请登录</h2>
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: '请输入用户名' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>记住我</Checkbox>
                    )}
                    <Button type="primary" htmlType="submit" className="login-form-button">登陆</Button>
                </FormItem>
            </Form>
        );
    }
    createManage(){
        if(!this.props.storageCode && this.state.name){
            this.props.getStorageData()
        }
    }
    render(){
        return(
            <div>
                {this.createLogin()}
                {this.createManage()}
                <CardsBoxComponent sites={this.props.storage || []} classes="storage" confirm="admin"/>
            </div>
        )

    }
}


export default connect(mapStateToProps_admin,mapDispatchToProps_admin)(Form.create({})(AdminComponent))
