// 置顶 jq

$(document).on('click','#toTop',function(){
	$("html,body").animate({"scrollTop":0},"fast");
})
showHideToTop();
$(window).scroll(function(){
	showHideToTop();
})

function showHideToTop(){
	var toTop = $("#toTop");
	if ($(window).scrollTop()>100) {
		toTop.show();
	}else{
		toTop.hide();
	}
}
//置顶js
// /*window.onload = function(){
// 	var toTop = document.getElementById("toTop");
// 	var timer = null;
// 	/*toTop.onclick=function(){
// 		clearInterval(timer);
// 		timer = setInterval(() => {
// 		  // Todo...
// 		  var scrollTopVal = document.body.scrollTop || document.documentElement.scrollTop;
// 		  if (scrollTopVal>0) {
// 		  	document.body.scrollTop = document.documentElement.scrollTop = scrollTopVal - 50;

// 		  }else{
// 		  	clearInterval(timer);

// 		  }
// 		}, 10);
// 	}*/
// 	toTop.onclick = function(){
// 		clearTimeout(timer);
// 		timer = setTimeout(function fn() {
// 		  // Todo...
// 		  var scrollTopVal = document.body.scrollTop || document.documentElement.scrollTop;
// 		  if (scrollTopVal>0) {
// 		  	document.body.scrollTop = document.documentElement.scrollTop = scrollTopVal - 50;
// 		  	timer = setTimeout(fn,10);
// 		  }else{
// 		  	clearInterval(timer);
// 		  }
// 		}, 10)
// 	}
// 	/*toTop.onclick = function(){
// 		cancelAnimationFrame(timer);
// 		timer = requestAnimationFrame(function fn(){
// 			var scrollTopVal = document.body.scrollTop || document.documentElement.scrollTop;
// 			if (scrollTopVal > 0) {
// 				document.body.scrollTop = document.documentElement.scrollTop = scrollTopVal - 50;
// 				timer = requestAnimationFrame(fn);
// 			}else{
// 				cancelAnimationFrame(timer);
// 			}
// 		})
// 	}*/
// 	showHideToTop();
// 	function showHideToTop(){
// 		var scrollTopVal = document.body.scrollTop || document.documentElement.scrollTop;
// 		if (scrollTopVal>100) {
// 			toTop.style.display="block";
// 		}else{
// 			toTop.style.display = "none";
// 		}
// 	}
// 	document.onscroll = function(){
// 		showHideToTop();
// 	}
// }*/

// 弹出提示框
function showMask(type,mes){
	var timer = null;
	var oDiv = $('<div class="mask"><div class="maskContent"><i></i><span></span></div></div>');
	$("body").append(oDiv);
	var documentHeight = $(document).height();
	$(".mask").css("height",documentHeight);
	if (type == 'warning') {
		$('.maskContent i').addClass('icon1');
	}
	else if (type == 'success') {
		$('.maskContent i').addClass('icon2');
	}
	else if (type == 'error') {
		$('.maskContent i').addClass('icon3');
	}
	$('.maskContent span').text(mes);
	oDiv.fadeIn();
	timer = setTimeout(() => {
		oDiv.remove();
	}, 1200);
}

