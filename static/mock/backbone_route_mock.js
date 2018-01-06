define(function (require) {
  require('backbone');
  var mockHandler = require('mock/main');
  // 启动拦截ajax的虚拟报文模式
  mockHandler.init();
  // 通过hash
  function loadMock (fileName, callback){
    require(['mock/'+fileName], function (mockData) {
      window._mock = mockData;
      callback && callback();
    });
  }
  function loadMockByHash(callback, hash){
    hash = hash || window.location.hash;
    if(hash){
      loadMock(hash.replace('#', ''), callback);
    }
  }
  // 订阅backbone的路由事件来加载指定的业务的mock数据
  mockHandler.wrap('Backbone.history.navigate', function (arg, next, originalFuncName, context) {
    function defaultRun () {
      next.apply(context, arg);
    }
    loadMockByHash(defaultRun, arg[0]);
  });
  // 页面初始化立即获取
  loadMockByHash();
});