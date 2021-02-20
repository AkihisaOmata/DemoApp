'use strict'

$("#send_zipcode").keypress(function(e){
    if(e.which == 13){
      sendZipcode();
    }
  });

//fooo

function sendZipcode(){
    var zipcode = Number($("#send_zipcode").val())
    if(typeof(zipcode)=="number" && String(zipcode).length==7){
        connectToZip(zipcode)
    }else{
        alert("郵便番号を入力してください (7桁)")
    }
}

function connectToZip(zip){
    $("#address").text("検索中 ...")
    $("#symbol").text("検索中 ...")
    var call = {zipcode : zip}
    var zip_url =  'https://zipcloud.ibsnet.co.jp/api/search';
    $.ajax(
      {
        type: 'GET',
        cahce: false,
        data: call,
        url: zip_url,
        dataType: 'jsonp' //帰ってくるdataの型
      }
    )
    .done(function(data) {
        if(data.status==200){
            try{
                var add = ''
                for(let i=0; i<data.results.length; i++){
                    add += '<div>' + data.results[i].address1 + ' (' + data.results[i].kana1 + ')' + '</div>'
                    add += '<div>' + data.results[i].address2 + ' (' + data.results[i].kana2 + ')' + '</div>'
                    add += '<div>' + data.results[i].address3 + ' (' + data.results[i].kana3 + ')' + '</div>'
                }
                $("#address").html(add)
                viewSymbol(data.results[0].prefcode)
            }catch(e){
                $("#address").text("この郵便番号は(たぶん)使われていません")
                $("#symbol").text("残念！")
            }
        }else{
            $("#address").text("検索失敗")
        }
        console.log("connection succsessed")
    })
    .fail(function() {
      console.log("connection faild");
    });
    return;
}

function viewSymbol(pref){
        var add = '<img src="img/prefSymbol/' + pref + '.png">'
        $("#symbol").html(add)
}

function init(){
}

init()