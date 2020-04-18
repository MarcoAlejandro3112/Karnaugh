<<<<<<< Updated upstream
=======
let screen = document.getElementById("screen");
let state = "";

function sePuede(arg){
	if(state == "" || state == "v" || state == "~" || state == "^" || 
	state == "→" || state == "↔"){
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
		if(arg == "AC"){
			screen.value = "";
			state = "";
		}
		if(arg == "DEL"){
			let nScreen = screen.value.substr(0,screen.value.length-1);
			screen.value = nScreen;
			state = screen.value.substr(screen.value.length-1,screen.value.length);;
		}
	}
}

function mostrarF(arg){
	const ulP = document.getElementById("ulP");
	const ulQ = document.getElementById("ulQ"); 
	const ulR = document.getElementById("ulR"); 
	const ulS = document.getElementById("ulS");
	if(ulP = ""){
		for(i = 0;i<9;i++){
			let li = document.createElement("li");
			ulP.appendChild(li);
			li.appendChild(document.createTextNode("V"));

		}
	}
}

function res(){

}
>>>>>>> Stashed changes
