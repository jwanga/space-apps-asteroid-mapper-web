jQuery(document).ready(function($){

		var socket = io.connect('http://localhost:8080');	

	$('.btn').each(function(){

		$(this).click(function(){

			var move = $(this).attr('data-move');

			socket.emit('moving', { my: move });

			console.log( move );

		})

	})



})