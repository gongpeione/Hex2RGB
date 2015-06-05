(function(win, doc, undefined) {

	var hex  = doc.getElementById('hex');
	var rgb  = doc.getElementById('rgb');
	var sub  = doc.getElementById('submit');
	var body = doc.getElementsByTagName('body')[0];
	
	body.onload        = init;
	sub.onclick        = getResult;
	document.onkeydown = keyDownSearch;

	function init() {

		var colorList = [];
		if(window.localStorage) {
			var local = window.localStorage;
			for(var i = 0; i < local.length; i++) {
				var localHex = local.key(i);
				if(!/hex\(\w+\)/.test(localHex)) {
					continue;
				}
				var localrgb = local.getItem(localHex);

				console.log(localHex + '/' + localrgb + "\n");
				colorList.push(localHex + '/' + localrgb);
			}
		}

		var windowWidth = document.body.clientWidth;
		var colorHtml   = '';
		var list = doc.getElementById('colorList');
		for(var i = 0; i < colorList.length; i++) {
			var colorHex = colorList[i].split('/')[0].replace("hex(", "#").replace(')', "");
			var colorRgb = colorList[i].split('/')[1];
			
			colorHtml += '<span class="item" style="width:' + windowWidth/colorList.length + 'px;background:' + colorHex + '"></span>';

			console.log(colorHex + colorRgb);
		}
		list.innerHTML = colorHtml;

		var lists = doc.getElementsByTagName('span');
		for (var i = lists.length - 1; i >= 0; i--) {
			if(lists[i].className == 'item') {
				console.log(lists[i].style.background);
				lists[i].onclick = function() {
					body.style.background = this.style.background;
					rgb.value = this.style.background;
					hexTemp   = rgb2hex(this.style.background);
					hex.value = '#' + hexTemp[0] + hexTemp[1] + hexTemp[2];
				};
			}
		};
		/*body.innerHTML += colorHtml;*/
	};

   	function getResult() {

		var hexVal = hex.value.trim();
		var rgbVal = rgb.value.trim();
		var result = '';

		if(!hexVal && !rgbVal) {

			alert('Hex or RGB cannot be empty');
			return;

		} else {

			if(hexVal && hexVal.match(/#[0-9a-zA-z]{3,6}/)) {

				hexVal    = hexVal.replace(/#/,'');
				rgb.value = '';

				result    = 'rgb(' + hex2rgb(hexVal) + ')'; 
				rgb.value = result;

				if(window.localStorage) {
					var local = window.localStorage;
					local.setItem('hex(' + hexVal + ')', result);
				}
				
			} else if(rgbVal && rgbVal.match(/[Rr][Gg][Bb]\(\d+,\d+,\d+\)/)){

				temp      = rgbVal;
				hex.value = '';

				rgbVal = rgb2hex(rgbVal);

				result    = '#' + rgbVal[0] + rgbVal[1] + rgbVal[2];
				hex.value = result;

				console.log(result + temp);
				if(window.localStorage) {
					var local = window.localStorage;
					local.setItem('hex(' + result.replace('#', '') + ')', temp);
				}
				
			} else {

				alert('Wrong Format');
				if(hexVal)
					rgb.value = '';
				if(rgbVal)
					hex.value = '';
				return;
			}
		}

		//console.log(hexVal + '-' + rgbVal + '-'  + result);
		body.style.background = result;

	}

	function hex2rgb(hexVal) {
		var result = '';
		switch(hexVal.length) {
			case 3: result = parseInt(hexVal[0] + '' + hexVal[0], 16) + ',' +
			                 parseInt(hexVal[1] + '' + hexVal[1], 16) + ',' +
			                 parseInt(hexVal[2] + '' + hexVal[2], 16); 
			        break;
			case 6: result = parseInt(hexVal[0] + '' + hexVal[1], 16) + ',' +
			                 parseInt(hexVal[2] + '' + hexVal[3], 16) + ',' +
			                 parseInt(hexVal[4] + '' + hexVal[5], 16); 
			        break;
			default: alert('Wrong Format'); return;
		}
		return result;
	}

	function rgb2hex(rgbVal) {

		rgbVal    = rgbVal.replace(/rgb/, '').replace(/\(/, '').replace(/\)/, '').split(',');
		rgbVal[0] = parseInt(rgbVal[0], 10).toString(16).length == 2 ? parseInt(rgbVal[0], 10).toString(16) : '0' + parseInt(rgbVal[0], 10).toString(16);
		rgbVal[1] = parseInt(rgbVal[1], 10).toString(16).length == 2 ? parseInt(rgbVal[1], 10).toString(16) : '0' + parseInt(rgbVal[1], 10).toString(16);
		rgbVal[2] = parseInt(rgbVal[2], 10).toString(16).length == 2 ? parseInt(rgbVal[2], 10).toString(16) : '0' + parseInt(rgbVal[2], 10).toString(16);

		return rgbVal;
	}

	function keyDownSearch(e) {    
        // 兼容FF和IE和Opera    
        var theEvent = e || window.event;    
        var code = theEvent.keyCode || theEvent.which || theEvent.charCode;    
        if (code == 13) {    
            getResult();//具体处理函数    
            return false;    
        }    
        return true;    
    }  

})(window,document,undefined);