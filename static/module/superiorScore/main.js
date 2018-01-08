/**
 * Created by jun.ho
 */
define(function (require, exports, module) {
  'use strict';

  module.exports = app.View.extend({
    initialize:function () {
      //if(app.global.info === undefined || app.global.info.isTop !== true){
      //  app.utils.toast('正返回首页');
      //  return setTimeout(function () {
      //    app.navigate('#info', true);
      //  }, 1000);
      //}
      app.utils.loadingPage('#scorePanel');
      this.reqData();

      //this.$('#evaluatePanel .targetName').text(app.global.info.name);
      this.$('#evaluatePanel .targetName').text('江立');
    },
    events:{
      'touchstart .submitSE': 'submitSE',
      'change .scoreInput': 'renderCalc',
      /*切换*/
      'touchstart .enterEvaluate': 'enterEvaluate',
      'touchstart .returnScore': 'back',
    },
    reqData: function () {
      app.request({
        url: 'kpiDetail',
        success: this.requestCallback.bind(this)
      });
    },
    submitSE: function () {
      var total = this.calc();
      if(total.proportion !== this.totalProportion) {
        return app.utils.toast('需要完成所有的评分项目后才能提交');
      }
      var evaluateTxt = this.$('#evaluateInput').val();
      if(evaluateTxt.length < 50) {
        return app.utils.toast('评语不少于50字的');
      }
      return this.postData({
        scoreData: _.toArray(total.data),
        evaluate: this.$('#evaluateInput').val()
      });
    },
    postData: function (data) {
      console.log('postData', data);
      app.request({
        url: 'postEvaluate',
        data: data,
        success: function () {
          app.navigate('#evaluateSuccess', true);
        }
      });
    },
    requestCallback: function (result) {
      if(result){
        if($.isArray(result.data.kpiLists)){
          this.totalProportion = result.data.kpiLists.reduce(function (sum, item) {
            sum += (+item.proportion.replace('%', ''));
            return sum;
          }, 0);
          console.log('this.totalProportion', this.totalProportion);
        }
        if(!this.totalProportion){
          return app.utils.toast('数据错误');
        }
        app.renderTpl('superiorScoreTpl', 'scorePanel', result.data);
      }
    },
    enterEvaluate: function () {
      var total = this.calc();
      var isEnough = total.proportion === this.totalProportion;
      // '下一步'按钮是否触发提示语弹窗
      this.$('.enterEvaluate').toggleClass('PGX_triggerPop', !isEnough);
      if(isEnough) {
        this.$('#superiorScore_wrap').removeClass('scoreMode');
        app.page.scrollTop(0);
      }
    },
    back: function () {
      this.$('#superiorScore_wrap').addClass('scoreMode');
      app.page.scrollTop(0);
      return false;
    },
    renderCalc: function () {
      var total = this.calc();
      if(total){
        total.proportion = total.proportion.toFixed(0);
        total.score = total.score.toFixed(1);
        this.$('#scorePer').text(total.proportion + '%');
        this.$('#scoreTotal').text(total.score + '分');
        // '下一步'按钮是否触发提示语弹窗
        this.$('.enterEvaluate').toggleClass('PGX_triggerPop', total.proportion !== this.totalProportion);
      }
    },
    getScoreList: function () {
      var $inputs = $('.scoreInput');
      return $inputs.map(function (_, input) {
        var $input = $(input),
          data = $input.data(),
          value = $input.val();
        // 修正输入错误
        if(value !== ''){
          if(isNaN(value)){
            $input.val('');
          }else if(value < 0){
            $input.val(0);
          }else if(value > 100){
            $input.val(100);
          }
        }
        value = $input.val();
        return {
          key: data.key,
          proportion: data.proportion,
          score: value
        };
      });
    },
    renderScoreList: function (scoreList) {
      if(!scoreList){return;}
      var $number = $('.PGX_number');
      scoreList.each(function(_, data){
        $number.filter('[data-bind='+data.key+']').text(data.score);
      });
    },
    calc: function () {
      var scoreList = this.getScoreList();
      // 渲染
      this.renderScoreList(scoreList);

      var total = {
        score: 0,
        proportion: 0,
        data: scoreList
      };
      scoreList.each(function (_, item) {
        if(item.score !== ''){
          total.proportion += item.proportion;
          total.score += item.proportion * item.score / 100;
        }
      });
      return total;
    }
  });
});