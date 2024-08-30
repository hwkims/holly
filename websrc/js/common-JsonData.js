/**
 * @need jQuery
 * @need jQuery.cookie
 */

/**
 * Ajax 요청
 * 
 * @param ajaxOpt
 */
var callAjax = function callAjax(ajaxOpt) {
	var opt = $.extend({
		type : 'GET',
		url : '',
		cache : false,
		dataType : "json",
		data : {}
	}, ajaxOpt);

	$.ajax(opt);
};

/**
 * sync getJSON Ajax 요청
 * 
 * @param ajaxOpt
 */
var getSyncJSON = function getSyncJSON(ajaxOpt) {
	var resultData = {};
	var opt = $.extend({
		type : 'GET',
		url : '',
		cache : false,
		dataType : "json",
		data : {}
	}, ajaxOpt);
	
	// sync 설정 
	opt.async = false;
	opt.error = function() {
		resultData = {
			status : 'fail'
		};
	};
	opt.success = function(data) {
		resultData = data;
	};

	$.ajax(opt);

	return resultData;
};

/**
 * sync getJSON Ajax 요청 dataType
 * 
 * @param ajaxOpt
 */
var getSyncJSONType = function getSyncJSONType(ajaxOpt, dataType) {
	var resultData = {};
	var opt = $.extend({
		type : 'GET',
		url : '',
		cache : false,
		dataType : dataType,
		mimeType : 'text/html',
		data : {}
	}, ajaxOpt);
	
	// sync 설정 
	opt.async = false;
	opt.error = function() {
		resultData = {
			status : 'fail'
		};
	};
	opt.success = function(data) {
		resultData = data;
	};

	$.ajax(opt);

	return resultData;
};