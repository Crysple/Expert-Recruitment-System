<?php
require_once("mysqli.php");
session_start();
class Controller{
	protected $dbhost;
	protected $dbuser;
	protected $dbpswd;
	protected $dbname;
	//connect to the database
	protected $model;

	public function __construct(){
		$this->dbhost = "localhost";
		$this->dbuser = "root";
		$this->dbpswd = "";
		$this->dbname = "ExpertRecruitSystem";
		$this->model =  new Model($this->dbhost,$this->dbuser,$this->dbpswd,$this->dbname);
	}
	protected function register(){
		$data = array();
		$result = $this->model->select("user",array('username'=>$_POST['username']));
		//check if the username has existed
		if(count($result)){
			echo json_encode(array(
	            'status'=>'fail',
	            'err'=>'username conflict'
	        ));
		}
		else{
			$result = $this->model->insert("user",array("username"=>$_POST['username'],"password"=>$_POST["password"]));
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
	}

	protected function login(){
		$data = array();
		$data['username'] = $_POST['username'];
		$data['password'] = $_POST['password'];
		$table = $_POST['role'];
		$result = $this->model->select($table,$data);
		if(count($result)!=1){
			echo json_encode(array('status'=>'fail'));
		}
		else{
			$_SESSION['user']=$result[0]['username'];
			$result = $this->model->select("expert",array('username'=>$_POST['username']));
			if(count($result)==1) $_SESSION['expert_status']=$result[0]['status'];
			else $_SESSION['expert_status']=0;
			echo json_encode(array('status'=>'success'));
		}
	}

	protected function check_login(){
		$data = array();
		if(isset($_SESSION['user'])){
			$result = $this->model->select("expert",array("username"=>$_SESSION['user']));
			$assess_res = $this->model->select("assessment",array("username"=>$_SESSION['user']));
			$avoidunit_res = $this->model->select("avoid_unit",array("username"=>$_SESSION['user']));
			$qualification_res = $this->model->select("qualification",array("username"=>$_SESSION['user']));
			$workexperience_res = $this->model->select("work_experience",array("username"=>$_SESSION['user']));
			$field_res = $this->model->select("field",array("username"=>$_SESSION['user']));
			echo json_encode(array(
				'status'=>"success",
				"username"=>$_SESSION['user'],
				"expert_status"=>$_SESSION['expert_status'],
				"info"=>$result[0],
				"assess"=>$assess_res,
				"avoidunit"=>$avoidunit_res,
				"certificate"=>$qualification_res,
				"workexperience"=>$workexperience_res,
				"field"=>$field_res
				));
		}
		else{
			echo json_encode(array(
				'status'=>"fail"
				));
		}
	}

	protected function getall(){
		$data = array();
		if(isset($_POST['user'])){
			$result = $this->model->select("expert",array("username"=>$_POST['user']));
			$assess_res = $this->model->select("assessment",array("username"=>$_POST['user']));
			$avoidunit_res = $this->model->select("avoid_unit",array("username"=>$_POST['user']));
			$qualification_res = $this->model->select("qualification",array("username"=>$_POST['user']));
			$workexperience_res = $this->model->select("work_experience",array("username"=>$_POST['user']));
			$field_res = $this->model->select("field",array("username"=>$_POST['user']));
			echo json_encode(array(
				'status'=>"success",
				"username"=>$_POST['user'],
				"expert_status"=>$result[0]['status'],
				"info"=>$result[0],
				"assess"=>$assess_res,
				"avoidunit"=>$avoidunit_res,
				"certificate"=>$qualification_res,
				"workexperience"=>$workexperience_res,
				"field"=>$field_res
				));
		}
		else{
			echo json_encode(array(
				'status'=>"fail"
				));
		}
	}

	protected function expert(){
		$data = array();
		//改gender那些value
		$data = json_decode($_POST["data"],true);
		$data['status']=$_POST['status'];
		$resule;
		if($_POST['status']=='0'){
			$data['status']=1;
			$resule = $this->model->insert("expert",$data);
		}
		else{
			$resule = $this->model->update("expert",$data,array("username"=>$_SESSION['user']));
		}
		echo $resule;
	}

	protected function multi_insert($table){
		$data = array();
		$now_info = json_decode($_POST["data"],true);
		$this->model->delete($table,array("username"=>$_SESSION['user']));
		for($i=0,$len=count($now_info);$i<$len;++$i){
			$this->model->insert($table,$now_info[$i]);
		}
	}
	protected function adminInit(){
		$alldata = $this->model->select("expert");
		$wait_number = $this->model->count("expert",array("status"=>1));
		echo json_encode(array(
			"alldata"=>$alldata,
			"wait_number"=>$wait_number));
	}
	protected function updateUser(){
		$info = json_decode($_POST["info"],true);
		$this->model->update("expert",$info,array("username"=>$_POST["username"]));
	}
	public function run(){
		if (isset($_POST['type'])) {
			$op = $_POST['type'];
			$data = array();
			switch ($op) {
				case "register":
					$this->register();
					break;
				case "check_name":
					$result =$this->model->select("user",array('username'=>$_POST['username']));
					if(count($result)!=0) echo "exist";
					else echo "ok";
					break;
				case "login":
					$this->login();
					break;
				case "check_login":
					$this->check_login();
					break;
				case "logout":
					unset($_SESSION['user']);
					break;
				case "expert":
					$this->expert();
					break;
				case "qualification":
					$this->multi_insert("qualification");
					break;
				case "assessment":
					$this->multi_insert("assessment");
					break;
				case "work_experience":
					$this->multi_insert("work_experience");
					break;
				case "avoid_unit":
					$this->multi_insert("avoid_unit");
					break;
				case "field":
					$this->multi_insert("field");
					break;
				case "adminInit":
					$this->adminInit();
					break;
				case "updateUser":
					$this->updateUser();
					break;
				case "getall":
					$this->getall();
					break;
				default:
					echo "enter_default";
					break;
			}
		}

		if(isset($_POST['submit'])){
			if ((($_FILES["file"]["type"] == "image/gif")||($_FILES["file"]["type"] == "image/jpeg")|| ($_FILES["file"]["type"] == "image/pjpeg"))&& ($_FILES["file"]["size"] < 20000))
			{
				if ($_FILES["file"]["error"] > 0)
				{
					echo "Return Code: " . $_FILES["file"]["error"] . "<br />";
				}
				else
				{
					echo "Upload: " . $_FILES["file"]["name"] . "<br />";
					echo "Type: " . $_FILES["file"]["type"] . "<br />";
					echo "Size: " . ($_FILES["file"]["size"] / 1024) . " Kb<br />";
					echo "Temp file: " . $_FILES["file"]["tmp_name"] . "<br />";
					$extension = pathinfo($_FILES["file"]["name"],PATHINFO_EXTENSION);
					move_uploaded_file($_FILES["file"]["tmp_name"],"../img/".$_SESSION['user'].".".$extension);
					echo "Stored as ".$_SESSION['user'].".".$extension;
				}
			}
			header('Location: ../main.html');
			exit;
		}
	}
}
$controller=new Controller();
$controller->run();
?>