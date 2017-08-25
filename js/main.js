//some variables and initialization



// functionality
function changeStatus(num){
	var res="";
	if(num==0){
		res="初次登陆";
	}
	else if(num==1){
		res="待审核";
	}
	else if(num==2){
		res="可用";
	}
	else if(num==-1){
		res="已驳回";
	}
	else if(num==-2){
		res="失效";
	}
	return res;
}
function changeField(num){
	var res="";
	if(num==1){
		res="幼儿园教育评估";
	}
	else if(num==2){
		res="小学教育评估";
	}
	else if(num==3){
		res="中学教育评估";
	}
	else if(num==4){
		res="中职教育评估";
	}
	else if(num==5){
		res="高职教育评估";
	}
	else if(num==6){
		res="高校教育评估";
	}
	return res;
}
function addcertificate(){
	$("#certificate").append('<div class="row db"><div class="col-xs-4"><input class="form-control pstyle"></div><div class="col-xs-4"><input class="form-control pstyle"></div><div class="col-xs-4"><button type="submit" class="btn btn-xs btn-default nbtn">删除</button></div></div>');
}
function addassess(){
	$("#assess").append('<div class="row db" id="doubleheight"><div class="col-xs-2"><input type="date" class="form-control pstyle"></div><div class="col-xs-3"><input class="form-control pstyle"></div><div class="col-xs-4"><textarea class="form-control"></textarea></div><div class="col-xs-2"><select class="form-control pstyle"><option value="1">评估</option></select></div><div class="col-xs-1"><button type="submit" class="btn btn-xs btn-default delassess" >删除</button></div></div>');
}
function addworkexperience(){
	$("#workexperience").append('<div class="row db"><div class="col-xs-3"><input type="date" class="form-control pstyle"></div><div class="col-xs-3"><input type="date" class="form-control pstyle"></div><div class="col-xs-3"><input class="form-control pstyle"></div><div class="col-xs-1"><input class="form-control pstyle"></div><div class="col-xs-1"><input class="form-control pstyle"></div><div class="col-xs-1"><button type="submit" class="btn btn-xs btn-default delworkexperience" >删除</button></div></div>')
}
function addavoidunit(){
	$("#avoidunit").append('<div class="row db"><div class="col-xs-8"><input class="form-control pstyle"></div><div class="col-xs-2"><select class="form-control pstyle"><option value="1">是</option><option value="0">否</option></select></div><div class="col-xs-2"><button type="submit" class="btn btn-xs btn-default delavoidunit" >删除</button></div></div>')
}
function del(){
	$(this).parent().parent().remove();
}
function left_expertinfo(){
	show_menu1();
	$("#top-home").click();
}
function left_changepassword(){
	show_menu2();
	$("#top-home").click();
}
function disable(id){
	$("#"+id).attr("disabled",true);
}
function to_edit(){
	$("#expert-status").text("填写中");
	$("#expertinfo").find('*').attr("disabled",false);
	disable("ecertificate_id");
	disable("effective_time");
	if(expert_status==0) return;
	disable("gender");
	disable("name");
	disable("birthdate");
	disable("certificate_type");
	disable("ID");
	disable("issuing_agency");
}
function check_all(){
	$("#allinfo").find('input').each(function(){
		if($(this).attr("disabled")!="disabled"){
			if($(this).val()==""){
				$(this).focus();
				return false;
			}
		}
	})
	return true;
}
function check_login(){
	$.post(phpurl,
		{
			type:"check_login"
		},
		function(data){
			var jdata=JSON.parse(data);
			if(jdata["status"]=="fail"){
				alert("请先登录");
				window.location.href = "index.html";
			}
			else{
				username=jdata['username'];
				expert_status=jdata['expert_status'];
				if(expert_status!='0'){
					var info = jdata["info"];
					var certificate = jdata["certificate"];
					var avoidunit = jdata["avoidunit"];
					var assess= jdata["assess"];
					var workexperience= jdata["workexperience"];
					var field= jdata["field"];
					for(var prop in info){
						$("#"+prop).val(info[prop]);
					}
					var i = 0;
					var set_field="";
					for(var prop in field){
						set_field+=" "+changeField(field[prop]["field_name"])
					}
					$("#input-field").val(set_field);
					var flag=true;
					i=0;
					for(var fir in certificate){
						if(flag){
							flag=false;
							$("#cerspecial1").val(certificate[fir]['fieldname']);
							$("#cerspecial2").val(certificate[fir]['number']);
						}
						else{
							++i;
							$("#certificate").append('<div class="row db"><div class="col-xs-4"><input class="form-control pstyle" id="cerf'+i+'"></div><div class="col-xs-4"><input class="form-control pstyle" id="cers'+i+'"></div><div class="col-xs-4"><button type="submit" class="btn btn-xs btn-default nbtn">删除</button></div></div>');
							$("#cerf"+i).val(certificate[fir]['fieldname']);
							$("#cers"+i).val(certificate[fir]['number']);
						}
					}
					i = 0;
					for(var fir in avoidunit){
						++i;
						$("#avoidunit").append('<div class="row db"><div class="col-xs-8"><input class="form-control pstyle" id="avof'+i+'"></div><div class="col-xs-2"><select class="form-control pstyle" id="avos'+i+'"><option value="1">是</option><option value="0">否</option></select></div><div class="col-xs-2"><button type="submit" class="btn btn-xs btn-default delavoidunit" >删除</button></div></div>');
						$("#avof"+i).val(avoidunit[fir]['name']);
						$("#avos"+i).val(avoidunit[fir]['is_employer']);
					}
					i = 0;
					for(var fir in assess){
						++i;
						$("#assess").append('<div class="row db" id="doubleheight"><div class="col-xs-2"><input type="date" class="form-control pstyle" id="assf'+i+'"></div><div class="col-xs-3"><input class="form-control pstyle" id="asss'+i+'"></div><div class="col-xs-4"><textarea class="form-control" id="asst'+i+'"></textarea></div><div class="col-xs-2"><select class="form-control pstyle" id="assff'+i+'"><option value="1">评估</option></select></div><div class="col-xs-1"><button type="submit" class="btn btn-xs btn-default delassess" >删除</button></div></div>');
						$("#assf"+i).val(assess[fir]['time']);
						$("#asss"+i).val(assess[fir]['name']);
						$("#asst"+i).val(assess[fir]['description']);
						$("#assff"+i).val(assess[fir]['type']);
					}
					i = 0;
					for(var fir in workexperience){
						++i;
						$("#workexperience").append('<div class="row db"><div class="col-xs-3"><input type="date" class="form-control pstyle" id="worf'+i+'"></div><div class="col-xs-3"><input type="date" class="form-control pstyle" id="wors'+i+'"></div><div class="col-xs-3"><input class="form-control pstyle" id="wort'+i+'"></div><div class="col-xs-1"><input class="form-control pstyle" id="worff'+i+'"></div><div class="col-xs-1"><input class="form-control pstyle" id="worfff'+i+'"></div><div class="col-xs-1"><button type="submit" class="btn btn-xs btn-default delworkexperience" >删除</button></div></div>')
						$("#worf"+i).val(workexperience[fir]['start_time']);
						$("#wors"+i).val(workexperience[fir]['end_time']);
						$("#wort"+i).val(workexperience[fir]['employer']);
						$("#worff"+i).val(workexperience[fir]['duty']);
						$("#worfff"+i).val(workexperience[fir]['witness']);
					}
				}
				$("#below-head").append(username+"，欢迎你");
				$("#image").attr("src","img/"+username+".jpg");
				$("#expert-status").text(changeStatus(expert_status));
			}
		}
		
	);
}
function to_submit(){
	if(check_all()==false){
		return false;
	}
	var general_info = new Object();
	var certificate_info = new Object();
	var assess_info = new Object();
	var workexperience_info = new Object();
	var avoidunit_info = new Object();
	//general_info
	$(".ii").each(function(){
		general_info[$(this)[0].id] = $(this).val();
	});
	
	//certificate
	var i=0,flag=1;
	$("#certificate").find("input").each(function(){
		flag=1-flag;
		if(flag==0){
			certificate_info[i] = new Object();
			certificate_info[i]["username"]=username;
			certificate_info[i]["fieldname"]=$(this).val();
		}
		else{
			certificate_info[i]["number"]=$(this).val();
			++i;
		}
	});
	//assessment
	i=0,flag=-1;
	$("#assess").find("*").each(function(){
		var tag=$(this)[0].tagName;
		if(tag=="INPUT"||tag=="TEXTAREA"||tag=="SELECT"){
			flag=(flag+1)%4;
			switch(flag){
				case 0:
					assess_info[i] = new Object();
					assess_info[i]['username']=username;
					assess_info[i]['number']=i;
					assess_info[i]['time']=$(this).val();
					break;
				case 1:
					assess_info[i]['name']=$(this).val()
					break;
				case 2:
					assess_info[i]['description']=$(this).val()
					break;
				case 3:
					assess_info[i]['type']=$(this).val()
					++i;
					break;
			}
		}
	});
	//workexperience
	i=0,flag=-1;
	$("#workexperience").find("*").each(function(){
		var tag=$(this)[0].tagName;
		if(tag=="INPUT"||tag=="TEXTAREA"||tag=="SELECT"){
			flag=(flag+1)%5;
			switch(flag){
				case 0:
					workexperience_info[i] = new Object();
					workexperience_info[i]['username']=username;
					workexperience_info[i]['number']=i;
					workexperience_info[i]['start_time']=$(this).val();
					break;
				case 1:
					workexperience_info[i]['end_time']=$(this).val()
					break;
				case 2:
					workexperience_info[i]['employer']=$(this).val()
					break;
				case 3:
					workexperience_info[i]['duty']=$(this).val()
					break;
				case 4:
					workexperience_info[i]['witness']=$(this).val()
					++i;
					break;
			}
		}
	});
	//avoidunit
	i=0,flag=9;
	$("#avoidunit").find("*").each(function(){
		var tag=$(this)[0].tagName;
		if(tag=="INPUT"||tag=="TEXTAREA"||tag=="SELECT"){
			flag=(flag+1)%2;
			switch(flag){
				case 0:
					avoidunit_info[i] = new Object();
					avoidunit_info[i]['username']=username;
					avoidunit_info[i]['number']=i;
					avoidunit_info[i]['name']=$(this).val();
					break;
				case 1:
					avoidunit_info[i]['is_employer']=$(this).val()
					++i;
					break;
			}
		}
	});
	$.post(phpurl,{
		data:JSON.stringify(general_info),
		type:"expert",
		status:expert_status
		}
		);

	// alert(JSON.stringify(certificate_info));
	// alert(JSON.stringify(assess_info));
	// alert(JSON.stringify(workexperience_info));
	// alert(JSON.stringify(avoidunit_info));
	$.post(phpurl,{
		data:JSON.stringify(certificate_info),
		type:"qualification"
		});
	$.post(phpurl,{
		data:JSON.stringify(assess_info),
		type:"assessment"
		});
	$.post(phpurl,{
		data:JSON.stringify(workexperience_info),
		type:"work_experience"
		});
	$.post(phpurl,{
		data:JSON.stringify(avoidunit_info),
		type:"avoid_unit"
		});
	$.post(phpurl,{
		data:JSON.stringify(field_info),
		type:"field"
		});
	alert("提交成功");
	$("#expert-status").text("审核中");
}

