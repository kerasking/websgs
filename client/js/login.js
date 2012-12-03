function init()
{
	document.getElementById("text_login_server").value=config_server;
	document.getElementById("text_login_nick").value=config_nick;
	window.onbeforeunload=function (event){return "你确定要离开游戏吗？";};
	var blc=document.getElementById("button_login_connect");
	blc.disabled=false;
	blc.value="连接";
}
var ServerAddress,lastid,sendid,lunxun,duanxian,dxcount;

function ChongLian(id)
{
	destroy(id);
	clearTimeout(duanxian[id]);
	clearTimeout(lunxun);
	alert("服务器已断开连接");
	window.onbeforeunload=function(){};
	location.reload();
}

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
	var blc=document.getElementById("button_login_connect");
	blc.disabled=true;
	blc.value="连接中……";
}

function Send(m,v)
{
	var script=document.createElement("script");
	script.src=ServerAddress+"?m="+m+"&l="+lastid+"&s="+sendid;
	script.id="sc"+sendid;
	if(v!=undefined) script.src+="&"+v;
	document.getElementsByTagName("body")[0].appendChild(script);
	var tsid=sendid;
	duanxian[sendid]=setTimeout(function(){dxcheck(tsid)},15000);
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
	var s=document.getElementById("sc"+sid);
	if(s.src.indexOf("?m=login&")!=-1)
	{
		LoginFail(sid,"连接超时");
		return;
	}
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
	clearTimeout(lunxun);
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
	roomlist=rooms;
	var d=document.getElementById("div_login");
	d.parentNode.removeChild(d);
	DrawRooms();
}

function LoginFail(sid,msg)
{
	destroy(sid);
	clearTimeout(lunxun);
	alert(msg);
	var blc=document.getElementById("button_login_connect");
	blc.disabled=false;
	blc.value="连接";
}

function SHA1 (msg) {
 
	function rotate_left(n,s) {
		var t4 = ( n<<s ) | (n>>>(32-s));
		return t4;
	};
 
	function lsb_hex(val) {
		var str="";
		var i;
		var vh;
		var vl;
 
		for( i=0; i<=6; i+=2 ) {
			vh = (val>>>(i*4+4))&0x0f;
			vl = (val>>>(i*4))&0x0f;
			str += vh.toString(16) + vl.toString(16);
		}
		return str;
	};
 
	function cvt_hex(val) {
		var str="";
		var i;
		var v;
 
		for( i=7; i>=0; i-- ) {
			v = (val>>>(i*4))&0x0f;
			str += v.toString(16);
		}
		return str;
	};
 
 
	function Utf8Encode(string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
 
		for (var n = 0; n < string.length; n++) {
 
			var c = string.charCodeAt(n);
 
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
 
		return utftext;
	};
 
	var blockstart;
	var i, j;
	var W = new Array(80);
	var H0 = 0x67452301;
	var H1 = 0xEFCDAB89;
	var H2 = 0x98BADCFE;
	var H3 = 0x10325476;
	var H4 = 0xC3D2E1F0;
	var A, B, C, D, E;
	var temp;
 
	msg = Utf8Encode(msg);
 
	var msg_len = msg.length;
 
	var word_array = new Array();
	for( i=0; i<msg_len-3; i+=4 ) {
		j = msg.charCodeAt(i)<<24 | msg.charCodeAt(i+1)<<16 |
		msg.charCodeAt(i+2)<<8 | msg.charCodeAt(i+3);
		word_array.push( j );
	}
 
	switch( msg_len % 4 ) {
		case 0:
			i = 0x080000000;
		break;
		case 1:
			i = msg.charCodeAt(msg_len-1)<<24 | 0x0800000;
		break;
 
		case 2:
			i = msg.charCodeAt(msg_len-2)<<24 | msg.charCodeAt(msg_len-1)<<16 | 0x08000;
		break;
 
		case 3:
			i = msg.charCodeAt(msg_len-3)<<24 | msg.charCodeAt(msg_len-2)<<16 | msg.charCodeAt(msg_len-1)<<8	| 0x80;
		break;
	}
 
	word_array.push( i );
 
	while( (word_array.length % 16) != 14 ) word_array.push( 0 );
 
	word_array.push( msg_len>>>29 );
	word_array.push( (msg_len<<3)&0x0ffffffff );
 
 
	for ( blockstart=0; blockstart<word_array.length; blockstart+=16 ) {
 
		for( i=0; i<16; i++ ) W[i] = word_array[blockstart+i];
		for( i=16; i<=79; i++ ) W[i] = rotate_left(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1);
 
		A = H0;
		B = H1;
		C = H2;
		D = H3;
		E = H4;
 
		for( i= 0; i<=19; i++ ) {
			temp = (rotate_left(A,5) + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B,30);
			B = A;
			A = temp;
		}
 
		for( i=20; i<=39; i++ ) {
			temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B,30);
			B = A;
			A = temp;
		}
 
		for( i=40; i<=59; i++ ) {
			temp = (rotate_left(A,5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B,30);
			B = A;
			A = temp;
		}
 
		for( i=60; i<=79; i++ ) {
			temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B,30);
			B = A;
			A = temp;
		}
 
		H0 = (H0 + A) & 0x0ffffffff;
		H1 = (H1 + B) & 0x0ffffffff;
		H2 = (H2 + C) & 0x0ffffffff;
		H3 = (H3 + D) & 0x0ffffffff;
		H4 = (H4 + E) & 0x0ffffffff;
 
	}
 
	var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);
 
	return temp.toLowerCase();
 
}