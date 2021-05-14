window.onload = function () {
    document.getElementById("password1").onchange = validatePassword;
    document.getElementById("password2").onchange = validatePassword;
    document.getElementById("name").onchange = validateUser;
    document.getElementById("phone").onchange = validatePhone;
}

function validatePassword() {
    var pass2 = document.getElementById("password2").value;
    var pass1 = document.getElementById("password1").value;
    if (pass1 != pass2){
        document.getElementById("password2").setCustomValidity("Passwords Don't Match");
    }else{
        document.getElementById("password2").setCustomValidity('');
    }

    if (pass1.length<6||pass1.length>16){
        document.getElementById("password1").setCustomValidity('长度为6~16位字符');
    }else{
        document.getElementById("password1").setCustomValidity('');
    }
}

function validateUser() {
    var name = document.getElementById("name").value;
    var reg=/^[\w\d]+$/;
    if(!reg.test(name)) {
        document.getElementById("name").setCustomValidity('英文名中只能含有英文字母或数字');
    }else{
        document.getElementById("name").setCustomValidity('');
    }
}

function validatePhone() {
    var phone = document.getElementById("phone").value;
    var reg=/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
    if(!reg.test(phone)) {
        document.getElementById("phone").setCustomValidity('请输入正确的11位电话号码');
    }else{
        document.getElementById("phone").setCustomValidity('');
    }
}

// function saveForm(){
//     $('#regForm').ajaxSubmit(function(){
//         alert(1);
//     });
//     return false;
// }