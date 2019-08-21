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
	
	
	<title>Document</title>
</head>
<body>
	<section id="app">
		<header-component title="客戶管理"></header-component>
		<section class="content width-limiter">
			
			<list-component type="customers" :call="['MA002','time']"></list-component>
		</section>
		<overlay-component v-if="$store.state.overlayVisible" :overlay-data="$store.state.overlayData"></overlay-component>
		<div class="overlay-mask" v-if="$store.state.overlayMask"></div>
	</section>
	
</body>
</html>