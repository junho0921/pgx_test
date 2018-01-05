/**
 * Created by jun.ho
 */
define(function (require, exports, module) {
  'use strict';

  module.exports = app.View.extend({
    initialize:function () {
      console.log('info: 初始化组件');
      this.requestCallback = this.requestCallback.bind(this);
      this.reqInfoData();
    },
    events:{
      'touchstart .PGX_forward': 'PGX_forward',
    },
    reqInfoData: function () {
      app.request({
        url: 'req_info',
        success: this.requestCallback,
        error: this.requestCallback,
        timeout: this.requestCallback
      });
    },
    requestCallback: function (result) {
      if(result){
        result.data = $.isEmptyObject(result.data) ? {} : result.data;
        this.isShare = result.data && result.data.isShare;
        app.renderTpl('infoTpl', 'info_content', result);
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