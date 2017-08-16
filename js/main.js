//some variables and initialization




// functionality
function addcertificate(){
	$("#certificate").append('<div class="row db"><div class="col-xs-4"><input class="form-control ipstyle"></div><div class="col-xs-4"><input class="form-control ipstyle"></div><div class="col-xs-4"><button type="submit" class="btn btn-xs btn-default nbtn">删除</button></div></div>');
}
function addassess(){
	$("#assess").append('<div class="row db" id="doubleheight"><div class="col-xs-2"><input type="date" class="form-control ipstyle"></div><div class="col-xs-3"><input class="form-control ipstyle"></div><div class="col-xs-4"><textarea class="form-control"></textarea></div><div class="col-xs-2"><select class="form-control ipstyle"><option>请选择</option><option>评估</option></select></div><div class="col-xs-1"><button type="submit" class="btn btn-xs btn-default delassess" >删除</button></div></div>');
}
function addworkexperience(){
	$("#workexperience").append('<div class="row db"><div class="col-xs-3"><input type="date" class="form-control ipstyle"></div><div class="col-xs-3"><input type="date" class="form-control ipstyle"></div><div class="col-xs-3"><input class="form-control ipstyle"></div><div class="col-xs-1"><input class="form-control ipstyle"></div><div class="col-xs-1"><input class="form-control ipstyle"></div><div class="col-xs-1"><button type="submit" class="btn btn-xs btn-default delworkexperience" >删除</button></div></div>')
}
function addavoidunit(){
	$("#avoidunit").append('<div class="row db"><div class="col-xs-8"><input class="form-control ipstyle"></div><div class="col-xs-2"><select class="form-control ipstyle"><option>是</option><option>否</option></select></div><div class="col-xs-2"><button type="submit" class="btn btn-xs btn-default delavoidunit" >删除</button></div></div>')
}
function del(){
	$(this).parent().parent().remove();
}
function left_expertinfo(){
	$("#menu1").show();
	$("#li-menu1").show();
	$("#a-menu1").click();
}
function left_changepassword(){
	$("#menu2").show();
	$("#li-menu2").show();
	$("#a-menu2").click();
}
$(document).ready(function(){



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
		$(this).parents('li').hide();
		$(tabID).hide();

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