//登录注册
$(function(){
	var logRegDiv = $("#logRegDiv");
	var maskDiv = $("#maskDiv");
	var uPattern = /^[a-zA-Z0-9_-]{4,16}$/; 
	var pPattern = /^[a-zA-Z]\w{5,17}$/;
	maskHeight();
	//点击登录
	$(document).on('click','.login',function(){
		if ($("#loginMaskDiv").text()!="") {
			var loginMaskDiv = $("#loginMaskDiv");
			loginMaskDiv.show();
		}else{
			var loginMaskDiv = $("<div id='loginMaskDiv'></div>");
			var loginContent = '<div class="userMaskDiv">' +
			'<h3>账号登录</h3>' +
			'<b id = "closeLogin"></b>' +
			'<form onsubmit="return check()">' +
			'<div class ="rowDiv">' +
			'<div class="userSetting">用户名：</div>' +
			'<div>' +
			'<input type="text" placeholder="请输入用户名" id="logUser" class="rightInput"/>' +
			'</div>' +
			'</div>' +
			'<div class ="rowDiv">' +
			'<div class="userSetting">密 码：</div>' +
			'<div>' +
			'<input type="password" placeholder="请输入密码" id="logPwd" class="rightInput"/>' +
			'</div>' +
			'</div>' +
			'<div class ="rowDiv">' +
			'<div class ="chooseSave" >' +
			'<input type="checkbox" id ="checkbox" class="leftInput"/>' +
			'<span class="spanRight">记住密码</span>' +
			'</div>' +
			'</div>' +
			'<input type="button" value="登录" id="checkIn" class="userBtn" />' +
			'</form>' +
			'<div>';
			loginMaskDiv.html(loginContent);
			logRegDiv.append(loginMaskDiv);
		}
		maskDiv.show();
		makePosition("login");
		$("#closeLogin").on('click',function(){
			closeMaskDiv("loginMaskDiv");
		})
		$("#checkIn").on('click',function(){
			var logUserVal = $("#logUser").val(),
			logPwdVal =$("#logPwd").val();
			if(logUserVal==''){
				showMask("warning","用户名不能为空");
			}else if(logPwdVal==""){
				showMask("warning","密码不能为空");
			}else{
				var url = "http://zmhwater.vicp.io/videousers/1";
				var data = '{"accountnumber":"'+logUserVal+'","password":"'+logPwdVal+'"}';
				$.ajax({
					url:url,
					type:'POST',
					data: data,
					dataType:"json",
					contentType:"application/json;charset=UTF-8",
					success:function(result){
						loginMaskDiv.hide();
						showMask("success","登录成功");
						changeBtn(result,"loginMaskDiv");

					},
					error:function(result){
						showMask("error","账号信息不正确");
					}
				})
			}

		})
	})
	//点击注册
	$(document).on('click','.register',function(){
		if ($("#registerMaskDiv").text()!="") {
			var registerMaskDiv = $("#registerMaskDiv");
			registerMaskDiv.show();
		}else{
			var registerMaskDiv = $("<div id='registerMaskDiv'></div>");
			var registerContent = 
			'<div class="userMaskDiv">' +
			'<h3>账号注册</h3>' +
			'<b id = "closeRegister"></b>' +
			'<form>' +
			'<div class ="rowDiv">' +
			'<div class="userSetting">用户名：</div>' +
			'<div>' +
			'<input type="text" placeholder="请输入用户名" id="regUser" class="rightInput" index = "1"/>' +
			'<span class="spanNormal"></span>' +
			'</div>' +
			'</div>' +
			'<div class ="rowDiv">' +
			'<div class="userSetting">密码：</div>' +
			'<div>' +
			'<input type="password" placeholder="请输入密码" id="regPwd" class="rightInput" index = "2"/>' +
			'<span class="spanNormal"></span>' +
			'</div>' +
			'</div>' +
			'<div class ="rowDiv">' +
			'<div class="userSetting" >确认密码：</div>' +
			'<div>' +
			'<input type="password" placeholder="请再次输入密码" class="rightInput" index = "3" id="regPwdAga"/>' +
			'<span class="spanNormal"></span>' +
			'</div>' +
			'</div>' +
			'<div class = "tipDiv" id="tipDiv">'+
			'</div>'+
			'<input type="button" value="注册" id="registerIn" class="userBtn checkBtn" />' +
			'</form>'+
			'</div>';
			registerMaskDiv.html(registerContent);
			logRegDiv.append(registerMaskDiv);
		}
		maskDiv.show();
		makePosition("register");
		$("#closeRegister").on('click',function(){
			closeMaskDiv("registerMaskDiv");
		})
	})
	//失去焦点注册输入框
	$(document).on("blur",'.rightInput',function(){
		var regUser = $("#regUser"),
		regPwd =$("#regPwd");
		regPwdAga = $("#regPwdAga");
		var index = parseInt($(this).attr("index"));
		var tipDiv = $("#tipDiv"); 
		if($(this).val()==""){
			if (index == 3) {
				tipDiv.text("请输入密码");
			}else{
				var inputLine = $(this).parent().prev().text().split("：")[0];
				if(inputLine=="确认密码"){
					tipDiv.text("请输入密码");
					$(this).attr("placeholder","请再次输入密码");
				}else{
					tipDiv.text("请输入"+inputLine);
					$(this).attr("placeholder","请输入"+inputLine);
				};
			}
			tipDiv.addClass("tipDivWrong");
		}else{
			switch(index){
				case 1:
				checkReg(uPattern,regUser,tipDiv,"用户名输入错误",$(this));
				break;
				case 2:
				checkReg(pPattern,regPwd,tipDiv,"密码输入错误",$(this));
				break;
				case 3:
				checkReg(pPattern,regPwdAga,tipDiv," ",$(this));
				break;
			}
		}
	})
	//点击注册输入框
	$(document).on('click','.rightInput',function(){
		var tipDiv = $("#tipDiv"); 
		tipDiv.removeClass("tipDivWrong");
		tipDiv.removeClass("tipDivTrue");
		tipDiv.text("");
		$(this).attr("placeholder","");
		var spanNormal =$(this).next();
		if(spanNormal.hasClass("ok")){
			spanNormal.removeClass("ok");
		}
	})
	//点击注册按钮
	$(document).on('click','#registerIn',function(){
		var spanNormal =$('.spanNormal');
		var tipDiv = $("#tipDiv"); 
		var flag = true;
		spanNormal.each(function(){
			if(!$(this).hasClass("ok")){
				tipDiv.addClass("tipDivWrong");
				var inputLine = $(this).parent().prev().text().split("：")[0];
				if(inputLine=="确认密码"){
					tipDiv.text("请正确输入密码");
				}else{
					tipDiv.text("请正确输入"+inputLine);
				}
				flag = false;
			}else{
				flag = true;
			}
			console.log(flag)
		})
		if (flag) {
			alert(1)
		}else{
			alert(2)
		}
	})
})

