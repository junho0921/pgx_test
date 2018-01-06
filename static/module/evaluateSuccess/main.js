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
      if(app.global.info){
        if(app.global.info.isTop === true){
          renderObj.btnTxt = '查看';
          renderObj.btnLink = 'peerDetail';
        }else if(app.global.info.isTop === false){
          renderObj.btnTxt = '查看';
          renderObj.btnLink = 'peerDetail';
        }
      }
      app.renderTpl('successContentTpl', 'success_wrap', renderObj);
    }
  });
});