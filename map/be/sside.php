<?php 

	$ret = "[";
	for ($i=0; $i < 1000; $i++) { 
		$ret .="{'name':'marco','surname':'pippo'}";
	}
	$ret.="]";
	echo $ret;
?>
