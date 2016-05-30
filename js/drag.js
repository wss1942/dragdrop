;
(function($) {
    /**
     * 此组件适用于排序类的功能，通过拖拽子元素使其交换位置。
     * 对象是table或者ul或者类似的结构，子元素需要设置data-id属性才能通过后台来修改排序。
     *
     * 拖拽开始：给你拖拽的目标一个class样式A；
     * 进入一个可放置区域：给当前可放置区域一个class样式B；
     * 离开此区域：移除classB；
     * 放置：移除classA。
     *
     * @param  {string} childType   子元素类型（如tr或li）
     * @param  {string} dragClass   拖拽的目标的样式
     * @param  {string} enterClass  经过可放置区域的样式
     * @param  {Function} ajaxFn    鼠标松开时的回调函数，参数对象的属性有dragId、targetId以及方法fn，fn在ajax成功后调用，来改变样式及html结构
     */
    $.fn.dragdrop = function(childType, dragClass, enterClass, ajaxFn) {
        var eleDrag, // 拖拽的对象
            eleDustbin, 
            eleDrop,
            dragId,
            targetId,
            that = this;

        that.delegate(childType, "selectstart", function() {
            return false;
        }).delegate(childType, 'dragstart', function(ev) {
            ev = ev.originalEvent;
            ev.dataTransfer.effectAllowed = "move";
            ev.dataTransfer.setData("text", ev.target.innerHTML);
            ev.dataTransfer.setDragImage(ev.target, 0, 0);
            eleDrag = $(this);
            eleDrag.addClass(dragClass);
            dragId = $(this).attr('data-id');
            return true;
        }).delegate(childType, 'drop', function(ev) {
            eleDrop = $(this);
            targetId = eleDrop.attr('data-id');
            if (eleDrag && targetId) {
                that.css('pointer-events', 'none');
                ajaxFn({
                    dragId: dragId,
                    dropId: targetId,
                    fn: function() {
                        eleDrag.removeClass(dragClass);
                        eleDrop.removeClass(enterClass);
                        eleDustbin = eleDrop.html();
                        eleDrop.html(eleDrag.html());
                        eleDrag.html(eleDustbin);
                        that.css('pointer-events', 'inherit');
                    }
                });
            }else{
                eleDrag.removeClass(dragClass);
                $(this).removeClass(enterClass);
            }
            targetId = null;
            return false;
        }).delegate(childType, 'dragover', function(ev) {
            ev.originalEvent.preventDefault();
        }).delegate(childType, 'dragenter', function() {
            $(this).addClass(enterClass);
        }).delegate(childType, 'dragleave', function() {
            $(this).removeClass(enterClass);
        }).delegate(childType, 'dragend', function() {
            $(this).removeClass(dragClass);
        });
    }
})(jQuery);