function maskHeight(){
	var height = $(document).height();
	$("#maskDiv").css({"height":height})
}


// 失去焦点正则验证
function checkReg(objRep,objVal,tipDiv,str1,obj){
	if(objVal== regPwdAga){
		if ($("#regPwd").val()=="") {
			tipDiv.addClass("tipDivWrong");
			tipDiv.text("请先输入密码");
		}else if(!pPattern.test($("#regPwd").val())){
			tipDiv.addClass("tipDivWrong");
			tipDiv.text("请正确输入密码");
		}else{
			if(regPwdAga.val() != $("#regPwd").val()){
				tipDiv.addClass("tipDivWrong");
				tipDiv.text("两次输入密码不一致");
			}else{
				tipDiv.removeClass("tipDivWrong");
				obj.next().addClass("ok");
			}
		}
	}else{
		if (!objRep.test(objVal.val())) {
			tipDiv.removeClass("tipDivTrue");
			tipDiv.addClass("tipDivWrong");
			tipDiv.text(str1);
		}else{
			tipDiv.removeClass("tipDivWrong");
			obj.next().addClass("ok");
		}
	}
}
function closeMaskDiv(objDiv){
	var curMaskDiv = $("#"+objDiv);
	curMaskDiv.hide();
	$("#maskDiv").hide();
}
// 登录注册框定位
function makePosition(id){
	var curId = (id+"MaskDiv");
	var curMaskDiv = $("#"+curId);
	var sWidth = $(window).width();
	var sHeight = $(window).height();
	var objMaskDivWidth = curMaskDiv.width();
	var objMaskDivHeight = curMaskDiv.height();
	curMaskDiv.css({"left":parseInt((sWidth - objMaskDivWidth) / 2) + 'px',
		"top":parseInt((sHeight - objMaskDivHeight) / 2) + 'px'})
}
//登录成功后出现用户
function changeBtn(result,objDiv){
	login.remove();
	register.remove();
	$("#"+objDiv).remove();
	maskDiv.hide();
	var userLogo = $("<div id='userLogo' class='userLogo'></div>");
	var userName = $("<div id='userName' class='userName'></div>");
	userName.text("Hello," + result.name);
	var userBehavior = $(".userBehavior").append(userLogo);
	var userBehavior = $(".userBehavior").append(userName);
}
$(window).resize(function(){
	if (logRegDiv.find("#loginMaskDiv").is(":visible")) {
		makePosition("login");
	}
	else if(logRegDiv.find("#registerMaskDiv").is(":visible")){
		makePosition("register");
	}
})

