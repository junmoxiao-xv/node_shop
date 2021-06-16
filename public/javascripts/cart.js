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
                    window.location.href = '/cart'
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
        let r = confirm('是否确认清空?');
        if (r == true) {
            $.ajax({
                url: '/cart/clean',
                type: 'DELETE',
                success: function () {
                    alert('删除成功');
                    $('tbody').remove();
                    window.location.href = '/cart'
                }
            })
        } else {
            alert('取消删除');
        }
    })
});

//增加数量
$(function () {
    $('.js-btn-plus').click(function () {
        let id = $(this).parent().parent().parent().parent().attr("datakey");
        let price = parseInt($(this).parents('.cart_product').find('.price').attr("price"));
        let sum = parseInt($(this).parents('.input-group').find('.sum').val()) + 1;
        let sum_price = $(this).parents('.cart_product').find('.sum_price').html(price * sum);
        let oldtotal_price = parseInt($('#total_price').html());
        $.ajax({
            url: '/cart/addprice/' + id,
            type: 'POST',
            success: function () {
                $('#total_price').html(oldtotal_price + price);
            }
        })
    })
})

//减少数量
$(function () {
    $('.js-btn-minus').click(function () {
        let oldsum = parseInt($(this).parents('.input-group').find('.sum').val());
        if (oldsum > 1) {
            let id = $(this).parent().parent().parent().parent().attr("datakey");
            let price = parseInt($(this).parents('.cart_product').find('.price').attr("price"));
            let sum = parseInt($(this).parents('.input-group').find('.sum').val()) - 1;
            let sum_price = $(this).parents('.cart_product').find('.sum_price').html(price * sum);
            let oldtotal_price = parseInt($('#total_price').html());
            $.ajax({
                url: '/cart/reduceprice/' + id,
                type: 'POST',
                success: function () {
                    $('#total_price').html(oldtotal_price - price);
                }
            })
        } else {
            alert('不能在减少了');
            $(this).parents('.input-group').find('.sum').val() = 1;
        }

    })
})

//结算
$(function () {
    $('#close').click(function () {
        let total_prices = parseInt($('#total_price').html());
        console.log($('#total_price').html());
        if (total_prices == 0) {
            alert('购物车为空，请先添加商品再进行结算');
        }else{
            window.location.href='/checkout';
        }
    })
})