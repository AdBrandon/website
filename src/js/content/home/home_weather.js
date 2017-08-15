import React from 'react';
import {connect} from 'react-redux'
import {Row, Col, Breadcrumb, Card} from 'antd';

import HomeWeatherColComponent from './home_weather_col';
import HomeWeatherMainComponent from './home_weather_main';

import {mapStateToProps_weather, mapDispatchToProps_weather} from '../../redux/connet'

class HomeWeatherComponent extends React.Component {
    componentDidMount() {
        this.props.getWeather();
    }

    createCityList() {
        return (
            <Col span={24}>
                <Breadcrumb>
                    {this.props.cityInfo.map((item, index) => {
                        return (
                            <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                        )
                    })}
                </Breadcrumb>
            </Col>
        )
    }

    creatWeatherNow() {
        return (
            <div id="weather_card">
                <Col xs={12} sm={8} lg={6}>
                    {this.props.now.map((item, index) => {
                        return (
                            <div className="weather" key={index}>
                                <Card title={item.temperature_time} bordered={false}>
                                    <Row>
                                        <HomeWeatherMainComponent
                                            pic={"./src/images/weather" + item.weather_pic.split("icon")[1]}
                                            big={item.temperature} small={"℃ " + item.weather}/>
                                        <HomeWeatherColComponent value={item.sd} desc="空气湿度"/>
                                        <HomeWeatherColComponent value={item.aqiDetail.quality} desc="空气质量"/>
                                        <HomeWeatherColComponent value={item.aqi} desc="空气指数"/>
                                        <HomeWeatherColComponent value={item.aqiDetail.pm2_5} desc="pm2.5指数"/>
                                        <HomeWeatherColComponent value={item.wind_power} desc={item.wind_direction}/>
                                        <HomeWeatherColComponent value={item.aqiDetail.primary_pollutant} desc="污染物"/>
                                    </Row>
                                </Card>
                            </div>
                        )
                    })}
                </Col>
            </div>
        )
    }

    creatWeatherList() {
        const WeatherList = this.props.weather.map((item, index) => {
            return (
                <div id="weather_card" key={index}>
                    <Col xs={12} sm={8} lg={6}>
                        <div className="weather">
                            <Card title={item.title} bordered={false}>
                                <Row>
                                    <HomeWeatherMainComponent
                                        pic={"./src/images/weather" + item.day_weather_pic.split("icon")[1]}
                                        big={item.day_air_temperature} small={ '℃ / ' + item.night_air_temperature}/>
                                    <HomeWeatherColComponent value={item.sun_begin_end} desc="日出 | 日落"/>
                                    <HomeWeatherColComponent value={item.day_weather} desc="天气"/>
                                    <HomeWeatherColComponent value={item.jiangshui} desc="降水概率"/>
                                    <HomeWeatherColComponent value={item.air_press} desc="气压"/>
                                    <HomeWeatherColComponent value={item.day_wind_power} desc="风力"/>
                                    <HomeWeatherColComponent value={item.ziwaixian} desc="紫外线"/>
                                </Row>
                            </Card>
                        </div>
                    </Col>
                </div>
            )
        });
        return WeatherList;
    }

    render() {
        return (
            <Row>
                {this.createCityList()}
                {this.creatWeatherNow()}
                {this.creatWeatherList()}
            </Row>
        )
    }
}
export default connect(mapStateToProps_weather, mapDispatchToProps_weather)(HomeWeatherComponent)