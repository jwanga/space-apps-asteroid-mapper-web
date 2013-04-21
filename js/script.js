jQuery(document).ready(function($){

	var socket = io.connect('http://localhost:8080');	

	$('.btn').each(function(){

		$(this).click(function(){

			var move = $(this).attr('data-move');

			socket.emit('moving', { my: move });


			console.log( move );

		})

	})

	// io.sockets.on('connection', function (socket) {

		socket.on('moving-back', function(data){

			var height = $('#console').get(0).scrollHeight; 

			console.log( );

			$('#console').append( "<p>" + data + "</p>").scrollTop( height);


		})

	// })


})