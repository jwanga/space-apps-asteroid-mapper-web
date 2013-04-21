jQuery(document).ready(function($){

        my_combos = [
            {
                "keys"          : "q",
                "is_exclusive"  : true,
                "on_keydown" : function() { $('#counter-clockwise').trigger('click'); },
                "on_keyup"   : function() { $('#steady').trigger('click'); }
            },
            {
                "keys"          : "e",
                "is_exclusive"  : true,
                "on_keydown" : function() { $('#clockwise').trigger('click'); },
                "on_keyup"   : function() { $('#steady').trigger('click'); }
            },
            {
                "keys"          : "w",
                "is_exclusive"  : true,
                "on_keydown" : function() { $('#front').trigger('click'); },
                "on_keyup"   : function() { $('#steady').trigger('click'); }
            },
            {
                "keys"          : "s",
                "is_exclusive"  : true,
                "on_keydown" : function() { $('#back').trigger('click'); },
                "on_keyup"   : function() { $('#steady').trigger('click'); }
            },
            {
                "keys"          : "a",
                "is_exclusive"  : true,
                "on_keydown" : function() { $('#left').trigger('click'); },
                "on_keyup"   : function() { $('#steady').trigger('click'); }
            },
            {
                "keys"          : "d",
                "is_exclusive"  : true,
                "on_keydown" : function() { $('#right').trigger('click'); },
                "on_keyup"   : function() { $('#steady').trigger('click'); }
            },
            {
                "keys"          : "j",
                "is_exclusive"  : true,
                "on_keydown" : function() { $('#down').trigger('click'); },
                "on_keyup"   : function() { $('#steady').trigger('click'); }
            },
            {
                "keys"          : "k",
                "is_exclusive"  : true,
                "on_keydown" : function() { $('#up').trigger('click'); },
                "on_keyup"   : function() { $('#steady').trigger('click'); }
            },
        ];

        keypress.register_many(my_combos);


        ////////////////////////////
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
