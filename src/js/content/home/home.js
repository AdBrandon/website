import React from 'react';
import {server} from '../../environment'

import HomeWeatherComponent from './home_weather'
import HomeQueryComponent from "./home_query";
import HomeHistoryComponent from "./home_history"

export default class HomePageComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            class: 'index',
            ip: null
        }
    }

    componentDidMount() {
        const that = this;
        if (!this.state.ip && !this.state.get) {
            that.setState({
                get: 1
            });
            fetch(server.getApi + 'IP', server.getInit)
                .then(response => {
                    return response.json()
                })
                .then(json => {
                    that.setState({
                        ip: '101.46.123.83',
                    });
                });
        }
    }

    createMore() {
        if (this.state.ip) {
            return (
                <div className={this.state.ip}>
                    <HomeWeatherComponent ip={this.state.ip}/>
                    <HomeHistoryComponent/>
                </div>
            )
        }
    }

// <script src="http://pv.sohu.com/cityjson?ie=utf-8"></script>
    render() {
        return (
            <div className={this.state.class}>
                <HomeQueryComponent/>
                {this.createMore()}
            </div>
        )
    }
}