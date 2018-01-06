define(function () {
  return {
    reqPersonalDetailData:{
      /*接口状态*/
      status: 'success',
      /*报文*/
      success:{
        "servertime": 1464085283,
        "status": 1,
        "errorcode": "",
        "data": {
          name: '郑晓明',
          selfSore: 92,
          kpiEvaluate: '自己评价的内容测试内容。。。自己评价的内容测试内容。。。自己评价的内容测试内容。。。自己评价的内容测试内容。。。',
          kpiLists: [
            {
              kpiKey: '业务',
              kpiRate: '50%',
              kpiSelfSore: 90,
            },
            {
              kpiKey: '技术',
              kpiRate: '30%',
              kpiSelfSore: 92,
            },
            {
              kpiKey: '知识分享',
              kpiRate: '10%',
              kpiSelfSore: 93,
            },
            {
              kpiKey: '个人提升',
              kpiRate: '10%',
              kpiSelfSore: 91,
            },
          ]
        }
      },
      error:{"servertime":1510040546,"status":0,"errorcode":"抱歉!此宝箱已经过期！","data":[]}
    },
    reqEvaluateData: {
      /*接口状态*/
      status: 'success',
      /*报文*/
      success: {
        "servertime": 1464085283,
        "status": 1,
        "errorcode": "",
        "data": {
          //evaluate: '已经评价的内容已经评价的内容已经评价的内容已经评价的内容已经评价的内容已经评价的内容已经评价的内容'
        },
      },
      error:{"servertime":1510040546,"status":0,"errorcode":"抱歉!此宝箱已经过期！","data":[]}
    },
    successEvaluate: {
      /*接口状态*/
      status: 'success',
      /*报文*/
      success: {
        "servertime": 1464085283,
        "status": 1,
        "errorcode": "",
        "data": {
        },
      },
      error:{"servertime":1510040546,"status":0,"errorcode":"抱歉!此宝箱已经过期！","data":[]}
    },
  };
});