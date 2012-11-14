<?php
if(!isset($db))
{
	$db=new PDO('mysql:host='.$cfg_dbhost.';dbname='.$cfg_dbname,$cfg_dbuser,$cfg_dbpassword);
	$db->query("SET NAMES 'utf8'");
}
?>