(function($){
	$.amc = {
		getOnlyNum : function(s) {
			return s.replace(/[^0-9]/g,"");
		},
		getCheckData : function(str){
			var data =  "";
			$("input[name="+str+"]").each(function(){
				if($(this).is(":checked")){
					data += $(this).val()+",";
				}
			});
			if(data.length>0)data = data.substring(0,data.length-1);
			return data;
		},
		setCheckBox : function(str,val){
			var arVal = val.split(",");
			$("input[name="+strForm+"]").each(function(){
				$.each(arVal ,function(i){
					if($(this).val() == arVal[i])$(this).prop("checked", true);
				});				
			});
		},
		setCheckAll : function(str,bchecked){
			$("input[name="+str+"]").each(function(){
				$(this).prop("checked", bchecked);
			});
		},
		setCheckALLStatus : function(item_name , item_all_id){
			$("input[type=checkbox][name="+item_name+"]").on('click',function(){
				var bMode = $(this).is(":checked");
				if($('#'+item_all_id).is(":checked") && !bMode)$('#'+item_all_id).prop('checked',false);
			});
		},
		setTagLock : function(str , bMode){
			var colors = bMode == true ? '#ededed' : '#fff';
			$('input[name='+str+']').attr('readonly',bMode);
			$('input[name='+str+']').css('background-color',colors);			
		},
		getQs : function(){
			var pairs = location.search.slice(1).split("&");
			var result = {};
			pairs.forEach(function(pair){
				pair = pair.split("=");
				result[pair[0]] = decodeURIComponent(pair[1] || '');
			});
			return JSON.parse(JSON.stringify(result));
		},
		getQsParam : function(str , sV){
			var arParam = str.split("?");
			var pairs = arParam[1].split("&");
			var result = {};
			pairs.forEach(function(pair){
				pair = pair.split("=");
				result[pair[0]] = decodeURIComponent(pair[1] || '');
			});
			var oJson = JSON.parse(JSON.stringify(result));			
			return oJson[sV];
		},
		getQsMoveParam : function(){
			var oJson = this.getQs();
			var sParam = '';
			for(var k in oJson){
				if(k !="nSeq" && k != "id" && $.trim(k)!="" && k != "page")sParam += k+'='+oJson[k]+'&';
			}
			if(sParam != "")sParam = sParam.substring(0,sParam.length-1);
			return sParam;
		},

		getQsName : function(pName){
			var oJson = this.getQs();
			if(oJson[pName] == "undefined" || typeof(oJson[pName]) == "undefined") oJson[pName] = "";
			return oJson[pName];
		},
		setQsName : function(pName , pVal){
			var oJson = this.getQs();
			delete oJson[pName];
			var strQueryString = '';
			for(var k in oJson){
				if(k =="")break;
				strQueryString += k+"="+oJson[k]+"&";
			}
			strQueryString += pName+"="+pVal;
			return strQueryString;
		},
		getDateTerm : function(s1 , s2 , nTerm){
			if(nTerm >0)
				this.getSetDate(s1 , s2 , nTerm);
			else 
				this.getSetMonth(s1 , s2 , nTerm);
		},
		getSetDate : function(str1 , str2 , nTerm){
			var nowDate = this._getCustomizeDate(0,0,0,0,0);
			var preDate = nowDate;
			if(nTerm!=1)preDate = this._getCustomizeDate(0,0,(nTerm*-1),0,0);
			   
			var obj1 = $("#"+str1);
			var obj2 = $("#"+str2);
				   
			obj1.val(preDate[0]+"-"+preDate[1]+"-"+preDate[2]);
			obj2.val(nowDate[0]+"-"+nowDate[1]+"-"+nowDate[2]);
		},
		getSetMonth : function(str1 , str2 , nTerm){
			var nowDate = this._getCustomizeDate(0,0,0,0,0);
			var preDate = nowDate;
			if(nTerm!=0){
			   preDate = this._getCustomizeDate(0,(nTerm),0,0,0);
			}else{
			   preDate = this._getCustomizeDate(0,-1,0,0,0);
			   nowDate = this._getCustomizeDate(0,-1,0,0,0);
			}
			   
			var obj1 = $("#"+str1);
			var obj2 = $("#"+str2);
			   
			var nFinalDate = this._getMonthLastDay(nowDate[0],nowDate[1]);
			   
			var strFirstMonth = preDate[1];
			if(nTerm == -1) strFirstMonth = nowDate[1]; 
			   
			obj1.val(preDate[0]+"-"+strFirstMonth+"-01");
			obj2.val(nowDate[0]+"-"+nowDate[1]+"-"+nFinalDate);
		},
		_getCustomizeDate : function(nYear , nMonth , nDay , nHour , nMin){
			
			var toDay  = new Date();
			var arrDate = new Array(0,0,0,0,0);
			arrDate[0] = toDay.getFullYear()+nYear;
			arrDate[1] = toDay.getMonth()+nMonth;
			arrDate[2] = toDay.getDate()+nDay;
			arrDate[3] = toDay.getHours()+nHour;
			arrDate[4] = toDay.getMinutes()+nMin;
							
			var nDay = new Date(arrDate[0],arrDate[1],arrDate[2],arrDate[3],arrDate[4]);
			
			arrDate[0] = nDay.getFullYear();
			arrDate[1] = nDay.getMonth()+1;
			arrDate[2] = nDay.getDate();
			arrDate[3] = nDay.getHours();
			arrDate[4] = nDay.getMinutes();

			var j = 1 , nLen = 5;
			for(j; j < nLen; j++){
				if(parseInt(arrDate[j],10)<10)arrDate[j] = '0'+arrDate[j];
			}

			return arrDate;
		},
		_getMonthLastDay : function(nYear , nMonth){
			var nLimitDate = 31;
			if(nMonth==4 || nMonth==6 || nMonth==9 || nMonth==11){
		 		nLimitDate = 30;
		 	} else if(nMonth==2){
		 		nLimitDate = 28;
		 		if(nYear%4 == 0)nLimitDate = 29;		 			
		 	}
		 	return nLimitDate;
		},
		getDirName : function(){
			var arPath , nowDir,nPst;
			var strPath = jQuery(location).attr('pathname');			
			strPath = strPath.replace(/\\/g,'/').replace(/\/[^\/]*$/, '');			
			if(strPath!=""){
				arPath = strPath.split("/");
				nPst = (arPath.length-1) < 0 ? 0 : arPath.length-1;
				nowDir = arPath[nPst];
			}			
			return nowDir;
		},
		getTopDirName : function(nPst) {
			var arPath , nowDir = '';
			var strPath = jQuery(location).attr('pathname');			
			strPath = strPath.replace(/\\/g,'/').replace(/\/[^\/]*$/, '');			
			if(strPath!=""){
				arPath = strPath.split("/");
				nowDir = arPath[nPst];
			}			
			return nowDir;
		},
		getPageName : function(){
			var strPageName = document.location.pathname.match(/[^\/]+$/)[0];
			return strPageName;
		},
		setNowPath : function(strParam) {
			var nowPage = $(location).attr('pathname');
			if ($.trim(strParam) != "") nowPage += "?";
			nowPage += strParam;
			return nowPage;
		},
			
		setFormMode : function(f , f_id , mode ){
			
			if(mode == "ajax"){
				var sUrl = f.action;
				var sData = $("#"+f_id).serialize();
				this.sAjax(sUrl , sData , "this");
			} else {
				f.submit();
			}
		},
		number_format : function(str) {
			var n = str.toString();
			while (/(\d)(?=(\d\d\d)+(?!\d))/g.test(n)) n = n.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
			return n;
		},

		getPaging : function(id ,sFnc , total_page , block , npage){
			// 페이징 처리
	        var pagingHtml = "";
	        
	        //처음으로 이동하기
	        pagingHtml = "<a href='javascript:"+sFnc+"(1)' title=\"처음 페이지로 이동\"><i class=\"icon-first\">처음 페이지로 이동</i></a>"+"\r\n";
	        // 이전 페이지
	        prevFnc = "void(0)";
	        if(npage - 1 > 0)prevFnc = sFnc+"(" + (npage - 1)+ ")";
	        pagingHtml += "<a href='javascript:" + prevFnc + "' title=\"이전 페이지로 이동\"><i class=\"icon-prev\">이전 페이지로 이동</i></a>"+"\r\n";

	        var sPage = parseInt((npage - 1)/block ,10) * block+1;
	        var ePage = parseInt((((sPage-1)+block)/block)*block,10);

	        if(total_page <= ePage)ePage = total_page;
	        pagingHtml += " <span> ";

	        var nCurNo = sPage;
	        for(nCurNo ; nCurNo <= ePage ; nCurNo++){
	        	if(nCurNo == npage){
	        	    pagingHtml += "<strong title=\"현재 페이지\">" + npage + "</strong> ";
	        	} else {
	        		pagingHtml += "<a href='javascript:"+sFnc+"(" + nCurNo + ")'>" + nCurNo + "</a>";
	        	}
	        }	        
	        pagingHtml += " </span> ";	        
	        // 다음 페이지
	        nextFnc = "";
	        if(npage+1 <= total_page)nextFnc = sFnc+"(" + (npage + 1)+ ")";
	        pagingHtml += "<a href='javascript:" + nextFnc + "' title=\"다음 페이지로 이동\"><i class=\"icon-next\">다음 페이지로 이동</i></a>"+"\r\n";
	        //마지막 페이지
	        pagingHtml += "<a href='javascript:"+sFnc+"("+total_page+")' title=\"마지막 페이지로 이동\"><i class=\"icon-last\">마지막 페이지로 이동</i></a>"+"\r\n";

	        // 페이징 표시
	        $("#"+id).html(pagingHtml);
		},
		getCutByteTxt : function(str , nLimit){
			var txtLength = str.length;
			if(txtLength < nLimit) return str;

			var nByte = 0 , i = 0 , currentByte , totalByte =0 , sInStr;
			sInStr = str;
			for( i ; i < txtLength ; i++) {
				currentByte = str.charCodeAt(i);
				totalByte++;
				if(currentByte > 128)totalByte++;
			}

			if(totalByte >= nLimit){
				sInStr = str.substring(0,nLimit)+"...";
			}
			return sInStr;
		},
		getCutDate : function(str) {
			return str.substr(0,10);
		},
		strip_tags : function(input , allowed) { //[출처] http://steadypost.net/post/qna/id/6/
			// var str = strip_tags('<p>Kevin</p> <b>van</b> <i>Zonneveld</i>', '<i><b>'); i와 b 태그만 허용하고 그 외의 태그는 모두 제거할때 아래와 같이 하면 됩니다.
			allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
			var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
			return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {        return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';});
		},
		getIEBrowser : function(){
			var agent = navigator.userAgent.toLowerCase();
			if(navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1){
				return 11;
			} else if(agent.indexOf("msie") != -1) {
				return 9;
			} else{
				return -1;
			}
		},
		setFormDataAajx : function(frmName ,movePage ,callback) {
			 $("#"+frmName).ajaxForm({
	            beforeSubmit: function (data,form,option) {
	            	//점검은 미리 함.
	            	return true;
	            },
	            //success: function(response,status){
	            success: function(data){
	                //성공후 서버에서 받은 데이터 처리
	                data = eval("("+data+")");
	                if (callback) callback.apply(null, [data]);
	            },
	            error: function(){
	                //에러발생을 위한 code페이지
	                $.fn.alert("처리 중 장애가 발생 했습니다.");
	                $(".modal-close-alert").click(function(){
	                	document.location.reload();
	                })
	            }                              
   			 });
			
			$("#"+frmName).submit();
		},
		sAjaxFile : function (type, url, params, callback) {
		    $.ajax({
		        type: type,
		        url: url,
		        processData: false,
		        contentType: false,
		        dataType: "JSON",
		        data: params,
		        success: function (data) {
		            if (callback) callback.apply(null, [data]);
		        },
		        error: function (xhr, status, error) {
		        }
		    });
		},
		sAjaxCall : function (type, url, params, callback) {
		    $.ajax({
		        type: type , url: url, dataType: "JSON",  data: encodeURI(params),
		        success: function (data) {
		            if (callback) callback.apply(null, [data]);
		        },
		        error: function (xhr, status, error) {
		        }
		    });
		},
		sAjaxCallPlain : function (type, url, params, callback) {
		    $.ajax({
		        type: type , url: url, dataType: "JSON",  data: params,
		        success: function (data) {
		            if (callback) callback.apply(null, [data]);
		        },
		        error: function (xhr, status, error) {
		        }
		    });
		},
		sAjax	: function(strUrl , paramData , callback){
		   var _this = this;
		   paramData.pgmode = "json";
		   $.ajax({
			    type : "post", data : paramData , url : strUrl,
				error : function(e) {},context : this,
			    success: function(data){
			    	try{
			    		if(callback == 'this'){
			    			_this.rAjax(data);
			    		} else {
			    			callback(data);
			    		}
			    	}catch(e){
			    		$.fn.alert("Error :"+e);
			    	}
			    }
			});
		},
		rAjax : function(data){
			var oJson = eval("("+data+")");
		 	$.fn.alert(oJson.msg);
		 	$(".modal-close-alert").click(function(){
		 		document.location.reload();
		 	});
		},
		formSubmit : function(path, params, method){
			method = method || "post"; // S
			var form = document.createElement("form");
		    form.setAttribute("method", method);
		    form.setAttribute("action", path);

		    for(var key in params) {
		        if(params.hasOwnProperty(key)) {
		            var hiddenField = document.createElement("input");
		            hiddenField.setAttribute("type", "hidden");
		            hiddenField.setAttribute("name", key);
		            hiddenField.setAttribute("value", params[key]);

		            form.appendChild(hiddenField);
		        }
		    }

		    document.body.appendChild(form);
		    form.submit();
		}
	};

	//문자열 치환
	String.prototype.setHide = function (s) {
	    var string = this;
	    var nLen = this.length;
	    string = string.substr(0,s);
	    var i = s;
	    var fix = "";
	    while(i < nLen){
	    	fix = string.substr(i,(i+1));
	    	if(fix == "-")continue;
	    	
	    	string += "*";
	    	i++;
	    }
	    return string;
	}

	//날짜열 포맷 변경하기
	Number.prototype.setDate = function() {
		var sDate = this.toString();
		if(sDate !='' && sDate.length >= 8) sDate = sDate.substr(0,4) + "-" + sDate.substr(4,2) + "-" + sDate.substr(6,2);
		return sDate;
	}
	//날짜열 포맷 변경하기
	String.prototype.setDate = function() {
		var sDate = this.toString();
		if(sDate !='' && sDate.length >= 8) sDate = sDate.substr(0,4) + "-" + sDate.substr(4,2) + "-" + sDate.substr(6,2);
		return sDate;
	}

	//시간 포맷
	String.prototype.setTime = function() {
		var sDate = this.toString();
		if(sDate !='' && sDate.length >= 4) sDate = sDate.substr(0,2) + ":" + sDate.substr(2,2);
		return sDate;
	}
	
	//문자열 치환
	String.prototype.format = function () {
	    var string = this;
	    for (idx in arguments) {
	        string = string.replace("{" + idx + "}", arguments[idx]);
	    }
	    return string;
	}
	
	//날짜 형태 변환
	String.prototype.dateformat=function(){
		return this.replace(/(\d{4})(\d{2})(\d{2})/,"$1-$2-$3");
	}

	// variable.toComma();
	Number.prototype.toComma = function () {
	    var value = this.toString();
	    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	String.prototype.toComma = function () {
	    return this.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	String.prototype.toRemoveComma = function () {
	    return this.replace(/,/g, "");
	}
	
	$.fn.popOpenNew = function(tsn){
	    $('.modal-wrap').hide();
	    popName = $('#'+tsn);
	    popName.show();

	    $("body").addClass('modal-active');

	    if($(".modal-overlay").length == 0){
	        $("body").append('<div class="modal-overlay"></div>');
	        $(".modal-overlay").fadeIn(0);
	    }else{
	        $(".modal-overlay").fadeIn(0);
	    };

	    if(popName.hasClass('tab-slide') == true){
	        slickPop();
	    }
	};
	
})(jQuery);



