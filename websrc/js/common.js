
// 사이트 메인 Facebook API 로드
var loadFacebook = function() {
	setTimeout("facebookCon()", 500); //loading
};

// 사이트 메인 Facebook API 호출
var facebookCon = function() {
	var at = "";

	//AccessToken 조회
	var frmData = {
		"client_id": "663837666966669"
		, "client_secret": "6cf25b971112958da47c38ad23415b1d"
		, "grant_type": "client_credentials"
	};

	var ajaxOpt = {
		url : "https://graph.facebook.com/oauth/access_token"
		, data : frmData
	};

	//var resData = getSyncJSONType(ajaxOpt, "text");

	//Data 조회
	//if (resData != null && resData != '') {
		var ajaxOpt = {
			url : "https://graph.facebook.com/EnjoyHollys/feed?limit=5&" + resData
		};

		var resData = $.ajax({
    		type: 'GET',
    		url: 'https://graph.facebook.com/EnjoyHollys/feed?limit=5&access_token=663837666966669|0K-TiK4JRmyK1LaAd6axdG3lN3I',
    		cache: false,
    		dataType: "jsonp",
    		error: function(){
    		},
    		success: function(resData){
    			var _fhtml = '';
    			var loop = 0;
    			if (resData && resData.data) {
    				for (var i=0; i<resData.data.length; i++) {
    					if (loop < 4) {
    						if (resData.data[i].message != '') {
    							_fhtml += getFHtml(resData.data[i], loop);
    							loop = loop + 1;
    						}
    					}
    				}
    			}

    			if (_fhtml != "") {
    				$("#sns_list").html(_fhtml);
    			}
    		}
		});
	//}
};

// 사이트 메인 Facebook API 결과 구성
var getFHtml = function(fd, i) {
	var _html = '';
	var fd_message = fd.message;
	//페이지 링크
	var fd_link = fd.id.split('_');
	var fd_url = "https://www.facebook.com/EnjoyHollys/posts/" + fd_link[1];
	if (fd_message != null && fd_message != undefined && fd_message != '') {
		fd_message = fd_message.replace(/[\n\r]/g, ' ');
	} else {
		fd_message = '';
	}

	if (i < 3) {
		_html += '		<div class="sns_list">';
	} else {
		_html += '		<div class="sns_list mar_none">';
	}

	_html += '			<p class="sns_Img">';

	if (fd.picture != undefined && fd.picture != '') {
		_html += '				<img src="' + fd.picture + '" alt="" width="48" height="48" />';
	} else {
		_html += '				<img src="/websrc/images/48_48.png" alt="" width="48" height="48" />';
	}

	_html += '			</p>';
	_html += '			<ul>';
	_html += '				<li><span class="stit">' + fd.created_time.substring(0, 16).replace("T", " ") + '</span></li>';
	_html += '				<li><a href="' + fd_url + '" target="_blank" >' + fd_message + '</a></li>';
	_html += '			</ul>';
	_html += '		</div>';

	return _html;
};

//오브젝트 보이기/숨기기
var ObjectShow = function(mode){
	var target,
		set,
		speed,
		mode;

	this.showToggle = function (){
		switch(mode){
			case "slide" :
				if(set == true) target.stop().slideDown({duration:speed});
				else target.stop().slideUp({duration:speed});
			break;

			case "fade" :
				if(set == true) target.stop().fadeIn({duration:speed});
				else target.stop().fadeOut({duration:speed});
			break;

			case "alpha" :
				if(set == true) target.stop().animate({'opacity':1}, speed);
				else target.stop().animate({'opacity':0}, speed);

			default :
				if(set == true) target.stop().show({duration:speed});
				else target.stop().hide({duration:speed});
		}
	};

	this.initialize = function(info){
		target = info.target;
		set = info.isShow;
		speed = info.speed;
	} ;
}

//페이지  보기
var PageView = function(pageList, pageNum, formList){
	var pageList,
		pageNum,
		formList;

	pageList = pageList;
	pageNum = pageNum;
	formList = formList;

    this.getPage = function(){return pageNum;};
    this.setPage = function(num){pageNum = num;};

	this.pageOn = function(){
		for(var i = 0, max = pageList.length; i < max; ++i){
			pageList[i].css('display', 'none');
		}
		pageList[pageNum].css('display', 'block');
	};

	this.resetForm = function(){
		for(var i = 0, max = formList.length; i < max; ++i){
		}
	};
} ;

//탭 제어
var TabControl = function(tabList, id){
	var tabList, id;

    this.getId = function(){return id;};
    this.setId = function(num){id = num;};

	this.tabOn = function(){
		for(var i = 0, max = tabList.length; i < max; ++i){
			tabList[i].removeClass('on');
		}
		tabList[id].addClass('on');
	};
};

