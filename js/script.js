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
		cleanScreen('p');
		cleanScreen('q');
		cleanScreen('r');
		cleanScreen('s');
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

function cleanScreen(arg){
	while(document.getElementById(arg)){
		let ul = document.getElementById("ul" + arg.toUpperCase());
		ul.removeChild(document.getElementById(arg));
	}
}

function cuantasVar(){
	let total = 0;
	if(screen.value.indexOf("p") != -1){	
		total++;
	}
	if(screen.value.indexOf("q") != -1){	
		total++;
	}
	if(screen.value.indexOf("r") != -1){	
		total++;
	}
	if(screen.value.indexOf("s") != -1){	
		total++;
	}
	return total;
}

function mostrarF(arg){
	const ul = (arg == 'p') ? document.getElementById("ulP") : (arg == 'q') 
	? document.getElementById("ulQ") : (arg == 'r') ? document.getElementById("ulR") :
	 document.getElementById("ulS");  
		for(i = 0;i<Math.pow(2,cuantasVar());i++){
			let li = document.createElement("li");
			li.id = arg;
			if(arg == 'p'){
				if(i < (cuantasVar() * 4)/2){
					li.appendChild(document.createTextNode("V"));
				} else {
					li.appendChild(document.createTextNode("F"));
				}
			}
			if(arg == 'q'){
				if((i < (cuantasVar() * 4)/(cuantasVar()) || (i < (cuantasVar() * 4) 
				- ((cuantasVar() * 4)/cuantasVar()) && i > ((cuantasVar()*4)/2)-1))){
				li.appendChild(document.createTextNode("V"));
				} else {
				li.appendChild(document.createTextNode("F"));
				}
			}
			if(arg == 'r'){
				if(parseInt(i/2) %2 == 0){
				li.appendChild(document.createTextNode("V"));
				} else {
				li.appendChild(document.createTextNode("F"));
				}
			}
			if(arg == 's'){
				if(i % 2 == 0){
				li.appendChild(document.createTextNode("V"));
				} else {
				li.appendChild(document.createTextNode("F"));
				}
			}
			ul.appendChild(li);
		}
}

function res(){

}