/**
 * Created by jun.ho
 */
define(function (require, exports, module) {
  'use strict';

  module.exports = app.View.extend({
    initialize:function () {
      this.requestCallback = this.requestCallback.bind(this);
      app.utils.loadingPage('#info_content');
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
        app.global.targetName = result.data && result.data.name;
        this.isShare = result.data && result.data.isShare;
        app.renderTpl('infoTpl', 'info_content', result);
      }
    },
    PGX_forward: function (e) {
      var isShare = this.isShare;
      var reset = app.utils.btnLoading(e.target);
      if(!reset){return;}
      app.request({
        url: 'req_status',
        success: function (result) {
          var isEnd = result && result.data.isEnd;
          if(isEnd){
            // 结束了便直接显示目标人的评价结果
            app.navigate('#personalResult', true);
          }else{
            if(isShare){
              app.request({
                url: 'req_pos',
                success: function (result) {
                  if(result.data){
                    app.global.isTop = !!result.data.isTop;
                    if(result.data.isTop == 1){
                      return app.navigate('#superiorScore', true);
                    }else{
                      return app.navigate('#peerDetail', true);
                    }
                  }
                  reset();
                  return app.utils.toast('数据错误, 抱歉');
                },
                error: reset,
                timeout: reset
              });
            }else{
              app.navigate('#personal', true);
            }
          }
        },
        error: reset,
        timeout: reset
      });
    }
  });
});