let screen = document.getElementById("screen");
let state = "";
function sePuede(arg){
	if(state == "" || state == "v" || state == "~" || state == "^" || 
	state == "→"){
		return (arg == "p" || arg == "q" || arg == "r" || arg == "s")  ? true : false;
	} else {
		return (arg == "p" || arg == "q" || arg == "r" || arg == "s")  ? false : true;
	}
}

function a(arg){ 
	if(sePuede(arg) && arg != "=" && arg != "AC" && arg != "DEL"){
		screen.value += arg;
		state = arg;
	} else {
		return;
	}
}