/*分页*/
var pageAll = 1;
$(function(){
	var sel = $("#sel");
	var putPageNum = $(".putPageNum");
	for (var i = 1; i < pageAll; i++) {
		var option = $("<option value = "+(i+1)+" class ='chooseOption'>"+(i+1)+"</option>");
		sel.append(option);
	}
	if (pageAll<5) {
		for (var i = 1; i < pageAll; i++) {
			var li = $("<li index="+(i+1)+" class='pageNum'>"+(i+1)+"</li>");
			putPageNum.append(li);
		}
	}else{
		for (var i = 1; i < 5; i++) {
			var li = $("<li index="+(i+1)+" class='pageNum'>"+(i+1)+"</li>");
			putPageNum.append(li);
		}
	}
	pagePosition();
})
$(document).on('click','#paging',function(e){
	var obj = e.target || e.srcElement;
	switch(obj.className || obj.id){
		case 'pageFirst':
		comeFirst(1,0);
		break;
		case 'pageLast':
		comeFirst(pageAll,1);
		break;
		case 'pagePrev':
		prevPage();
		break;
		case 'pageNext':
		nextPage();
		break;
		case 'pageNum':
		pageBtn($(obj).attr("index"));
		break;
		case 'turnTo':
		turnToPage();
	}
})
// 首页、尾页
function comeFirst(Index,num){
	$(".pageNum").removeClass("on");
	if (pageAll <= 5) {
		$(".paging").find('*[index='+Index+']').addClass("on");
	}else{
		/*if (num==0) {
			var firstNumIndex = parseInt($("#pagePrev").next().attr("index"));
			if(firstNumIndex == Index){
				$(".paging").find('*[index='+Index+']').addClass("on");
			}else{
				$(".pageNum").remove();
				for (var i = Index; i < Index+5; i++) {
					var li = $("<li index="+i+" class='pageNum'>"+i+"</li>");
					$("#pageNext").before(li);
				}
				$(".paging").find('*[index='+Index+']').addClass("on");
			}
		}else{
			var lastNumIndex = parseInt($("#pageNext").prev().attr("index"));
			if(lastNumIndex == Index){
				$(".paging").find('*[index='+Index+']').addClass("on");
			}else{
				$(".pageNum").remove();
				for(var j = Index-5; j < Index; j++){
					var jIn = j+1;
					var li = $("<li index="+jIn+" class='pageNum'>"+jIn+"</li>");
					$("#pageNext").before(li);

				}
				$(".paging").find('*[index='+Index+']').addClass("on");
			}
		}*/
		var index = $(".pageNum").eq(2).attr("index");
		if(index-2 == Index || index+2 == Index){
			$(".paging").find('*[index='+Index+']').addClass("on");
		}else{
			if(num == 0){
				index = Index+2;
			}else{
				index = Index-2;
			}
			$(".pageNum").remove();
			for (var i = index+1; i < index+3; i++) {
				var li = $("<li index="+i+" class='pageNum'>"+i+"</li>");
				$(".putPageNum").append(li);
			}
			for (var j = index; j > index-3; j--) {
				var li = $("<li index="+j+" class='pageNum'>"+j+"</li>");
				$(".putPageNum").prepend(li);
			}
		}
		$(".paging").find('*[index='+Index+']').addClass("on");
	}
	showHidePage(Index);
}
//上一页
function prevPage(){
	var index = parseInt($(".paging").find(".on").attr("index"));
	if (index != 1) {
		if ($(".pageNum:first").hasClass("on")) {
			$(".pageNum").remove();
			for (var i = index-1; i <index-1+5; i++) {
				var li = $("<li index="+i+" class='pageNum'>"+i+"</li>");
				$(".putPageNum").append(li);
			}
		}else{
			$(".pageNum").removeClass("on");
		}
		$(".paging").find('*[index='+(index-1)+']').addClass("on");
	}
	showHidePage(index-1);
}
//下一页
function nextPage(){
	var index = parseInt($(".paging").find(".on").attr("index"));
	if (index != pageAll) {
		if ($(".pageNum:last").hasClass("on")) {
			$(".pageNum").remove();
			for(var i = index + 1 ; i > index + 1-5 ; i--){
				var li = $("<li index="+i+" class='pageNum'>"+i+"</li>");
				$(".putPageNum").prepend(li);
			}
		}else{
			$(".pageNum").removeClass("on");
		}
		$(".paging").find('*[index='+(index+1)+']').addClass("on");
	}
	showHidePage(index+1);

}
//页码切换
function pageBtn(index){
	$(".pageNum").removeClass("on");
	$(".paging").find("*[index = "+index+"]").addClass("on");
	showHidePage(index);
}
//上一页、下一页显示隐藏
function showHidePage(index){
	if (index == 1) {
		$("#pagePrev").hide();
		$("#pageNext").show();
	}
	if(index >1 && index < pageAll){
		$("#pagePrev").show();
		$("#pageNext").show();
	}
	if(index == pageAll){
		$("#pagePrev").show();
		$("#pageNext").hide();
	}
	pagePosition();
}

//页面跳转
function turnToPage(){
	var selectOption = parseInt($('#sel option:selected').val());  
	var firstNumIndex = parseInt($(".pageNum:first").attr("index"));
	var lastNumIndex = parseInt($(".pageNum:last").attr("index"));
	if(selectOption>lastNumIndex){
		$(".pageNum").remove();
		for (var i = selectOption; i > selectOption - 5; i--) {
			var li = $("<li index="+i+" class='pageNum'>"+i+"</li>");
			$(".putPageNum").prepend(li);
		}
		$(".paging").find('*[index='+selectOption+']').addClass("on");
	}else if(selectOption < firstNumIndex){
		$(".pageNum").remove();
		for (var i = selectOption; i < selectOption + 5; i++) {
			var li = $("<li index="+i+" class='pageNum'>"+i+"</li>");
			$(".putPageNum").append(li);
		}
		$(".paging").find('*[index='+selectOption+']').addClass("on");
	}
	pageBtn(selectOption);
}
//分页位置
function pagePosition(){
	var pageWidthHalf = parseInt($("#paging").width()/2);
	$("#paging").css({"margin-left":-pageWidthHalf+'px'})
}