$(function(){
   Array.from($('.mb-1')).forEach(i =>
    i.onclik = function(){
        $.ajax({
            url:'/shop/category'+i.value,
            type:'GET',
            success:function(){
                console.log(i.value)
            }
        })
    })
})