//xml 로더
var XmlLoader = function(){
	var url, type, info, callback;

	this.load = function(url, type, info, callback){
		url = url, type = type, info = info, callback = callback;

		$.ajax({
			url:url,
			type:type,
			data:info,
			dataType:'xml',
			success:function(data){
				callback(data);
			}
		});
	};
};

//갤러리
var GalleryController = function(prev, next, view, callback){
	var prev = prev, next = next, view = view,
	    imgList,
	    imgPath,
	    sumInfo;

	callback();

	this.initialize = function(info){
		imgList = info.imgList;
		imgPath = info.imgPath;
		sumInfo = info.sumInfo;

		init();
	};

	function init(){
		var sumWidth = sumInfo.w, height = sumInfo.h;

		//마스크 추가
		if(!$('li.maskSum').hasClass('maskSum')){
			next.after('<li class="maskSum"></li>');
		}
		var $maskSum =  $('li.maskSum');

		//썸네일 컨테이너 추가
		$maskSum.append('<div class="sumCon"></div>');
		$sumCon =  $('div.sumCon');

		//위치 설정
		$maskSum.css({'position':'relative', 'left':'-22px'/*, 'border':'solid 3px'*/, 'overflow':'hidden'});
		$sumCon.css({'position':'relative'/*, 'border':'solid 1px'*/});

		for(var i=0, max=imgList.length; i<max;++i){
			var img = imgPath + imgList[i].small;
			$sumCon.append('<li><a href="#"><img src=' + '"' + img + '"' + 'alt="" /></a></li>');
		}

		$maskSum.css({'width':(sumWidth + 8) * viewNum, 'height':height});
		var maskArea = {width:(sumWidth + 10) * imgList.length, height:height};
		$sumCon.css({'width':maskArea.width, 'height':maskArea.height});
		// log(view.html());
	}

	//이미지 선택
	this.selectImg = function(id, speed){
		var img = imgPath + imgList[id].big;

		view.find('img:eq(0)').replaceWith('<img src="'+ img +'" alt="" />');

		// view.hide();
		view.css('opacity', 0);
		//이미지 로드가 다 된 후에 처리
		view.find('img:eq(0)').load(function () {
			// view.show();
			view.css('opacity', 1);
		});

		//페이드 인/아웃 효과
		view.find('img:eq(0)').css('opacity', 0);
		view.find('img:eq(0)').animate({'opacity':1}, speed);
	};

	//썸네일 이동
	this.moveGroup = function(speed){
		$sumCon.stop().animate({'left':selectGroup * (108 + 10) * viewNum * -1}, {duration:speed});
	};
};

//브라우저 버전
var BrowserManager = function(){
	this.appName = function() {
		return navigator.appName;
	};

	this.appVersion = function() {
		return navigator.appVersion.charAt(0);
	};

	this.getAgent = function(){
		var agentList = ["MSIE 6", "MSIE 7", "MSIE 8", "MSIE 9", "MSIE 10", "Firefox", "Opera", "Netscape", "Chrome", "Safari"];

		for(var i=0, max=agentList.length; i<max; ++i){
			if(navigator.userAgent.indexOf(agentList[i]) > 0){
				return agentList[i];
			}
		}
	};

	//싱글톤
	if(typeof BrowserManager.instance === "object"){
		return BrowserManager.instance;
	}
	BrowserManager.instance = this;
};

//폼 값 비우기
function resetForms(formList){
	for(var i=0, max=formList.length;i<max;++i){
		formList[i].val('');
	}
}

//두자리
function digit(num){
	if(num < 10){
		return "0" + num;
	}else{
		return num;
	}
}

//src 설정
function setSrc(selector, path, callback){
	// selector.css('opacity', 0);
	selector.attr('src', path);

	selector.load(function(e){
		// $(e.target).css('opacity', 1);

		if(callback !== undefined){
			callback();
		}
	});
}

// 폼값 체크
function validFormCheck(txt, msg) {
	if (txt.val().isBlank()) {
		alert(msg);
		txt.focus();
		return false;
	} else {
		return true;
	}
}

// 이메일 체크
function validateEmail(email) {
	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	if (!emailReg.test(email)) {
		return false;
	} else {
		return true;
	}
}

