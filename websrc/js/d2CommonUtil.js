/**
 * 문자의 좌, 우 공백 제거
 * @return : String
 */
String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
};


/**
 * 문자의 좌 공백
 * @return : String
 */
String.prototype.ltrim = function() {
	return this.replace(/(^\s*)/, "");
};


/**
 * 문자의 우 공백 제거
 * @return : String
 */
String.prototype.rtrim = function() {
	return this.replace(/(\s*$)/, "");
};


/**
 * 문자열의 byte 길이 반환
 * @return : int
 */
String.prototype.byte = function() {
	var cnt = 0;
	for ( var i = 0; i < this.length; i++) {
		if (this.charCodeAt(i) > 127)
			cnt += 2;
		else
			cnt++;
	}
	return cnt;
};


/**
 * 문자열의 byte 길이 만큼 잘라 반환
 * @return : cut str
 */
String.prototype.cut = function(len) {
    var str = this;
    var l = 0;
    for (var i=0; i<str.length; i++) {
            l += (str.charCodeAt(i) > 128) ? 2 : 1;
            if (l > len) return str.substring(0, i);
    }
    return str;
};


/**
 * 정수형으로 변환
 * @return : String
 */
String.prototype.integer = function() {
	if (!isNaN(this)) {
		return parseInt(this, 10);
	} else {
		return null;
	}
};


/**
 * 숫자만 가져 오기
 * @return : String
 */
String.prototype.num = function() {
	return (this.trim().replace(/[^0-9]/g, ""));
};


/**
 * 숫자에 3자리마다 , 를 찍어서 반환
 * @return : String
 */
String.prototype.cvtNumber = function() {
	var num = this.trim();
	while ((/(-?[0-9]+)([0-9]{3})/).test(num)) {
		num = num.replace((/(-?[0-9]+)([0-9]{3})/), "$1,$2");
	}
	return num;
};


/**
 * 숫자의 자리수(cnt)에 맞도록 반환
 * @return : String
 */
String.prototype.digits = function(cnt) {
	var digit = "";
	if (this.length < cnt) {
		for ( var i = 0; i < cnt - this.length; i++) {
			digit += "0";
		}
	}
	return digit + this;
};


/**
 * " -> &#34; ' -> &#39;로 바꾸어서 반환
 * @return : String
 */
