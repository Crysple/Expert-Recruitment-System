<?php
require_once("mysqli.php");
session_start();

//connect to the database
$dbhost = "localhost";
$dbuser = "root";
$dbpswd = "";
$dbname = "ExpertRecruitSystem";
$model = new Model($dbhost,$dbuser,$dbpswd,$dbname);


if (isset($_POST)) {
	$op = $_POST['type'];
	$data = array();
	switch ($op) {

		case "register":
			echo json_encode(array(
                    'status'=>'conflict'
                ));
			break;
		case "check_login":
			if(isset($_SESSION['user'])){
				echo json_encode(array(
					'status'=>true
					));
			}
			else{
				echo json_encode(array(
					'status'=>false
					));
			}
			break;
		default:
			# code...
			break;
	}
}
?>