function check_null(id,fieldname){
	if($('#'+id).val()==""){
		$('#'+id).next().text('*'+fieldname+'不能为空');
		return false;
	}
	else{
		$('#'+id).next().text("");
		return true;
	}
}
function modify_password_click(){
	var old_password=$("#old-password").val();
	var password=$("#password").val();
	var confirm_password=$("#confirm-password").val();
	if(!check_null("old-password","密码")) return false;
	if(!check_null("password","密码")) return false;;
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
			type:"modify_password",
			old_password:old_password,
			password:password
		},
		function(data,status){
			var jdata = JSON.parse(data);
			if(status!="success"){
				alert("Error,Refresh");
			}
			else if(jdata['status']=='fail'){
				$('#old-password').next().text('密码错误');
			}
			else{
				alert("修改成功");
				window.location.href = "index.html";
			}
		}
	)
}
function hide_menu1(){
	menu1.remove();
	list_menu1.remove();
}
function show_menu1(){
	
	$(".tab-content").append(menu1);
	$("#tab-list").append(list_menu1);
}
function hide_menu2(){
	
	menu2.remove();
	list_menu2.remove();
}
function show_menu2(){
	
	$(".tab-content").append(menu2);
	$("#tab-list").append(list_menu2);
}
$(document).ready(function(){
	//initialize
	phpurl = "src/controller.php";
	username = "";
	expert_status = -1;
	//0为第一次登录，1和1以上就是已经编辑过了
	check_login();
	menu1 = $("#menu1");
	menu2 = $("#menu2");
	list_menu1 = $("#li-menu1");
	list_menu2 = $("#li-menu2");
	//hide_menu1();
	//hide_menu2();
	field_info = new Object();
	$("#dialog-submit").click(function(){
		//field
		var i=0,flag=1;
		$("input[type='checkbox']").each(function(){
			var nowid=$(this)[0].id;
			if($(this).is(":checked")){
				field_info[i]=new Object();
				field_info[i]["username"]=username;
				field_info[i]["field_name"]=$(this).val();
				++i;
			}
		});
		$('#dialog-close').click();
	})
	$("#allinfo").find('*').attr("disabled",true);

	//handle click
	$("#register-submit").click(modify_password_click);
	$("button#edit").click(to_edit);
	$("button#submit").click(to_submit);
	$("button#logout").click(function(){
		$.post(phpurl,
		{
			type:"logout"
		});
		window.location.href="index.html";
	})
	$("button#addcertificate").click(addcertificate);
	$("button#addassess").click(addassess);
	$("button#addworkexperience").click(addworkexperience);
	$("button#addavoidunit").click(addavoidunit);
//left side
	$("#left-expertinfo").click(left_expertinfo);
	$("#left-changepassword").click(left_changepassword);
	$('#left-home').click(function(){$('#top-home').click();})


  //Tab
	$('#tab-list').on('click','.close',function(){
		var tabID = $(this).parents('a').attr('href');
		$(this).parents('li').remove();
		$(tabID).remove();

		//display first tab
		var tabFirst = $('#tab-list a:first');
		tabFirst.tab('show');
	});
});



// $(document).on('click',"#li-menu1",function(){
// 	$("#a-menu1").click($("#menu1").show());
// })
//certificate
$(document).on('click', 'button#addcertificate',function() {
	$(".nbtn").click(del) ;
}) ;
//assess
$(document).on('click', 'button#addassess',function() {
	$(".delassess").click(del) ;
}) ;
//work experience
$(document).on('click', 'button#addworkexperience',function() {
	$(".delworkexperience").click(del) ;
}) ;
//avoid unit
$(document).on('click', 'button#addavoidunit',function() {
	$(".delavoidunit").click(del) ;
}) ;
//certificate
$(document).on('click', 'button#edit',function() {
	$(".nbtn").click(del) ;
}) ;
//assess
$(document).on('click', 'button#edit',function() {
	$(".delassess").click(del) ;
}) ;
//work experience
$(document).on('click', 'button#edit',function() {
	$(".delworkexperience").click(del) ;
}) ;
//avoid unit
$(document).on('click', 'button#edit',function() {
	$(".delavoidunit").click(del) ;
}) ;