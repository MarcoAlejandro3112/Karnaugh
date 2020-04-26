let screen = document.getElementById("screen");
let state = "";
let contador = 0;
let Pos = [0,0,0,0];



function sePuede(arg){
	if(arg == "(" || arg == ")"){
		return (state != "p" || state != "q" || state != "r" || state != "s");
	}
	//Caso que no sea parentesis
	if(state == "" || state == "v" || state == "~" || state == "^" || 
	state == "→" || state == "↔" || state == "("){
		return (arg == "p" || arg == "q" || arg == "r" || arg == "s");
	} else {
		return (arg != "p" || arg != "q" || arg != "r" || arg != "s");
	}
}

function mostrarEnPantalla(arg){ 
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
			state = screen.value.substr(screen.value.length-1,screen.value.length);
		}
		if(arg == "="){
			cleanScreen('p');
			cleanScreen('q');
			cleanScreen('r');
			cleanScreen('s');
			cleanScreen('func');
			if(screen.value.indexOf("p") != -1){ mostrarF('p');}
			if(screen.value.indexOf("q") != -1){ mostrarF('q');}
			if(screen.value.indexOf("r") != -1){ mostrarF('r');}
			if(screen.value.indexOf("s") != -1){ mostrarF('s');}
			res();
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
function cambiarContador(arg){
	contador = arg;
}
function Contador(){
	return contador;
}
function imprimirPatron(pos,size,element,i){
		cambiarContador(Contador() + 1);
		if(Contador() > 0){
			element.className = "V";
			element.appendChild(document.createTextNode("V"));
		} else {
			element.className = "F";
			element.appendChild(document.createTextNode("F"));
		}
		if(Contador() == size/(Math.pow(2,pos))){
			cambiarContador((size/(Math.pow(2,pos)))*(-1));
		}
}
function pos(){
	return Pos;
}
function cambiarPos(pos,val){
	if(pos == 5 && val == 5){
		Pos = [0,0,0,0];
	} else {
		Pos[pos] = val;
	}
}
function mostrarF(arg){
	const ul = document.getElementById("ul" + arg.toUpperCase());  
	let size = Math.pow(2,cuantasVar());
		for(i = 1;i<=size;i++){
			let li = document.createElement("li");
			li.id = arg;
			if(arg == 'p'){
				cambiarPos(0,1);
				imprimirPatron(pos()[0],size,li,i);
			}
			if(arg == 'q'){
				((pos().indexOf(1)) != -1 && pos().indexOf(1) != 1) ? cambiarPos(1,2) : cambiarPos(1,1);
				
				imprimirPatron(pos()[1],size,li,i);
			}
			if(arg == 'r'){
				(pos().indexOf(2) != -1 && pos().indexOf(2) != 2) ? cambiarPos(2,3) : (pos().indexOf(1) != -1 && pos().indexOf(1) != 2) ? cambiarPos(2,2) : cambiarPos(2,1);
				imprimirPatron(pos()[2],size,li,i);
			}
			if(arg == 's'){
				(pos().indexOf(3) != -1 && pos().indexOf(3) != 3) ? cambiarPos(3,4) : (pos().indexOf(2) != -1 && pos().indexOf(2) != 3) ? cambiarPos(3,3) : 
				(pos().indexOf(1) != -1 && pos().indexOf(1) != 3) ? cambiarPos(3,2) : cambiarPos(3,1);
				imprimirPatron(pos()[3],size,li,i);
			}
			ul.appendChild(li);
		}
		cambiarContador(0);
}

function O(a,b){
	let a1 = (a == "V") ? true : false;
	let b1 = (b == "V") ? true : false;
	return (a1 || b1) ? "V" : "F";
}

function Y(a,b){
	let a1 = (a == "V") ? true : false;
	let b1 = (b == "V") ? true : false;
	return (a1 && b1) ? "V" : "F";
}

function res(){
	cambiarPos(5,5);
	let cont = 0;
	let variables = new Stack();
	let funciones = new Stack();
	for(i = 0;i<screen.value.length;i++){
	if(screen.value[i] == 'p' || screen.value[i] == 'q' || screen.value[i] == 'r' || screen.value[i] == 's'){
		console.log(screen.value[i]);
		variables.push(screen.value[i]);
		cont++;
		if(cont % 2 != 0 && cont != 1){
				console.log("Stack Variables: " + variables.peek());
				let b = variables.peek();variables.pop();
				let a = variables.peek();variables.pop();
				let ulB = document.getElementById("ul" + b.toUpperCase()).childNodes;
				let ulA = document.getElementById("ul" + a.toUpperCase()).childNodes;
				console.log("A: " + a + " B: " + b);
				for(i = 5;i<=(Math.pow(2,cuantasVar()))+ 4;i++){
					if(funciones.peek() == "v"){
						let ulF = document.getElementById("ulFUNC");
						let liF = document.createElement("li");
						liF.id = "func";
						liF.appendChild(document.createTextNode(O(ulA[i].className,ulB[i].className).toString()));
						variables.push(O(ulA[i].className,ulB[i].className));
						ulF.appendChild(liF);
					}
				}
		}
	} else{
			funciones.push(screen.value[i]);
			console.log("Funciones: " + funciones.peek());
			cont++;
		}
		console.log("Cont: " + cont);
	}
	
}