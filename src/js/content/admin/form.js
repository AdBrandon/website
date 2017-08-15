import React from 'react';
import {Form, Input, Button, Select, notification} from 'antd';
import {connect} from 'react-redux'

import {mapStateToProps_submitForm,mapDispatchToProps_submitForm} from '../../redux/connet'
import {menus, formMenu} from '../../environment'

class FormPageComponent extends React.Component {
    constructor(){
        super();
        this.state = {
            sec:null,
            obj:[],
            code:0
        }
    }

    componentWillMount(){
        if(this.state.code !== 33 && this.props.item){
            const obj = this.props.item;
            this.setState({
                obj:[obj.title,obj.desc,obj.img,obj.link,obj.tips],
                classes:obj.classes,
                code:33

            })
        }
        this.formMenu = formMenu;
        this.sites = menus.filter((menu) => {
            return (menu.site)
        });
    }
    componentDidUpdate(){
        if(this.props.res.sec !== this.state.sec){
            this.setState({
                sec:this.props.res.sec
            });
            // // push 返回代码  1：成功；2：已存在；3：保存失败；4：获取数据失败 ; 31:修改成功 ；32:修改失败 ；35 管理员修改失败;36管理员修改成功
            switch (this.props.res.push) {
                case 1:
                    this.openNotification("提交成功，请等待管理员审核！");
                    this.props.form.resetFields();
                    break;
                case 2:
                    this.openNotification("数据已存在！");
                    break;
                case 3:
                    this.openNotification("服务器保存失败！");
                    break;
                case 4:
                    this.openNotification("数据上传失败！");
                    break;
                case 31:
                    this.openNotification("数据已成功更新，请等待管理员审核！");
                    break;
                case 32:
                    this.openNotification("数据更新失败，请联系管理员！");
                    break;
                case 35:
                    this.openNotification("数据更新失败，请检查服务器！");
                    break;
                case 36:
                    this.openNotification("数据更新成功！");
                    break;
            }
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.title = encodeURIComponent(values.title);
                values.desc = encodeURIComponent(values.desc);
                values.img = encodeURIComponent(values.img);
                values.link = encodeURIComponent(values.link);
                if(values.tips){
                    values.tips = encodeURIComponent(values.tips);
                }
                this.props.submitForm(values,this.state.code)
            }
        });
    }

    openNotification(text) {
        notification.open({
            message: 'message',
            description: text,
            duration: 3,
        });
    };
    creatInput() {
        return (
            this.formMenu.map((input, index) => {
                let required = {required: true, message: '这是必填项！'};
                if(input.name === 'Tips'){
                    required = {};
                }
                return (
                    <Form.Item className="form_input" key={index}>
                        <div className="form_text">{input.name}</div>
                        {this.props.form.getFieldDecorator(input.key, {
                            initialValue: this.state.obj[index],
                            rules: [required],
                        })(
                            <Input placeholder={input.placeholder}/>
                        )}
                    </Form.Item>
                )
            }))
    }
    createSelect() {
        //创建Select
        return (this.props.form.getFieldDecorator('classes', {
            initialValue: this.state.classes || 'framework',
        })(
            <Select className="form_select">
                {
                    this.sites.map((menu, index) => {
                        return (
                            <Select.Option value={menu.value} key={index}>{menu.name}</Select.Option>
                        )
                    })
                }
            </Select>
        ))
    }
    render() {
        return (
            <div className="form_box">
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="form_title">请填写需要提交的数据</div>
                    {this.createSelect()}
                    {this.creatInput()}
                    <Button type="primary" htmlType="submit" className="form_btn">提交</Button>
                </Form>
            </div>
        )

    }
}

export default connect(mapStateToProps_submitForm,mapDispatchToProps_submitForm)(Form.create({})(FormPageComponent))
