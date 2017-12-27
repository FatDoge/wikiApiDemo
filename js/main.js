$(document).ready(function(){
	// 请求地址，等待搜索关键字
	var url="https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&origin=*&gsrsearch=";
	// 搜索请求
	var Search=function(){
		// jsonp
		$("#resultList").html("");
		// 获取关键字
		if($("#wikiSearch").val()){
		var keyWord=$("#wikiSearch").val();
		// 清空搜索框
		$("#wikiSearch").val("");
		// 完整搜索地址
		var searchUrl=url+keyWord;
		$.getJSON(searchUrl, function(data) {
		    // 存储页面id
		    var id=[];
		    // 结果输出所需列表
		    var item="<ul class='itemStyle'>"
		    for(var pageid in data.query.pages)id.push(pageid);
			// 由pageid获取更多信息
			$(id).each(function(index, el) {
                var page=data.query.pages[id[index]];
                // 标题
                var title=page.title;
                // 简介
                var extract=page.extract;
                // wikiurl
                var wikiUrl="https://en.wikipedia.org/wiki/"+title;
                // 追加到resultList
                item+="<a target='_blank' href='"+wikiUrl+"'>"+"<li><span>"+title+"</span>";
                item+="<section>"+extract+"</section></li></a>";
			})
			item+="</ul>";
			// 顶部消失
			$("#wikiLogo").slideUp(500);
			// 加载到resultList
			$("#resultList").append(item);
			// logo上滑结束后list列出
			setTimeout(function(){$("#resultList").slideDown(500);},500);
		});
		}
	}
	// 点击搜索
	$("#searchBtn").click(Search);
	// 回车搜索
	$(document).keyup(function(e){
        var key =  e.which;
        if(key == 13){
        	Search();
        	// 便于重新加载动画
        	$("#searchBtn").focus();
        }
    });
	// 输入框focus动画
	$("#wikiSearch").focus(function(){
		$("#resultList").slideUp(500);
		setTimeout(function(){$("#wikiLogo").slideDown(500);$("#resultList").html("");},500);
	})
})