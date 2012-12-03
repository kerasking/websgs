<?php
if($cfg_jianfang!='')
{
	if(@$_GET['anquan']!=sha1($cfg_jianfang))
		msend('CRFail('.$_GET['s'].',"安全验证码错误");',true);
}
if((!(@$_GET['xuanjiang']>0))||(!(@$_GET['jiangbao']>=0)))
{
	msend('CRFail('.$_GET['s'].',"参数错误");',true);
}
$s=$db->exec('delete from rooms where not exists (select * from oluser where room=rooms.id and status<>3 and status<>5 limit 1)');
$s=$db->query('select count(*) from rooms');
if($s->fetchColumn()>=$cfg_maxroom)
	msend('CRFail('.$_GET['s'].',"已达到最大房间数");',true);
if(isset($_GET['password']))
{
	if(strlen($_GET['password'])!=40)	msend('CRFail('.$_GET['s'].',"参数错误");',true);
	$s=$db->prepare('insert into rooms (fangzhu,xuanjiang,password,jiangbao) values (?,?,?,?)');
	$s->execute(array($_SESSION['id'],$_GET['xuanjiang'],$_GET['password'],$_GET['jiangbao']));
}
else
{
	$s=$db->prepare('insert into rooms (fangzhu,xuanjiang,jiangbao) values (?,?,?)');
	$s->execute(array($_SESSION['id'],$_GET['xuanjiang'],$_GET['jiangbao']));
}
$rid=$db->lastInsertId();
$s=$db->prepare('update oluser set room=? where id=? limit 1');
$s->execute(array($rid,$_SESSION['id']));
$s=$db->prepare('delete from roomcode,cardpos,playerinfo,gameinfo,skills where room=?');
$s->execute(array($rid));
/*@mkdir('room/'.$rid);
$fn='room/'.$rid.'/0';
if(file_exists($fn))unlink($fn);
$f=fopen($fn,'w');
fclose($f);
$_SESSION['fileid']=0;
$_SESSION['lineid']=0;
$_SESSION['rfsize']=0;*/
$_SESSION['sqlid']=0;
//$s=$db->exec('CREATE TABLE IF NOT EXISTS `roomcode_'.$rid.'` (`id` int(10) unsigned NOT NULL AUTO_INCREMENT,`user` int(10) unsigned NOT NULL,`code` varchar(100) NOT NULL,PRIMARY KEY (`id`)) ENGINE=MEMORY DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;TRUNCATE TABLE `roomcode_'.$rid.'` ');
msend('CRSuccess();');
?>