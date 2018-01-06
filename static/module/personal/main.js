/**
 * Created by jun.ho
 */
define(function (require, exports, module) {
  'use strict';

  module.exports = app.View.extend({
    initialize:function () {
      this.renderContent();
      this.reqEvaluateData();
    },
    events:{
      'touchstart .inviteBtn': 'invite',
    },
    renderContent: function () {
      app.renderTpl('personalTpl', 'personal_wrap', {
          name: app.global.info.name,
        isSubmit : true
      });
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
      app.utils.toast('todo 还没有接入api');
    }
  });
});