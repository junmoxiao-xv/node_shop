//删除
$(function () {
    $("#bootstrap-data-table").delegate(".del", "click", function () {
        let id = $(this).parent().parent().attr("datakey");
        let r = confirm('是否确认删除?');
        let tr = $(this).parent().parent();
        if (r == true) {
            $.ajax({
                url: "/tables/del/" + id,
                type: "DELETE",
                success: function () {
                    alert("删除成功");
                    tr.remove();
                    window.location.href='/tables';
                }
            });
        } else {
            alert('取消删除');
        }
    })
});

//修改
$(function () {
    $("#bootstrap-data-table").delegate(".cha", "click", function () {
        let id = $(this).parent().parent().attr("datakey");
        $.ajax({
            url: "/tables/chapage/" + id,
            type: "GET",
            success: function () {
                window.location.href = '/tables/chapage/' + id;
            }
        });
    });
});

//新增
$("#add").click(function () {
    window.location.href = '/tables/addpage';
});