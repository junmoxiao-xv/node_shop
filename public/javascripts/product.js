$(function(){
    Array.from($('.del')).forEach(i =>
        i.onclick = function(){
            let id = $(i).parent().parent().attr("datakey");
            $.ajax({
                url:"/table1/del/"+id,
                type:"DELETE",
                success:function(){
                        alert("删除成功");
                        $(i).parent().parent().remove();
                }
            });
        });
});

$("#add").click(function(){
	window.location.href='/table1/addpage';
});