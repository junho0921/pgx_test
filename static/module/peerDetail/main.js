/**
 * Created by jun.ho
 */
define(function (require, exports, module) {
  'use strict';

  module.exports = app.View.extend({
    initialize:function (){
      if(app.global.info === undefined || app.global.info.isTop !== false){
        app.utils.toast('正返回首页');
        return setTimeout(function () {
          app.navigate('#info', true);
        }, 1000);
      }
      app.utils.loadingPage('#peerDetail_content');
      this.reqKpiData();
      this.reqEvaluateData();
    },
    events:{
      'touchstart .submitEvaluate': 'submitEvaluate',
      'keyup #evaluateInput': 'inputLenTips',
    },
    reqKpiData: function () {
      app.request({
        url: 'kpiDetail',
        success: this.requestCallback,
      });
    },
    requestCallback: function (result) {
      if(result){
        app.renderTpl('peerDetailTpl', 'peerDetail_content', result.data);
      }
    },
    reqEvaluateData: function () {
      app.request({
        url: 'reqEvaluateData',
        success: function (result) {
          app.renderTpl('evaluateBtnTpl', 'peerEvaluate', result);
        },
      });
    },
    submitEvaluate: function () {
      if(this.checkSubmit()){
        var value = this.getEvaluateInput();
        app.request({
          url: 'successEvaluate',
          data: value,
          success: function () {
            app.navigate('#evaluateSuccess', true);
          },
        });
      }
    },
    inputLenTips: function () {
      var value = this.getEvaluateInput();
      this.$('.inputTips')
        .removeClass('error')
        .text('已经输入'+value.length +'字');
    },
    getEvaluateInput: function () {
      return this.$('#evaluateInput').val();
    },
    checkSubmit: function () {
      var value = this.getEvaluateInput();
      var enough = value.length > 50;
      value = value.trim();
      this.$('#evaluateInput').val(value);
      if(!value){
        this.$('.inputTips')
          .addClass('error')
          .text('请输入评价');
      }else if(!enough){
        this.$('.inputTips')
          .addClass('error')
          .text('请输入不少于50字的评价');
      }
      return enough;
    },
  });
});