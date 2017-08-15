import React from 'react';


import HomeWeatherComponent from './home_weather'
import HomeQueryComponent from "./home_query";
import HomeHistoryComponent from "./home_history"

export default class HomePageComponent extends React.Component{
    render(){
        return(
            <div>
                <HomeQueryComponent/>
                <HomeWeatherComponent/>
                {/*<HomeHistoryComponent/>*/}
            </div>
        )
    }
}