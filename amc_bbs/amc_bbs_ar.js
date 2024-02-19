let amcbbs = {
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

	getQs : function(paramnm){
		let urlParams = new URLSearchParams(window.location.search);
		let myParam = urlParams.get(paramnm);

		console.log(myParam)
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
	}
};