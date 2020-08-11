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
	state == "→" || state == "↔" || state == "~" || state == "("){
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
			/*p=false
			q=false
			r=false
			s=false*/
		}
		if(arg == "DEL"){
			let nScreen = screen.value.substr(0,screen.value.length-1);
			screen.value = nScreen;
			state = screen.value.substr(screen.value.length-1,screen.value.length);
		}
		if(arg == "="){
			
			//REMOVER LOS RESULTADOS DEL LOCALSTORAGE
			localStorage.removeItem('resultados')

			cleanScreen('p');
			cleanScreen('q');
			cleanScreen('r');
			cleanScreen('s');
			cleanScreen('func');
			if(screen.value.indexOf("p") != -1){ 
				mostrarF('p');
				//p = true
			}
			if(screen.value.indexOf("q") != -1){ 
				mostrarF('q');
				//q=true
			}
			if(screen.value.indexOf("r") != -1){ 
				mostrarF('r');
				//r=true
			}
			if(screen.value.indexOf("s") != -1){ 
				mostrarF('s');
				//s=true
			}
			res();
			document.getElementById("map1").style.display = "none"
			document.getElementById("map2").style.display = "none"
			document.getElementById("map3").style.display = "none"
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
			}
		}

	}

	let nuevoEnunciado = arrAux.join("");
	console.log("ENUNCIADO: " + nuevoEnunciado);

	let resultados_storage = JSON.parse(localStorage.getItem('resultados'))
	if(!resultados_storage) {
		resultados_storage = []
		resultados_storage.push(eval(nuevoEnunciado) ? '1': '0')
	} else {
		resultados_storage.push(eval(nuevoEnunciado) ? '1': '0')
	}
	
	localStorage.setItem('resultados', JSON.stringify(resultados_storage))

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
function generarMatriz(){
	let mapaKar = [[]];
	let columnas = (cuantasVar() == 4 || cuantasVar() == 3) ? 4 : 2;
	let filas = (cuantasVar() == 3 || cuantasVar() == 2) ? 2 : 4;
	console.log("Col: " + columnas + " Fila: " + filas);
	for(let i = 0; i< filas; i++){
		let filaValores = [];
		for(let j = 0; j< columnas; j++){
			let valor = document.getElementById("map" + (cuantasVar()-1).toString() + "-" + (i+1).toString() + (j+1).toString());
			let valorI = parseInt(valor.textContent);
			filaValores.push(valorI);
		}
		mapaKar[i] = filaValores;
	}
	return mapaKar;
}
function cuantosUno(arg){
	let cuantosUno = 0;
	let columnas = (cuantasVar() == 4 || cuantasVar() == 3) ? 4 : 2;
	let filas = (cuantasVar() == 3 || cuantasVar() == 2) ? 2 : 4;
	for(i = 0;i<filas;i++){
		for(j = 0; j< columnas; j++){
			if(arg[i][j] == 1)
				cuantosUno++;
		}
	}
	console.log("CUANTOSUNO: " + cuantosUno);
	return cuantosUno;
}
function rellenarComb(){
	let comb = [[]];
	let columnas = (cuantasVar() == 4 || cuantasVar() == 3) ? 4 : 2;
	let filas = (cuantasVar() == 3 || cuantasVar() == 2) ? 2 : 4;
	for(i = 0;i<filas;i++){
		let filaValores = [];
		for(j = 0; j< columnas; j++){
			filaValores.push(false);
		}
		comb[i] = filaValores;
	}
	return comb;
}
function simplificar(){
	let mapaKar = generarMatriz();
	console.log(mapaKar);
	let cuantos1 = cuantosUno(mapaKar);
	let result = " ";
	let yaTienenComb = rellenarComb();
	let columnas = (cuantasVar() == 4 || cuantasVar() == 3) ? 4 : 2;
	let filas = (cuantasVar() == 3 || cuantasVar() == 2) ? 2 : 4;
	if(cuantos1 >= 8){
		if(mapaKar[0][0] == 1 && (mapaKar[0][0] == mapaKar[0][1] && mapaKar[0][0] == mapaKar[0][2] && mapaKar[0][0] == mapaKar[0][3] && mapaKar[0][0] == mapaKar[3][0] && mapaKar[0][0] == mapaKar[3][1] && mapaKar[0][0] == mapaKar[3][2] && mapaKar[0][0] == mapaKar[3][3])){
			result += "Q' + ";
			yaTienenComb[0][0] = true;
			yaTienenComb[0][1] = true;
			yaTienenComb[0][2] = true;
			yaTienenComb[0][3] = true;
			yaTienenComb[3][0] = true;
			yaTienenComb[3][1] = true;
			yaTienenComb[3][2] = true;
			yaTienenComb[3][3] = true;
		}
		if(mapaKar[0][0] == 1 && (mapaKar[0][0] == mapaKar[1][0] && mapaKar[0][0] == mapaKar[2][0] && mapaKar[0][0] == mapaKar[3][0] && mapaKar[0][0] == mapaKar[0][3] && mapaKar[0][0] == mapaKar[1][3] && mapaKar[0][0] == mapaKar[2][3] && mapaKar[0][0] == mapaKar[3][3])){
			result += "S' + ";
			yaTienenComb[0][0] = true;
			yaTienenComb[1][0] = true;
			yaTienenComb[2][0] = true;
			yaTienenComb[3][0] = true;
			yaTienenComb[0][3] = true;
			yaTienenComb[1][3] = true;
			yaTienenComb[2][3] = true;
			yaTienenComb[3][3] = true;
		}
		if(mapaKar[0][0] == 1 && (mapaKar[0][0] == mapaKar[0][1] && mapaKar[0][0] == mapaKar[0][2] && mapaKar[0][0] == mapaKar[0][3] && mapaKar[0][0] == mapaKar[1][0] && mapaKar[0][0] == mapaKar[1][1] && mapaKar[0][0] == mapaKar[1][2] && mapaKar[0][0] == mapaKar[1][3])){
			result += "P' + ";
			yaTienenComb[0][0] = true;
			yaTienenComb[0][1] = true;
			yaTienenComb[0][2] = true;
			yaTienenComb[0][3] = true;
			yaTienenComb[1][0] = true;
			yaTienenComb[1][1] = true;
			yaTienenComb[1][2] = true;
			yaTienenComb[1][3] = true;
		}
		if(mapaKar[1][0] == 1 && (mapaKar[1][0] == mapaKar[1][1] && mapaKar[1][0] == mapaKar[1][2] && mapaKar[1][0] == mapaKar[1][3] && mapaKar[1][0] == mapaKar[2][0] && mapaKar[1][0] == mapaKar[2][1] && mapaKar[1][0] == mapaKar[2][2] && mapaKar[1][0] == mapaKar[2][3])){
			result += "Q + ";
			yaTienenComb[1][0] = true;
			yaTienenComb[1][1] = true;
			yaTienenComb[1][2] = true;
			yaTienenComb[1][3] = true;
			yaTienenComb[2][0] = true;
			yaTienenComb[2][1] = true;
			yaTienenComb[2][2] = true;
			yaTienenComb[2][3] = true;
		}
		if(mapaKar[2][0] == 1 && (mapaKar[2][0] == mapaKar[2][1] && mapaKar[2][0] == mapaKar[2][2] && mapaKar[2][0] == mapaKar[2][3] && mapaKar[2][0] == mapaKar[3][0] && mapaKar[2][0] == mapaKar[3][1] && mapaKar[2][0] == mapaKar[3][2] && mapaKar[2][0] == mapaKar[3][3])){
			result += "P + ";
			yaTienenComb[2][0] = true;
			yaTienenComb[2][1] = true;
			yaTienenComb[2][2] = true;
			yaTienenComb[2][3] = true;
			yaTienenComb[3][0] = true;
			yaTienenComb[3][1] = true;
			yaTienenComb[3][2] = true;
			yaTienenComb[3][3] = true;
		}
		if(mapaKar[0][0] == 1 && (mapaKar[0][0] == mapaKar[1][0] && mapaKar[0][0] == mapaKar[2][0] && mapaKar[0][0] == mapaKar[3][0] && mapaKar[0][0] == mapaKar[0][1] && mapaKar[0][0] == mapaKar[1][1] && mapaKar[0][0] == mapaKar[2][1] && mapaKar[0][0] == mapaKar[3][1])){
			result += "R' + ";
			yaTienenComb[0][0] = true;
			yaTienenComb[1][0] = true;
			yaTienenComb[2][0] = true;
			yaTienenComb[3][0] = true;
			yaTienenComb[0][1] = true;
			yaTienenComb[1][1] = true;
			yaTienenComb[2][1] = true;
			yaTienenComb[3][1] = true;
		}
		if(mapaKar[0][1] == 1 && (mapaKar[0][1] == mapaKar[0][2] && mapaKar[0][1] == mapaKar[1][1] && mapaKar[0][1] == mapaKar[1][2] && mapaKar[0][1] == mapaKar[2][1] && mapaKar[0][1] == mapaKar[2][2] && mapaKar[0][1] == mapaKar[3][1] && mapaKar[0][1] == mapaKar[3][2])){
			result += "S + ";
			yaTienenComb[0][1] = true;
			yaTienenComb[0][2] = true;
			yaTienenComb[1][1] = true;
			yaTienenComb[1][2] = true;
			yaTienenComb[2][1] = true;
			yaTienenComb[2][2] = true;
			yaTienenComb[3][1] = true;
			yaTienenComb[3][2] = true;
		}
		if(mapaKar[0][2] == 1 && (mapaKar[0][2] == mapaKar[0][3] && mapaKar[0][2] == mapaKar[1][2] && mapaKar[0][2] == mapaKar[1][3] && mapaKar[0][2] == mapaKar[2][2] && mapaKar[0][2] == mapaKar[2][3] && mapaKar[0][2] == mapaKar[3][2] && mapaKar[0][2] == mapaKar[3][3])){
			result += "R + ";
			yaTienenComb[0][2] = true;
			yaTienenComb[0][3] = true;
			yaTienenComb[1][2] = true;
			yaTienenComb[1][3] = true;
			yaTienenComb[2][2] = true;
			yaTienenComb[2][3] = true;
			yaTienenComb[3][2] = true;
			yaTienenComb[3][3] = true;
		}
	}
	if(cuantos1 >= 4){
		if(cuantasVar() == 4){
		    if(yaTienenComb[0][0] === false || yaTienenComb[0][1] === false || yaTienenComb[3][0] === false || yaTienenComb[3][1] === false){
			    if(mapaKar[0][0] == 1 && (mapaKar[0][0] == mapaKar[0][1] && mapaKar[0][0] == mapaKar[3][0] && mapaKar[0][0] == mapaKar[3][1])){
				    result += "Q'R' + ";
				    yaTienenComb[0][0] = true;
					yaTienenComb[0][1] = true;
					yaTienenComb[3][0] = true;
					yaTienenComb[3][1] = true;
			    }
		    }
			if(yaTienenComb[0][1] === false || yaTienenComb[0][2] === false || yaTienenComb[3][1] === false || yaTienenComb[3][2] === false){
				if(mapaKar[0][1] == 1 && (mapaKar[0][1] == mapaKar[0][2] && mapaKar[0][1] == mapaKar[3][1] && mapaKar[0][1] == mapaKar[3][2])){
					result += "Q'S + ";
					yaTienenComb[0][1] = true;
					yaTienenComb[0][2] = true;
					yaTienenComb[3][1] = true;
					yaTienenComb[3][2] = true;
				}
			}
			if(yaTienenComb[0][2] === false || yaTienenComb[0][3] === false || yaTienenComb[3][2] === false || yaTienenComb[3][3] === false){
				if(mapaKar[0][2] == 1 && (mapaKar[0][2] == mapaKar[0][3] && mapaKar[0][2] == mapaKar[3][2] && mapaKar[0][2] == mapaKar[3][3])){
					result += "Q'R + ";
					yaTienenComb[0][2] = true;
					yaTienenComb[0][3] = true;
					yaTienenComb[3][2] = true;
					yaTienenComb[3][3] = true;
				}
			}
			
			if(yaTienenComb[1][0] === false || yaTienenComb[2][0] === false || yaTienenComb[1][3] === false || yaTienenComb[2][3] === false){
				if(mapaKar[1][0] == 1 && (mapaKar[1][0] == mapaKar[2][0] && mapaKar[1][0] == mapaKar[1][3] && mapaKar[1][0] == mapaKar[2][3])){
					result += "QS' + ";
					yaTienenComb[1][0] = true;
					yaTienenComb[2][0] = true;
					yaTienenComb[1][3] = true;
					yaTienenComb[2][3] = true;
				}
		    }
		    if(yaTienenComb[1][0] === false || yaTienenComb[2][0] === false || yaTienenComb[1][1] === false || yaTienenComb[2][1] === false){
				if(mapaKar[1][0] == 1 && (mapaKar[1][0] == mapaKar[2][0] && mapaKar[1][0] == mapaKar[1][1] && mapaKar[1][0] == mapaKar[2][1])){
					result += "QR' + ";
					yaTienenComb[1][0] = true;
					yaTienenComb[2][0] = true;
					yaTienenComb[1][1] = true;
					yaTienenComb[2][1] = true;
				}
		    }
		    if(yaTienenComb[2][0] === false || yaTienenComb[3][0] === false || yaTienenComb[2][3] === false || yaTienenComb[3][3] === false){
				if(mapaKar[2][0] == 1 && (mapaKar[2][0] == mapaKar[3][0] && mapaKar[2][0] == mapaKar[2][3] && mapaKar[2][0] == mapaKar[3][3])){
					result += "PS' + ";
					yaTienenComb[2][0] = true;
					yaTienenComb[3][0] = true;
					yaTienenComb[2][3] = true;
					yaTienenComb[3][3] = true;
				}
		    }
		    if(yaTienenComb[2][0] === false || yaTienenComb[3][0] === false || yaTienenComb[2][1] === false || yaTienenComb[3][1] === false){
			if(mapaKar[2][0] == 1 && (mapaKar[2][0] == mapaKar[3][0] && mapaKar[2][0] == mapaKar[2][1] && mapaKar[2][0] == mapaKar[3][1])){
				result += "PR' + ";
				yaTienenComb[2][0] = true;
				yaTienenComb[3][0] = true;
				yaTienenComb[2][1] = true;
				yaTienenComb[3][1] = true;
			}
		    }
		    if(yaTienenComb[2][1] === false || yaTienenComb[2][2] === false || yaTienenComb[3][1] === false || yaTienenComb[3][2] === false){
			if(mapaKar[2][1] == 1 && (mapaKar[2][1] == mapaKar[2][2] && mapaKar[2][1] == mapaKar[3][1] && mapaKar[2][1] == mapaKar[3][2])){
				result += "PS + ";
				yaTienenComb[2][1] = true;
				yaTienenComb[2][2] = true;
				yaTienenComb[3][1] = true;
				yaTienenComb[3][2] = true;
			}
		    }
		    if(yaTienenComb[2][2] === false || yaTienenComb[2][3] === false || yaTienenComb[3][2] === false || yaTienenComb[3][3] === false){
			if(mapaKar[2][2] == 1 && (mapaKar[2][2] == mapaKar[2][3] && mapaKar[2][2] == mapaKar[3][2] && mapaKar[2][2] == mapaKar[3][3])){
				result += "PR + ";
				yaTienenComb[2][2] = true;
				yaTienenComb[2][3] = true;
				yaTienenComb[3][2] = true;
				yaTienenComb[3][3] = true;
			}
			}
			if(yaTienenComb[1][1] === false || yaTienenComb[1][2] === false || yaTienenComb[2][1] === false || yaTienenComb[2][2] === false){
			if(mapaKar[1][1] == 1 && (mapaKar[1][1] == mapaKar[1][2] && mapaKar[1][1] == mapaKar[2][1] && mapaKar[1][1] == mapaKar[2][2])){
				result += "QS + ";
				yaTienenComb[1][1] = true;
				yaTienenComb[1][2] = true;
				yaTienenComb[2][1] = true;
				yaTienenComb[2][2] = true;
			}
		    }
		    if(yaTienenComb[2][0] === false || yaTienenComb[2][1] === false || yaTienenComb[2][2] === false || yaTienenComb[2][3] === false){
		    	if(mapaKar[2][0] == 1 && (mapaKar[2][0] == mapaKar[2][1] && mapaKar[2][0] == mapaKar[2][2] && mapaKar[2][0] == mapaKar[2][3])){
		    		result += "PQ + ";
		    		yaTienenComb[2][0] = true;
					yaTienenComb[2][1] = true;
					yaTienenComb[2][2] = true;
					yaTienenComb[2][3] = true;
		    	}
		    }
		    if(yaTienenComb[3][0] === false || yaTienenComb[3][1] === false || yaTienenComb[3][2] === false || yaTienenComb[3][3] === false){
		    	if(mapaKar[3][0] == 1 && (mapaKar[3][0] == mapaKar[3][1] && mapaKar[3][0] == mapaKar[3][2] && mapaKar[3][0] == mapaKar[3][3])){
		    		result += "PQ' + ";
		    		yaTienenComb[3][0] = true;
					yaTienenComb[3][1] = true;
					yaTienenComb[3][2] = true;
					yaTienenComb[3][3] = true;
		    	}
		    }
		    if(yaTienenComb[0][0] === false || yaTienenComb[1][0] === false || yaTienenComb[2][0] === false || yaTienenComb[3][0] === false){
		    	if(mapaKar[0][0] == 1 && (mapaKar[0][0] == mapaKar[1][0] && mapaKar[0][0] == mapaKar[2][0] && mapaKar[0][0] == mapaKar[3][0])){
		    		result += "R'S' + ";
		    		yaTienenComb[0][0] = true;
					yaTienenComb[1][0] = true;
					yaTienenComb[2][0] = true;
					yaTienenComb[3][0] = true;
		    	}
		    }
		    if(yaTienenComb[0][1] === false || yaTienenComb[1][1] === false || yaTienenComb[2][1] === false || yaTienenComb[3][1] === false){
		    	if(mapaKar[0][1] == 1 && (mapaKar[0][1] == mapaKar[1][1] && mapaKar[0][1] == mapaKar[2][1] && mapaKar[0][1] == mapaKar[3][1])){
		    		result += "R'S + ";
		    		yaTienenComb[0][1] = true;
					yaTienenComb[1][1] = true;
					yaTienenComb[2][1] = true;
					yaTienenComb[3][1] = true;
		    	}
		    }
		    if(yaTienenComb[0][2] === false || yaTienenComb[1][2] === false || yaTienenComb[2][2] === false || yaTienenComb[3][2] === false){
		    	if(mapaKar[0][2] == 1 && (mapaKar[0][2] == mapaKar[1][2] && mapaKar[0][2] == mapaKar[2][2] && mapaKar[0][2] == mapaKar[3][2])){
		    		result += "RS + ";
		    		yaTienenComb[0][2] = true;
					yaTienenComb[1][2] = true;
					yaTienenComb[2][2] = true;
					yaTienenComb[3][2] = true;
		    	}
		    }
		    if(yaTienenComb[0][3] === false || yaTienenComb[1][3] === false || yaTienenComb[2][3] === false || yaTienenComb[3][3] === false){
		    	if(mapaKar[0][3] == 1 && (mapaKar[0][3] == mapaKar[1][3] && mapaKar[0][3] == mapaKar[2][3] && mapaKar[0][3] == mapaKar[3][3])){
		    		result += "RS' + ";
		    		yaTienenComb[0][3] = true;
					yaTienenComb[1][3] = true;
					yaTienenComb[2][3] = true;
					yaTienenComb[3][3] = true;
		    	}
		    }
		}
		if(cuantasVar() == 4 || cuantasVar() == 3){
			if(yaTienenComb[0][0] === false || yaTienenComb[1][0] === false || yaTienenComb[0][3] === false || yaTienenComb[1][3] === false){
				if(mapaKar[0][0] == 1 && (mapaKar[0][0] == mapaKar[1][0] && mapaKar[0][0] == mapaKar[0][3] && mapaKar[0][0] == mapaKar[1][3])){
					if(cuantasVar() == 4){
						result += "S'P' + ";
				    }else {
				    	result += "R' + ";
				    }
				    yaTienenComb[0][0] = true;
					yaTienenComb[1][0] = true;
					yaTienenComb[0][3] = true;
					yaTienenComb[1][3] = true;
				}
			}
			if(yaTienenComb[0][0] === false || yaTienenComb[0][1] === false || yaTienenComb[1][0] === false || yaTienenComb[1][1] === false){
			    if(mapaKar[0][0] == 1 && (mapaKar[0][0] == mapaKar[0][1] && mapaKar[0][0] == mapaKar[1][0] && mapaKar[0][0] == mapaKar[1][1])){
			    	if(cuantasVar() == 4){
						result += "P'R' + ";
				    }else {
				    	result += "Q' + ";
				    }
				    yaTienenComb[0][0] = true;
					yaTienenComb[0][1] = true;
					yaTienenComb[1][0] = true;
					yaTienenComb[1][1] = true;
				}
		    }
		    if(yaTienenComb[0][1] === false || yaTienenComb[0][2] === false || yaTienenComb[1][1] === false || yaTienenComb[1][2] === false){
				if(mapaKar[0][1] == 1 && (mapaKar[0][1] == mapaKar[0][2] && mapaKar[0][1] == mapaKar[1][1] && mapaKar[0][1] == mapaKar[1][2])){
					if(cuantasVar() == 4){
						result += "P'S + ";
				    }else {
				    	result += "R + ";
				    }
				    yaTienenComb[0][1] = true;
					yaTienenComb[0][2] = true;
					yaTienenComb[1][1] = true;
					yaTienenComb[1][2] = true;
				}
		    }
		    if(yaTienenComb[0][2] === false || yaTienenComb[0][3] === false || yaTienenComb[1][2] === false || yaTienenComb[1][3] === false){
				if(mapaKar[0][2] == 1 && (mapaKar[0][2] == mapaKar[0][3] && mapaKar[0][2] == mapaKar[1][2] && mapaKar[0][2] == mapaKar[1][3])){
					if(cuantasVar() == 4){
						result += "P'R + ";
				    }else {
				    	result += "Q + ";
				    }
				    yaTienenComb[0][2] = true;
					yaTienenComb[0][3] = true;
					yaTienenComb[1][2] = true;
					yaTienenComb[1][3] = true;
				}
		    }
		    if(yaTienenComb[0][0] === false || yaTienenComb[0][1] === false || yaTienenComb[0][2] === false || yaTienenComb[0][3] === false){
		    	if(mapaKar[0][0] == 1 && (mapaKar[0][0] == mapaKar[0][1] && mapaKar[0][0] == mapaKar[0][2] && mapaKar[0][0] == mapaKar[0][3])){
		    		if(cuantasVar() == 4){
		    			result += "P'Q' +";
		    	    }else {
		    	    	result += "P' + ";
		    	    }
		    	    yaTienenComb[0][0] = true;
					yaTienenComb[0][1] = true;
					yaTienenComb[0][2] = true;
					yaTienenComb[0][3] = true;
		    	}
		    }
		    if(yaTienenComb[1][0] === false || yaTienenComb[1][1] === false || yaTienenComb[1][2] === false || yaTienenComb[1][3] === false){
		    	if(mapaKar[1][0] == 1 && (mapaKar[1][0] == mapaKar[1][1] && mapaKar[1][0] == mapaKar[1][2] && mapaKar[1][0] == mapaKar[1][3])){
		    		if(cuantasVar() == 4){
		    			result += "P'Q + ";
		    	    }else {
		    	    	result += "P + ";
		    	    }
		    	    yaTienenComb[1][0] = true;
					yaTienenComb[1][1] = true;
					yaTienenComb[1][2] = true;
					yaTienenComb[1][3] = true;
		    	}
		    }
		}
	}
	/*RECTANGULOS COMBINACIONES DE 2*/
	let combinaciones = [[0,0],[0,1],[1,1],[1,0]];
	let combinaciones2 = [0,1];
	for(let i = 0;i<filas;i++){
		for(let j = 0;j<columnas;j++){
			if(yaTienenComb[i][j] === false && mapaKar[i][j] == 1){
				if(j + 1 < columnas && mapaKar[i][j] == mapaKar[i][j+1]){
					let text = "";
					if(cuantasVar() == 4){
						text += (combinaciones[i][0] == 0) ? "P'" : "P";
						text += (combinaciones[i][1] == 0) ? "Q'" : "Q";
						if(combinaciones[j][0] == combinaciones[j+1][0]){
							text += (combinaciones[j][0] == 0) ? "R'" : "R";
						} else {
							text += (combinaciones[j][1] == 0) ? "S'" : "S";
						}
					}
					if(cuantasVar() == 3){
						text += (combinaciones2[i] == 0) ? "P'" : "P";
						if(combinaciones[j][0] == combinaciones[j+1][0]){
							text += (combinaciones[j][0] == 0) ? "Q'" : "Q";
						} else {
							text += (combinaciones[j][1] == 0) ? "R'" : "R";
						}
					}
					if(cuantasVar() == 2){
						text += (combinaciones2[i] == 0) ? "P'" : "P";
					}
					yaTienenComb[i][j] = true;
					yaTienenComb[i][j+1] = true;
					result += (text + " + ");
				}
				if(j - 1 >= 0 && mapaKar[i][j] == mapaKar[i][j-1]){
					let text = "";
					if(cuantasVar() == 4){
						text += (combinaciones[i][0] == 0) ? "P'" : "P";
						text += (combinaciones[i][1] == 0) ? "Q'" : "Q";
						if(combinaciones[j][0] == combinaciones[j-1][0]){
							text += (combinaciones[j][0] == 0) ? "R'" : "R";
						} else {
							text += (combinaciones[j][1] == 0) ? "S'" : "S";
						}
					}
					if(cuantasVar() == 3){
						text += (combinaciones2[i] == 0) ? "P'" : "P";
						if(combinaciones[j][0] == combinaciones[j-1][0]){
							text += (combinaciones[j][0] == 0) ? "Q'" : "Q";
						} else {
							text += (combinaciones[j][1] == 0) ? "R'" : "R";
						}
					}
					if(cuantasVar() == 2){
						text += (combinaciones2[i] == 0) ? "P'" : "P";
					}
					yaTienenComb[i][j] = true;
					yaTienenComb[i][j-1] = true;
					result += (text + " + ");
				}
				if(i + 1 < filas && mapaKar[i][j] == mapaKar[i+1][j]){
					let text = "";
					if(cuantasVar() == 4){
						if(combinaciones[i][0] == combinaciones[i+1][0]){
							text += (combinaciones[i][0] == 0) ? "P'" : "P";
						} else {
							text += (combinaciones[i][1] == 0) ? "Q'" : "Q";
						}
						text += (combinaciones[j][0] == 0) ? "R'" : "R";
						text += (combinaciones[j][1] == 0) ? "S'" : "S";
					}
					if(cuantasVar() == 3){
						text += (combinaciones[j][0] == 0) ? "Q'" : "Q";
						text += (combinaciones[j][1] == 0) ? "R'" : "R";
					}
					if(cuantasVar() == 2){
						text += (combinaciones2[j] == 0) ? "Q'" : "Q";
					}
					yaTienenComb[i][j] = true;
					yaTienenComb[i+1][j] = true;
					result += (text + " + ");
				}
				if(i - 1 >= 0 && mapaKar[i][j] == mapaKar[i-1][j]){
					let text = "";
					if(cuantasVar() == 4){
						if(combinaciones[i][0] == combinaciones[i-1][0]){
							text += (combinaciones[i][0] == 0) ? "P'" : "P";
						} else {
							text += (combinaciones[i][1] == 0) ? "Q'" : "Q";
						}
						text += (combinaciones[j][0] == 0) ? "R'" : "R";
						text += (combinaciones[j][1] == 0) ? "S'" : "S";
					}
					if(cuantasVar() == 3){
						text += (combinaciones[j][0] == 0) ? "Q'" : "Q";
						text += (combinaciones[j][1] == 0) ? "R'" : "R";
					}
					if(cuantasVar() == 2){
						text += (combinaciones2[j] == 0) ? "Q'" : "Q";
					}
					yaTienenComb[i][j] = true;
					yaTienenComb[i-1][j] = true;
					result += (text + " + ");
				}
			}
		}
	}
	//Rectangulos de 2 doblados
	if(cuantasVar() == 4){
		if(yaTienenComb[0][0] === false || yaTienenComb[3][0] === false){
			if(mapaKar[0][0] == 1 && (mapaKar[0][0] == mapaKar[3][0])){
				result += "Q'R'S' + ";
				yaTienenComb[0][0] = true;
				yaTienenComb[3][0] = true;
			}
		}
		if(yaTienenComb[0][1] === false || yaTienenComb[3][1] === false){
			if(mapaKar[0][1] == 1 && (mapaKar[0][1] == mapaKar[3][1])){
				result += "Q'R'S + ";
				yaTienenComb[0][1] = true;
				yaTienenComb[3][1] = true;
			}
		}
		if(yaTienenComb[0][2] === false || yaTienenComb[3][2] === false){
			if(mapaKar[0][2] == 1 && (mapaKar[0][2] == mapaKar[3][2])){
				result += "Q'RS + ";
				yaTienenComb[0][2] = true;
				yaTienenComb[3][2] = true;
			}
		}
		if(yaTienenComb[0][3] === false || yaTienenComb[3][3] === false){
			if(mapaKar[0][3] == 1 && (mapaKar[0][3] == mapaKar[3][3])){
				result += "Q'RS' + ";
				yaTienenComb[0][3] = true;
				yaTienenComb[3][3] = true;
			}
		}
		if(yaTienenComb[2][0] === false || yaTienenComb[2][3] === false){
			if(mapaKar[2][0] == 1 && (mapaKar[2][0] == mapaKar[2][3])){
				result += "PQS' + ";
				yaTienenComb[2][0] = true;
				yaTienenComb[2][3] = true;
			}
		}
		if(yaTienenComb[3][0] === false || yaTienenComb[3][3] === false){
			if(mapaKar[3][0] == 1 && (mapaKar[3][0] == mapaKar[3][3])){
				result += "P'QS' + ";
				yaTienenComb[3][0] = true;
				yaTienenComb[3][3] = true;
			}
		}
	}
	if(cuantasVar() == 4 || cuantasVar() == 3){
		if(yaTienenComb[0][0] === false || yaTienenComb[0][3] === false){
			if(mapaKar[0][0] == 1 && (mapaKar[0][0] == mapaKar[0][3])){
				if(cuantasVar() == 4){
					result += "P'Q'S' + ";
			    } else {
			    	result += "P'S + ";
			    }
				yaTienenComb[0][0] = true;
				yaTienenComb[0][3] = true;
			}
		}
		if(yaTienenComb[1][0] === false || yaTienenComb[1][3] === false){
			if(mapaKar[1][0] == 1 && (mapaKar[1][0] == mapaKar[1][3])){
				if(cuantasVar() == 4){
					result += "PS' + ";
			    } else {
			    	result += "P'QS' + ";
			    }
				yaTienenComb[1][0] = true;
				yaTienenComb[1][3] = true;
			}
		}
	}
	if(cuantasVar() == 4){
	if(yaTienenComb[2][0] === false && mapaKar[2][0] == 1){
		result += "PQR'S' + ";
	}
	if(yaTienenComb[2][1] === false && mapaKar[2][1] == 1){
		result += "PQR'S + ";
	}
	if(yaTienenComb[2][2] === false && mapaKar[2][2] == 1){
		result += "PQRS + "; 
	}
	if(yaTienenComb[2][3] === false && mapaKar[2][3] == 1){
		result += "PQRS' + "; 
	}
	if(yaTienenComb[3][0] === false && mapaKar[3][0] == 1){
		result += "PQ'R'S' + "; 
	}
	if(yaTienenComb[3][1] === false && mapaKar[3][1] == 1){
		result += "PQ'R'S + "; 
	}
	if(yaTienenComb[3][2] === false && mapaKar[3][2] == 1){
		result += "PQ'RS + "; 
	}
	if(yaTienenComb[3][3] === false && mapaKar[3][3] == 1){
		result += "PQ'RS' + "; 
	}
	}
	if(cuantasVar() == 4 || cuantasVar() == 3){
		if(yaTienenComb[0][2] === false && mapaKar[0][2] == 1){
		if(cuantasVar() == 4){
			result += "P'Q'RS + ";
		} else {
			result += "P'QR + ";
		}
	    }
	    if(yaTienenComb[0][3] === false && mapaKar[0][3] == 1){
		if(cuantasVar() == 4){
			result += "P'Q'RS' + ";
		} else {
			result += "P'QR' + ";
		} 
	    }
	    if(yaTienenComb[1][2] === false && mapaKar[1][2] == 1){
		if(cuantasVar() == 4){
			result += "P'QRS + ";
		} else {
			result += "PQR + ";
		} 
		}
	    if(yaTienenComb[1][3] === false && mapaKar[1][3] == 1){
		if(cuantasVar() == 4){
			result += "P'QRS' + ";
		} else {
			result += "P'QR' + ";
		}
	    }
	} 
	if(cuantasVar() == 4 || cuantasVar() == 3 || cuantasVar() == 2){
		if(yaTienenComb[0][0] === false && mapaKar[0][0] == 1){
			if(cuantasVar() == 4){
				result += "P'Q'R'S' + ";
			} else if(cuantasVar() == 3){
				result += "P'Q'R' + ";
			} else {
				result += "P'Q' + ";
			}
	    }
	    if(yaTienenComb[0][1] === false && mapaKar[0][1] == 1){
			if(cuantasVar() == 4){
				result += "P'Q'R'S + ";
			} else if(cuantasVar() == 3){
				result += "P'Q'R + ";
			} else {
				result += "P'Q + ";
			}
	    }
	    if(yaTienenComb[1][0] === false && mapaKar[1][0] == 1){
		if(cuantasVar() == 4){
			result += "P'QR'S' + ";
		} else if(cuantasVar() == 3){
			result += "PQ'R' + ";
		} else {
			result += "PQ' + ";
		}
	    }
	    if(yaTienenComb[1][1] === false && mapaKar[1][1] == 1){
		if(cuantasVar() == 4){
			result += "P'QR'S + ";
		} else if(cuantasVar() == 3){
			result += "PQ'R + ";
		} else {
			result += "PQ + ";
		}
	    }
	}
	console.log(result);
	let resultn = result.slice(0,-2);
	return resultn;
}
function mostrarSimplificacion(){
	let textoSimplificacion = document.getElementById("simplificacion");
    textoSimplificacion.innerHTML = simplificar();
}
function res(){
	cambiarPos(5,5);
	mostrarResultados();
	MostrarKar();
	resetearValores();
}

