<?php
class helper {
	function writeFile($fileName, $txt) {
		$src = fopen($fileName, "w") or die("Unable to open file!");
		fwrite($src, $txt);
		fclose($src);
	}

	function readFile($fileName) {
		$src = fopen($fileName, "r") or die("Unable to open file!");
		$ret = fread($src,filesize($fileName));
		fclose($src);
		return $ret;
	}
}
