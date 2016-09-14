$(function(){
	baseUrl="http://172.16.9.30:3000";
	$(".top").on("click",function(){
		$('html,body').animate({scrollTop:0},500);
	})
	var $lyBtn=$("#lyBtn"),
		$lyDataTable=$("#lyDataTable"),
		$lsBtn=$("#lsBtn"),
		$lsDataTable=$("#lsDataTable"),
		$lyRank=$("#lyRank"),
		$lyId=$("#lyId"),
		$lySearch=$("#lySearch");
	$lyBtn.on("click",function(){
		getLyData($lyDataTable);
	});
	$lsBtn.on("click",function(){
		getLsData($lsDataTable);
	});
	$lySearch.on("click",function(){
		var id=$.trim($lyId.val());
		if(!id){
			simpleTip("请输入手机号!")
			return;
		}
	 if(!/^[0-9]{11}$/.test(id)){
       simpleTip("仅限输入11位手机号");
       return false;
    }
		$.ajax({
		  url: baseUrl+"/queryPosition/2/"+id,
		  method: "get",
		  dataType:"json"
		}).done(function(o) {
			if(o.length){			
				$lyRank.html("<label class='treasure'>"+o[0].fortune+"</label>财富值&nbsp;&nbsp;&nbsp;第<label class='position'>"+o[0].ranking+"</label>名");
			}else{
				//$lyRank.html("数据加载失败...");
				simpleTip("未查到该用户数据")
			}
		});
	})

$(".convience").click(function(){
    var dh=Math.min($(document).height()-$(window).height(),2500);//滚动条最大位置
    var scrollTop=$(window).scrollTop()
    if(scrollTop<600){
        $("html,body").animate({scrollTop: 600}, 500);
    }else if(scrollTop>=600 & scrollTop<1550){
        $("html,body").animate({scrollTop: dh}, 500);
    }else if(scrollTop>=1550 & scrollTop<=dh){
         $("html,body").animate({scrollTop: 600}, 500);
    }
  })
$(window).on("scroll",function(){
//	console.log($(window).scrollTop())
})
	function getLyData(ctx){
		ctx.find("tr:first~tr").empty();
		$.ajax({
		  url: baseUrl+"/action/1",
		  context: ctx,
		  method: "get",
		  dataType:"json"
		}).done(function(o) {
			if(o.length){
				var str="";
				for(var i=0,len=o.length;i<len;i++){
					str+="<tr><td>"+(i+1)+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>"+omit(o[i].member_no)+"</td><td>"+o[i].fortune+"</td></tr>"
				}
				ctx.append(str);
			}else{
					ctx.append("<tr><td>数据加载失败...</td><tr/>");
			}
		});
	}
	function getLsData(ctx){
		ctx.find("tr:first~tr").empty();
		$.ajax({
		  url: baseUrl+"/action/3",
		  context: ctx,
		  method: "get",
		  dataType:"json"
		}).done(function(o) {
			if(o.length){
				var str="";
				for(var i=0,len=o.length;i<len;i++){
					str+="<tr><td>"+(i+1)+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>"+o[i].merchant_name+"</td></tr>"
				}
				ctx.append(str);
			}else{
				ctx.append("<tr><td>数据加载失败...</td><tr/>");
			}
		});
	}

	getLyData($lyDataTable);
	getLsData($lsDataTable);

	 function simpleTip(text, time) {
    if (!$('#weile-tip').length) $('body').append('<div id="weile-tip" style="position:fixed;width:100%;text-align:center;bottom:120px;"></div>');
    var $t = $('#weile-tip');
    $t.html('<span style="padding:6px 12px;background:#222;color: #ccc;border-radius:2px;">' + text + '<span>');
    setTimeout(function() {
      $t.html('');
    }, +time || 1500);
  }

 function omit(phone){
    return phone.substring(0,3)+"*****"+phone.substring(8,phone.length)
  }
});

