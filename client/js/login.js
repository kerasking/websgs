function init()
{
	document.getElementById("text_login_server").value=config_server;
	document.getElementById("text_login_nick").value=config_nick;
}
var ServerAddress;
function loginsub()
{
	ServerAddress=document.getElementById("text_login_server").value;
	if((document.getElementById("text_login_nick").value=="")||(ServerAddress==""))
	{
		alert("请输入昵称和服务器地址");
		return;
	}
	if(!document.getElementById("ifr"))
	{
		var ifr=document.createElement("iframe");
		ifr.width="0";
		ifr.height="0";
		ServerAddress=ServerAddress+"?h="+encodeURIComponent(location.href);
		ifr.src=ServerAddress;
		document.getElementsByTagName("body")[0].appendChild(ifr);
	}
}