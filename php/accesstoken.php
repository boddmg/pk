<?php
session_start();
?>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" href="./css/style.css">
<title>人人好友大PK</title>
</head>
<body>
<?php
$code = $_GET["code"];
require_once './class/config.inc.php';
require_once './class/RenrenOAuthApiService.class.php';
require_once './class/RenrenRestApiService.class.php';

if($code){
	//获取accesstoken
	$oauthApi = new RenrenOAuthApiService;
	$post_params = array('client_id'=>$config->APIKey,
		'client_secret'=>$config->SecretKey,
		'client_id'=>$config->APIKey,
		'redirect_uri'=>$config->redirecturi,
		'grant_type'=>'authorization_code',
		'code'=>$code
		);
	$token_url='http://graph.renren.com/oauth/token';
	$access_info=$oauthApi->GET($token_url,$post_params);//使用code换取token
	// print_r($access_info);
	//$access_info=$oauthApi->rr_post_fopen($token_url,$post_params);//如果你的环境无法支持curl函数，可以用基于fopen函数的该函数发送请求
	$access_token = $access_info -> access_token;
	$access_user = $access_info -> user -> id;
	$access_url = "https://api.renren.com/v2/user/get";
	$params = array('access_token' => $access_token,
									'userId' => $access_user
								);
	$res = $oauthApi->GET($access_url, $params);
	//print_r($res);
	$friend_list_url = "https://api.renren.com/v2/user/friend/list";
	$friend_list_params = array('access_token' => $access_token,
									'userId' => $access_user,
									'pageSize' => 10,
									'pageNumber' => 1
								);
	$res_f = $oauthApi->GET($friend_list_url, $friend_list_params);
	//print_r($res_f);
}else{
	echo "人人好友大PK应用出错啦！正在玩命修复中。";
}
?>
<img src=<?php echo $res -> response -> avatar[1] -> url?> alt="">
<h1><?php echo $res -> response -> name?></h1>
<h2>VS</h2>
<?php
$params_f = array('access_token' => $access_token,
									'userId' => 248677124
								);
$res_f_info = $oauthApi->GET($access_url, $params_f);
?>
<img src=<?php echo $res_f_info -> response -> avatar[1] -> url?> alt="">
<h1><?php echo $res_f_info -> response -> name?></h1>
</body>
</html>