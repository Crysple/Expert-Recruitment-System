<?php
require_once("mysqli.php");
session_start();

//connect to the database
$dbhost = "localhost";
$dbuser = "root";
$dbpswd = "";
$dbname = "ExpertRecruitSystem";
$model = new Model($dbhost,$dbuser,$dbpswd,$dbname);
if (isset($_POST['type'])) {
	$op = $_POST['type'];
	$data = array();
	switch ($op) {

		case "register":
			$result = $model->select("user",array('username'=>$_POST['username']));
			//check if the username has existed
			if(count($result)){
				echo json_encode(array(
                    'status'=>'fail',
                    'err'=>'username conflict'
                ));
			}
			else{
				$result = $model->insert("user",array("username"=>$_POST['username'],"password"=>$_POST["password"]));
				if(count($result)!=1){
					echo json_encode(array(
                    'status'=>'fail',
                    'err'=>'insert error'
                	));
				}
				else{
					echo json_encode(array(
                    'status'=>'success'
                	));
				}
			}
			break;
		case "login":
			$data['username'] = $_POST['username'];
			$data['password'] = $_POST['password'];
			$table = $_POST['role'];
			$result = $model->select($table,$data);
			if(count($result)!=1){
				echo json_encode(array('status'=>'fail'));
			}
			else{
				$_SESSION['user']=$result[0]['username'];
				echo json_encode(array('status'=>'success'));
			}
			break;
		case "check_login":
			if(isset($_SESSION['user'])){
				echo json_encode(array(
					'status'=>"success"
					));
			}
			else{
				echo json_encode(array(
					'status'=>"fail"
					));
			}
			break;
		case "logout":
			unset($_SESSION['user']);
			break;
		default:
			# code...
			break;
	}
}
?>