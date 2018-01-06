/**
 * Created by jun.ho
 */
define(function (require, exports, module) {
  'use strict';

  module.exports = app.View.extend({
    initialize:function () {
      //this.renderContent({
      //  name: app.global.targetName,
      //  selfSore: null,
      //  kpiLists: null,
      //  kpiEvaluate: null,
      //});
      this.reqData();
    },
    events:{
      'touchstart .inviteBtn': 'invite',
    },
    renderContent: function (data) {
      app.renderTpl('personalResultTpl', 'personalResult_wrap', data);
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
    invite: function () {
      console.log('邀请');
      app.utils.toast('todo 还没有接入api');
    }
  });
});