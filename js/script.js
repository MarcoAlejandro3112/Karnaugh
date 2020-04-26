let screen = document.getElementById("screen");
let state = "";
let contador = 0;
let Pos = [0,0,0,0];
var ValoresP = [];
var	ValoresQ = [];
var	ValoresR = [];
var	ValoresS = [];


sePuede = (arg) =>{
	console.log("state: " + state);
	if(state == "" || state == "v" || state == "^" || 
	state == "→" || state == "↔" || state == "~"){
		return (arg == "p" || arg == "q" || arg == "r" || arg == "s" || arg == "(" || arg == "~");
	} else {
		return (arg == "p" || arg == "q" || arg == "r" || arg == "s") ? false : true;
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
function imprimirPatron(pos,size,element,i,variable){
		cambiarContador(Contador() + 1);
		if(Contador() > 0){
			switch(variable){
				case 'p' : ValoresP.push(1);
				break;
				case 'q' : ValoresQ.push(1);
				break;
				case 'r' : ValoresR.push(1);
				break;
				case 's' : ValoresS.push(1);
				break;
			}
			element.appendChild(document.createTextNode("V"));
		} else {
			switch(variable){
				case 'p' : ValoresP.push(0);
				break;
				case 'q' : ValoresQ.push(0);
				break;
				case 'r' : ValoresR.push(0);
				break;
				case 's' : ValoresS.push(0);
				break;
			}
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
				imprimirPatron(pos()[0],size,li,i,'p');
			}
			else if(arg == 'q'){
				((pos().indexOf(1)) != -1 && pos().indexOf(1) != 1) ? cambiarPos(1,2) : cambiarPos(1,1);
				
				imprimirPatron(pos()[1],size,li,i,'q');
			}
			else if(arg == 'r'){
				(pos().indexOf(2) != -1 && pos().indexOf(2) != 2) ? cambiarPos(2,3) : (pos().indexOf(1) != -1 && pos().indexOf(1) != 2) ? cambiarPos(2,2) : cambiarPos(2,1);
				imprimirPatron(pos()[2],size,li,i,'r');
			}
			else if(arg == 's'){
				(pos().indexOf(3) != -1 && pos().indexOf(3) != 3) ? cambiarPos(3,4) : (pos().indexOf(2) != -1 && pos().indexOf(2) != 3) ? cambiarPos(3,3) : 
				(pos().indexOf(1) != -1 && pos().indexOf(1) != 3) ? cambiarPos(3,2) : cambiarPos(3,1);
				imprimirPatron(pos()[3],size,li,i,'s');
			}
			ul.appendChild(li);
		}
		cambiarContador(0);
}

resetearValores = () => {
	ValoresP = [];
	ValoresQ = [];
	ValoresS = [];
	ValoresR = [];
}
resolverOperacion = (enunciado,posicionFila) => {
	let arrAux = enunciado.split("");
	console.log("Valores Q: " + ValoresQ);
	for(i = 0;i<enunciado.length;i++){
		if(arrAux[i] == "p" || arrAux[i] == "q" || arrAux[i] == "r" || arrAux[i] == "s"){
			let valores = (arrAux[i] == "p") ? ValoresP : (arrAux[i] == "q") ? ValoresQ : (arrAux[i] == "r") ? ValoresR : ValoresS;
			console.log("Valores: " + valores);
			arrAux[i] = valores[posicionFila];
		} else if (arrAux[i] != "(" && arrAux[i] != ")"){
			if(arrAux[i] == "v"){
				arrAux[i] = " || ";
			} else if(arrAux[i] == "^"){
				arrAux[i] = " && ";
			} else if(arrAux[i] == "~"){
				arrAux[i] = " !";
			} else if(arrAux[i] == "→"){
				arrAux[i - 1] += ")";
				for(let j = 0;j<=i;j++){
					if(arrAux[i - j] == ")" || j == i){
						arrAux[i - j] = "!(" + arrAux[i-j];
					}
				}
				arrAux[i] = " || ";
			} else if(arrAux[i] == "↔"){
				arrAux[i - 1] += ")";
				for(let j = 0;j<=i;j++){
					if(arrAux[i - j] == ")" || j == i){
						arrAux[i - j] = "!(" + arrAux[i-j];
					}
				}
				arrAux[i] = "^";
			}
		}
	}
	console.log(arrAux);
	let nuevoEnunciado = arrAux.join("");
	console.log("ENUNCIADO: " + nuevoEnunciado);
	return (eval(nuevoEnunciado)) ? "V" : "F";
}
mostrarResultados = () => {
	for(let i = 0;i<(Math.pow(2,cuantasVar()));i++){
		let ulF = document.getElementById("ulFUNC");
		let liF = document.createElement("li");
		liF.id = "func";
		liF.appendChild(document.createTextNode(resolverOperacion(screen.value,i)));
		ulF.appendChild(liF);	
	}
}
function res(){
	cambiarPos(5,5);
	mostrarResultados();


	resetearValores();
}