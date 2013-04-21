jQuery(document).ready(function($){

        // Vertical slider
        function createSlider(){
            $("#v-slider").slider({
                orientation: "vertical",
                range: "min",
                min: 0,
                max: 100,
                value: 50,
                slide: function (event, ui) {
                    $("#amount").val(ui.value);
                }
            });
            $("#amount").val($("#v-slider").slider("value"));
        }

        function sliderValue(e){

            var ele = $(e);
            var ele_sub = ele[0];
            ele_sub.setAttribute('data-magnitude', $("#v-slider").slider("value"));

        }

        createSlider();

	var socket = io.connect('http://localhost:8080');	

	$('.btn').each(function(){


		$(this).click(function(){

                        sliderValue(this);

			var move = $(this).attr('data-move');
                        var magnitude = $(this).attr('data-magnitude');

                        socket.emit('moving', { my: move , magnitude: magnitude });

                        console.log( move + ' by ' + magnitude);

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
