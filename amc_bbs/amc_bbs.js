(function($){

	$.amcbbs = {
		datepickerOptInit : {
			autoSize: true,changeYear: true,changeMonth: true,dateFormat: "yy-mm-dd" , 
			prevText: '이전 달', nextText: '다음 달',  monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        	monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        	dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        	dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
        	dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        	showMonthAfterYear: true,  	yearSuffix: '년'
		},
		bbs_seq : -1 , 
		init : function(){			
			this.setDirJs();
			var sNowPage = this.getPageName();
			if(sNowPage.indexOf("reg.php")>-1){
				this.setRegInit();
			} else if(sNowPage.indexOf("list.php")>-1 || $("#allsel").length > 0 || sNowPage.indexOf("intergrated")>-1 || sNowPage.indexOf("bbs_statistic")>-1){
				this.setListInit();				
			} else if(sNowPage.indexOf('view.php')>-1){
				this.setViewInit();
			}
			
		},		
		setViewInit : function () {
			this.bbs_seq = this.getQsName('id');			
		},
		bbs_del : function(){
						
			if(!confirm('삭제 하시면 복구 할 수 없습니다 .삭제 하시겠습니까?'))return;
			var pgName = '/bbs/del.php';
			var sData = {'Seq' : $this.bbs_seq ,'mode' :'single'};
			var sFnc = function(str){
					try{
						var oJson = eval("("+str+")");

                      	if(oJson.code == 0)alert(oJson.msg);
                      	if(oJson.code == 1){
                      		var param = this.getQsMoveParam();
                      		location.href = oJson.msg +'?'+param;
                      	}
					}catch(e){
						alert(e);
					}
			}
			this.sAjax(pgName , sData , sFnc);
		},
		setRegInit : function(){
			var _this = this;
			//취소버튼
			$(".btn_group02").on("click",function(e){
				e.preventDefault();
				var mode = $(this).attr("data-proc");
				if(mode == ""){
					alert("정보가 정확하지 않습니다.");
					return;
				}
				var arMode = _this.getBtnMode(mode);
				if(arMode[0] == "can"){
					if(arMode[1] == "back"){
						history.back();
					} else {
						location.href = arMode[1];
					}
				}	
			});

			if($("input[type=file]").length >0){
				$("input[type=file]").change(function(){
					var id = $(this).attr("id");
					var txt_id = id+"_txt";
					$('#'+txt_id).val($(this).val());
				});
			}

			if($("#vRegDate").length >0){
				$("input[name=vRegDate]").datepicker(this.datepickerOptInit);
			}
		},
		setListInit : function(){
			var _this = this;
			$('#allsel').on('click',function(){
				var bMode = $(this).is(":checked");
				_this.setCheckAll('arSel',bMode);
			});

			$("input[type=checkbox][name=arSel]").on('click',function(){
				var bMode = $(this).is(":checked");
				if($('#allsel').is(":checked") && !bMode)$('#allsel').prop('checked',false);
			});

			$('#limit').change(function(){
				var limit = $(this).val();
				if(limit !='' && limit !='undefined'){
					strQs = _this.setQsName('limit',limit);
					if(strQs !='')location.href=$(location).attr('pathname')+"?"+strQs;
				}
			});
			
			if($(".mCalendar").length > 0){
				if($("#sDate").length > 0) $("#sDate").datepicker(this.datepickerOptInit);
				if($("#eDate").length > 0) $("#eDate").datepicker(this.datepickerOptInit);	
				$(".mCalendar").on("click" , function(){
					var i = $(".mCalendar").index(this);
					var sId = i == 0 ? "s":"e";
					$("#"+sId+"Date").datepicker("show");
				});
			}
			

			//삭제 버튼 
			$(".btn_group06").on("click",function(){
				var mode = $(this).attr("data-proc");
				if(mode == ""){
					alert("정보가 정확하지 않습니다.");
					return;
				}
				var pgName = "";
				var regMode = mode;
				var nStatus = 0;
				var arMode = _this.getBtnMode(mode);
				if(Array.isArray(arMode)){
					regMode = arMode[0];
					pgName = arMode[1];
					
				}
				switch(regMode) {
					case "del" : _this.delData(pgName);break;
					case "inter" :_this.setViewMode(regMode , pgName);break; 
					case "status" : _this.setStatusMode(pgName , arMode[2]);break;
				}
				//if(regMode == 'del')_this.delData(pgName);
			});
		},
		jPwd : function(str) {
			var _this = this;
			var _this_msg = str;
			$.amcbbs.bPopupMode('BBSPWD');
			$(".btn_pop01").on("click",function(e){
				e.preventDefault();
				var pwd = $('#bbs_pwd').val();
				if(pwd == ''){
					alert("비밀번호를 입력하세요.");
					return;
				}				
				var nSeq = _this.getQsParam(str , 'id');
				var bbs_code = _this.getQsParam(str , 'code');
				if(nSeq == ''){
					alert("정보가 정확하지 않습니다.");
					return;
				}
				var sData = {"bbs_pwd":pwd , "nSeq":nSeq ,'bbs_code':bbs_code};
				var pgName = '/bbs/isPwd.php';
				var sFnc = function(str){
					try{
						var oJson = eval("("+str+")");
                      	if(oJson.code == 0)alert(oJson.msg);
                      	if(oJson.code == 1)location.href = _this_msg;
					}catch(e){
						alert(e);
					}
				}
				_this.sAjax(pgName , sData , sFnc);
			});
			$(".btn_pop02").on("click",function(){
				$.amcbbs.bPopupMode('BBSPWD');
			});
		},
		isBbsValidation:function(sForm , FormMode){
			var f = document.forms[sForm];
			var f_id = f.id;
			if(typeof oEditors !=='undefined')oEditors[0].exec("UPDATE_CONTENTS_FIELD", []); 
			if(!$('#sWriter').amc().isWriter())return;
			if(!$('#bSecret').amc().isSecret())return;
			if(!$('#sTitle').amc().isNull('제목을 입력하세요.'))return;
			if(!$('#strContents').amc().isNull('내용을 입력하세요.'))return; 
        	this.setFormMode(f , f_id , FormMode );
		},		
		setViewMode : function(mode , act){
			var pgName = mode+"_view.php";
			var msg = "숨김 상태에서 보이기로 ";
			if(act == 'hidden')msg = "보이기 상태에서 숨기기로 ";
			msg += "변경하시겠습니까?";
			if(!confirm(msg))return;
			var data = this.getCheckData("arSel");
			if(data == ""){
				alert("변경 할 대상을 선택하세요.");
				return;
			}			
			var sData = {'Seq' : data ,'view': act};
			this.sAjax(pgName , sData , "this");
		},
		setStatusMode : function(mode , act){
			var pgName = mode+"_json.php";
			var nStatus = 0;
			if(act.indexOf("_")>-1){
				var arAct = act.split("_");
				nStatus = arAct[0];
				act = arAct[1];
			}
			var msg = act+" 상태로 변경하시겠습니까?";
			if(!confirm(msg))return;
			var data = this.getCheckData("arSel");
			if(data == ""){
				alert("변경 할 대상을 선택하세요.");
				return;
			}			
			var sData = {'Seq' : data ,'status': nStatus};
			this.sAjax(pgName , sData , "this");
		},

		getBtnMode : function(mode){
			var arMode = [mode,''];
			if(mode == '' || typeof mode == 'undefined')return arMode;
			if(mode.indexOf("|")>-1)arMode = mode.split("|");
			return arMode;
		},
		getBtnModes : function(th){
			var mode = $(th).attr("data-proc");
			var arMode = [];
            if(mode.indexOf("|")>-1){
            	arMode = mode.split("|");
            } else {
            	arMode = [mode,''];
            }
            return arMode;
		},
		delData : function(pg , seq){
			if(!confirm('정말 삭제 하시겠습니까?'))return;
			seq = typeof seq !== 'undefined' ? seq : 0;
			var data = seq;
			if(seq < 1)data = this.getCheckData("arSel");
			if(data == ""){
				alert("삭제 할 대상을 선택하세요.");
				return;
			}			
			var sData = {'Seq' : data};
			this.sAjax(pg+'_del_proc.php' , sData , 'this');
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
				if(k !='bbs_mode' && k != 'id')sParam += k+'='+oJson[k]+'&';
			}
			if(sParam != "")sParam = sParam.substring(0,sParam.length-1);
			return sParam;
		},

		getQsName : function(pName){
			var oJson = this.getQs();
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
		bPopupMode : function(str){
			var obj = $('#'+str);
			 if(obj.css("display") == "none"){ 
			 	obj.bPopup();
			 } else {
			 	obj.bPopup().close();
			 }
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
		getTopDirName : function(nPst = 0) {
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
		setDirJs : function(){
			var dirName = this.getDirName();
			var upDir = dirName=='adm' ? "." : "..";
			var jsName = upDir+"/js/"+dirName.toLowerCase()+".js";		
			$.getScript(jsName);
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
			//var str = strip_tags('<p>Kevin</p> <b>van</b> <i>Zonneveld</i>', '<i><b>'); i와 b 태그만 허용하고 그 외의 태그는 모두 제거할때 아래와 같이 하면 됩니다.
			allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
    		var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
    		return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {        return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';});
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
			    		alert("Error :"+e);
			    	}
			    }
			});
		},
		rAjax : function(data){
			var oJson = eval("("+data+")");
		 	alert(oJson.msg);
		 	document.location.reload();
		}	
	};

})(jQuery);