//아이디 규칙
function validateId(str, message){

	var num = str.search(/[0-9]/g);
	var eng = str.search(/[a-z]/ig);
	var spe = str.search(/[`~!@@#$%^&*|\\\'\";:\/?]/gi);
	var idReg = /^[a-z0-9]{6,12}/g;

	if (str.length < 6 || str.length > 12) {
		return false;
	}

	if (idReg.test(str) == false) {
		return false;
	}

	if (num < 0 || eng < 0) {
		return false;
	}

	if (spe > 0) {
		return false;
	}

	return true;
}

//비밀번호 규칙
function validatePwd(str, message){

	var num = str.search(/[0-9]/g);
	var eng = str.search(/[a-z]/ig);
	var spe = str.search(/[`~!@@#$%^&*|\\\'\";:\/?]/gi);

	if (str.length < 4 || str.length > 20) {
		return false;
	}

	if (num < 0 && eng < 0 && spe < 0 ) {
		return false;
	}

	return true;
}

// 휴대폰 체크
function phoneCheck(value) {
	var checkNumber = new Array("0000000", "00000000", "1111111", "11111111", "2222222", "22222222", "3333333", "33333333", "4444444", "44444444", "5555555", "55555555", "6666666", "66666666", "7777777", "77777777", "8888888", "88888888", "9999999", "99999999", "12341234", "12345678");

	for (var i=0; i<checkNumber.length; i++) {
		if (checkNumber[i] == value)
			return false;
	}

	return true;
}

// 연속된 문자/숫자 체크
function continuityCheck(value) {

	var patt_num4 = /(\w)\1\1\1/; // 같은 영문자&숫자 연속 4번 정규식
	var patt_num = /(0123)|(1234)|(2345)|(3456)|(4567)|(5678)|(6789)|(7890)/; // 연속된 숫자 정규식
//	var patt_text = /(abcd)|(bcde)|(cdef)|(defg)|(efgh)|(fghi)|(ghij)|(hijk)|(ijkl)|(jklm)|(klmn)|(lmno)|(mnop)|(nopq)|(opqr)|(pqrs)|(qrst)|(rstu)|(stuv)|(tuvw)|(uvwx)|(vwxy)|(wxyz)/; // 연속된 문자

	var input = value.trim();

	if (patt_num.test(value)) {
		return false;
	}

//	if (patt_text.test(value)) {
//		return false;
//	}

	return true;
}

// 쿠키 생성
function setUserCookie(cName, cValue, cDay){
	var expire = new Date();
	expire.setDate(expire.getDate() + cDay);
	cookies = cName + '=' + escape(cValue) + '; path=/ '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
	if (typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
	document.cookie = cookies;
}

// 쿠키 조회
function getUserCookie(cName) {
	cName = cName + '=';
	var cookieData = document.cookie;
	var start = cookieData.indexOf(cName);
	var cValue = '';
	if (start != -1) {
		start += cName.length;
		var end = cookieData.indexOf(';', start);
		if (end == -1)end = cookieData.length;
		cValue = cookieData.substring(start, end);
	}
	return unescape(cValue);
}

// 비밀번호 변경 권장
var pwExtend = function() {

	jQuery.ajax({
		url : "/member/pwExtendAjax.do",
		async: false,
		dataType: 'html',
		success : function(data) {
			//console.log("[" + data + "]");
			if (!data.trim()) {
				alert('잘못된 접근입니다.');
			} else {
				$('#popup_common').html(data).css('width','646px');
				popupControl(true);
			}
		}
	});
}

var popupControl = function(gubun) {

	var $popup = $('#popup_common');
	var $dimm = $('#popup_dimm');

	if (gubun) {
		var c_width = $popup.width() / 2 ,
			c_height = $popup.height() / 2;

		$popup.css({
			"margin-top" : - c_height ,
			"margin-left": - c_width
		}).addClass('on');
		$dimm.addClass('on');
	} else {
		$popup.removeClass('on');
		$dimm.removeClass('on');
	}
}

//중복 클릭 방지
var doubleClickFlag = false;
function doubleClickCheck(){
    if(doubleClickFlag){
        return doubleClickFlag;
    }else{
    	doubleClickFlag = true;
        return false;
    }
}

function passwordCheck(value) {
	var regex = /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*?_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*?_+=]{8,}$/;
	var koreanRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
	var continuousRegex = /(\w)\1\1/;
	var blankRegex = /\s/;

	// 숫자, 특수문자, 영문 대/소문자 조합 + 8자리 이상 검증
	if (!regex.test(value)) {
		console.log("[실패] 숫자, 특수문자, 영문 대/소문자 조합 + 8자리 이상 검증");
		return false;
	}

	// 한글 포함여부 검증
	if (koreanRegex.test(value)) {
		console.log("[실패] 한글 포함여부 검증");
		return false;
	}

	// 동일문자 연속 3자리 포함여부 검증
	if (continuousRegex.test(value)) {
		console.log("[실패] 동일문자 연속 3자리 포함여부 검증");
		return false;
	}

	// 공백 포함여부 검증
	if (blankRegex.test(value)) {
		console.log("[실패] 공백 포함여부 검증");
		return false;
	}

	// 키보드 배열상 연속된 3자 이상의 문자가가 포함되지 않았는지 검증
	var engLayout = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
	var layout = ["1234567890", ...engLayout, ...engLayout.map(v => v.toUpperCase())];

	for (let i = 0; i < value.length-2; i++) {
		var chkString = value.substring(i, i + 3);

		if (layout.some(code => code.includes(chkString))) {
			console.log("[실패] 키보드 배열상 연속된 3자 이상의 문자가가 포함되지 않았는지 검증");
			return false;
		}
	}

	return true;
}
