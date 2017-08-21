import React from 'react';
import { Card,Popover } from 'antd';
import {website} from '../../environment'

export default class AboutComponent extends React.Component{

    render(){
        const content = (
            <img src="./src/images/QR.png" alt="WeChat"/>
        );
        return(
            <div className="about">
                <Card className="about_card">
                <h2>关于本站</h2>
                <p>本站源码：<a href={website.source}  target="_blank">GitHub</a></p>
                <p>本站地址：<a href={website.url}>{website.url}</a></p>
                <p>本站前端由<a href="https://facebook.github.io/react/">React</a>编写，UI使用<a href="https://ant.design/index-cn">Ant Design</a>，后台由<a href="https://nodejs.org/en/">Node.js</a>支持，数据库采用<a href="https://www.mongodb.com/">MongoDB</a>，服务器使用<a href="https://www.aliyun.com/">阿里云</a>。</p>
                <p>没错，全部采用轻量级的工具，使得网站开发变得异常便捷！</p>
                <p>您可以在这里提交站点，使得网站收录更加全面！</p>
                <p>留言板？别开玩笑了，还没开发呢！不过您可以使用下面的联系方式找到我。</p>
                <h2>联系我</h2>
                <p>Email: <a href={'mailto:' + website.email}>{website.email}</a></p>
                <p>GitHub: <a href={'https://github.com/' + website.github} target="_blank">{website.github}</a></p>
                <p>QQ: <a href={'tencent://message/?uin=' + website.qq}>{website.qq}</a></p>
                <p>WeChat:
                    <Popover placement="right" content={content} title="扫一扫，加好友">
                        <span className="weChat">{website.wechat}</span>
                    </Popover>
                </p>
                </Card>
            </div>
        )
    }
}