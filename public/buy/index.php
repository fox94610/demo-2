<?php
		// Need PHPMailer trouble shooting info? Swap following in html and uncomment below lines - <form action="/php/emailscript.php" method="post" id="requestForm">

		//error_reporting(E_ALL);
		//ini_set('display_errors', 1);

		require_once('PhpConsole/__autoload.php');

		// Debugger - requires chrome plugin, outputs to chrome dev tools
		// https://github.com/barbushin/php-console
		PhpConsole\Helper::register();

		PC::db("V10 ~~~~~~~~~~~");
		if (isset($_POST) && !empty($_POST)) {
			PC::db($_POST);
			PC::db("|||||||||||| Success");
			echo '{"postSuccess":true}';
		} else {
			PC::db("|||||||||||| Fail");
			echo '{"postSuccess":false}';
		}
?>
