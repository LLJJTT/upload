    // function move 开始
    var move = {
			imgSrc:[], //图片路径
			imgFile:[],//文件流
			imgName:[], //图片名字
			//选择图片
			// 函数闭包，让外部引入调用
		  imgUpload :function(obj){
				var oInput = '#' + obj.inputId;
				var imgBox = '#' + obj.imgBox;
				var btn = '#' + obj.buttonId;
			$(oInput).on("change", ()=> {
				var fileImg = $(oInput)[0];
				var fileList = fileImg.files;
				for(var i = 0; i < fileList.length; i++) {
					var imgSrcI = this.getObjectURL(fileList[i]);
					this.imgName.push(fileList[i].name);
					this.imgSrc.push(imgSrcI);
					this.imgFile.push(fileList[i]);
				}
				this.addNewContent(obj.imgBox);
		  			// console.log(obj);

			})//change
			$(btn).on('click',()=> {
				if(!this.limitNum(obj.num)){
				  	alert("图片数量最多"+obj.num+"个");
				  	return false;
				}
				else if(this.imgFile.length==0){
					alert('请选择图片！');
				}
				else if(this.imgFile.length>0&&this.limitNum(obj.num)){
					//用formDate对象上传
					alert('图片上传中请稍后');
					var fd = new FormData($('.upBox')[0]);
					for(var i=0;i<this.imgFile.length;i++){
						fd.append(obj.data+"[]",this.imgFile[i]);
					}
					// console.log(fd); //FormData 对象
					move.submitPicture(obj,obj.upUrl, fd);
				}
				
			});//click
		},//return
		//图片展示
		addNewContent:function (obj) {
			// console.log(obj);
			console.log(this.imgSrc.length);
			$('#'+obj).html("");
			for(var a = 0; a < this.imgSrc.length; a++) {
				var oldBox = $('#'+obj).html();
				$('#'+obj).html(oldBox + '<div class="imgContainer"><img title=' + this.imgName[a] + ' alt=' + this.imgName[a] + ' src=' + this.imgSrc[a] + ' onclick="imgDisplay(this)"><p onclick="removeImg(this,' + a + ')" class="imgDelete">删除</p></div>');
			}
			alert('您有'+this.imgSrc.length+'张图片预先加载完毕');
		},
		//删除
		removeImg:function(obj,index){
			// console.log(move.imgSrc)		
			// console.log(obj);//obj为p标签
			// 删除原来数组中的，并且返回被删除的项目
			move.imgSrc.splice(index,1);
			move.imgFile.splice(index,1);
			move.imgName.splice(index,1);
			var boxId = $(obj).parent('.imgContainer').parent().attr("id");
			move.addNewContent(boxId);
		},
		//限制图片个数
		limitNum:function (num){
			if(!num){
				return true;
			}else if(this.imgFile.length>num){
				return false;
			}else{
				return true;
			}
		},

		//上传(将文件流数组传到后台)
		submitPicture :function(obj,url,data){
		 //    for (var p of data) {
			//   	console.log(p);
			//   	// p就是文件流
			// }
			console.log($('#'+obj.imgBox))
			if(url&&data){
				$.ajax({
					type: "post",
					url: url,
					async: true,
					data: data,
					processData: false,
					contentType: false,
					success: (dat)=> {
						// alert(dat.msg);
						alert('你成功上传了'+this.imgFile.length+'张图片');
						// console.log(this);
						this.imgSrc=[]; //图片路径
						this.imgFile=[];//文件流
						this.imgName=[];
						// 移除当前的图片
						$('#'+obj.imgBox).find('.imgContainer').remove();
						$('.goon').html('继续上传');
						// console.log(dat.msg);
					},
					error:function(dat){
						alert('图片上传失败!');
						console.log(dat);
					}
				});
			}else{
			   alert('请打开控制台查看传递参数！');
			}
		},
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
	}	