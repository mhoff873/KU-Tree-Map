<?php  
	function db_connect1(){
		$db_host = 'localhost';
		$db_user= 'root';
		$db_pass= 'Beer1234';
		$db_name= 'trees';
		global $connection;
		$connection = mysql_connect($db_host,$db_user,$db_pass) 
			or die ("cannot connect to $db_host as $db_user".mysql_error());
		mysql_select_db($db_name) 
			or die ("Cannot open $db_name:".mysql_error());
		return $connection;
	}
	function db_close1(){
		global $connection;
		mysql_close($connection);
	}
?>