
<?php 
        include 'connect.php'; //database connection functions
        db_connect1(); 
        
        if (isset($_POST["format"]) && !empty($_POST["format"]) &&
            isset($_POST["lat"]) && !empty($_POST["lat"]) &&
            isset($_POST["lng"]) && !empty($_POST["lng"])){
                $taxQuery = "SELECT tax FROM `table 1` WHERE name='".$_POST["format"]."';";
                $taxDetails = mysql_query($taxQuery);
                $insertTree = "INSERT INTO `table 1` VALUES (default,
                    '".$_POST["format"]."', 
                    '".mysql_result($taxDetails,0,"tax")."', 
                    '".$_POST["lat"]."', '".$_POST["lng"]."');";
                mysql_query($insertTree) or die ("Error in query: ".mysql_error());
            }

        header("Location: ./"); //redirect back to index
        db_close1();
?>
