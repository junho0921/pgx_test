/**
 * Created by jun.ho
 */
define(function (require, exports, module) {
  'use strict';

  module.exports = app.View.extend({
    initialize:function () {
      app.utils.loadingPage('#personalResult_wrap');
      this.reqData();
    },
    events:{
      'touchstart .shareBtn': 'share',
    },
    reqData: function () {
      app.request({
        url: 'reqPersonalDetailData',
        success: this.requestCallback,
      });
    },
    requestCallback: function (result) {
      if(result){
        app.renderTpl('personalResultTpl', 'personalResult_wrap', result.data);
      }
    },
    share: function () {
      console.log('邀请');
      app.utils.toast('todo 还没有接入api');
    }
  });
});