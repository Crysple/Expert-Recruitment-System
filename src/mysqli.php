<?php


class Model{

	protected $link;
	protected $stmt;
	protected $err;
	protected $affectedRows;
	protected $where;
	protected $bindValue = array();
	protected $groupByArr = array();
    protected $joinArr = array();
    protected $fieldArr = array('*');
	public function __construct($dbhost ,$dbuser ,$dbpswd ,$dbname ) {

		$this->link=new mysqli($dbhost,$dbuser,$dbpswd,$dbname);
		$this->link->query("SET NAMES UTF8");
		$err = '';
		$affectedRows = '';

	}

	public function __destruct() {
		$this->link->close();
	}
	public function resetAll(){
		$groupByArr = array();
		$joinArr = array();
		$fieldArr = array('*');
	}
	public function join($para){
		if(is_array($para)){
			foreach ($para as  $value) {
				$this->joinArr[]  = $value;
			}
		}
		else
			$this->joinArr[] = $para;
		return $this;
	}


	public function groupBy($para){
		if(is_array($para)){
			foreach ($para as  $value) {
				$this->groupByArr[]  = $value;
			}
		}
		else
			$this->groupByArr[] = $para;
        
		return $this;
	}
    public function groupByReset()
    {
        $this->groupByArr = array();
    }
    public function field($arr){
        if(!is_array($arr)){
            $this->err =  'wrong param';
            return;
        }
        $this->fieldArr = $arr;
        
        return $this;  
    }
	/**
	 * [bind description]bind
	 * @param  array $data  	data to bind param 
	 *   key => array ,array(type,val) or key => val
	 * @return [type]       [description]
	 */
	protected function bind($data) {
		if(!is_array($data)){
			$this->err = "wrong param";
			return ;
		}
		$values = array();
		$type = array();
		foreach ($data as $key => $value) {
			
			if (is_array($value)) {
				$type[$key] = $value[0];
				$values[] = $value[1];
			}
			else {
				$type[$key] = '=';
				$values[] = $value;
			}
		}
		$this->where = $this->buildWhere($type);
		$this->bindValue = $values;
	}


	/**
	 * build the sentence about where
	 * @param  array $col_type     array('name'=>'type')
	 * @return string              sentence about where
	 */
	protected function buildWhere($col_type) {
		$first = 1;
		$where = ' WHERE ';
		
		if (!is_array($col_type)){
			$this->err = "wrong param";
			return ;
		}
		foreach ($col_type as $col => $type) {
			if (!$first)
				$where .= ' AND ';
			else
				$where .= ' ';

			$first = 0;
			
			$add = '`'.$col.'` '.$type.' ?';
			$where .= $add;	
		}
		
		return $where;
	}
	
	//获取数组元素的类型的字符串
	protected  function getParamTypeStr($arr) {

		$count = count($arr);
		$typestr = '';
		for($i = 0; $i<$count; $i++) {

			if(is_string($arr[$i])) 
				$typestr.= 's';
			else if(is_double($arr[$i])) 
				$typestr.= 'd';
			else if(is_numeric($arr[$i])) 
				$typestr.= 'i';
			else
				break;

		}

		return $typestr;
	}

	//something magic
	protected  function refValues($arr) {

    	if (strnatcmp(phpversion(),'5.3') >= 0) { //Reference is required for PHP 5.3+
    
	        $refs = array();
	        foreach($arr as $key => $value)
	            $refs[$key] = &$arr[$key];
	        return $refs;
    	}
	    return $arr;
	}
	//
	//
	public function count($from_tablename,$col_value) {

		$res = $this->select($from_tablename,$col_value);
		$count = count($res);
		return $count;

	}
	
	public function select($table,$data=array()) {
		if (!is_array($data)) {
			$this->err = 'Empty parameters';
			$res = array();
			return $res;
		}

		
        $sql = 'SELECT ' ;
        $f = true;
        foreach($this->fieldArr as $value){
            $sql .= (!$f?' , ':' ').$value.'  ';
           $f = false; 
        }
        $sql .=' FROM `'.$table .'` ';
        if(count($this->joinArr)){
            foreach($this->joinArr as $value ){
                $sql .= 'natural join `'.$value.'`';
            }
        }
        if(count($data)>=1){
			$this->bind($data);
			$sql .= $this->where;
        }

        if(count($this->groupByArr)){
            $sql .= ' group by ';
            $f = true;
            foreach($this->groupByArr as $value){
                $sql .= (!$f?' , ':' ').' `'.$value.'` ';
                $f = false;
            }  
        }
		$res = $this->query($sql);
//echo $sql;
		//获取结果集
		$result = $this->stmt->get_result();
		//获取所有数据
		$data = $result->fetch_all(MYSQLI_ASSOC);	
		$this->stmt->close();
		$this->resetAll();
		return $data;

		
	}

	public function insert($table,$name_value) {
	  	$fst = true;

		$sql = 'INSERT INTO `'.$table.'`';
		$cols = ' (';
		$values = ' VALUES (';
		$val = array();
	
		foreach ($name_value as $col => $value) {
		
			if ($fst)
				$fst = false;
			else {
				$cols .= ',';
				$values .= ',';
			}
			$val[] = $value;

			$cols .= '`'.$col.'`';
			$values .= '?';
			
		}

		$cols .= ')';
		$values .= ')';
		$sql .= $cols.$values;
//echo $sql;
		$this->bindValue = $val;
		$res = $this->query($sql);
		$id = $this->stmt->insert_id;
		
		$this->stmt->close();
		$this->resetAll();
		return $id;
	}

	public function update($table,$upCol,$oldCol) {
		$first = true;
		$sql = 'UPDATE `'.$table.'` SET';
		$val = array();
		foreach($upCol as $key => $value) {

			if ($first) {
				$sql .= ' ';
			}
			else {
				$sql .= ', ';
			}
			$first = false;

			$sql .= '`'.$key.'` = ?';
			$val[] = $value;
		}

		$this->bind($oldCol);
		$this->bindValue = array_merge($val,$this->bindValue);
		$sql .= $this->where;

		
		$res = $this->query($sql);
//	echo $sql;	
		$this->stmt->close();
		$this->resetAll();
		return $res;
	}
		
	public function delete($table,$Col) {
		if (!is_array($Col)){
			$this->err = 'Empty parameters';
			return 0;
		}

		$this->bind($Col);

		$sql =  'DELETE FROM `'.$table.'`' ; 

		$sql .= $this->where;

		$res = $this->query($sql);
		
		$this->stmt->close();
		$this->resetAll();
		return $res;
	}

	public function error() {
		return $this->err;
	}

	public function query($sql) {
		$values = $this->bindValue;
		$this->stmt = $this->link->prepare($sql);
		if($this->link->errno) {
			$this->err = $this->link->error;
			return 0;
		}
		$callback = array($this->stmt, 'bind_param');

		array_unshift($values, $this->getParamTypeStr($values)); 

 		call_user_func_array($callback, $this->refValues($values));
		$res = $this->stmt->execute();
		return $res;
	}



}

?>
