(function(win, doc, undefined) {

	var hex  = doc.getElementById('hex');
	var rgb  = doc.getElementById('rgb');
	var sub  = doc.getElementById('submit');
	var body = doc.getElementsByTagName('body')[0];

	sub.onclick        = getResult;
	document.onkeydown = keyDownSearch;

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

				result    = 'rgb(' + result + ')'; 
				rgb.value = result;
				
			} else if(rgbVal && rgbVal.match(/[Rr][Gg][Bb]\(\d+,\d+,\d+\)/)){

				rgbVal    = rgbVal.replace(/rgb/, '').replace(/\(/, '').replace(/\)/, '').split(',');
				hex.value = '';

				rgbVal[0] = parseInt(rgbVal[0], 10).toString(16).length == 2 ? parseInt(rgbVal[0], 10).toString(16) : '0' + parseInt(rgbVal[0], 10).toString(16);
				rgbVal[1] = parseInt(rgbVal[1], 10).toString(16).length == 2 ? parseInt(rgbVal[1], 10).toString(16) : '0' + parseInt(rgbVal[1], 10).toString(16);
				rgbVal[2] = parseInt(rgbVal[2], 10).toString(16).length == 2 ? parseInt(rgbVal[2], 10).toString(16) : '0' + parseInt(rgbVal[2], 10).toString(16);

				result    = '#' + rgbVal[0] + rgbVal[1] + rgbVal[2];
				hex.value = result;
				
			} else {

				alert('Wrong Format');
				if(hexVal)
					rgb.value = '';
				if(rgbVal)
					hex.value = '';
				return;
			}
		}

		console.log(hexVal + '-' + rgbVal + '-'  + result);
		body.style.background = result;

	};

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