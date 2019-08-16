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

		<header-component title="寄庫資料"></header-component>
		<section class="content">
			<filter-component type="posting"></filter-component>
			<list-component 
				type="posting" 
				:call="['MA001', 'MA002']" 
				:extended="['MB002','count', 'gift', 'date']">
			</list-component>
		</section>
		<overlay-component v-if="$store.state.overlayVisible" :overlay-data="$store.state.overlayData"></overlay-component>
		<div class="overlay-mask" v-if="$store.state.overlayMask"></div>
	</section>
	
</body>
</html>