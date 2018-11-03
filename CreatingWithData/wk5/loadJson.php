<?php
# your database credentials
$db = new mysqli('localhost', 'c2bladen_cern', 'treaclemog123', 'c2bladen_testDatabase');
# check our connection to the database and return error if broken
if($db->connect_errno > 0){
  die('Unable to connect to database [' . $db->connect_error . ']');
}

# select all the data from the table my_table
$sql = "SELECT * FROM myTable";

# check our query will actually run
if(!$result = $db->query($sql)){
  die('There was an error running the query [' . $db->error . ']');
}

# loop through all the rows in the table
while($row = mysqli_fetch_assoc($result))
      $resultArray[] = $row;

# return the array as a JSON
echo json_encode($resultArray,JSON_NUMERIC_CHECK);

# close the connection to your database
$db->close();
?>
