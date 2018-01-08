/**
 * Created by jun.ho
 */
define(function (require, exports, module) {
  'use strict';

  module.exports = app.View.extend({
    initialize:function () {
      if(app.global.info === undefined){
        app.utils.toast('正返回首页');
        return setTimeout(function () {
          app.navigate('#info', true);
        }, 1000);
      }
      this.renderContent();
      this.reqEvaluateData();
    },
    events:{
      'touchstart .inviteBtn': 'invite',
    },
    renderContent: function () {
      app.renderTpl('personalTpl', 'personal_wrap', {name: app.global.info.name});
    },
    reqEvaluateData: function () {
      app.request({
        url: 'reqEvaluateData',
        success: this.requestCallback,
      });
    },
    requestCallback: function (result) {
      if(result){
        app.renderTpl('evaluateListTpl', 'evaluateList', result);
      }
    },
    invite: function () {
      console.log('邀请');
      // app.utils.toast('todo 还没有接入api');
      app.share();
    }
  });
});