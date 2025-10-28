<?php
// Smart Factory Website Override
// This file bypasses WordPress and serves our static site

// Set proper headers
header('Content-Type: text/html; charset=UTF-8');
header('X-Powered-By: Smart Factory IO');

// Read and output our static HTML file
$htmlFile = __DIR__ . '/site/index.html';
if (file_exists($htmlFile)) {
    echo file_get_contents($htmlFile);
} else {
    // Fallback HTML if file not found
    echo '<!DOCTYPE html>
<html><head><title>Smart Factory</title></head>
<body style="font-family: Arial; text-align: center; padding: 50px;">
<h1>Smart Factory Website Loading...</h1>
<p>Please visit: <a href="/site/">Smart Factory Site</a></p>
</body></html>';
}
exit();
?>