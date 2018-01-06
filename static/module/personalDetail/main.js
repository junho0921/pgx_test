/**
 * Created by jun.ho
 */
define(function (require, exports, module) {
  'use strict';

  module.exports = app.View.extend({
    initialize:function () {
      app.utils.loadingPage('#personalDetail_wrap');
      this.reqKpiData();
    },
    events:{
      'touchstart .inviteBtn': 'invite',
    },
    reqKpiData: function () {
      app.request({
        url: 'kpiDetail',
        success: this.requestCallback,
      });
    },
    requestCallback: function (result) {
      if(result){
        app.renderTpl('personalDetailTpl', 'personalDetail_wrap', result.data);
      }
    },
    invite: function () {
      app.utils.toast('todo 还没有接入api invite');
    }
  });
});