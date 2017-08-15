import React from 'react';
import {Input} from 'antd';

import HomeQueryMsgComponent from "./home_query_msg"
import {robot, server} from "../../environment";

export default class HomeQueryComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            value: "",
            msgs: robot.init
        }
    }

//逻辑处理
    chat(e) {
        const msg = e.target.value;
        const that = this;
        let newMsg = this.state.msgs;
        newMsg.push({
            name: 'u',
            placement: 'leftTop',
            msg: msg
        });
        this.setState({
            msgs: newMsg
        });
        fetch(server.robotAPI + encodeURIComponent(msg), server.APPCODE)
            .then(function (res) {
                console.log(res)
                return res.json();
            })
            .then(function (data) {
                console.log(data)
                if (data.msg === 'ok') {
                    const content = markup(data.result.content);
                    newMsg.push({
                        name: 'i',
                        placement: 'rightTop',
                        msg: content
                    });
                    that.setState({
                        msgs: newMsg
                    });
                }
            })
    }

    onChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        return (
            <div className="query">
                {this.state.msgs.map((chat, index) => {
                    return (
                        <HomeQueryMsgComponent name={chat.name} placement={chat.placement} msg={chat.msg} key={index}/>
                    )
                })
                }
                <Input placeholder={robot.input} onPressEnter={this.chat.bind(this)} className='input'
                       value={this.state.value} onChange={this.onChange.bind(this)}/>
            </div>
        )
    }
}

//检查文本内链接
function markup(data) {
    if (data.indexOf('[/link]') < 1) {
        return data
    } else {
        data = data.replace(/\[link.url/g, "<a target='_blank' href").replace(/\[\/link\]/g, "</a><br/>").replace(/\]/g, ">");
        data = {
            __html: data
        };
        return <div dangerouslySetInnerHTML={data}></div>;
    }
}
