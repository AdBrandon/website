import {server, robot} from "../environment"

require('es6-promise').polyfill();
require('isomorphic-fetch');

//===================================================
//form组件

//mapStateToProps
function mapStateToProps_submitForm(state) {
    return {
        res: state || 0,
        subCode:state.subCode
    }
}

// UI组件传递动作，接收UI组件的submitForm方法
function mapDispatchToProps_submitForm(dispatch) {
    return {
        submitForm: (FormData,code) => {
            FormData.code = code;
            FormData.v = sessionStorage.v || 0;
            FormData.name = sessionStorage.name || 'a'
            submit(FormData, dispatch)

        },
        returnManage:()=>{

        }
    }
}


//接收到UI组件的submit动作，提交数据到服务器
function submit(Data, dispatch) {
    let myFetchOptions = server.submitInit;
    myFetchOptions.body = JSON.stringify(Data)
    fetch(server.submit, myFetchOptions)
        .then(response => {
            return response.json()
        })
        .then(json => {
            dispatch({
                type: 'SUBMIT',
                data: json,
                subCode:json.push
            })
        });
}


//===================================================
//home_weather组件

//mapStateToProps
function mapStateToProps_weather(state) {
    return {
        cityInfo: state.cityInfo || [],
        weather: state.weather || [],
        now: state.now || [],
        type: state.type || ''
    }
}

// UI组件传递动作，接收UI组件的submitForm方法
function mapDispatchToProps_weather(dispatch, ownProps) {
    return {
        getWeather: () => {
            getIpFn(dispatch, ownProps)
            // submit(FormData, dispatch)

        }
    }
}

//获取客户端IP
function getIpFn(dispatch, ownProps) {
    var ip = null;
    const getIp = () => {
        var times = setTimeout(() => {
            try {
                if (returnCitySN["cip"]) {
                    ip = returnCitySN["cip"]
                    createWeather(ip, dispatch, ownProps);
                } else {
                    getIp();
                }
            } catch (e) {
                clearInterval(times)
            }
        }, 10)
    }
    getIp();
}

//通过IP，发送fetch
function createWeather(ip, dispatch, ownProps) {
    fetch(server.weatherAPI[0] + ip + server.weatherAPI[1], server.APPCODE)
        .then(res => {
            return res.json();
        }).then(data => {
        const cityInfo = data.showapi_res_body.cityInfo;
        const dataWeather = data.showapi_res_body;
        //城市信息
        const info = [cityInfo.c9, cityInfo.c7, cityInfo.c5];
        //天气信息
        let weather = [];
        for (let key in dataWeather) {
            if (dataWeather.hasOwnProperty(key)) {
                if (dataWeather[key].day_weather) {
                    let obj = dataWeather[key];
                    obj.index = parseInt(key.split("f")[1]);
                    weather.push(obj)
                }
            }
        }
        //天气信息排序
        const sortNumber = (a, b) => {
            return a.index - b.index
        };
        weather.sort(sortNumber);
        weather = creatTitle(weather);
        //now
        const now = [dataWeather.now];
        // 复制原有state
        let newState = {};
        for (let key in ownProps) {
            if (ownProps.hasOwnProperty(key)) {
                newState[key] = ownProps[key]
            }
        }
        newState.cityInfo = info;
        newState.weather = weather;
        newState.now = now;
        //action
        dispatch({
            type: 'WEATHER',
            newState: newState
        })
    }).catch(err => console.log(err));
}

//给数组添加标题
function creatTitle(arr) {
    for (let i = 0; i < arr.length; i++) {
        switch (arr[i].index) {
            case 1:
                arr[i].title = '今天';
                break;
            case 2:
                arr[i].title = '明天';
                break;
            case 3:
                arr[i].title = '后天';
                break;
            default:
                switch (arr[i].weekday) {
                    case 1:
                        arr[i].title = '周一';
                        break;
                    case 2:
                        arr[i].title = '周二';
                        break;
                    case 3:
                        arr[i].title = '周三';
                        break;
                    case 4:
                        arr[i].title = '周四';
                        break;
                    case 5:
                        arr[i].title = '周五';
                        break;
                    case 6:
                        arr[i].title = '周六';
                        break;
                    case 7:
                        arr[i].title = '周日';
                        break;
                }
        }
    }
    return arr;
}


//===================================================
//home_site组件

//mapStateToProps
function mapStateToProps_site(state) {
    return {
        fullSite: state.fullSite,
        pathSite: state.pathSite,
        path:state.path,
        deleteResCode:state.code || 0,
        deleteResSec:state.sec || null,
        updateCode:state.code || 0,
        updatePath:state.path,
        updateTitle:state.title,
        fixItem:state.fixItem,
        fixCode:state.fixCode,
        subCode:state.subCode,
        confirmCode:state.confirmCode,
        confirmSec:state.confirmSec,
        resCode: state.push || 0,
    }
}

