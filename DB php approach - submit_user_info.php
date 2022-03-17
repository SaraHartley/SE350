<?php
// Importing DBConfig.php file.
require_once 'DBConfig.php';
// Creating connection.
 $con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);
 $name= $email=$phone_number= "";

echo "printing json before:";
$json="empty string";
echo $json;
echo "printing json after:";
 // Getting the received JSON into $json variable.
 $json = file_get_contents('php://input');
 echo $json;
 // decoding the received JSON and store into $obj variable.
 $obj = json_decode($json,true);

/*$json1 = '{"foo-bar": 12345, "name": "John"}';

$obj1 = json_decode($json1);
print $obj1->{'foo-bar'}; 
print $obj1->{'name'}; */
 	
 // Populate name from JSON $obj array and store into $name.
$name = $obj['name'];
// Populate email from JSON $obj array and store into $email.
$email = $obj['email'];
// Populate phone number from JSON $obj array and store into $phone_number.
$phone_number = $obj['phone_number'];
 // Creating SQL query and insert the record into MySQL database table.
$Sql_Query = "insert into UserInfoTable (name,email,phone_number) values ('$name','$email','$phone_number')";
 
 if(mysqli_query($con,$Sql_Query)){
  // If the record inserted successfully then show the message.
$MSG = 'Data Inserted Successfully into MySQL Database' ;
// Converting the message into JSON format.
$json = json_encode($MSG);
// Echo the message.
 echo $json ;
 }else{
 echo 'Try Again';
 }
 mysqli_close($con);
?>
