/**
 * Created by jun.ho
 */
define(function (require, exports, module) {
  'use strict';
  module.exports = app.View.extend({
    initialize: function () {
      var renderObj = {
        btnTxt:'返回',
        btnLink:'info'
      };
      if(app.global.isTop !== undefined){
        renderObj.btnTxt = '查看';
        if(app.global.isTop){
          renderObj.btnLink = 'superiorDetail';
        }else{
          renderObj.btnLink = 'peerDetail';
        }
      }
      app.renderTpl('successContentTpl', 'success_wrap', renderObj);
    }
  });
});