webpackJsonp([6],{

/***/ 1:
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),

/***/ 164:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(165), __esModule: true };

/***/ }),

/***/ 165:
/***/ (function(module, exports, __webpack_require__) {

var core  = __webpack_require__(1)
  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};

/***/ }),

/***/ 425:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _stringify = __webpack_require__(164);

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function (window) {

	var count = 0;

	//判断离底部的距离

	function check_bottom() {
		var currentPosition = document.documentElement.clientHeight + (document.documentElement.scrollTop || document.body.scrollTop);
		if (document.documentElement.scrollHeight <= currentPosition) {
			return true;
		} else {
			return false;
		}
	}

	//DOM操作
	function insertPageToDom(data) {

		var jsonArray = JSON.parse(data);
		var divElement = document.createElement('div');
		var ulElement = document.createElement('ul');
		jsonArray.forEach(function (obj) {
			var liElement = document.createElement("li");

			var user = obj.user[0];

			var userimg = user.userimg ? user.userimg : 'http://127.0.0.1:3000/images/common.jpg'; //头像
			var date_of_pub = (obj.date_of_pub ? new Date(obj.date_of_pub) : new Date()).toLocaleDateString().replace(/\//g, '-'); //日期
			var username = user.username ? user.username : ''; //作者名
			var title = obj.title ? obj.title : ''; //标题
			var content = obj.content ? obj.content.substring(0, 100) : ''; //简介
			var articleId = obj.article_id; //文章id
			var likeers = obj.be_like ? obj.be_like : 0; //喜欢人数
			var followers = obj.followers ? obj.followers : 0; //收藏人数
			var browse = obj.browse ? obj.browse : 0; //浏览人数


			liElement.innerHTML = '\n\t\t\t<div>\n\t\t\t\t<img src="' + userimg + '"/>\n\t\t\t\t<div>\n\t\t\t\t\t<span>' + date_of_pub + '</span>\n\t\t\t\t\t<span>' + username + '</span>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div>\n\t\t\t\t<a href="articleHandle/articleIndex/' + articleId + '">' + title + '</a>\n\t\t\t</div>\n\t\t\t<div>\n\t\t\t\t' + content + '\n\t\t\t</div>\n\t\t\t<div>\n\t\t\t\t<span class="iconfont_love"><a></a></span><span>' + browse + '</span>\n\t\t\t\t<span class="iconfont_browse"><a></a></span><span>' + likeers + '</span>\n\t\t\t\t<span class="iconfont_collection"><a></a></span><span>' + followers + '</span>\n\t\t\t</div>\n\t\t\t';

			ulElement.append(liElement);
		});

		divElement.append(ulElement);
		var fragment = document.createDocumentFragment();
		fragment.appendChild(divElement);
		var container = document.querySelector('.middle_div_container');
		container.append(fragment);
	}

	//ajax请求事件
	function ajax_request_pages(position) {
		var xhr;

		if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			try {
				xhr = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e) {
				try {
					xhr = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e) {}
			}
		}

		if (!xhr) {
			alert("your browser did'nt suppport ajax");
			return false;
		}

		xhr.open("POST", 'http://localhost:3000/index/page', true);

		//设置请求头
		xhr.setRequestHeader("Content-Type", "application/json");

		xhr.send((0, _stringify2.default)({ "position": position }));
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					insertPageToDom(xhr.responseText);
				}
			}
		};
	}

	window.onload = function () {
		//在首次文档加载完成后调用事件
		ajax_request_pages(count++);
	};

	//事件监听实现懒加载
	document.addEventListener('scroll', function () {
		if (check_bottom()) {
			ajax_request_pages(count * 20);
			count++;
		}
	});
})(window);

/***/ })

},[425]);