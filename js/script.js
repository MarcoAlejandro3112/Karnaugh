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
				if(arrAux[i - 2] != "(" && i - 1 > 1){
					arrAux[i - 1] += ")";
				}
				if((arrAux[i - 1]).toString().indexOf(")") != -1){
					for(let j = 0;j<=i;j++){
						if(arrAux[i - j] == ")" || j == i ){
							arrAux[i - j] = "!(" + arrAux[i-j];
						}
					}
				} else {
					arrAux[i-1] = "!" + arrAux[i-1];
				}
				arrAux[i] = " || ";
			} else if(arrAux[i] == "↔"){
				if(arrAux[i - 2] != "(" && i - 1 > 1){
					arrAux[i - 1] += ")";
				}
				if((arrAux[i - 1]).toString().indexOf(")") != -1){
					for(let j = 0;j<=i;j++){
						if(arrAux[i - j] == ")" || j == i ){
							arrAux[i - j] = "!(" + arrAux[i-j];
						}
					}
				} else {
					arrAux[i-1] = "!" + arrAux[i-1];
				}
				arrAux[i] = "^";
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
function simplificar(){
	let mapaKar = generarMatriz();
	console.log(mapaKar);
	let cuantos1 = cuantosUno(mapaKar);
	let result = " ";
	let yaTienenComb = [[]];
	if(cuantos1 >= 8){
		if(mapaKar[0][0] == 1 &&(mapaKar[0][0] == mapaKar[0][1] == mapaKar[0][2] == mapaKar[0][3] == mapaKar[3][0] == mapaKar[3][1] == mapaKar[3][2] == mapaKar[3][3])){
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
		if(mapaKar[0][0] == 1 && (mapaKar[0][0] == mapaKar[1][0] == mapaKar[2][0] == mapaKar[3][0] == mapaKar[0][3] == mapaKar[1][3] == mapaKar[2][3] == mapaKar[3][3])){
			result += "S' + ";
			yaTienenComb[0][0] = true;
			yaTienenComb[0][1] = true;
			yaTienenComb[0][2] = true;
			yaTienenComb[0][3] = true;
			yaTienenComb[3][0] = true;
			yaTienenComb[3][1] = true;
			yaTienenComb[3][2] = true;
			yaTienenComb[3][3] = true;
		}
		if(mapaKar[0][0] == 1 && (mapaKar[0][0] == mapaKar[0][1] == mapaKar[0][2] == mapaKar[0][3] == mapaKar[1][0] == mapaKar[1][1] == mapaKar[1][2] == mapaKar[1][3])){
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
		if(mapaKar[1][0] == 1 && (mapaKar[1][0] == mapaKar[1][1] == mapaKar[1][2] == mapaKar[1][3] == mapaKar[2][0] == mapaKar[2][1] == mapaKar[2][2] == mapaKar[2][3])){
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
		if(mapaKar[2][0] == 1 && (mapaKar[2][0] == mapaKar[2][1] == mapaKar[2][2] == mapaKar[2][3] == mapaKar[3][0] == mapaKar[3][1] == mapaKar[3][2] == mapaKar[3][3])){
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
		if(mapaKar[0][0] == 1 && (mapaKar[0][0] == mapaKar[1][0] == mapaKar[2][0] == mapaKar[3][0] == mapaKar[0][1] == mapaKar[1][1] == mapaKar[2][1] == mapaKar[3][1])){
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
		if(mapaKar[0][1] == 1 && (mapaKar[0][1] == mapaKar[0][2] == mapaKar[1][1] == mapaKar[1][2] == mapaKar[2][1] == mapaKar[2][2] == mapaKar[3][1] == mapaKar[3][2])){
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
		if(mapaKar[0][2] == 1 && (mapaKar[0][2] == mapaKar[0][3] == mapaKar[1][2] == mapaKar[1][3] == mapaKar[2][2] == mapaKar[2][3] == mapaKar[3][2] == mapaKar[3][3])){
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

	console.log(result);
	return result;
}
function mostrarSimplificacion(){
	let textoSimplificacion = document.getElementById("simplificacion");
    textoSimplificacion.innerHTML = simplificar();
}
function res(){
	cambiarPos(5,5);
	mostrarResultados();
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

