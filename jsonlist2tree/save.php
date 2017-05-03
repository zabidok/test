<?
if (isset($_POST['data'])) {
	// $data=array ();
	// $data=json_decode($_POST['data']);
	$fp = fopen('menu_id.json', 'w');
	fwrite($fp, $_POST['data']);
	fclose($fp);
	echo 'done';
}
?>