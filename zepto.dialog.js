/**
 * Created by Administrator on 2016/8/31.
 */
;(function($){
  var Dialog = function(config){
    var _this = this;
    //默认配置参数
    this.config  = {
      //对话框宽高
      width:"auto",
      width:"auto",
      //对话框类型
      type:"ok",
      buttons:null,
      //弹出框多久关闭
      delay:null,
      //对话框提示信息
      message:null,
      //对话框遮罩透明度
      maskOpacity:null,
      effect:null,
      //延时关闭的回调函数
      delayCallback:null,
      //点击遮罩层是否可以关闭
      maskClose:null
    }
    if(config && $.isPlainObject(config)){
      $.extend(this.config,config);
    }else {
      //没有传递参数
      this.isConfig = true;
    }
    //console.log(this.config);
    //创建基本的DOM
    this.body = $("body");
    //创建遮罩层
    this.mask = $('<div class="g-dialog-container"></div>');
    //创建弹出框
    this.win = $('<div class="dialog-window"></div>');
    //创建弹出框头部
    this.winHeader = $('<div class="dialog-header"></div>');
    this.icon = $('<i class="iconfont"></i>')
    this.winBody = $('<div class="dialog-body"></div>');
    this.winFooter = $('<div class="dialog-footer"></div>');
    //渲染DOM
    this.create();
  };
  Dialog.zIndex = 10000;
  Dialog.prototype = {
    //动画函数
    animate:function(){
      var self = this;
      this.win.css("-webkit-transform","scale(0,0)");
      setTimeout(function(){
        self.win.css("-webkit-transform","scale(1,1)");
      },100)
    },
    create:function(){
      var self = this,
        config = this.config,
        mask = this.mask,
        win = this.win,
        winHeader = this.winHeader,
        icon = this.icon;
        winBody = this.winBody,
        winFooter = this.winFooter,
        body = this.body;
      Dialog.zIndex ++;
      this.mask.css("z-index",Dialog.zIndex);
      //没有传递任何参数，就弹出一个等待的图标
      if(this.isConfig){
        icon.html('&#xe60e;');
        winHeader.append(icon);
        win.append(winHeader);

        mask.append(win);
        body.append(mask);
      }else {
        //根据传递的参数来配置
        var html = undefined;
        html = config.type == 'warning' ? '&#xe693;':
                config.type == 'ok' ? '&#xe72f;':
                                    '&#xe60e';
        icon.html(html);
        winHeader.append(icon);
        win.append(winHeader);

        //message
        config.message && winBody.html(config.message);
        win.append(winBody);
        //button
        if(config.buttons){
          this.createButtons(winFooter,config.buttons);
          win.append(winFooter);
        }
        //设置宽
        if(config.width != "auto"){
          win.width(config.width);
        }
        //透明度
        if(config.maskOpacity){
          win.css("background","rgba(0,0,0,"+config.maskOpacity+")")
        }
        //定时消失
        if(config.delay && config != 0){
          window.setTimeout(function(){
            self.close();
            config.delayCallback && config.delayCallback();
          },config.delay)
        }
        if(config.effect){
          self.animate();
        }
        if(config.maskClose){
          mask.tap(function(){
            self.close();
          });
        }
        //插入到win
        mask.append(win);
        body.append(mask);
      }
    },
    close:function(){
      this.mask.remove();
    },
    createButtons:function(footer,buttons){
      console.log(buttons);
      var self = this;
      $(buttons).each(function(index,item){
        //console.log(index);
        var type = item.type ? " class="+item.type : "";
        var btnText = this.text || "按钮"+(index);
        var callback = this.callback || null;
        var button = $('<button'+ type +'>'+btnText+'</button>');
        footer.append(button);
        if(callback){
          button.tap(function(e){
            //返回值false不关闭
            if(callback() != false) {
              self.close();
            }
            //阻止事件冒泡
            e.stopPropagation();
          });

        }else {
          button.tap(function(e){
            self.close();
            e.stopPropagation();
          });
          //阻止事件冒泡

        }

      })
    },
  };
  window['Dialog'] = Dialog;
  $.dialog = function(config){
    return new Dialog(config);
  }
})(Zepto);