String.prototype.quota = function() {
	return this.replace(/"/g, "&#34;").replace(/'/g, "&#39;");
};


/**
 * html 제거
 * @return : String
 */
String.prototype.stripHtml = function() {
	return this.replace(/(<([^>]+)>)/ig, "");
};


/**
 * 파일 확장자만 가져오기
 * @return : String
 */
String.prototype.ext = function() {
	return (this.indexOf(".") < 0) ? "" : this.substring(
			this.lastIndexOf(".") + 1, this.length);
};


/**
 * URL에서 파라메터 제거한 순수한 url 얻기
 * @return : String
 */
String.prototype.uri = function() {
	var arr = this.split("?");
	arr = arr[0].split("#");
	return arr[0];
};


/**
 * 정규식에 쓰이는 특수문자를 찾아서 이스케이프 한다.
 * @return : String
 */
String.prototype.meta = function() {
	var str = this;
	var result = "";
	for ( var i = 0; i < str.length; i++) {
		if ((/([\$\(\)\*\+\.\[\]\?\\\^\{\}\|]{1})/).test(str.charAt(i))) {
			result += str.charAt(i).replace(
					(/([\$\(\)\*\+\.\[\]\?\\\^\{\}\|]{1})/), "\\$1");
		} else {
			result += str.charAt(i);
		}
	}
	return result;
};


/**
 * 정규식에 쓰이는 특수문자를 찾아서 이스케이프 한다.
 * @return : String
 */
String.prototype.remove = function(pattern) {
	return (pattern == null) ? this : eval("this.replace(/[" + pattern.meta()
			+ "]/g, \"\")");
};


/**
 * 최소 최대 길이인지 검증 str.isLength(min [,max])
 * @return : boolean
 */
String.prototype.isLength = function() {
	var min = arguments[0];
	var max = arguments[1] ? arguments[1] : null;
	var success = true;
	if (this.length < min) {
		success = false;
	}
	if (max && this.length > max) {
		success = false;
	}
	return success;
};


/**
 * 최소 최대 바이트인지 검증 str.isByteLength(min [,max])
 * @return : boolean
 */
String.prototype.isByteLength = function() {
	var min = arguments[0];
	var max = arguments[1] ? arguments[1] : null;
	var success = true;
	if (this.byte() < min) {
		success = false;
	}
	if (max && this.byte() > max) {
		success = false;
	}
	return success;
};


/**
 * 공백이나 널인지 확인
 * @return : boolean
 */
String.prototype.isBlank = function() {
	var str = this.trim();
	for ( var i = 0; i < str.length; i++) {
		if ((str.charAt(i) != "\t") && (str.charAt(i) != "\n")
				&& (str.charAt(i) != "\r")) {
			return false;
		}
	}
	return true;
};


/**
 * 숫자로 구성되어 있는지 학인 arguments[0] : 허용할 문자셋
 * @return : boolean
 */
String.prototype.isNum = function() {
	return (/^[0-9]+$/).test(this.remove(arguments[0])) ? true : false;
};


/**
 * 영어만 허용 - arguments[0] : 추가 허용할 문자들
 * @return : boolean
 */
String.prototype.isEng = function() {
	return (/^[a-zA-Z]+$/).test(this.remove(arguments[0])) ? true : false;
};

/**
 * 영어와&nbsp; 만 허용 - arguments[0] : 추가 허용할 문자들
 * @return : boolean
 */
String.prototype.isblankEng = function() {
	return (/^[a-zA-Z\s]+$/).test(this.remove(arguments[0])) ? true : false;
},


/**
 * 숫자와 영어만 허용 - arguments[0] : 추가 허용할 문자들
 * @return : boolean
 */
String.prototype.isEngNum = function() {
	return (/^[0-9a-zA-Z]+$/).test(this.remove(arguments[0])) ? true : false;
};


/**
 * 숫자와 영어만 허용 - arguments[0] : 추가 허용할 문자들
 * @return : boolean
 */
String.prototype.isNumEng = function() {
	return this.isEngNum(arguments[0]);
};


/**
 * 아이디 체크 영어와 숫자만 체크 첫글자는 영어로 시작 - arguments[0] : 추가 허용할 문자들
 * @return : boolean
 */
String.prototype.isUserid = function() {
	return (/^[0-9a-zA-Z]+$/).test(this.remove(arguments[0])) ? true : false;
};


/**
 * 이메일의 유효성을 체크
 * @return : boolean
 */
String.prototype.isEmail = function() {
	return (/\w+([-+.]\w+)*@\w+([-.]\w+)*\.[a-zA-Z]{2,4}$/).test(this.trim());
};


/**
 * 전화번호 체크 - arguments[0] : 전화번호 구분자
 * @return : boolean
 */
String.prototype.isPhone = function() {
	var arg = arguments[0] ? arguments[0] : "";
	return eval("(/(02|0[3-9]{ 1 }[0-9]{1})" + arg + "[1-9]{ 1 }[0-9]{2,3}"
			+ arg + "[0-9]{4}$/).test(this)");
};


/**
 * 핸드폰번호 체크
 * @return : boolean
 */
String.prototype.isMobile = function() {
	var regExp = /^\d{10,11}$/;
	return regExp.test(this.replaceAll("-", ""));
};

/**
 * 전화번호 체크
 * @returns
 */
String.prototype.isTel = function() {
	var regExp = /^\d{8,11}$/;
	return regExp.test(this.replaceAll("-", ""));
};

// 문자열 타입
String.prototype.format = function() {
	var num = parseFloat(this);
	return isNaN(num) ? "0" : num.format();
};


/**
 * 숫자 타입
 */
Number.prototype.format = function() {
    if(this==0) return 0;

    var reg = /(^[+-]?\d+)(\d{3})/;
    var n = (this + '');

    while (reg.test(n)) n = n.replace(reg, '$1' + ',' + '$2');

    return n;
};


/**
 * replace All
 */
String.prototype.replaceAll = function(searchStr, replaceStr) {
    var temp = this;
    while (temp.indexOf(searchStr) != -1) {
        temp = temp.replace(searchStr, replaceStr);
    }
    return temp;
};


/**
 * 날짜 비교 함수 sDate: 비교 대상 날짜 첫번째 ex: 2009-04-29 eDate: 비교 대상 날짜 두번째 ex:
 * 2009-04-28
 */
function compDate(sDate,eDate){
	var start_dates = sDate.split("-");
	var end_dates = eDate.split("-");
	var date1 = new Date(start_dates[0],start_dates[1],start_dates[2]).valueOf();
	var date2 = new Date(end_dates[0],end_dates[1],end_dates[2]).valueOf();
	if( (date2 - date1) < 0 ){
		return false;
	}else{
		return true;
	}
}


/**
 * name (form.이름 ) , ivalue(Value)
 * 예) optionValueSel(form.job , 2)
 * 해당 옵션에서 밸류값 같은것을 셀렉트 시킨다.
 */
function optionValueSel(name,ivalue){
	var i,sel = 0;
	for(i=0;i<name.length;i++){
		if(name.options[i].value == ivalue ) {
			sel = i;
		}
	}
	name.options[sel].selected = true;
}


/**
 * 예) optionValueRtn(form.name)
 * 해당 옵션에서 선택된 밸류값을 리턴 시킨다.
 */
function optionValueRtn(name){
	var name_value = "";
	for(var i=0, len=name.length; i<len; i++){
		if (name[i].selected == true){
			name_value = name[i].value;
			break;
		}
	}
	return name_value;
}


/**
 * 예) optionTextRtn(form.name)
 * 해당 옵션에서 선택된 텍스트값을 리턴 시킨다.
 */
function optionTextRtn(name){
	var name_value = "";
	for(var i=0, len=name.length; i<len; i++){
		if (name[i].selected == true){
			name_value = name[i].text;
			break;
		}
	}
	return name_value;
}


/**
 * 예) optionSelectedCnt(form.name)
 * select에서 선택된 option의 갯수를 리턴 시킨다.
 */
function optionSelectedCnt(name){
	var cnt = 0;
	for(var i=0, len=name.length; i<len; i++){
		if ( name[i].selected == true ){
			cnt++;
		}
	}
	return cnt;
}


/**
 * 예) optionSelectedCnt(form.name)
 * select에서 선택된 option의 갯수를 리턴 시킨다.
 */
function selectedCnt(name){
	var cnt = 0;
	if(name){
		if(!name.length){
			if(name.checked){
				cnt++;
			}
		}else{
			for(var i=0; i<name.length; i++){
				if ( name[i].checked == true ){
					cnt++;
				}
			}
		}
	}
	return cnt;
}


/**
 * 예) checkRadio(name)
 * 라디오 버튼에서 선택한 것의 밸류값을 리턴한다
 * 선택한것이 없다면 "" 공백을 리턴한다.
 */
function checkRadio(name) {
	var radio = document.getElementsByName(name);
	if (radio){
		if (!radio.length) {
			if (radio.checked) {
				return radio.value;
			}
		} else {
			for (var i = 0; i < radio.length; i++) {
				if (radio[i].checked) {
					return radio[i].value;
				}
			}
		}
	}
	return "";
}


/**
 * 예) checkInsert ( name (form이름 ) , ivalue(Int형 Value) )
 * radio나 checkbox 에서 해당 밸류값과 같은것이 선택 되도록 한다.
 */
function checkInsert(name,ivalue){
	if(name){
		if(!name.length) {
			if(name.value == ivalue) {
				name.checked = true;
			}
		} else {
			for(var i=0;i<name.length;i++) {
				if(name[i].value == ivalue) {
					name[i].checked = true;
				}
			}
		}
	}
}


/**
 * 쓰기 document.write
 */
function dw(str){
	document.write(str);
}


/**
 * 익스플로러 패치에 따른 플래시 스크립로 write 처리
 * (플래시주소,넓이,높이,넘겨받은값,아이디,이름,배경색)
 */
function flashWrite(fSrc,sWidth,sHeight,fVars,fId,fName,fBgcolor){
	var strFlash = "";
	strFlash ='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0"';
	strFlash += ' id="'+fId+'" name="'+fName+'"';
	strFlash += ' width="'+sWidth+'" height="'+sHeight+'">';
	strFlash += '<param name=flashVars value="'+fVars+'">';
	strFlash += '<param name="movie" value="'+fSrc+'">';
	strFlash += '<param name="wmode" value="transparent">';
	strFlash += '<param name=bgcolor value="'+fBgcolor+'">';
	strFlash += '<param name="quality" value="high">';
	strFlash += '<param name="menu" value="false">';
	strFlash += '<embed src="'+fSrc+'" quality="high" swLiveConnect=true pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash"';
	strFlash += ' id="'+fId+'" name="'+fName+'"';
	strFlash += ' width="'+sWidth+'" height="'+sHeight+'">';
	strFlash += '</embed></object>';
	document.write(strFlash);
}


/**
 * 폼안에 있는 값들을 인코딩해서 리턴한다.
 * 예) formData2QueryString(document.pageForm)
 * 리턴) gotoPage=3&col=1&search=
 */
function formData2QueryString(docForm) {
	var submitContent = '';
	var formElem;
	var lastElemName = '';
	for (var i = 0, len = docForm.elements.length; i < len; i++) {

		formElem = docForm.elements[i];

		switch (formElem.type) {
			// Text fields, hidden form elements
			case 'text':
			case 'hidden':
			case 'password':
			case 'textarea':
			case 'select-one':
				submitContent += formElem.name + '=' + escape(formElem.value) + '&';
				break;

			// Radio buttons
			case 'radio':
				if (formElem.checked) {
					submitContent += formElem.name + '=' + escape(formElem.value) + '&';
				}
				break;

			// Checkboxes
			case 'checkbox':
				if (formElem.checked) {
					// Continuing multiple, same-name checkboxes
					if (formElem.name == lastElemName) {
						// Strip of end ampersand if there is one
						if (submitContent.lastIndexOf('&') == submitContent.length-1) {
							submitContent = submitContent.substr(0, submitContent.length - 1);
						}
						// Append value as comma-delimited string
						submitContent += ',' + escape(formElem.value);
					}else {
						submitContent += formElem.name + '=' + escape(formElem.value);
					}
					submitContent += '&';
					lastElemName = formElem.name;
				}
			break;
		}
	}

	// Remove trailing separator
	submitContent = submitContent.substr(0, submitContent.length - 1);
	return submitContent;
}


/**
 * 함수 : window_center(넓이,높이)
 * 목적 : 예약창의 사이즈 조절
 * 방법 : window_center (넓이,높이)
 *         예) window_center(100,100)
 */
function window_center(w, h) {
	var width=screen.width;
	var height=screen.height;
	var x=(width/2)-(w/2);
	var y=(height/2)-(h/2);
	window.resizeTo(w,h);
	window.moveTo(x,y);
}


function getWeekEnd(str){
	var weekInfo = new Array('Sun','Mon','Tue','Wed','Thu','Fri','Sat');
	var d = toTimeObject(str);
	var day=d.getDay();
	return weekInfo[day];
}


function lastday(calyear, calmonth){
	var monthDays = new Array(31, 28, 31, 30, 31, 30, 31, 31,30, 31, 30, 31);
	if (((calyear % 4 == 0) && (calyear % 100 != 0)) || (calyear % 400 == 0)){
		monthDays[1] = 29;
	}
	var nDays = monthDays[calmonth - 1];
	return nDays;
}


function toTimeObject(time){
	var year = time.substr(0,4);
	var month = time.substr(4,2)-1;
	var day = time.substr(6,2);
	return new Date(year,month,day);
}


function GetSelectedVal(objSelect){
	var selectedval="";
	for(var i=0, len=objSelect.options.length; i<len; i++){
		if(objSelect.options[i].selected==true){
			selectedval = objSelect.options[i].value;
			break;
		}
	}
	return selectedval;
}


function GetSelectedTxt(objSelect){
    var selectedtext = "";
    for(var i=0, len=objSelect.options.length; i<len; i++){
    	if(objSelect.options[i].selected==true){
            selectedtext= objSelect.options[i].text;
            break;
        }
    }
    return selectedtext;
}


function allblur(){
	for (var i=0, len=document.links.length; i < len; i++) {
		var obj = document.links[i];
		if(obj.addEventListener){
			obj.addEventListener("focus", oneblur, false);
		}else if(obj.attachEvent){
			obj.attachEvent("onfocus", oneblur);
		}
	}
}


function oneblur(e) {
	var evt = e ? e : window.event;
	if(evt.target){
		evt.target.blur();
	}else if(evt.srcElement){
		evt.srcElement.blur();
	}
}


/**
 * Source Select의 요소(option)를 Target Select로 이동한다.
 * @author neoburi@nowonplay.com, 2005.12.27
 */
function moveElement(sourceObj, targetObj, isSort){
	var elms = sourceObj.options;
	for(var i = 0, k = elms.length; i < k; i++){
		if( elms[i].selected ){
			targetObj.add(new Option(elms[i].text, elms[i].value, false, false));
		}
	}
	removeElement(sourceObj);
	sourceObj.selectedIndex = -1;
}


/**
 * Source Select의 요소(option)를 제거한다.
 * @author neoburi@nowonplay.com, 2005.12.27
 */
function removeElement(sourceObj){
	var elms = sourceObj.options;
	var posArr = new Array();
	var increase = 0;
	for(var i = 0, k = elms.length; i < k; i++ ){
		if( elms[i].selected ){
			posArr[increase++] = elms[i].value;
		}
	}
	for(var i = 0, k = posArr.length; i < k; i++ ){
		for( x = 0, y = elms.length; x < y; x++ ){
			if( (posArr[i] == elms[x].value) && elms[x].selected ){
				sourceObj.remove(x);
				x = 0;
				y--;
			}
		}
	}
}


/**
 * Source Select의 요소(option)의 상하순서를 바꾼다.
 * @author 아무게, 2005.12.27
 */
function move_option_in(src,to) {
	if(!src) return;
	var src_index = src.selectedIndex;
	if(src_index<0) return;
	if(to == "up"){
		if(src_index==-1||src_index==0) return;
		var tempoption = new Option(src.options[src_index].text, src.options[src_index].value);
		src.options[src_index] = new Option(src.options[src_index-1].text, src.options[src_index-1].value);
		src.options[src_index-1]=tempoption;
		src.options[src_index-1].selected=true;
	}
	else if(to == "down"){
		if(src_index>=src.options.length-1) return;
		var tempoption = new Option(src.options[src_index].text, src.options[src_index].value);
		src.options[src_index] = new Option(src.options[src_index+1].text, src.options[src_index+1].value);
		src.options[src_index+1]=tempoption;
		src.options[src_index+1].selected=true;
	}
}


/**
 * object의 Left Position을 리턴한다.
 */
function g_getLeftPos(obj) {
    var parentObj = null;
    var clientObj = obj;
    var left = obj.offsetLeft + document.body.clientLeft;
    while((parentObj=clientObj.offsetParent) != null){
        left = left + parentObj.offsetLeft;
        clientObj = parentObj;
    }
    return left;
}


/**
 * object의 Top Position을 리턴한다.
 */
function g_getTopPos(obj) {
    var parentObj = null;
    var clientObj = obj;
    var top = obj.offsetTop + document.body.clientTop;

    while((parentObj=clientObj.offsetParent) != null){
        top = top + parentObj.offsetTop;
        clientObj = parentObj;
    }
    return top;
}


/**
 * 코드값을 읽어온다
 */
function g_getValue(obj) {
	if (typeof obj != "object") return null;
	if (select == null) return null;
  	return obj.options[obj.selectedIndex].value;
}


/**
 * objVal값 form file value 'C:\My Documents\My Pictures\감자도리\xxxx.jpg'
 * limitExt값 'jpg|gif|png|bmp'
 * 확장자가 해당하는 확장자가 아닐경우 리턴 false
 */
function fileExtCheck(objVal,limitExt){
	var val=objVal.toLowerCase();
	if(!val){
		return false;
	}
	var fileExt = val.substr(val.lastIndexOf('.') + 1,val.length);
	if(limitExt.indexOf(fileExt) == -1){
	    return false;
	}
	return true;
}


function n2c(num) {
	return (parseInt(num) < 10 && num.length < 2) ? "0" + num : "" + num;
}


function isNextChar(str, pos) {
	var code1 = str.charAt(pos).charCodeAt(0);
	var code2 = str.charAt(pos + 1).charCodeAt(0);
	return (code1 == (code2 - 1)) ? true : false;
}


function isPreviousChar(str, pos) {
	var code1 = str.charAt(pos).charCodeAt(0);
	var code2 = str.charAt(pos + 1).charCodeAt(0);
	return (code1 == (code2 + 1)) ? true : false;
}


function isContainSequentialString(str) {
	for (var i = 0; i < str.length - 3; i++) {
		if ((isNextChar(str, i) && isNextChar(str, i+1) && isNextChar(str, i+2)) ||
            (isPreviousChar(str, i) && isPreviousChar(str, i+1) && isPreviousChar(str, i+2))){
			return true;
		}
	}
	return false;
}


function isContains(source, search){
	return source.search(search) != -1 ? true : false;
}


/**
 * 파일업로드시 actionUrl을 리턴해준다
 * 예) http://aa.bb.co.kr/aaaa/bbb/ab.jsp 인경우
 * /aaaa/bbb 리턴
 */
function getActionUrl() {
    var url = location.href;
	var urlArr = (url).split("/");
	url = "";
	for(var i=3; i<urlArr.length-1; i++) {
		url += "/" + urlArr[i];
	}
	return url;
}


/**
 * 설명 : 입력한 email이 영문자와 @값이 정확이 들어가 있는지
 * 예) checkEmail("test@test.co.kr")
 * 결과) true
 * 리턴 : 이메일이 맞다면  True , 틀리다면 false
 */
function checkEmail(email){
	var str='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
	var flag=0;
	var comma=0;
	for(var i=0; i<email.length; i++) {
		for(var j=0; j<str.length; j++) {
			if(email.charAt(i)==str.charAt(j)){
				break;
			}
		}
		if(j==str.length) {
			if(email.charAt(i)=='@'){
				flag++;
			}else if(email.charAt(i)=='.'){
				comma++;
			}else{
				return false;
			}
		}
	}
	if(flag!=1){
		return false;
	}else if((comma<1)||(comma>3)){
		return false;
	}else{
		return true;
	}
}


function check_email(str){
    var regDoNot = /(@.*@)|(\.\.)|(@\.)|(\.@)|(^\.)/;
    var regMust = /^[a-zA-Z0-9\-\.\_]+\@[a-zA-Z0-9\-\.]+\.([a-zA-Z]{2,3})$/;
    return (!regDoNot.test(str) && regMust.test(str)) ? true : false;
}


/**
 * AUTO TAB
 */
function autoTab(input, len, e) {
	var isNN = (navigator.appName.indexOf("Netscape")!=-1);
	var keyCode = (isNN) ? e.which : e.keyCode;
	var filter = (isNN) ? [0,8,9] : [0,8,9,16,17,18,37,38,39,40,46];
	if(input.value.length >= len && !containsElement(filter,keyCode)) {
		input.value = input.value.slice(0, len);
		input.form[(getIndex(input)+1) % input.form.length].focus();
	}
	function containsElement(arr, ele) {
		var found = false, index = 0;
		while(!found && index < arr.length)
		if(arr[index] == ele)
		found = true;
		else
		index++;
		return found;
	}
	function getIndex(input) {
		var index = -1, i = 0;
		while (i < input.form.length && index == -1)
		if (input.form[i] == input)index = i;
		else i++;
		return index;
	}
	return true;
}


/**
 * 문자열을 byte 수만큰 자른다.
 * str : 문자열
 * maxLen : 바이트 최대수
 */
var strCutByte = function(str, maxLen){
	var ret='';
   	var msglen=0;
   	for(var i=0, len=str.length; i<len; i++){
    	var ch=str.charAt(i);
      	if(escape(ch).length >4){
      		msglen += 2;
      	}else{
      		msglen++;
      	}
        if(msglen > maxLen) break;
      	ret += ch;
   }
   return ret;
};


function OnlyNumber2(){
	var key = event.keyCode;
	if(!(key==8||key==9||key==13||key==46||key==144||(key>=48&&key<=57)||key==110||key==190)){
		event.returnValue = false;
	}
}


/**
 * 플래시 출력
 */
function flashAM(URL,width,height,vars,bgColor,winmode) {
	var id=URL.split("/")[URL.split("/").length-1].split(".")[0];
	var flashHtml = "";
	if(vars==null) vars='';
	if(bgColor==null) bgColor='#FFFFFF';
	if(winmode==null) winmode='opaque';

	flashHtml += "<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0' ";
	flashHtml += "width='"+width+"' height='"+height+"' id='"+id+"' align='middle'> ";
	flashHtml += "	<param name='allowScriptAccess' value='sameDomain' /> ";
	flashHtml += "	<param name='movie'	value='"+URL+"' /> ";
	flashHtml += "	<param name='FlashVars'	Value='"+vars+"' /> ";
	flashHtml += "	<param name='wmode'	value='"+winmode+"' /> ";
	flashHtml += "	<param name='menu' value='false' /> ";
	flashHtml += "	<param name='quality' value='high' /> ";
	flashHtml += "	<param name='bgcolor' value='"+bgColor+"' /> ";
	flashHtml += "	<embed src='"+URL+"' flashVars='"+vars+"' wmode='"+winmode+"' menu='false' quality='high' ";
	flashHtml += "		bgcolor='"+bgColor+"' width='"+width+"' height='"+height+"' name='"+id+"' align='middle' ";
	flashHtml += "		allowScriptAccess='sameDomain' type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/go/getflashplayer' /> ";
	flashHtml += "</object> ";
	document.write(flashHtml);
}


/**
 * 자리수에 맞게 숫자 리턴
 * 	ex) addZero(3, 1) return "001"
 * @param digit 자리수
 * @param num 숫자
 */
function addDigitZero(digit, num){
	var numLen = num+"".length;
	var convertNum = "";
	for(var i=0, len=(digit-numLen); i<len; i++){
		convertNum += "0";
	}
	return convertNum+""+num;
}


/**
 * 년/월/일에 해당하는 시작 날짜와, 마지막 날짜를 조회한다.
 * 	ex) monthOfEndDay('20130213','.') return {startDt:"2013.02.01", endDt:"2013.02.28'}
 * @param day 날짜
 * @param div 날짜 포멧
 */
function monthOfEndDay(day, div){
	var dayInfo = day.split(div);
	var year = dayInfo[0];
	var month = dayInfo[1];
	var day = dayInfo[2];
	var date = new Date(year, month, day);
	date.setDate(0);
	var startDt = year + div + month + div + "01";
	var endDt = date.getFullYear() + div + addDigitZero(2,date.getMonth()+1) + div + addDigitZero(2,date.getDate());
	return {
		startDt : startDt,
		endDt : endDt
	};
}

/**
 * 시간 변경
 * @param delimiter
 * @param dt
 */
function timeInfo(delimiter, dt) {
	var result = dt;

	if (result.length != 4) {
		return result;

	} else {
		var ampm = "오전";
		var hour = dt.substring(0, 2);
		var minutes = dt.substring(2, 4);

		if (hour > 12) {
			ampm = "오후";
			hour = hour - 12;
		} else {
			hour = hour - 0;
		}

		if (hour < 10) {
			hour = "0" + hour;
		}

		result = ampm + " " + hour + delimiter + minutes;
	}

	return result;
}

/**
 * 숫자만 입력
 * @param e
 * @returns
 */
var onlyNumber = function(e) {
	var eKey;
	if(e.which) {
		eKey = e.which;
	} else if(event.event) {
		eKey = e.keyCode;
	}

	if ((eKey < 48 || eKey > 57) && eKey != 8) {
		e.preventDefault();
	}
};

/**
 * 폼이 유효한지 체크
 * @param e
 * @returns
 */
function validFormCheck(txt, msg) {
	if (txt.val().isBlank()) {
		alert(msg);
		txt.focus();
		return false;
	} else {
		return true;
	}
}

/**
 * 숫자만 입력
 * @param evt
 * @returns
 */
function digit_check(evt){
    var code = evt.which?evt.which:event.keyCode;
    if(code < 48 || code > 57){
    	return false;
    }
}

/**
 * 팝업창 띄우기
 */
function windowOpen(url, title, width, height, top, left) {
	window.open(url, title, "width=" + width + ", height=" + height + ", top=" + top + ", left=" + left + ", toolbar_no, location=no, status=no, menubar=no, scrollbars=no, resizable=no");
};

/**
 * 만 14세 체크
 */
var member = {
	check14 : function (yyyymmdd){
		var today = this.get_today();
		var result    = today - parseInt(yyyymmdd) - 140000;
		return result;//if(result < 0) less than 14
	},
    get_today : function (){
		now = new Date();
		year = now.getFullYear();
		month = now.getMonth()+1;
		day = now.getDate();
		if(month < 10) month = "0"+month;
		if(day < 10) day = "0"+day;
		return year+''+month+''+day;
    }
};