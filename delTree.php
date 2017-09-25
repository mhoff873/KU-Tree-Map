
<?php 
        include 'connect.php'; //database connection functions
        db_connect1(); 
        
        if (isset($_POST["idDelete"]) && !empty($_POST["idDelete"])){
                $delQuery = "DELETE FROM `table 1` WHERE id=".$_POST["idDelete"].";";
                mysql_query($delQuery) or die ("Error in query: ".mysql_error());
            }

        header("Location: ./"); //redirect back to index
        db_close1();
?>
