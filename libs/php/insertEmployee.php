<?php

	// example use from browser
	// http://localhost/companydirectory/libs/php/insertDepartment.php?name=New%20Department&locationID=1

	// remove next two lines for production


	$executionStartTime = microtime(true);

	include("config.php");

	header('Content-Type: application/json; charset=UTF-8');

	$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

	if (mysqli_connect_errno()) {
		
		$output['status']['code'] = "300";
		$output['status']['name'] = "failure";
		$output['status']['description'] = "database unavailable";
		$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output);

		exit;

  }	
  
  // Sanitize inputs
  $filteredFirstName = filter_var($_POST['firstName'], FILTER_SANITIZE_STRING);
  $filteredLastName = filter_var($_POST['lastName'], FILTER_SANITIZE_STRING);
  $filteredJobTitle = filter_var($_POST['jobTitle'], FILTER_SANITIZE_STRING);
  $filteredEmail = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);


	// $query = 'INSERT INTO personnel (firstName, lastName, jobTitle, email, departmentID) VALUES("Jack", "Morpeth", "Developer", "me@gmail.com", 1)';
  $query = 'INSERT INTO personnel (firstName, lastName, jobTitle, email, departmentID) VALUES("' . $filteredFirstName . '", "' . $filteredLastName. '", "'
                                                             . $filteredJobTitle . '", "'. $filteredEmail . '",'. $_REQUEST['departmentID'] .')';
//  $query = 'INSERT INTO personnel (firstName, lastName, jobTitle, email, departmentID) VALUES("' . $filteredFirstName . '", "' . $_REQUEST['lastName'] . '", "'
//  . $_REQUEST['jobTitle'] . '", "'. $_REQUEST['email'] . '",'. $_REQUEST['departmentID'] .')';

	$result = $conn->query($query);
	
	if (!$result) {

		$output['status']['code'] = "400";
		$output['status']['name'] = "executed";
		$output['status']['description'] = "query failed";	
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output); 

		exit;

	}

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data'] = [];
	
	mysqli_close($conn);

	echo json_encode($output); 

?>