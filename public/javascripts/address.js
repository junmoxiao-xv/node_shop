$(function () {
    $('#submit').click(function () {
        let c_fname = $('#c_fname').val();
        let c_address = $('#c_address').val();
        let phone = $('#phone').val();
        let c_order_notes = $('#c_order_notes').val();
        if (c_fname == '') {
            alert('收货人不能为空');
        } else if (c_address == '') {
            alert('地址不能为空');
        } else if (phone == '') {
            alert('电话不能为空');
        } else {
            $.ajax({
                url:'/checkout?fname='+c_fname+'&address='+c_address+'&phone='+phone+'&ordernotes='+c_order_notes,
                type:'POST',
                success:function(){
                    alert('您的订单已生成，请前往支付');
                    window.location.href='/pay';
                }
            })
        }
    })
})