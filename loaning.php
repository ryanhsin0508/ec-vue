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

		<header-component title="借出資料"></header-component>
		<section class="content width-limiter">
			<list-component 
				type="loaning" 
				:call="['MA002', 'MA001']" 
				:extended="['MB002', 'p_number', 'count', 'gift', 'date']">
			</list-component>
		</section>
		<overlay-component v-if="$store.state.overlayVisible" :overlay-data="$store.state.overlayData"></overlay-component>
		<div class="overlay-mask" v-if="$store.state.overlayMask"></div>
	</section>
	
</body>
</html>