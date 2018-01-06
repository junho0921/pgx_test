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
      'touchstart .PGX_forward': 'PGX_forward',
    },
    renderContent: function () {
      app.renderTpl('personalTpl', 'personal_wrap', {
          name: app.global.targetName,
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
    PGX_forward: function () {
      if(this.isShare){
        app.request({
          url: 'req_pos',
          success: function (result) {
            if(result.data){
              if(result.data.isTop == 1){
                return app.navigate('#superiorScore', true);
              }else{
                return app.navigate('#peerScore', true);
              }
            }
            return app.utils.toast('数据错误, 抱歉');
          }
        });
      }else{
        app.navigate('#personal', true);
      }
    }
  });
});