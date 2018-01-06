define(function () {
  return {
    req_info:{
      /*接口状态*/
      status: 'success_personal',
      /*报文*/
      success_personal:{
        "servertime": 1464085283,
        "status": 1,
        "errorcode": "",
        "data": {
          isShare: 0,
          name: '郑晓明',
          pos: '设计师',
          bg: '平台事业部/设计部/设计2组',
        }
      },
      success_share:{
        "servertime": 1464085283,
        "status": 1,
        "errorcode": "",
        "data": {
          isShare: 1,
          name: '郑晓明',
          pos: '设计师',
          bg: '平台事业部/设计部/设计2组',
        }
      },
      error:{"servertime":1510040546,"status":0,"errorcode":"抱歉!此宝箱已经过期！","data":[]}
    },
    req_pos:{
      /*接口状态*/
      status: 'success',
      /*报文*/
      success:{
        "servertime": 1464085283,
        "status": 1,
        "errorcode": "",
        "data": {
          isTop: 0,
        }
      },
      error:{"servertime":1510040546,"status":0,"errorcode":"抱歉!此宝箱已经过期！","data":[]}
    },
    req_status:{
      /*接口状态*/
      status: 'success',
      /*报文*/
      success:{
        "servertime": 1464085283,
        "status": 1,
        "errorcode": "",
        "data": {
          isEnd: 0,
        }
      },
      error:{"servertime":1510040546,"status":0,"errorcode":"抱歉!此宝箱已经过期！","data":[]}
    }
  };
});