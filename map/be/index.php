<?php
    include "fileHelper.php";

    $data = readFile("data.json");
//    echo $data;


?>
<form action="index.php" method="post">
    <input type="text" name="test"/>
    <button type="submit">Submitte</button>
</form>