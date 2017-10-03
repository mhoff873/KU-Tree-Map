<html>
<head>
<!--FULLSCREEN STYLE-->
<link rel="stylesheet" type="text/css" href="style.css">
  
<!--PULL DATA FROM DATABASE-->
<?php include 'pull.php'; ?>

</head>
<body>

<!--MAP-->
<div id='map'></div>   

<!--ADD MARKERS-->
<script src="mapper.js" type="text/javascript"></script> 

<!--CLOSE DATABASE-->
<?php db_close1();?>

<!--LOAD MAP TILES-->
<script src="https://maps.googleapis.com/maps/api/js?key=<-   ADD YOUR KEY HERE   ->&callback=initMap"
    async defer>
</script>

</body>
</html>