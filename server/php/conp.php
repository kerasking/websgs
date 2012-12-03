<?php
function msend($m,$die=false)
{
	$_SESSION['lastid']++;
	$sm='run('.$_SESSION['lastid'].',\''.$m.'\');';
	$_SESSION['c'.$_SESSION['lastid']]=$sm;
	if($die)
	{
		die($sm);
	}
	else
		echo $sm;
}
if(!isset($db))
{
	$db=new PDO('mysql:host='.$cfg_dbhost.';dbname='.$cfg_dbname,$cfg_dbuser,$cfg_dbpassword);
	$db->exec("SET NAMES 'utf8'");
}
?>