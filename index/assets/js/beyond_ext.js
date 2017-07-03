var mainPage = {
		loadMainMenu:function(jsonurl){
			$.get(jsonurl, function (data) {
				data = JSON.parse(data);
				var menus = data.menus;
				var str = "";
				if(menus && menus.length>0){
					mainPage.menus = menus;
					for(var i=0;i<menus.length;i++){
						var menu = menus[i];
						var link = menu.link;
						if(link && link.length>0){//主函数，无子菜单
							str = str + "<li linkid='" + menu.id + "'><a href='" + link + "'><i class='"+menu.icons+"'></i><span class='menu-text'>" + menu.text + "</span></a></li>";
						}else{
							var submenus = menu.submenus;
							if(submenus && submenus.length>0){
								str = str + "<li><a href='#' class='menu-dropdown'><i class='"+menu.icons+"'></i> <span class='menu-text'> " + menu.text + " </span><i class='menu-expand'></i></a>";
								var len = submenus.length;
								str = str + "<ul class='submenu'>";
								for(var j=0;j<len;j++){
									var submenu = submenus[j];
									var sublink = submenu.link;
									if(sublink && sublink.length>0){
										str = str + "<li linkid='" + submenu.id + "'><a href='" + sublink + "'><i class='"+submenu.icons+"'></i><span class='menu-text'>" + submenu.text + "</span></a></li>";
									}else{
										var ssubmenus = submenu.submenus;
										if(ssubmenus && ssubmenus.length>0){
											str = str + "<li><a href='#' class='menu-dropdown'><i class='"+menu.icons+"'></i> <span class='menu-text'> " + menu.text + " </span><i class='menu-expand'></i></a>";
											str = str + "<ul class='submenu'>";
											var sub_len = ssubmenus.length;
											for(var k=0;k<sub_len;k++){
												var ssubmenu = ssubmenus[k];
												var ssublink = ssubmenu.link;
												str = str + "<li linkid='" + ssubmenu.id + "'><a href='" + ssublink + "'><i class='"+ssubmenu.icons+"'></i><span class='menu-text'>" + ssubmenu.text + "</span></a></li>";
											}
											str = str + "</ul></li>";
										}else{
											str = str + "<li linkid='" + submenu.id + "'><a href='" + sublink + "'><i class='"+submenu.icons+"'></i><span class='menu-text'>" + submenu.text + "</span></a></li>";
										}
									}
								}
								str = str + "</ul></li>";
							}else{
								str = str + "<li linkid='" + menu.id + "'><a href='" + link + "'><i class='"+menu.icons+"'></i><span class='menu-text'>" + menu.text + "</span></a></li>";
							}
						}
					}
				}
				$("#nav_menus").html(str);
				//默认选中第一个菜单
				var li_first = $("#nav_menus").find("li[linkid]:first");
				var pparent_li = li_first.parent().parent();
				pparent_li.addClass("open");
				pparent_li.parent().parent().parent().parent().addClass("open");
				var li_a = li_first.find("a");
				$(li_a[0]).click();
			});
		}
};


$(function(){
	mainPage.loadMainMenu("index/menus.json");
});

