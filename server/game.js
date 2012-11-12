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
	while (((u.charAt(q)!="&")||(u.charAt(q)!="#"))&&(q<L));
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
		return;
	}
}

function Send2(c,end)
{
	var t;
	if(end)
		t="#";
	else
		t="";
	document.parentWindow.parent.document.location.href=h+"#"+c+t;
}

function SendMore(c)
{
	if(c.length<=1500)
	{
		Send2(c,true);
	}
	else
	{
		Send2(c.substring(0,1500),false);
		sendpool=c.substring(1500);
	}
}

function Send(c)
{
	c=encodeURIComponent(c);
	if(sendpool=="")
	{
		SendMore(c);
	}
	else
	{
		sendpool+=c;
	}
}

var h=GetValue("h");
var sendpool,hash;
function Start()
{
	sendpool="";
	hash=location.hash;
	Send("GetNick();");
	setInterval(checkhash,20);	
}

if(h)
	Start();