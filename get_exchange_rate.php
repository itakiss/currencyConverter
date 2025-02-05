<?php

error_reporting(E_ALL);
// Your API key
$api_key = 'cur_live_7q2w0szUc4cocbbLtOrnn4cwLPu6S54btDmLqWjD';

// Get the base currency and target currency from the query parameters
$base_currency = $_GET['base'];
$target_currency = $_GET['target'];

// Build the URL for the API request including the access key
$url = "https://api.exchangeratesapi.io/latest?access_key=$api_key&base=$base_currency&symbols=$target_currency";

// Make the API request
$response = file_get_contents($url);

// Output the response
header('Content-Type: application/json');
echo $response;
?>