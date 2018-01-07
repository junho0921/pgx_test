define(function (require, exports, module) {
  var kpiDetail= require('mock/api/kpiDetail');
  var postEvaluate= require('mock/api/postEvaluate');
  return {
    kpiDetail:kpiDetail,
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
    successEvaluate: postEvaluate
  };
});