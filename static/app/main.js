/**
 * Created by jun.ho
 */
define(function (require, exports, module) {
	'use strict';

	var AppRoute = require('app/appRoute');
	var $container = $('#appContainer');
	var tools = require('tools');
	var AppHeader = require('appHeader');

	// 初始化全局的应用管理对象app
	window.app =
		window.app || {
			/*DOM*/
			page: $('body'),
			container: $container,
			/*全局缓存*/
			global: {},
			/*工具*/
			utils: tools,
			renderTpl : tools.renderTpl,
			controlSongs : tools.controlSongs,
			/*视图类型*/
			View: Backbone.View.extend({el: $container})
		};

	function initBasisEvent () {
    app.page
			/*导航*/
      .on('touchstart', '.appLink', function () {
        var pageName = $(this).attr('data-link'),
          hashName = '#' + pageName;
        // 清理缓存
        app.utils.savePageData(hashName, '');
        app.navigate(pageName, true);
      })
      /*切换显示*/
			.on('touchstart', '.PGX_triggerToggle', function () {
        $(this).toggleClass('on');
        var $e = $(this);
        var id = $e.data('for');
        $('.PGX_toggle[data-id='+id+']').toggleClass('on');
      })
      .on('touchstart', '.PGX_toggle_hide', function () {
        var $e = $(this);
        $e.parents('.PGX_toggle.on').removeClass('on');
      })
			/*弹窗*/
      .on('touchstart', '.PGX_triggerPop', function () {
        var popId = $(this).data('for');
        $('.PGX_pop[data-id='+popId+']').addClass('on');
      })
      .on('touchstart', '.PGX_closePop', function () {
        $(this).parents('.PGX_pop.on').removeClass('on');
      });
  }

	module.exports = {
		init: function () {
			// 初始化头部
      new AppHeader();
      // 导航/路由方法
      app.navigate = (new AppRoute()).navigate;
			// 请求方法
      var requestCount = 0;
      app.request = function (obj, toSaveLocalData) {
				// loading效果
				var reqObj = $.extend({}, obj);
        reqObj.always = function () {
					if (!--requestCount) {
						app.container.removeClass('loading');
					}
				};
        reqObj.error = function () {
        	app.utils.toast('请求超时');
          obj.timeout && obj.timeout({status: 'timeOut'});
        };
        reqObj.success = function (result) {
          if(result.status == 1){
            obj.success && obj.success(result);
					}else{
            result.msg = result.msg || '抱歉, 服务器错误';
            app.utils.toast(result.msg);
            obj.error && obj.error(result);
          }
        };
				// if(toSaveLocalData === 'savePageData'){app.utils.savePageData(obj.data);}
				app.container.addClass('loading');
				requestCount++;
				// 伴奏客户端的大部分接口都是使用post请求方法
				return $.ajax(reqObj);
			};

      initBasisEvent();
			/*开启路由管理*/
			Backbone.history.start();
		}
	};
});