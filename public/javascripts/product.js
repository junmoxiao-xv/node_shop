//删除
$(function () {
    Array.from($('.del')).forEach(i =>
        i.onclick = function () {
            let id = $(i).parent().parent().attr("datakey");
            let r = confirm('是否确认删除?');
            if (r == true) {
                $.ajax({
                    url: "/table1/del/" + id,
                    type: "DELETE",
                    success: function () {
                        alert("删除成功");
                        $(i).parent().parent().remove();
                    }
                });
            } else {
                alert('取消删除');
            }

        });
});

//修改
$(function () {
    Array.from($('.cha')).forEach(i =>
        i.onclick = function () {
            let id = $(i).parent().parent().attr("datakey");
            $.ajax({
                url: "/table1/chapage/" + id,
                type: "GET",
                success: function () {
                    window.location.href = '/table1/chapage/' + id;
                }
            });
        });
});

//新增
$("#add").click(function () {
    window.location.href = '/table1/addpage';
});