//Mapa Kar

function MostrarKar(){
	var nv = cuantasVar();
	let valores = JSON.parse(localStorage.getItem('valores'))
	let resultados = JSON.parse(localStorage.getItem('resultados'))

	if(nv == 2){
		document.getElementById("map1").style.display = ""
		document.getElementById("map1-11").innerText = resultados[3]
		document.getElementById("map1-12").innerText = resultados[2]
		document.getElementById("map1-21").innerText = resultados[1]
		document.getElementById("map1-22").innerText = resultados[0]
	}
	else if(nv == 3){
		document.getElementById("map2").style.display = ""
		document.getElementById("map2-11").innerText = resultados[7]
		document.getElementById("map2-12").innerText = resultados[6]
		document.getElementById("map2-13").innerText = resultados[4]
		document.getElementById("map2-14").innerText = resultados[5]
		document.getElementById("map2-21").innerText = resultados[3]
		document.getElementById("map2-22").innerText = resultados[2]
		document.getElementById("map2-23").innerText = resultados[0]
		document.getElementById("map2-24").innerText = resultados[1]
	}
	else if(nv == 4){
		document.getElementById("map3").style.display = ""
		document.getElementById("map3-11").innerText = resultados[15]
		document.getElementById("map3-12").innerText = resultados[14]
		document.getElementById("map3-13").innerText = resultados[12]
		document.getElementById("map3-14").innerText = resultados[13]
		document.getElementById("map3-21").innerText = resultados[11]
		document.getElementById("map3-22").innerText = resultados[10]
		document.getElementById("map3-23").innerText = resultados[8]
		document.getElementById("map3-24").innerText = resultados[9]
		document.getElementById("map3-31").innerText = resultados[3]
		document.getElementById("map3-32").innerText = resultados[2]
		document.getElementById("map3-33").innerText = resultados[0]
		document.getElementById("map3-34").innerText = resultados[1]
		document.getElementById("map3-41").innerText = resultados[7]
		document.getElementById("map3-42").innerText = resultados[6]
		document.getElementById("map3-43").innerText = resultados[4]
		document.getElementById("map3-44").innerText = resultados[5]
	}
	mostrarSimplificacion();
}

