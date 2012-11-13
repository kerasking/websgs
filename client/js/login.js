function init()
{
	document.getElementById("text_login_server").value=config_server;
	document.getElementById("text_login_nick").value=config_nick;
}
var ServerAddress,lastid,sendid,lunxun,duanxian,dxcount;

function loginsub()
{
	ServerAddress=document.getElementById("text_login_server").value;
	if((document.getElementById("text_login_nick").value=="")||(ServerAddress==""))
	{
		alert("请输入昵称和服务器地址");
		return;
	}
	sendid=lastid=0;
	dxcount=0;
	duanxian=new Array();
	Send("login","n="+encodeURIComponent(document.getElementById("text_login_nick").value));
}

function Send(m,v)
{
	var script=document.createElement("script");
	script.src=ServerAddress+"?m="+m+"&l="+lastid+"&s="+sendid;
	script.id="sc"+sendid;
	if(v!=undefined) script.src+="&"+v;
	document.getElementsByTagName("body")[0].appendChild(script);
	duanxian[sendid]=setTimeout(function(){dxcheck(sendid)},10000);
	clearTimeout(lunxun);
	sendid++;
	if(sendid>999) sendid=0;
}

function flunxun()
{
	Send("lunxun");
}

function dxcheck(sid)
{
	dxcount++;
	if(dxcount>3)
	{
		alert("服务器长时间没有响应，请检查网络连接情况。\n建议刷新页面重新进行连接。\n如果您的网络正常但持续无法连接上服务器，那有可能是服务器已停止。");
		dxcount=0;
	}
	if(!lunxun) lunxun=setTimeout(flunxun,1500);
}

function destroy(id)
{
	var s=document.getElementById("sc"+id);
	s.parentNode.removeChild(s);
	dxcount=0;
	clearTimeout(duanxian[id]);
	lunxun=setTimeout(flunxun,1500);
}

function run(lid,x)
{
	if(lid>lastid)
	{
		lastid=lid;
		eval(x);
	}
}

function LoginSuccess(rooms,dxcl)
{
	
}