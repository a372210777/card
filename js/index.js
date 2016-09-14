$(function(){
  baseUrl="http://172.16.9.30:3000";
  //乐友查询
  var $form=$("#friend-form");
  var $phoneInput=$form.find("input")
  $form.submit(function(){
    var phone=$.trim($phoneInput.val())
    if(!phone){
        simpleTip("请输入手机号")
        return false
    }
    if(!/^[0-9]{11}$/.test(phone)){
       simpleTip("仅限输入11位手机号");
       return false;
    }
    $form.find("input[type='submit']").attr("disabled","disabled")
    request(baseUrl+"/queryPosition/2/"+phone,{},"get",function(data){
       $form.find("input[type='submit']").removeAttr("disabled")
       if(data.length){
          var html="<label class='treasure'>"+data[0].fortune+"</label>财富值&nbsp;&nbsp;&nbsp;&nbsp;第<label class='position'>"+data[0].ranking+"</label>名"
         // $(".treasure").text(data[0].fortune+"点      名次:第"+data[0].ranking+"名");
         $("#resultWrap").empty();
        $("#resultWrap").append(html);
       }else{
          $("#resultWrap").empty();
          simpleTip("没有查询到信息哦！")
       }  
    },function(){
         $form.find("input[type='submit']").removeAttr("disabled")
         simpleTip("网络错误！")
    })

    return false;
  })
  requestFriendData();
  requestShopData();
  //乐友刷新
  $("#refresh").click(function(){
       if($(this).hasClass("disable")){
        simpleTip("正在为您加载数据当中...")
      }else{
          $(this).addClass("disable")
          requestFriendData();
      }
  })
  //乐商刷新
  $("#refreshLeS").click(function(){
      if($(this).hasClass("disable")){
        simpleTip("正在为您加载数据当中...")
      }else{
          $(this).addClass("disable")
          requestShopData();
      }
    
  })
  $(".convience").click(function(){
      $("html,body").animate({scrollTop: 0}, 1000);
  })
  // $(".convience").click(function(){
  //   var dh=$(document).height()-$(window).height();//滚动条最大位置
  //   var scrollTop=$(window).scrollTop()
  //   if(scrollTop<1300){
  //       $("html,body").animate({scrollTop: 1300}, 500);
  //   }else if(scrollTop>=1300 & scrollTop<1501){
  //       $("html,body").animate({scrollTop: dh}, 500);
  //   }else if(scrollTop>1500 & scrollTop<=dh){
  //        $("html,body").animate({scrollTop: 1300}, 500);
  //   }
  // })

  

  //  $form.on("keypress","input",function(e){
  //      var keycode = e.which
  //      if(keycode<96 || keycode>105){
  //         e.preventDefault();
  //      }
  // })
})

  function requestFriendData(){

  request(baseUrl+"/action/1",{},"get",function(data){
        $("#refresh").removeClass("disable")
        var html="";
          if(data.length){
             // $("#friendTable tr:first~tr").empty();
             $("#friendTable").empty();
             for(var i=0;i<data.length;i++){
                   html= html+'<div class="row">'+
                      '<div class="table-common left" style="">第'+(i+1)+'名</div>'+
                      '<div class=" table-common middle" style="">'+omit(data[i].member_no)+'</div>'+
                      '<div class="table-common right" style="">'+data[i].fortune+'</div>'+
                    '</div>';
                // html=html+"<tr><td>"+(i+1)+"名</td><td>"+omit(data[i].member_no)+"</td><td>"+data[i].fortune+"</td></tr>"
              }
              $("#friendTable").append(html);
          }else{
            simpleTip("未查询到数据!")
          }
      },function(ar1,ar2,ar3){
         $("#refresh").removeClass("disable")
          simpleTip("网络错误！")
      })

   

  }
  function requestShopData(){
      request(baseUrl+"/action/3",{},"get",function(data){
        $("#refreshLeS").removeClass("disable")
        var html="";
          if(data.length){
             // $("#shopTable tr:first~tr").empty();
             $("#shopTable").empty();
             for(var i=0;i<data.length;i++){
                html=html+'<div class="row">'+
                            '<div class="table-common shop-left">第'+(i+1)+'名</div>'+
                            '<div class=" table-common shop-right tomit" title="'+data[i].merchant_name+'" >'+data[i].merchant_name+'</div>'+
                      '</div>'

                // html=html+"<tr><td>"+(i+1)+"名</td><td>"+data[i].merchant_name+"</td></tr>"
              }
              $("#shopTable").append(html);
          }
      },function(){
          $("#refreshLeS").removeClass("disable")
          simpleTip("网络错误！")
      })
  }

  function getURIParam() {
    var search = decodeURI(location.search.substr(1));
    var ls = search ? search.split('&') : [];
    var data = {};
    for (var i = ls.length; i--;) {
      var it = ls[i];
      var index = it.indexOf('=');
      data[it.substring(0, index)] = it.substring(1 + index);
    }
    return data;
  }
  
  function request(url,data,method,success,error){
    $.ajax({
       type: method || "POST",
       url: url,
       dataType:"json",
       data:data,
       success: success,
       error:error
    });
  }


  function simpleTip(text, time) {
    if (!$('#weile-tip').length) $('body').append('<div id="weile-tip" style="position:fixed;width:100%;text-align:center;bottom:120px;"></div>');
    var $t = $('#weile-tip');
    $t.html('<span style="padding:6px 12px;background:#222;color: #ccc;border-radius:2px;">' + text + '<span>');
    setTimeout(function() {
      $t.html('');
    }, +time || 1500);
  }
  function omit(phone){
    return phone.substring(0,3)+"****"+phone.substring(7,phone.length)
  }