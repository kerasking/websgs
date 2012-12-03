<?php
if((!isset($_GET['m']))||(!isset($_GET['s']))||(!isset($_GET['l']))) die('<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />请<a href="client.7z">下载客户端</a>或使用<a href="../client/">在线客户端</a>进行游戏');
header("P3P: CP=CURa ADMa DEVa PSAo PSDo OUR BUS UNI PUR INT DEM STA PRE COM NAV OTC NOI DSP COR");
session_start();
require 'config.php';
require 'php/conp.php';
if($_GET['m']=='login')
{
	require 'php/login.php';
}
else
{
	//连接检测
	if(!isset($_SESSION['id']))
		die('ChongLian('.$_GET['s'].');');
	$s=$db->prepare('select nick,room,status from oluser where id=? limit 1');
	$s->execute(array($_SESSION['id']));
	$userinfo=$s->fetch();
	if($userinfo===false) die('ChongLian('.$_GET['s'].');');
	$s=$db->prepare('update oluser set lasttime=? where id=? limit 1');
	$s->execute(array(time(),$_SESSION['id']));
	//发送最新指令
	require 'php/sendcode.php';
	if($_GET['m']=='createroom')
	{
		require 'php/createroom.php';
	}
}
echo 'destroy(',$_GET['s'],');';
?>