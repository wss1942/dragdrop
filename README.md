# dragdrop
# 拖拽 drag and drop
## 依赖
JQuery
## 用途
可用于排序类的功能，通过拖拽子元素使其交换位置。
## 例子、说明
```html
<ul id="dragDemo">
	<li class="item" draggable='true' data-id='1'>1</li>
	<li class="item" draggable='true' data-id='2'>2</li>
	<li class="item" draggable='true' data-id='3'>3</li>
	<li class="item" draggable='true' data-id='4'>4</li>
	<li class="item" draggable='true' data-id='5'>5</li>
	<li class="item" draggable='true' data-id='6'>6</li>
	<li class="item" draggable='true' data-id='7'>7</li>
	<li class="item" draggable='true' data-id='8'>8</li>
</ul>
```
适用的结构类似于table => tr或者ul => li这样的结构。`data-id`为排序的序号。
&emsp;
```javascript
<script>
$('#dragDemo').dragdrop('li', 'item-drag', 'item-drop', function(obj) {
	console.log(obj.dragId);
	console.log(obj.dropId);
	// 通过ajax修改排序的序号。
	$.get('http://dragdrop.com?dragId='+obj.dragId+"&dropId="+obj.dropId,function(data,status){
		if(status==='success'){
			obj.fn();
		}
	});
	// 如果不用ajax就直接调用obj.fu()方法。
	// obj.fn();
});
</script>
```
dragdrop方法有4个参数：
* @param  {string} childType   子元素类型（如tr或li）
* @param  {string} dragClass   拖拽对象的样式
* @param  {string} dropClass   经过可放置区域的样式
* @param  {Function} ajaxFn    鼠标松开时的回调函数，参数对象的属性有dragId、dropId以及方法fn。一般修改排序都要通过ajax，fn方法在ajax成功后调用，来改变样式及html结构

## 逻辑
拖拽开始：给你拖拽对象一个class样式A；
进入一个可放置区域：给当前可放置区域一个class样式B；
离开此区域：移除classB；
不离开，松开鼠标：拿到拖拽对象和放置对象的`data-id`，通过ajax改变他们两个的排序的序号。ajax成功后兑换两个对象的innerHtml，并移除移除class样式A和B。