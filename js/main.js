$( function() {

	var buttons = $(".story button");
  var nav = $("#nav");
  var newGameLink = nav.find("#newGameLink")
  var life = nav.find("#hp");

  var actionItem;
  var action;
	var futureAction;
  var location;

  var user;
  var goto;

	buttons.click( function() {

    goto = $(this).attr("go");
    gotoSection(goto);
	});

  newGameLink.click( function() {

    gotoSection("start");
  });

	function gotoSection(key) {

    if(key == "start"){
      startGame();
    }

    /* - Traitement de l'emplacement de la prochaine page - */

    location = "story/" + key + ".html";

    /* - Traitement d'une action sur la page - */

    doCurrentAction();

		getFutureAction();

    /* - Traitement du chargement de la prochaine page - */

    $(".content").load(location,  function(responseTxt, statusTxt, xhr) {
      if(statusTxt == "success")

          console.log("Arrivée sur la page : " + location);

          /* - Re-attachement de l'event handler puisqu'on recharge un bout de la page qui contient des boutons - */

          reloadEvents();

          /* - Traitement de l'action en arrivant sur la page chargée - */

          doFutureAction(futureAction);

      if(statusTxt == "error")
          alert("Error: " + xhr.status + ": " + xhr.statusText);
    });

	}

	function isset(value)
	{
		if ( typeof(value) == "undefined" || value == null) {
		return false;
	} else {
		return true;
		}
	}

	function getLife() {
		return user["hp"];
	}

	function setLife(v) {
    user["hp"] = v;
		life.text(v);
	}

  function setName(name){
    user["name"] = name;
  }

  function getName(){
    return user["name"];
  }

	function loseOneLife() {

    var hp = user["hp"];
		if(hp > 0){
      hp = --hp;
    }

    user["hp"] = hp;
    life.text(hp);
	}

  function doCurrentAction(){

    actionItem = $(".story actionBefore");
    action = actionItem.attr("name");

		if(isset(action)){

			doAction(action);
		}

	}

	function getFutureAction(){

		actionItem = $(".story actionAfter");
    action = actionItem.attr("name");

		if(isset(action)){

			futureAction = action;

			actionItem = null;
			action = null;
		}

	}

	function doFutureAction(futureAction){

		if(isset(futureAction)){

			doAction(futureAction);

			futureAction = null;
		}


	}

  function doAction(action) {

    switch (action) {
      case "hit":
        loseOneLife();
        break;

      case "saveName":

				var nameInput = $("#nom");
				var name = nameInput.val();

        setName(name);

        break;

			case "showName":

				var nameSpan = $("#nameSpan");

				nameSpan.text(getName());

        break;

      default:
        //alert("Pas d'action de ce nom !")
        break;
    }

  }

  function reloadEvents() {

    buttons = $(".story button");

    buttons.click( function() {

      goto = $(this).attr("go");
      gotoSection(goto);
    } );

  }

	function startGame() {

    user = {
      name:"John",
      hp:0}

    setLife(5);
	}

	function endGame() {
		//...
	}

} );
