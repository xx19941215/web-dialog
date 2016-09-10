## 移动端Web组件-dialog

预览 [点此](http://115.28.219.57/imooc/dialog/)

调用方法

```javascript
$("button").tap(function(){
	var d = $.dialog({
		  //配置选项
		  //对话框宽高
		  width:"auto",
		  height:"auto",
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
	})
});

封装思路

Zepto是一款和jQuery类似的移动端JS框架(应该称之为函数库应该更加准确吧)，但是语法和JQ高度一致，所以上手起来难度也不大。正好借这个组件编写的机会
重新整理一下插件(或者说组件)的编写思路。

1. 首先从需求开始，先使用`CSS`和`HTML`编写好静态效果，确认效果无误后将HTML结构先注释掉，开始编写JS逻辑。
1. 因为一般是基于jQuery或者其他框架来写插件(例如这次的Zepto)，所以先来一个大的结构。

```javascript
;(function($){
	var Dialog = function(config){
		this.config = {
			//设置默认的参数
		}
		//合并config到this.config中
		if(config && $.isPlainObject(config)){
			$.extend(this.config,config);
		}else {
			//没有传递参数
			this.isConfig = true;
		}
		//创建基本的DOM。这里后续写法根据需求和项目而定，对于这个插件的话就是先初始化每个Dialog公有的结构
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
		//使用原型上的create方法创建完整DOM并且添加到body
		this.create();
		
		
		Dialog.prototype = {
			//原型的公有方法，可以根据需要添加各类方法
			//动画方法
			animate:function(){},
			//根据config来创建DOM结构
			create:function(){},
			//close方法
			close:function(){},
			//由于创建button的方法比较相对复杂，这里单独写出createButton方法
			createButton:function(){},
		}
	}
	//挂载到Zepto对象上
	$.dialog = function(config){
		return new Dialog(config);
	};
})(Zepto);
```

整体思路就是这样，细节部分可以查看源代码。