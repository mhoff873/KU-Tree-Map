<html>
<head>
<!--FULLSCREEN STYLE-->
<link rel="stylesheet" type="text/css" href="style.css">

<!--CONNECT TO DATABASE-->
<?php include 'connect.php'; ?>

</head>
<body>

<!--MAP-->
<div id='map'></div>   

<!--ADD MARKERS-->
<script src="mapper.js" type="text/javascript"></script> 

<!--CLOSE DATABASE-->
<?php db_close1(); ?>

<!--LOAD MAP TILES-->
<!--THIS TEMPLATE REQUIRES YOU TO ENTER YOUR OWN GOOGLE MAPS API KEY -->
<script src="https://maps.googleapis.com/maps/api/js?key=<-   ADD YOUR KEY HERE   ->&callback=initMap"
    async defer>
</script>

</body>
</html>