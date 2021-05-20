var content=document.getElementsByName("content")[0];
    var lis=document.querySelectorAll("#nav li");
    var len=lis.length;
    var src=["/table1","/table2"]//将地址存入数组
    content.setAttribute("src",src[0]);
    //遍历li对象，给每个li新增src属性并赋值
    for(var i=0;i<len;i++){
        lis[i].setAttribute("src",src[i]);//给当前对象添加属性并赋值
    }
    //遍历li，给li绑定onclick事件：切换iframe里的src属性，并切换页签样式
    for(var i=0;i<len;i++){
        lis[i].onclick=function(){
            content.setAttribute("src",this.getAttribute("src"));//切换iframe里的src值
            //切换页签样式↓
            for(var i=0;i<len;i++){
                if(lis[i]==this){//判断是否为当前对象
                    lis[i].style.background="#f90";
                    lis[i].style.color="white";
                }else{
                    lis[i].style.background="white";
                    lis[i].style.color="black";
                }
            }
        }
    }