function check_null(id,fieldname){
	console.log('#'+id);
	if($('#'+id).val()==""){
		$('#'+id).next().text('*'+fieldname+'不能为空');
		return false;
	}
	else{
		$('#'+id).next().text("");
		return true;
	}
}
function register_click(){
	var username=$("#register-username").val();
	var password=$("#register-password").val();
	var confirm_password=$("#confirm-password").val();
	if(!check_null("register-username","用户名")) return false;
	if(!check_null("register-password","密码")) return false;;
	if(!check_null("confirm-password","密码")) return false;
	if(password!=confirm_password){
		$('#confirm-password').next().text('*两次输入密码不一致');
		return false;
	}
	else{
		$('#confirm-password').next().text("");
	}
	$.post("src/controller.php",
		{
			type:"register",
			username:username,
			password:password
		},
		function(data,status){
			var jdata = JSON.parse(data);
			if(status!="success"){
				alert("Error,Refresh");
			}
			else if(jdata['status']=='fail'){
				alert('用户名已存在');
			}
			else{
				alert("注册成功");
				window.location.href = "main.html";
			}
		}
	)
}
function login_click(){
	var username=$("#login-username").val();
	var password=$("#login-password").val();
	var role=$("#login-role").val();
	if(!check_null("login-username","用户名")) return false;
	if(!check_null("login-password","密码")) return false;;

	$.post("src/controller.php",
		{
			type:"login",
			username:username,
			password:password,
			role:role
		},
		function(data,status){
			jdata = JSON.parse(data);
			if(status!="success"){
				alert("Error");
			}
			else if(jdata["status"]=="fail"){
				$("#login-password").next().text('用户名或密码错误');
			}
			else{
				alert("登录成功");
				if(role=="user")
					window.location.href ="main.html";
				else
					window.location.href ="admin.html";
			}
		}
	)
}
$(document).ready(function(){
	$("#register-username").bind("input propertychange",function(){
		if($('#register-username').val()!=""){
			$.post("src/controller.php",
			{
				type:"check_name",
				username:$('#register-username').val()
			},
			function(data){
				if(data=="exist"){
					$('#register-username').next().text('*用户名已存在');
				}
				else{
					$('#register-username').next().text('');
				}
			})
		}
	})
	$("#register-submit").click(register_click);
	$('#login-submit').click(login_click);
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
