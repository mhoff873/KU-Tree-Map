<?php
        #You need to fill in log-in information for the database server.
	function db_connect1(){
		$db_host = '';
		$db_user= '';
		$db_pass= '';
		$db_name= '';
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
	db_connect1(); //CONNECT TO DATABASE RIGHT AWAY

	$getDetails="SELECT * FROM `table 1`"; 
	
	$fill = mysql_query($getDetails);

 	$data=array();
        for ($x = 0; $x < mysql_num_rows($fill); $x++){
            $row = mysql_fetch_assoc($fill);  
            array_push($data,array(
		"name"=> mysql_result($fill,$x,"name"),
		"tax" => mysql_result($fill,$x,"tax"),
		"lat"=> mysql_result($fill,$x,"lat"),
		"lon"=>mysql_result($fill,$x,"lon")));
        } 
        
	//PHP GLOBALS	
	echo "<script> var data = ".json_encode($data).";\n";
        echo "</script>";
?>