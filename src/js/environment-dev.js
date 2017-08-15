//这里用来存放应用的常量
const APPCODE = ''



//
const website = {
    title:"前端导航",
    logo:"./src/images/react.png",
    source:"https://github.com/AdBrandon",
    email:"admin@vmail.cc",
    github:"AdBrandon",
    qq:"176025823",
    wechat:'romcage'
};

//serverAddress
const server = {
    getApi:"http://localhost:8033/api/get/",
    getStorageApi:"http://localhost:8033/api/storage",
    getInit:{
        method: 'GET',
        mode: "cors",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    },
    login:"http://localhost:8033/api/login",
    submit:"http://localhost:8033/api/post",
    deleteApi:"http://localhost:8033/api/delete",
    updateApi:"http://localhost:8033/api/update",
    confirmApi:"http://localhost:8033/api/confirm",
    submitInit: {
        method: 'POST',
        mode: "cors",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    },
    weatherAPI:["http://saweather.market.alicloudapi.com/ip-to-weather?ip=","&need3HourForcast=0&needAlarm=0&needHourData=0&needIndex=0&needMoreDay=1"],
    robotAPI:"http://jisuznwd.market.alicloudapi.com/iqa/query?question=",
    historyAPI:"http://ali-todayhistory.showapi.com/today-of-history?date=",
    APPCODE:{
        method: 'GET',
        headers: {
            Authorization: "APPCODE " + APPCODE
        }
    }

};

//菜单、类别
const menus = [
    {
        value:'framework',
        icon:"rocket",
        name:"框架类库",
        url:"/s/framework",
        site:true
    },
    {
        value:'ui',
        icon:"picture",
        name:"视觉ＵＩ",
        url:"/s/ui",
        site:true
    },
    {
        value:'program',
        icon:"star-o",
        name:"工具软件",
        url:"/s/program",
        site:true
    },
    {
        value:'study',
        icon:"code-o",
        name:"学习平台",
        url:"/s/study",
        site:true
    },
    {
        value:'cloud',
        icon:"cloud-o",
        name:"云＆数据",
        url:"/s/cloud",
        site:true
    },
    {
        value:'books',
        icon:"book",
        name:"前端书籍",
        url:"/s/books",
        site:true
    },
    {
        value:'design',
        icon:"heart-o",
        name:"设计灵感",
        url:"/s/design",
        site:true
    },
    {
        value:'community',
        icon:"team",
        name:"技术社区",
        url:"/s/community",
        site:true
    },
    {
        value:'form',
        icon:"upload",
        name:"提交地址",
        url:"/form"
    },
    {
        value:'about',
        icon:"user",
        name:"关于本站",
        url:"/about"
    }
];

//form类型
const formMenu = [
    {
        placeholder:"Title",
        name:"标题",
        key:"title"
    },
    {
        placeholder:"description",
        name:"描述",
        key:"desc"
    },
    {
        placeholder:"LOGO地址",
        name:"LOGO",
        key:"img"
    },
    {
        placeholder:"Link",
        name:"官网",
        key:"link"
    },
    {
        placeholder:"Tips",
        name:"Tips",
        key:"tips"
    }
];

const robot = {
    init:[{
            name:'i',
            placement:'rightTop',
            msg:"Hi，我是小ｉ机器人，很高兴为您服务"
        }],
    input:"小i机器人为您服务"
};



export {website,server,menus,formMenu,robot}