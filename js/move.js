    // function move 开始
    var move = {
			imgSrc:[], //图片路径
			imgFile:[],//文件流
			imgName:[] //图片名字
			//选择图片
			// 函数闭包，让外部引入调用
		  imgUpload:function (obj) {
				var oInput = '#' + obj.inputId;
				var imgBox = '#' + obj.imgBox;
				var btn = '#' + obj.buttonId;
			$(oInput).on("change", ()=> {
				var fileImg = $(oInput)[0];
				var fileList = fileImg.files;
				for(var i = 0; i < fileList.length; i++) {
					var imgSrcI = getObjectURL(fileList[i]);
					this.imgName.push(fileList[i].name);
					this.imgSrc.push(imgSrcI);
					this.imgFile.push(fileList[i]);
				}
				addNewContent(imgBox0);
			})//change
			$(btn).on('click',()=> {
				if(!this.limitNum(obj.num)){
				  	alert("图片数量最多十个");
				  	return false;
				}
				else if(this.imgFile.length==0){
					alert('请选择图片！');
				}
				else if(this.imgFile.length>0&&this.limitNum(obj.num)){
					//用formDate对象上传
					var fd = new FormData($('.upBox')[0]);
					for(var i=0;i<this.imgFile.length;i++){
						fd.append(obj.data+"[]",this.imgFile[i]);
					}
					// console.log(fd);
					submitPicture(obj.upUrl, fd);
				}
				
			});//click
		}//return
		//图片展示
		addNewContent:function (obj) {
			$(imgBox0).html("");
			for(var a = 0; a < this.imgSrc.length; a++) {
				var oldBox = $(obj).html();
				$(obj).html(oldBox + '<div class="imgContainer"><img title=' + this.imgName[a] + ' alt=' + this.imgName[a] + ' src=' + this.imgSrc[a] + ' onclick="imgDisplay(this)"><p onclick="removeImg(this,' + a + ')" class="imgDelete">删除</p></div>');
			}
		}
		//删除
		removeImg:function (obj,index) {
			// 删除原来数组中的，并且返回被删除的项目
			this.imgSrc.splice(index,1);
			this.imgFile.splice(index,1);
			this.imgName.splice(index,1);
			// $('#imgBox0').find('.imgContainer').remove();
			var boxId = "#" + $(obj).parent('.imgContainer').parent().attr("id");
			addNewContent(boxId);
		}
		//限制图片个数
		limitNum:function (num){
			if(!num){
				return true;
			}else if(this.imgFile.length>num){
				return false;
			}else{
				return true;
			}
		}

		//上传(将文件流数组传到后台)
		submitPicture: submitPicture(url,data) {
		 //    for (var p of data) {
			//   	console.log(p);
			//   	// p就是文件流
			// }
			if(url&&data){
				$.ajax({
					type: "post",
					url: url,
					async: true,
					data: data,
					processData: false,
					contentType: false,
					success: function(dat) {
						alert(dat.msg);
						alert('你成功上传了'+this.imgFile.length+'张图片');
						$('#imgBox0').find('.imgContainer').remove();
						$('.goon0').html('继续上传');
						this.imgSrc = []; //图片路径
						this.imgFile = []; //文件流
						this.imgName = []; //图片名字
						console.log(dat.msg);
					},
					error:function(){
						alert('图片上传失败!');
						console.log(dat);
					}
				});
			}else{
			  alert('请打开控制台查看传递参数！');
			}
		}
		//图片灯箱
		imgDisplay:function (obj) {
			var src = $(obj).attr("src");
			var imgHtml = '<div style="width: 100%;height: 100vh;overflow: auto;background: rgba(0,0,0,0.5);text-align: center;position: fixed;top: 0;left: 0;z-index: 1000;"><img src=' + src + ' style="margin-top: 100px;width: 70%;margin-bottom: 100px;"/><p style="font-size: 50px;position: fixed;top: 30px;right: 30px;color: white;cursor: pointer;" onclick="closePicture(this)">×</p></div>'
			$('body').append(imgHtml);
		}

		//关闭
		closePicture:function (obj) {
			$(obj).parent("div").remove();
		}

		//图片预览路径
	getObjectURL:function (file) {
			var url = null;
			if(window.createObjectURL != undefined) { // basic
				url = window.createObjectURL(file);
			} else if(window.URL != undefined) { // mozilla(firefox)
				url = window.URL.createObjectURL(file);
			} else if(window.webkitURL != undefined) { // webkit or chrome
				url = window.webkitURL.createObjectURL(file);
			}
			return url;
		}
	}	//function move  结束
	//  function ad 开始
	// function ad(){
	// 		var imgSrc = []; //图片路径
	// 		var imgFile = []; //文件流
	// 		var imgName = []; //图片名字
	// 		//选择图片
	// 	return function(obj) {
	// 		var oInput = '#' + obj.inputId;
	// 		var imgBox = '#' + obj.imgBox;
	// 		var btn = '#' + obj.buttonId;

	// 		$(oInput).on("change", function() {
	// 			var fileImg = $(oInput)[0];
	// 			var fileList = fileImg.files;
	// 			for(var i = 0; i < fileList.length; i++) {
	// 				var imgSrcI = getObjectURL(fileList[i]);
	// 				imgName.push(fileList[i].name);
	// 				imgSrc.push(imgSrcI);
	// 				imgFile.push(fileList[i]);
	// 			}
	// 			addNewContent(imgBox1);
	// 		})//change

	// 		// 点击上传按钮
	// 		$(btn).on('click', function() {
	// 			if(!limitNum(obj.num)){
	// 			  	alert("图片数量最多十个");
	// 			  	return false;
	// 			}
	// 			else if(imgFile.length==0){
	// 				alert('请选择图片！');
	// 			}
	// 			else if(imgFile.length>0&&limitNum(obj.num)){
	// 				//用formDate对象上传
	// 				var fd = new FormData($('.upBox')[0]);
	// 				for(var i=0;i<imgFile.length;i++){
	// 					fd.append(obj.data+"[]",imgFile[i]);
	// 				}
	// 				// console.log(fd);
	// 				submitPicture(obj.upUrl, fd);
	// 			}
				
	// 		});//click
	// 	}// return

	// 	//图片展示
	// 	function addNewContent(obj) {
	// 		$(imgBox1).html("");
	// 		for(var a = 0; a < imgSrc.length; a++) {
	// 			var oldBox = $(obj).html();
	// 			$(obj).html(oldBox + '<div class="imgContainer"><img title=' + imgName[a] + ' alt=' + imgName[a] + ' src=' + imgSrc[a] + ' onclick="imgDisplay(this)"><p onclick="removeImg(this,' + a + ')" class="imgDelete">删除</p></div>');
	// 		}
	// 	}
	// 	//删除
	// 	function removeImg(obj,index) {
	// 		imgSrc.splice(index, 1);
	// 		imgFile.splice(index, 1);
	// 		imgName.splice(index, 1);
	// 		var boxId = "#" + $(obj).parent('.imgContainer').parent().attr("id");
	// 		addNewContent(boxId);
	// 	}

	// 	//限制图片个数
	// 	function limitNum(num){
	// 		if(!num){
	// 			return true;
	// 		}else if(imgFile.length>num){
	// 			return false;
	// 		}else{
	// 			return true;
	// 		}
	// 	}

	// 	//上传(将文件流数组传到后台)
	// 	// ajax开始
	// 	function submitPicture(url,data) {
	// 	 //    for (var p of data) {
	// 		//   	console.log(p);
	// 		//   	// p就是文件流
	// 		// }
	// 		if(url&&data){
	// 			$.ajax({
	// 				type: "post",
	// 				url: url,
	// 				async: true,
	// 				data: data,
	// 				processData: false,
	// 				contentType: false,
	// 				success: function(dat) {
	// 					alert(dat.msg);
	// 					alert('你成功上传了'+imgFile.length+'张图片');
	// 					$('#imgBox1').find('.imgContainer').remove();
	// 					$('.goon1').html('继续上传');
	// 					imgSrc = []; //图片路径
	// 					imgFile = []; //文件流
	// 					imgName = []; //图片名字
	// 					// console.log(dat.msg);
	// 				},
	// 				error:function(){
	// 					alert('图片上传失败!');
	// 					console.log(dat);
	// 				}
	// 			});
	// 		}else{
	// 		  alert('请打开控制台查看传递参数！');
	// 		}
	// 	}
	// 	// ajax结束

	// 	//图片灯箱
	// 	function imgDisplay(obj) {
	// 		var src = $(obj).attr("src");
	// 		var imgHtml = '<div style="width: 100%;height: 100vh;overflow: auto;background: rgba(0,0,0,0.5);text-align: center;position: fixed;top: 0;left: 0;z-index: 1000;"><img src=' + src + ' style="margin-top: 100px;width: 70%;margin-bottom: 100px;"/><p style="font-size: 50px;position: fixed;top: 30px;right: 30px;color: white;cursor: pointer;" onclick="closePicture(this)">×</p></div>'
	// 		$('body').append(imgHtml);
	// 	}

	// 	//关闭
	// 	function closePicture(obj) {
	// 		$(obj).parent("div").remove();
	// 	}

	// 	//图片预览路径
	// 	function getObjectURL(file) {
	// 		var url = null;
	// 		if(window.createObjectURL != undefined) { // basic
	// 			url = window.createObjectURL(file);
	// 		} else if(window.URL != undefined) { // mozilla(firefox)
	// 			url = window.URL.createObjectURL(file);
	// 		} else if(window.webkitURL != undefined) { // webkit or chrome
	// 			url = window.webkitURL.createObjectURL(file);
	// 		}
	// 		return url;
	// 	}
	// }

	// function activity(){
	// 		var imgSrc = []; //图片路径
	// 		var imgFile = []; //文件流
	// 		var imgName = []; //图片名字
	// 	//选择图片
	// 	return function(obj) {
	// 			var oInput = '#' + obj.inputId;
	// 			var imgBox = '#' + obj.imgBox;
	// 			var btn = '#' + obj.buttonId;

	// 			$(oInput).on("change", function() {
	// 				var fileImg = $(oInput)[0];
	// 				var fileList = fileImg.files;
	// 				for(var i = 0; i < fileList.length; i++) {
	// 					var imgSrcI = getObjectURL(fileList[i]);
	// 					imgName.push(fileList[i].name);
	// 					imgSrc.push(imgSrcI);
	// 					imgFile.push(fileList[i]);
	// 				}
	// 				addNewContent(imgBox2);
	// 			});//change

	// 			$(btn).on('click', function() {
	// 				if(!limitNum(obj.num)){
	// 				  	alert("图片数量最多十个");
	// 				  	return false;
	// 				}
	// 				else if(imgFile.length==0){
	// 					alert('请选择图片！');
	// 				}
	// 				else if(imgFile.length>0&&limitNum(obj.num)){
	// 					//用formDate对象上传
	// 					var fd = new FormData($('.upBox')[0]);
	// 					for(var i=0;i<imgFile.length;i++){
	// 						fd.append(obj.data+"[]",imgFile[i]);
	// 					}
	// 					// console.log(fd);
	// 					submitPicture(obj.upUrl, fd);
	// 				}
					
	// 			});//click
	// 	}//return 结束

	// 	//图片展示
	// 	function addNewContent(obj) {
	// 		$(imgBox2).html("");
	// 		for(var a = 0; a < imgSrc.length; a++) {
	// 			var oldBox = $(obj).html();
	// 			$(obj).html(oldBox + '<div class="imgContainer"><img title=' + imgName[a] + ' alt=' + imgName[a] + ' src=' + imgSrc[a] + ' onclick="imgDisplay(this)"><p onclick="removeImg(this,' + a + ')" class="imgDelete">删除</p></div>');
	// 		}
	// 	}

	// 	//删除
	// 	function removeImg(obj,index) {
	// 		imgSrc.splice(index, 1);
	// 		imgFile.splice(index, 1);
	// 		imgName.splice(index, 1);
	// 		var boxId = "#" + $(obj).parent('.imgContainer').parent().attr("id");
	// 		addNewContent(boxId);
	// 	}
	// 	//限制图片个数
	// 	function limitNum(num){
	// 		if(!num){
	// 			return true;
	// 		}else if(imgFile.length>num){
	// 			return false;
	// 		}else{
	// 			return true;
	// 		}
	// 	}

	// 	//上传(将文件流数组传到后台)
	// 	function submitPicture(url,data) {
	// 	 //    for (var p of data) {
	// 		//   	console.log(p);
	// 		//   	// p就是文件流
	// 		// }
	// 		if(url&&data){
	// 			$.ajax({
	// 				type: "post",
	// 				url: url,
	// 				async: true,
	// 				data: data,
	// 				processData: false,
	// 				contentType: false,
	// 				success: function(dat) {
	// 					alert(dat.msg);
	// 					alert('你成功上传了'+imgFile.length+'张图片');
	// 					$('#imgBox2').find('.imgContainer').remove();
	// 					$('.goon2').html('继续上传');
	// 					imgSrc = []; //图片路径
	// 					imgFile = []; //文件流
	// 					imgName = []; //图片名字
	// 					// console.log(dat.msg);
	// 				},
	// 				error:function(dat){
	// 					alert('图片上传失败!');
	// 					console.log(dat);
	// 				}
	// 			});
	// 		}else{
	// 		  alert('请打开控制台查看传递参数！');
	// 		}
	// 	}
	// 	// ajax结束
	// 	//图片灯箱
	// 	function imgDisplay(obj) {
	// 		var src = $(obj).attr("src");
	// 		var imgHtml = '<div style="width: 100%;height: 100vh;overflow: auto;background: rgba(0,0,0,0.5);text-align: center;position: fixed;top: 0;left: 0;z-index: 1000;"><img src=' + src + ' style="margin-top: 100px;width: 70%;margin-bottom: 100px;"/><p style="font-size: 50px;position: fixed;top: 30px;right: 30px;color: white;cursor: pointer;" onclick="closePicture(this)">×</p></div>'
	// 		$('body').append(imgHtml);
	// 	}

	// 	//关闭
	// 	function closePicture(obj) {
	// 		$(obj).parent("div").remove();
	// 	}

	// 	//图片预览路径
	// 	function getObjectURL(file) {
	// 		var url = null;
	// 		if(window.createObjectURL != undefined) { // basic
	// 			url = window.createObjectURL(file);
	// 		} else if(window.URL != undefined) { // mozilla(firefox)
	// 			url = window.URL.createObjectURL(file);
	// 		} else if(window.webkitURL != undefined) { // webkit or chrome
	// 			url = window.webkitURL.createObjectURL(file);
	// 		}
	// 		return url;
	// 	}
	// }
		
