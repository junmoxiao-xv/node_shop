//删除
$(function () {
    $("#bootstrap-data-table").delegate(".del", "click", function () {
        let id = $(this).parent().parent().attr("datakey");
        let r = confirm('是否确认删除?');
        let tr = $(this).parent().parent();
        if (r == true) {
            $.ajax({
                url: "/contact/del/" + id,
                type: "DELETE",
                success: function () {
                    alert("删除成功");
                    tr.remove();
                    window.location.href = '/contact';
                }
            });
        } else {
            alert('取消删除');
        }
    })
});

//确认收货
$(function () {
    $("#bootstrap-data-table").delegate(".receipt", "click", function () {
        let status = $(this).attr("status");

        if (status == '已收货') {
            alert('该商品已确认收货');
        } else {
            let id = $(this).parent().parent().attr("datakey");
            let r = confirm('是否确认已经收到货物?');
            let tr = $(this).parent().parent();
            if (r == true) {
                $.ajax({
                    url: "/contact/receipt/" + id,
                    type: "post",
                    success: function () {
                        alert("收货成功");
                        window.location.href = '/contact';
                    }
                });
            } else {
                alert('取消');
            }
        }
    })
});

