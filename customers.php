<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<?php
	$root = $_SERVER['DOCUMENT_ROOT']."/ec-vue";
	include($root."/inc/head.php");
	echo $css;
	echo $js;
	?>
	<script src="components/filterComponent.js"></script>
	
	<title>Document</title>
</head>
<body>
	<section id="app">
		<header-component title="客戶管理"></header-component>
		<section class="content">
			<filter-component></filter-component>
			<list-component type="customers"></list-component>
		</section>
	</section>
	
</body>
</html>