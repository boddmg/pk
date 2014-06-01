<!DOCTYPE html>
<html>
	<head>
		<title>人人大PK</title>
		<link rel="stylesheet" href="http://cdn.bootcss.com/twitter-bootstrap/3.0.3/css/bootstrap.min.css">
		<link rel="stylesheet" href="http://cdn.bootcss.com/twitter-bootstrap/3.0.3/css/bootstrap-theme.min.css">
		<script src="http://cdn.bootcss.com/jquery/1.10.2/jquery.min.js"></script>
		<script src="http://cdn.bootcss.com/twitter-bootstrap/3.0.3/js/bootstrap.min.js"></script>
	</head>
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
			$res_userinfo = $oauthApi->GET($access_url, $params);
			//print_r($res);
			$user_pro_url = "https://api.renren.com/v2/profile/get";
			$user_pro_res = $oauthApi->GET($user_pro_url, $params);

			$friend_list_url = "https://api.renren.com/v2/user/friend/list";
			$friend_list_params = array('access_token' => $access_token,
				'userId' => $access_user,
				'pageSize' => 10,
				'pageNumber' => 1
			);
			$res_friend_list = $oauthApi->GET($friend_list_url, $friend_list_params);
			//print_r($res_f);
		}else{
			echo "人人好友大PK应用出错啦！正在玩命修复中。";
		}
	?>
	<body>
		<div class="row" style="margin-top:5%">
			<div class="col-md-offset-1 col-md-4">
				<div class="table">
					<table class="table table-hover table-bordered">
						<tbody class="text-center">
							<tr>
								<td><p>姓名:</p><p id="name-0"></p></td>
								<td><img id="avatar-0"></img><img id="avatar-1" src=""></img></td>
								<td><p>姓名:</p><p id="name-1"></p></td>
							</tr>
							<tr>
								<td><p id="HP-0"></p></td>
								<td><p>HP</p></td>
								<td><p id="HP-1"></p></td>
							</tr>
							<tr>
								<td><p id="atk-0"></p></td>
								<td><p>攻击力</p></td>
								<td><p id="atk-1"></p></td>
							</tr>
							<tr>
								<td><p id="def-0"></p></td>
								<td><p>防御</p></td>
								<td><p id="def-1"></p></td>
							</tr>
							<tr>
								<td><p id="speed-0"></p></td>
								<td><p>速度</p></td>
								<td><p id="speed-1"></p></td>
							</tr>
							<tr>
								<td><p id="accurately-0"></p></td>
								<td><p>命中</p></td>
								<td><p id="accurately-1"></p></td>
							</tr>
							<tr>
								<td><p id="lucky-0"></p></td>
								<td><p>运气</p></td>
								<td><p id="lucky-1"></p></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="col-md-offset-0 col-md-4" style="border: 1px solid #ddd;">
				<p id="fight">
				</p>
			</div>
			<div class="col-md-offset-4 col-md-4">
				<button type="button" class="btn btn-default" onclick="movement(person1,person2)"  placeholder=".col-md-4">fight</button>
			</div>
		</div>
	</body>
	<footer>
		<script src="./js/project.js"></script>
		<script>
		var person1Data = {}
		person1Data.name = <?php echo $res_userinfo -> response -> name?>;
		person1Data.avatarAdd = <?php echo $res_userinfo -> response -> avatar[1] -> url?>;
		person1Data.visitorCount = <?php echo $user_pro_res -> response -> visitorCount?>;
		person1Data.statusCount = <?php echo $user_pro_res -> response -> statusCount?>;
		person1Data.blogCount = <?php echo $user_pro_res -> response -> blogCount?>;
		person1Data.albumCount = <?php echo $user_pro_res -> response -> albumCount?>;
		person1Data.shareCount = <?php echo $user_pro_res -> response -> shareCount?>;
		person1Data.pageCount = <?php echo $user_pro_res -> response -> pageCount?>;
		person1Data.zhanCount = <?php echo $user_pro_res -> response -> zhanCount?>;
		person1Data.musicCount = <?php echo $user_pro_res -> response -> musicCount?>;
		person1Data.movieCount = <?php echo $user_pro_res -> response -> movieCount?>;
		person1Data.photoCount = <?php echo $user_pro_res -> response -> photoCount?>;
		person1Data.friendCount = <?php echo $user_pro_res -> response -> friendCount?>;
		</script>
	</footer>
</html>