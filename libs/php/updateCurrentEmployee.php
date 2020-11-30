<?php

	// example use from browser
	// use insertDepartment.php first to create new dummy record and then specify it's id in the command below
	// http://localhost/companydirectory/libs/php/deleteDepartmentByID.php?id= <id>

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
  
  $filteredFirstName = filter_var($_POST['firstName'], FILTER_SANITIZE_STRING);
  $filteredLastName = filter_var($_POST['lastName'], FILTER_SANITIZE_STRING);
  $filteredJobTitle = filter_var($_POST['jobTitle'], FILTER_SANITIZE_STRING);
  $filteredEmail = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);


	// $_REQUEST used for development / debugging. Remember to cange to $_POST for production

  $query = 'UPDATE personnel SET firstName = "'. $filteredFirstName.'", lastName = "'. $filteredLastName.
                                              '", jobTitle = "'. $filteredJobTitle.'", email = "'. $filteredEmail.
                                              '", departmentID = '. $_POST['departmentID'].' WHERE id = ' . $_POST['employeeID'];

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

