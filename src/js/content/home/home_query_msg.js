import React from 'react';

export default class HomeQueryMsgComponent extends React.Component {
    render() {
        return (
            <div className={'msg_' + this.props.name}>
                <img className={'head_' + this.props.name} src={"./src/images/" + this.props.name + ".png"}
                     alt="avatar"/>
                <div className="body">
                    <div className="angle"></div>
                    {this.props.msg}
                </div>
            </div>
        )
    }
}