// UI组件传递动作，接收UI组件的submitForm方法
function mapDispatchToProps_site(dispatch) {
    return {
        getFullSite: () => {
            fetchGetSite(dispatch)
        },
        getSite: (needPath,statePath,fullSite) => {
            if(needPath === statePath) return;
            if (!fullSite){
                fetchGetSite(dispatch)
            }else{
                dispatch({
                    type: 'GETPATHSITE',
                    fullSite: fullSite,
                    pathSite: findClasses(needPath,fullSite),
                    path: needPath
                });
            }
        },
        deleteItem:(path,title)=>{
            fetchDeleteItem(path,title,dispatch)
        },
        updateItem:(path,title,pathSite)=>{
            let fixItem;
             pathSite.map((item)=>{
                if(item.title === title){
                    fixItem = item ;
                }
            });
            dispatch({
                type: 'UPDATESHOWFORM',
                code:21,
                path:path,
                title:title,
                fixItem:fixItem,
                fixCode:33
            });
        },
        confirmItem:(title)=>{
            fetchPost(server.confirmApi,{
                title:title,
                v:sessionStorage.v,
                name:sessionStorage.name},(json)=>{
                dispatch({
                    type: 'CONFIRM',
                    confirmCode:json.code,
                    confirmSec:json.sec,
                    data:json
                });
            })
        }
    }
}
//取服务器数据
function fetchGetSite(dispatch) {
    fetch(server.getApi + 'full', server.getInit)
        .then(response => {
            return response.json()
        })
        .then(json => {
            //action
            dispatch({
                type: 'GETFULLSITE',
                fullSite: json
            })
        });
}

//寻找对应的classes
function findClasses(needPath,fullSite) {
    for (const key in fullSite){
        if (key === needPath){
           return (fullSite[key])
        }
    }
}
//删除服务器指定数据D
function fetchDeleteItem(path,title,dispatch) {
    let myFetchOptions = server.submitInit;
    myFetchOptions.body = JSON.stringify({
        path:path,
        title:title,
        v:sessionStorage.v,
        name:sessionStorage.name});
    fetch(server.deleteApi, myFetchOptions)
        .then(response => {
            return response.json()
        })
        .then(json => {
            dispatch({
                type: 'DELETEITEM',
                data:json
            })
            // code 返回代码  4：用户信息有误 5:删除失败 6：删除成功 7：数据不存在
        });
}



//===================================================
//admin组件

//mapStateToProps
function mapStateToProps_admin(state) {
    return {
        code: state.code || 0,
        name:state.name,
        sec:state.sec,
        v:state.verify,
        storage:state.storage || [],
        storageCode:state.storageCode || 0,
    }
}

// UI组件传递动作，接收UI组件方法
function mapDispatchToProps_admin(dispatch) {
    return {
        login: (FormData) => {
            fetchLogin(FormData, dispatch)

        },
        getStorageData:()=>{
            fetchGetStorage(dispatch)
        }
    }
}

//接收到UI组件的submit动作，提交数据到服务器
function fetchLogin(Data, dispatch) {
    let myFetchOptions = server.submitInit;
    myFetchOptions.body = JSON.stringify(Data);
    fetch(server.login, myFetchOptions)
        .then(response => {
            return response.json()
        })
        .then(json => {
            switch (json.code){
                case 1:
                    dispatch({type: 'LOGINSUCCESS', data: json});
                    break;
                case 2:
                    dispatch({type: 'LOGINERROR', data: json});
                    break;
                case 3:
                    dispatch({type: 'MSGERROR', data: json});
                    break
            }
        });
}


//接收到UI组件的submit动作，提交数据到服务器
function fetchGetStorage(dispatch) {
    fetch(server.getStorageApi, server.getInit)
        .then(response => {
            return response.json()
        })
        .then(json => {
            if(json.code === 200){
                dispatch({type: 'STORAGESUCCESS', storage: json.value,storageCode:json.code});
            }else{
                dispatch({type: 'STORAGEERROR', storage: json.value,storageCode:json.code});
            }
        });
}



//=================================
//fetch方法封装
function fetchPost(url,body,callBack) {
    let myFetchOptions = server.submitInit;
    myFetchOptions.body = JSON.stringify(body);
    fetch(url, myFetchOptions)
        .then(response => {
            return response.json()
        })
        .then(json => {
            callBack(json)
        });
}
//取服务器数据
function fetchGet(url,callBack) {
    fetch(url, server.getInit)
        .then(response => {
            return response.json()
        })
        .then(json => {
            callBack(json)
        });
}



//===================================================
//导出

export {
    mapDispatchToProps_submitForm, mapStateToProps_submitForm,
    mapStateToProps_weather, mapDispatchToProps_weather,
    mapStateToProps_site, mapDispatchToProps_site,
    mapStateToProps_admin,mapDispatchToProps_admin
};