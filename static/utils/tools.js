/**
 * Created by jun.ho
 */
define(function (require, exports, module) {
	'use strict';
	var $e = $('#appContainer');

	var utils = {
		renderTpl: function (tplId, containerId, datas, show) {
			var tpl = _.template($e.find('#'+ tplId).html());
			var tplHtml = tpl(datas);
			$e.find('#' + containerId).html(tplHtml);
		},
		renderTips: function (htmlTxt) {
			return $('<div class="PGX_toast"><span>'+htmlTxt+'</span></div>');
    },
		toast: function (htmlTxt) {
      if($e.$toast){
        $e.$toast.remove();
			}
      $e.$toast = utils.renderTips(htmlTxt);
      $e.$toast
        .on('animationend', function () {
          console.log('toastend');
          $e.$toast.remove();
          $e.$toast = null;
        })
        .appendTo($e);
    },
		/*
		* 本地存储的方法
		* */
		savePageData: function (name, data) {
			if(data === undefined){
				data = name;
				name = window.location.hash || 'noName';
			}
			sessionStorage.setItem(name, JSON.stringify(data));
		},
		getPageData: function (name) {
			name = name || window.location.hash || 'noName';
			var data = sessionStorage.getItem(name);
			try{
				data = JSON.parse(data)
			}catch (e){
				console.log('parse LocalData错误', e);
			}
			return data;
		},
		loadingPage: function (id) {
			return $(id).html(
				'<div class="PGX_loading"><span>loading...</span></div>'
			);
		}
	};

	return utils;
});