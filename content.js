
// This is Nabi's chrome extension

main_process();

function main_process()
{
	var cur_url = "";	
	console.log(cur_url);
	var new_job_alarm = ".search-result-newProjectAlert";	
	setInterval(function(){				
		if($(new_job_alarm).text().trim().includes("View "))
		{
			var txt = $(new_job_alarm).text().trim();					
			$(new_job_alarm).click();
			var temp = "";
			for(var i=5;i<txt.length;i++)
				{
					if(txt[i]!=' ')
						temp = temp+txt[i];
					else 
						break;
				}
			var count = parseInt(temp);
			var i = 0;
			var titles = Array();
			var descs = Array();
			var links = Array();
			var prices = Array();
			$(".search-result-list").each(function(index){
				i++;
				if(i<=count)
				{									
					var j = 0;	
					$(this).find(".info-card-title").each(function(e){						
						if(j<=count)
							titles[j++] = $(this).text().trim();
						else 
							return;
					});	
					j = 0;	
					$(this).find(".info-card-description").each(function(e){						
						if(j<=count)
							descs[j++] = $(this).text().trim();
						else 
							return;
					});	
					j = 0;	
					$(this).find(".search-result-link").each(function(e){						
						if(j<=count)
						{
							$(this).click();							
								links[j++] = "https://www.freelancer.com" + $(this).attr("href").trim();
						}							
						else 
							return;
					});					
					j = 0;	
					$(this).find(".info-card-price").each(function(e){						
						if(j<=count)
						{
							var price_txt = $(this).text();
							var price = "";
							for(var k=0;k<price_txt.length;k++)
							{
								if(price_txt[k]=='$' || price_txt[k]=='-' || price_txt[k]=='0' || price_txt[k]=='9' || price_txt[k]=='8' || price_txt[k]=='7' || price_txt[k]=='6' || price_txt[k]=='5' || price_txt[k]=='4' || price_txt[k]=='3' || price_txt[k]=='2' || price_txt[k]=='1')
									price = price+price_txt[k];
							}
							prices[j++] = price;
						}							
						else 
							return;
					});	
					
					for(var k=0;k<count;k++)
					{
						SendDataToServer(titles[k], descs[k], links[k], prices[k]);
					}
				}				
				else 
					return;
			});
		}
	},1000);		
}

function SendDataToServer(title, desc, link, price)
{		
	var ws = new WebSocket("ws://localhost:5153/service");
	ws.onopen = function () {    
		title = title.replace('|','-');
		desc = desc.replace('|','-');
		var data = title + "|" + desc + "|" + link +"|" + price;            
		ws.send(data); // I WANT TO SEND THIS MESSAGE TO THE SERVER!!!!!!!!                
	};

	ws.onmessage = function (evt) {                
		
	};
	ws.onclose = function () {		
		
	};
}