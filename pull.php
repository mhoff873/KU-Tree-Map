<?php
        include 'connect.php'; //database connection functions
        db_connect1(); 
        
        //data queries
	$getDetails="SELECT * FROM `table 1`"; 
	$uniqueTrees="SELECT DISTINCT name, tax FROM `table 1` ORDER BY name";

	$fill = mysql_query($getDetails);
        $uniqueList = mysql_query($uniqueTrees);

 	$data=array();
        for ($x = 0; $x < mysql_num_rows($fill); $x++){
            $row = mysql_fetch_assoc($fill);  
            array_push($data,array(
                "id"=> mysql_result($fill,$x,"id"),
		"name"=> mysql_result($fill,$x,"name"),
		"tax" => mysql_result($fill,$x,"tax"),
		"lat"=> mysql_result($fill,$x,"lat"),
		"lon"=>mysql_result($fill,$x,"lon")));
        } 
        $uList=array();
        for ($x = 0; $x < mysql_num_rows($uniqueList); $x++){
            array_push($uList,array(
		"name"=> mysql_result($uniqueList,$x,"name"),
                "tax"=> mysql_result($uniqueList,$x,"tax")));
        } 


	//PHP GLOBALS	
        //Data is the entire set of all the data. 
        //uniqueList is the names of all the unique common names of trees
        //postTreeValue will search for a tree if tree is specified in the url
	echo "<script> var data = ".json_encode($data).";\n";
        echo "var uniqueList = ".json_encode($uList).";\n";
        //getTreeValue is pulled from URL and stored
         if (isset($_GET["tree"])) {
                echo "var getTreeValue = ".json_encode($_GET["tree"]).";\n";
        }else{  
                echo "var getTreeValue = 'none';\n";
        } 
        
        
        echo "</script>";
        ?>