<?php
    $myfile = fopen("data.json", "r") or die("Unable to open file!");
    echo fread($myfile,filesize("data.json"));
    fclose($myfile);
?>
