<?php
if(!isset($_GET['m'])) die('<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />请<a href="client.7z">下载客户端</a>或使用<a href="../client/">在线客户端</a>进行游戏');
header("P3P: CP=CURa ADMa DEVa PSAo PSDo OUR BUS UNI PUR INT DEM STA PRE COM NAV OTC NOI DSP COR");
session_start();
require 'config.php';
if($_GET['m']=='login')
{
	$nick=trim($_GET['n']);
	if(!$nick) die('LoginFail('.@$_GET['s'].',"昵称不能为空");');
	require 'php/conp.php';
	$s=$db->query('select count(*) from oluser');
	$si=$s->fetchColumn();
	if($si>=$cfg_maxuser)
}


if(isset($_SESSION['a']))
	$_SESSION['a']+=1;
else
	$_SESSION['a']=0;
echo 'alert("',$_SESSION['a'],'");';
?>