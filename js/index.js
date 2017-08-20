function check_null(id,fieldname){
	console.log('#'+id);
	if($('#'+id).val()==""){
		$('#'+id).after('<span style="color:red;">*'+fieldname+'不能为空</span>');
		return false;
	}
	else return true;
}

$(document).ready(function(){
	$("#register-submit").click(function(){
		var username=$("#register-username").val();
		var password=$("#register-password").val();
		var confirm_password=$("#confirm-password").val();
		if(!check_null("register-username","用户名")) return false;
		if(!check_null("register-password","密码")) return false;;
		if(!check_null("confirm-password","密码")) return false;
		if(password!=confirm_password){
			$('#confirm-password').after('<span style="color:red;">*两次输入密码不一致</span>');
			return false;
		}
		$.post("src/controller.php",
			{
				type:"register",
				username:username,
				password:password
			},
			function(data,status){
				if(status!="success"){
					alert("Error,Refresh");
				}
				else{
					alert("注册成功");
					window.location.href("main.html");
				}
			}
			)
	})
})
$(function() {

    $('#login-form-link').click(function(e) {
		$("#login-form").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('bactive');
		e.preventDefault();
	});
	$('#register-form-link').click(function(e) {
		$("#register-form").delay(100).fadeIn(100);
 		$("#login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

});
