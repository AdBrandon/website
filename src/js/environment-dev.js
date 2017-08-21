//这里用来存放应用的常量

const APPCODE = ''; //阿里云api
const host = 'http://localhost:8033';


//
const website = {
    title:"前端导航",
    url:"http://www.romcagenius.com",
    logo:"./src/images/logo.png",
    source:"https://github.com/AdBrandon/NavWebsite",
    email:"admin@vmail.cc",
    github:"AdBrandon",
    qq:"176025823",
    wechat:'romcage'
};

//serverAddress
const server = {
    getApi:host + "/api/get/",
    getStorageApi:host + "/api/storage",
    getInit:{
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    },
    login:host + "/api/login",
    submit:host + "/api/post",
    deleteApi:host + "/api/delete",
    updateApi:host + "/api/update",
    confirmApi:host + "/api/confirm",
    submitInit: {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
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
    input:"小ｉ机器人为您服务"
};



export {website,server,menus,formMenu,robot}