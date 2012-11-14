<?php
$nick=trim($_GET['n']);
if(!$nick) die('LoginFail('.@$_GET['s'].',"昵称不能为空");');
$plogin=0;
if(isset($_SESSION['id']))
{
	$s=$db->prepare("select status from oluser where id=? and nick='?' and ip=INET_ATON(?) limit 1");
	$s->execute(array($_SESSION['id'],$nick,$_SERVER['REMOTE_ADDR']));
	$si=$s->fetch();
	if($si===false)
	{
		$plogin=0;
		$_SESSION=array();
	}
	else
	{
		if($si[0]==4)
		{
			$plogin=2;
			$dxcl='true';
		}
		else
		{
			$plogin=1;
			$dxcl='false';
		}
		$uid=$_SESSION['id'];
		$_SESSION=array();
		$_SESSION['id']=$uid;
	}
}
if($plogin==0)
{
	$s=$db->query('select count(*) from oluser');
	$si=$s->fetchColumn();
	if($si>=$cfg_maxuser) die('LoginFail('.@$_GET['s'].',"服务器已满！");');
	$s=$db->prepare('insert into oluser (nick,lasttime,ip) values (?,?,INET_ATON(?))');
	$s->execute(array($nick,time(),$_SERVER['REMOTE_ADDR']));
	$s=$db->query('select LAST_INSERT_ID()');
	$uid=$_SESSION['id']=$s->fetchColumn();
}
$s=$db->query('select *,(select count(*) from oluser where room=a.id and status<>3) as renshu from rooms a');
$si=$s->fetchAll();
$roomlist=json_encode($si);
$_SESSION['lastid']=0;

echo "run(",$_GET['s'],",'LoginSuccess(\\'",$roomlist,"\\',",$dxcl,")');";
?>