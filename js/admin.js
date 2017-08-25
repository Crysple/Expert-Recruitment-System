//some variables and initialization



// functionality
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
	$("#a-menu1").click();
}
function left_changepassword(){
	show_menu2();
	$("#a-menu2").click();
}
function disable(id){
	$("#"+id).attr("disabled",true);
}
function to_edit(){
	$("#expertinfo").find('*').attr("disabled",false);
	disable("ecertificate_id");
	disable("effective_time");
	disable("gender");
	disable("name");
	disable("birthdate");
	disable("certificate_type");
	disable("ID");
	disable("issuing_agency");
}
function changeStatus(num){
	var res="";
	if(num==1){
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
				
			}
		}
		
	);
}
function to_submit(){
	if(check_all()==false){
		return false;
	}
	var general_info = new Object();
	//general_info
	$(".ii").each(function(){
		general_info[$(this)[0].id] = $(this).val();
	});
	$.post(phpurl,{
		data:JSON.stringify(general_info),
		type:"expert",
		status:expert_status
		}
		);
	alert("提交成功");
}
function init(){
	$.post(phpurl,{
		type:"adminInit"
	},
	function(data){
		var jdata = JSON.parse(data);
		$("#wait-num").text(jdata["wait_number"]);
		alldata = jdata["alldata"];
		var toadd="";
		$(".expert-list").remove();
		for(var key in alldata){
			var now='<div class="row db expert-list"><div class="col-xs-2">';
			now+=alldata[key]['ecertificate_id'];
			now+='</div><div class="col-xs-1">';
			now+=alldata[key]['name'];
			now+='</div><div class="col-xs-2">';
			now+=alldata[key]['employer'];
			now+='</div><div class="col-xs-3">';
			now+=alldata[key]['phone'];
			now+='</div><div class="col-xs-1">';
			now+="注册";
			now+='</div><div class="col-xs-2">';
			now+=changeStatus(alldata[key]['status']);
			now+='</div><div class="col-xs-1">';
			now+='<button class="btn btn-xs check" id="check'+key+'" value="'+key+'">查看</button>';
			now+="</div></div>";
			toadd+=now;
		}
		$("#menu2").append(toadd);
		$(".check").click(tocheck) ;
	})
}
function tocheck(){
	var info = alldata[$(this).val()];
	select_name = alldata[$(this).val()]['username'];
	for(var prop in info){
		$("#"+prop).val(info[prop]);
	}
	$.post(phpurl,
	{
		type:"getall",
		user:select_name
	},function(data){
		var jdata=JSON.parse(data);
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
		i=0;
		var flag=true;
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
		$("#image").attr("src","img/"+select_name+".jpg");
		$("#expert-status").text(changeStatus(info["status"]));
	})
		


	$("#ecertificate_id").attr("disabled",false);
	$("#effective_time").attr("disabled",false);
	$("#admit").attr("disabled",false);
	$("#reject").attr("disabled",false);
	$("#pause").attr("disabled",false);
	$("#reason").attr("disabled",false);
	left_expertinfo();
}
function admit(){
	var tosend = new Object();
	tosend["ecertificate_id"]=$("#ecertificate_id").val();
	tosend["effective_time"]=$("#effective_time").val();
	tosend["status"]=2;
	$.post(phpurl,
	{
		type:"updateUser",
		info:JSON.stringify(tosend),
		username:select_name
	},function(data){
	});
}
function reject(){
	var tosend = new Object();
	tosend["status"]=-1;
	tosend["reject_reason"]=$("#reason").val();
	$.post(phpurl,
	{
		type:"updateUser",
		info:JSON.stringify(tosend),
		username:select_name
	},function(data){
	});
}
function pause(){
	var tosend = new Object();
	tosend["status"]=-2;
	tosend["quit_reason"]=$("#reason").val();
	$.post(phpurl,
	{
		type:"updateUser",
		info:JSON.stringify(tosend),
		username:select_name
	},function(data){
	});
}
function toquery(){
	var field_type = $("#s-field").val();
	var status_type = $("#s-status").val();
	$.post(phpurl,
	{
		type:"select_query",
		field:field_type,
		status:status_type
	},function(data){
		var jdata = JSON.parse(data);
		alldata = jdata["alldata"];
		var toadd="";
		$(".expert-list").remove();
		for(var key in alldata){
			var now='<div class="row db expert-list"><div class="col-xs-2">';
			now+=alldata[key]['ecertificate_id'];
			now+='</div><div class="col-xs-1">';
			now+=alldata[key]['name'];
			now+='</div><div class="col-xs-2">';
			now+=alldata[key]['employer'];
			now+='</div><div class="col-xs-3">';
			now+=alldata[key]['phone'];
			now+='</div><div class="col-xs-1">';
			now+="注册";
			now+='</div><div class="col-xs-2">';
			now+=changeStatus(alldata[key]['status']);
			now+='</div><div class="col-xs-1">';
			now+='<button class="btn btn-xs check" id="check'+key+'" value="'+key+'">查看</button>';
			now+="</div></div>";
			toadd+=now;
		}
		$("#menu2").append(toadd);
		$(".check").click(tocheck) ;
	})
}
function hide_menu1(){
	list_menu1.remove()
	menu1.remove();
}
function show_menu1(){
	$("#tab-list").append(list_menu1);
	$(".tab-content").append(menu1);
	$("#admit").click(admit);
	$("#reject").click(reject);
	$("#pause").click(pause);
}
function hide_menu2(){
	list_menu2.remove()
	menu2.remove();
}
function show_menu2(){
	$("#tab-list").append(list_menu2);
	$(".tab-content").append(menu2);

}
$(document).ready(function(){
	//initial
	select_name="";
	phpurl = "src/controller.php";
	init();
	menu1 = $("#menu1");
	menu2 = $("#menu2");
	list_menu1 = $("#li-menu1");
	list_menu2 = $("#li-menu2");
	hide_menu1();
	$(".check").click(tocheck) ;
	//0为第一次登录，1和1以上就是已经编辑过了
	//check_login();
	$("#wait-num").click(left_changepassword);
	$("#allinfo").find('*').attr("disabled",true);

	//handle click
	$("button#query").click(toquery);
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
//expert_info
	$("#admit").click(admit);
	$("#reject").click(reject);
	$("#pause").click(pause);

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