function GetValue(a)
{
	var u=document.location.search,q,s="",L=u.length;
	if ((q=u.indexOf("?"+a+"="))<0)
		if ((q=u.indexOf("&"+a+"="))<0)
			return false;
	q+=2+a.length;
	if (u.charAt(L-1)=="#")
		u=u.substring(0,L);
	do
		s+=u.charAt(q++);
	while ((u.charAt(q)!="&")&&(u.charAt(q)!="#")&&(q<L));
	return decodeURIComponent(s);
}

function CreateAjax()
{
	var xmlHttp;
 
 try
    {
    xmlHttp=new XMLHttpRequest();
    }
 catch (e)
    {
   try
      {
      xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
      }
   catch (e)
      {

      try
         {
         xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
         }
      catch (e)
         {
         return false;
         }
      }
    }
return xmlHttp;
}

function OnReadyStateChng(xmlHttp,id)
{
	if(xmlHttp.readyState==4)
	{
		if(xmlHttp.status==200)
		{
			if(id.substring(0,5)=="func_")
			{
				eval(id.substring(5)+"(xmlHttp.responseText)");
			}
		}
		else
		{
			alert("错误"+xmlHttp.status);
		}
	}
}

function AjaxPost(url,id,val)
{
	var xmlHttp=CreateAjax();
	if (!xmlHttp)
	{
		alert("您的浏览器不支持AJAX");
		return;
	}
	if(id!=undefined)
	{
		xmlHttp.onreadystatechange = function () { OnReadyStateChng(xmlHttp, id); };
	}
	if (val==undefined)
	{
		xmlHttp.open("GET",url,true);
		xmlHttp.send(null);
	}
	else
	{
		xmlHttp.open("POST",url,true);
		xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xmlHttp.send(val);
	}	
}

function checkhash()
{
	if(hash==location.hash.charAt(1)) return;
	hash=location.hash.charAt(1);
	var thash=location.hash.substring(2);
	if(thash=="GetMore#")
	{
		SendMore(sendpool);
	}
	else if(thash=="OneLine#")
	{
		lastsending=false;
		if(sendpool!="")
		{
			SendMore(sendpool);
		}
		else
		{
			sending=false;
			if(SAO)
			{
				if(SAO==1)
					Send2("GetMore",true);
				else
				{
					Send2("OneLine",true);
					clearInterval(interval);
					setTimeout(function(){interval=setInterval(checkhash,20);},50);
				}
				SAO=false;
			}
		}
	}
	else if(thash.charAt(thash.length-1)=="#")
	{
		recvpool+=thash.substring(0,thash.length-1);
		eval(recvpool);
		recvpool="";
		if(sending)
		{
			SAO=2;
		}
		else
		{
			Send2("OneLine",true);
			clearInterval(interval);
			setTimeout(function(){interval=setInterval(checkhash,20);},50);
		}
	}
	else
	{
		recvpool+=thash.substring(0,thash.length);
		if(sending)
		{
			SAO=1;
		}
		else
			Send2("GetMore",true);
	}
}

function Send2(c,end)
{
	var t;
	if(end)
		t="#";
	else
		t="";
	sending=true;
	document.parentWindow.parent.document.location.href=h+"#"+flag+c+t;
	flag++;
	if(flag>9) flag=0;
}

function SendMore()
{
	if(sendpool.length<=1500)
	{
		Send2(sendpool,true);
		sendpool="";
		lastsending=true;
	}
	else
	{
		Send2(sendpool.substring(0,1500),false);
		sendpool=sendpool.substring(1500);
	}
}

function Send(c)
{
	c=encodeURIComponent(c);
	if((sendpool=="")&&(!lastsending))
	{
		sendpool=c;
		SendMore();
	}
	else
	{
		sendpool+=c;
	}
}

var h=GetValue("h");
var sendpool,hash,flag,recvpool,SAO,sending,lastsending,interval;
function Start()
{
	sendpool=recvpool="";
	flag=0;
	sending=lastsending=false;
	SAO=0;
	hash=location.hash;
	Send("GetNick();");
	interval=setInterval(checkhash,20);	
}

if(h)
	Start();