/**
 * Created by jun.ho
 */
define(function (require, exports, module) {
  'use strict';

  module.exports = app.View.extend({
    initialize:function () {
      if(app.global.info === undefined || app.global.info.isTop !== true){
        app.utils.toast('正返回首页');
        return setTimeout(function () {
          app.navigate('#info', true);
        }, 1000);
      }
      app.utils.loadingPage('#superiorScore_wrap');
      this.reqData();
    },
    events:{
      'touchstart .submit': 'submit',
      'touchstart .next': 'toggle',
      'touchstart .return': 'toggle',
      'change .scoreInput': 'calc',
    },
    reqData: function () {
      app.request({
        url: 'kpiDetail',
        success: this.requestCallback,
      });
    },
    requestCallback: function (result) {
      if(result){
        this.kpiData = result.data;
        app.renderTpl('superiorScoreTpl', 'superiorScore_wrap', result.data);
      }
    },
    share: function () {
      console.log('邀请');
      app.utils.toast('todo 还没有接入api');
    },
    toggle: function () {

    },
    calc: function () {

    },
    calcPer: function () {

    },
    calcTotal: function () {

    }
  });
});