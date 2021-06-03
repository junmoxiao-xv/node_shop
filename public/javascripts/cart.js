//删除
$(function () {
    $("#cart_table").delegate(".del", "click", function () {
        let id = $(this).parent().attr("datakey");
        let r = confirm('是否确认删除?');
        let tr = $(this).parent();
        if (r == true) {
            $.ajax({
                url: "/cart/del/" + id,
                type: "DELETE",
                success: function () {
                    alert("删除成功");
                    tr.remove();
                }
            });
        } else {
            alert('取消删除');
        }
    })
});

//清空购物车
$(function () {
    $('#clean').click(function () {
        let r = confirm('是否确认删除?');
        if (r == true) {
            $.ajax({
                url: '/cart/clean',
                type: 'DELETE',
                success: function () {
                    alert('删除成功');
                    $('tbody').remove();
                }
            })
        } else {
            alert('取消删除');
        }
    })
});