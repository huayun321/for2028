/*

用户引用

*/

// 回调容器
var cbcontainer = {
  // cbName {type}_{num}
  // step {type}_num default 0
};

//communication
window.addEventListener("message", receiveMessage, false);


// communication - 接收
// 并发？ 自增
/*

arg.data
  err
  data
    cbName
    data
*/
function receiveMessage(arg){

  var err = arg.data.err, // 错误信息
      arg = arg.data.ret; // 数据

    if (cbcontainer[arg.cbName]) {

    cbcontainer[arg.cbName](err,arg.data);
    delete cbcontainer[arg.cbName];
  }

};







// communication - 发送
function postMsg(logReq){
  if(logReq.cb){
    var order = cbcontainer[logReq.act+'_num'];
    if(order === void(0)){
      order = 0;
    } else {
      order++
    }
    var step = order ;
    cbcontainer[logReq.act+'_num'] = step;
    cbcontainer[logReq.act + '_' + step] = logReq.cb;

    logReq.cbName = logReq.act + '_' + step;

  }

  delete logReq.cb;

  /*

    往上一层传 记录行为名称[act]， 数据[data], 回调名[cbName](如果有)

  logReq
    act
    data
    cbName


  */


  window.parent.postMessage(logReq, "*");



}



var SENSORO = {

  _argTransform: function(){

    var fm = {
      act: arguments[0],  // 动作
      data: arguments[1], // 动作相关数据
      cb: (typeof arguments[2] === 'function') ? arguments[2] : '' //回调
    }
    return fm;
  },

  // 发送配置信息(主要是分享)
  init: function(){
    if(arguments.length>1){
      return console.warn('1 is max, while u pass ' + arguments.length);
    }

    if(arguments.length&&(typeof arguments[0] !== 'object')){
      console.warn('required params 1 type is object, while u pass ' + (typeof arguments[0]));
    }

    postMsg(this._argTransform(
      'config',
      {
        share: arguments[0]
      },
      ''
      )
    );

  },

  // 抽奖日志
  draw: function(){
    if( arguments[0] && (typeof arguments[0] !== 'function') ){
      return console.warn('required params 1 type is function, while u pass ' + (typeof arguments[0]));
    }

    postMsg(this._argTransform(
      'draw',
      '',
      arguments[0]
      )
    );
  },


  // 中奖 cardId[, cb]
  win: function(){

    if(typeof arguments[0] !== 'string'){
      return console.error('cardId is invalid');
    }

    if(arguments.length>2){
      return console.warn('2 is max, while u pass ' + arguments.length);
    }

    postMsg(this._argTransform(
      'win',
      {
        cardId: arguments[0]
      },
      arguments[1]
      )
    );

  },

  // 领取 cardId[, cb]
  take: function(){

    if(arguments.length>2){
      return console.warn('2 is max, while u pass ' + arguments.length);
    }

    postMsg(this._argTransform(
      'take',
      {
        cardId: arguments[0]
      },
      arguments[1]
      )
    );

  },

  // 分享
  share: function(){

    // if(arguments.length>1){
    //   return console.warn('1 is max, while u pass ' + arguments.length);
    // }

    postMsg(this._argTransform(
      'share',
      arguments[0],
      arguments[1]
      )
    );


  },


  // 自定义字典－存
  setDic: function(){

    if(arguments.length>1){
      return console.warn('1 is max, while u pass ' + arguments.length);
    }

    if(typeof arguments[0] !== 'object'){
      return console.warn('required params 1 type is object, while u pass ' + (typeof arguments[0]));
    }

    postMsg(this._argTransform(
      'setDic',
      {
        dic: arguments[0]
      },
      arguments[1]
      )
    );

  },

  // 自定义字典 －取
  getDic: function(){
    postMsg(this._argTransform(
      'getDic',
      '',
      arguments[0]
      )
    );

  },

  // 访问者信息
  getUserInfo: function(){
    postMsg(this._argTransform(
      'getUserInfo',
      '',
      arguments[0]
      )
    );
  }


};