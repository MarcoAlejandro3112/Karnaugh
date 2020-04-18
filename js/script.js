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
	if(arg == "="){
			if(screen.value.indexOf("p") != -1){ mostrarF('p');}
			if(screen.value.indexOf("q") != -1){ mostrarF('q');}
			if(screen.value.indexOf("r") != -1){ mostrarF('r');}
			if(screen.value.indexOf("s") != -1){ mostrarF('s');}
	}
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
	const ul = (arg == 'p') ? document.getElementById("ulP") : (arg == 'q') 
	? document.getElementById("ulQ") : (arg == 'r') ? document.getElementById("ulR") :
	 document.getElementById("ulS");  
		for(i = 0;i<8;i++){
			let li = document.createElement("li");
			ul.appendChild(li);
			li.appendChild(document.createTextNode("V"));
		}
}

function res(){

}