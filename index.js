let dolar = 0;

const listValues = async () => {
    //https://www.dolarsi.com/api/api.php?type=valoresprincipales Usar dps
    const dolarDia = await fetch('https://www.dolarsi.com/api/api.php?type=dolar');
    const dolarObj = await dolarDia.json();;
    console.log("dolarDia: " + dolarObj[0].casa.compra)
    dolar = (parseFloat(dolarObj[0].casa.compra.replace(",", "."))).toFixed(2);
    let objDolar = document.getElementById("cotizacion");
    objDolar.innerText = `Dólar Oficial hoy: AR$ ${dolar}`  
};

window.addEventListener("load", function(){
    listValues();
})

let getPesos = () =>{

    if (document.getElementById('money').value == "") {
        alert("Completa el espacio en blanco");
    } else {
        let pesos = ((parseFloat(document.getElementById('money').value))).toFixed(2);
        let objPesos = document.getElementById("pesosinimp");
        objPesos.innerText = `Pesos sin impuesto: AR$ ${pesos}`;
        console.log("funcion getPesos " + pesos);
        let impPais = (pesos*.30).toFixed(2);
        let objImpPais = document.getElementById("imppais");
        objImpPais.innerText = `Impuesto país 30%: AR$ ${impPais}`;

        let ret = (pesos*.45).toFixed(2);
        let objRet = document.getElementById("ret");
        objRet.innerText = `Retención del 45%: AR$ ${ret}`;

        let total = ((pesos*175)/100).toFixed(2);
        let objTotal = document.getElementById("total");
        objTotal.innerText = `Total con impuestos: AR$ ${total}`;
    }
}

let getDolars = () =>{
    
    console.log("funcion getDolars " + dolar);
    
    if (document.getElementById('money').value == "") {
        alert("Completa el espacio en blanco");
    } else {
        let pesos = ((parseFloat(document.getElementById('money').value))*dolar).toFixed(2);
    let objPesos = document.getElementById("pesosinimp");
    objPesos.innerText = `Pesos sin impuesto: AR$ ${pesos}`;
    
    let impPais = (pesos*.30).toFixed(2);
    let objImpPais = document.getElementById("imppais");
    objImpPais.innerText = `Impuesto país 30%: AR$ ${impPais}`;

    let ret = (pesos*.45).toFixed(2);
    let objRet = document.getElementById("ret");
    objRet.innerText = `Retención del 45%: AR$ ${ret}`;

    let total = ((pesos*175)/100).toFixed(2);
    let objTotal = document.getElementById("total");
    objTotal.innerText = `Total con impuestos: AR$ ${total}`;
    }  
}


document.getElementById("moneda").addEventListener("click", function(){
    console.log("holis");
    let inValue = document.querySelector(".in-dollar");
    let e = document.getElementById("moneda");
    let monedaValue = e.value;
    console.log("Hola: " + monedaValue);
    if (monedaValue==2){
        inValue.placeholder = "Ingresar pesos";
        inValue.setAttribute("onchange", "getPesos()");
        document.querySelector('.in-dollar').value = '';
    } else{
        inValue.placeholder = "Ingresar dólares";
        inValue.setAttribute("onchange", "getDolars()");
        document.querySelector('.in-dollar').value = '';
    }
})
