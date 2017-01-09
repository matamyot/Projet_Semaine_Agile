$( function() {

	var newGameLinks = $(".NewGameLink");
	var buttons = $(".contentBox button");
	var content = $("#BG").find(".content");
  var nav = $("#nav");
	var location;

	newGameLinks.click( function() {

		startGame();

	});

	buttons.click( function() {

	});

	function goToKey(key) {

		location = "html/" + key + ".html";

			$(".content").load(location,  function(responseTxt, statusTxt, xhr) {
	      if(statusTxt == "success")

	          console.log("AJAX : " + location);

						/* - Re-attachement de l'event handler puisqu'on recharge un bout de la page qui contient des boutons - */

	          reloadEvents();


	      if(statusTxt == "error")
	          alert("Error: " + xhr.status + ": " + xhr.statusText + ", location : " + location);
	    });

	}

	function startGame() {

		goToKey("start");

	}

	function endGame() {

	}

	function reloadEvents() {

    buttons = $(".content button");

    buttons.click( function() {

      goto = $(this).attr("go");
      goToKey(goto);
    } );

  }

} );
