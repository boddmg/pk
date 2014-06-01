<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>人人好友大PK</title>
<link href="css/style.css" rel="stylesheet" type="text/css" /> 
</head>

<body>
	<?php 
		require_once './class/config.inc.php'; 
		header("Location: https://graph.renren.com/oauth/authorize?client_id=".$config->APPID."&redirect_uri=".$config->redirecturi."&response_type=code&display=page");
	?>
</body>
</html>
