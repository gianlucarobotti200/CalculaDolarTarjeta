let dolar = 0;

const listValues = async () => {
    
    const dolarDia = await fetch('https://www.dolarsi.com/api/api.php?type=dolar');
    const values = await dolarDia.json();
    console.log("funcion listValues: " + values[0].casa.venta)
    dolar = (parseFloat(values[0].casa.venta.replace(",", "."))).toFixed(2);
    let objDolar = document.getElementById("cotizacion");
    objDolar.innerText = `Dólar Oficial hoy: $${dolar}`
};

window.addEventListener("load", function(){
    listValues();
})

function getPesos(){
    let pesos = ((parseFloat(document.getElementById('money').value))).toFixed(2);
    let objPesos = document.getElementById("pesosinimp");
    objPesos.innerText = `Pesos sin impuesto: $${pesos}`;
    console.log("funcion getPesos " + pesos);
    let impPais = (pesos*.30).toFixed(2);
    let objImpPais = document.getElementById("imppais");
    objImpPais.innerText = `Impuesto país 30%: $${impPais}`;

    let ret = (pesos*.45).toFixed(2);
    let objRet = document.getElementById("ret");
    objRet.innerText = `Retención del 45%: $${ret}`;

    let total = ((pesos*175)/100).toFixed(2);
    let objTotal = document.getElementById("total");
    objTotal.innerText = `Total con impuestos: $${total}`;
}

function getDolars(){
    
    console.log("funcion getDolars " + dolar);
    
    if (document.getElementById('money').value == "") {
        alert("Completa el espacio en blanco");
    }
    
    let pesos = ((parseFloat(document.getElementById('money').value))*dolar).toFixed(2);
    let objPesos = document.getElementById("pesosinimp");
    objPesos.innerText = `Pesos sin impuesto: $${pesos}`;
    
    let impPais = (pesos*.30).toFixed(2);
    let objImpPais = document.getElementById("imppais");
    objImpPais.innerText = `Impuesto país 30%: $${impPais}`;

    let ret = (pesos*.45).toFixed(2);
    let objRet = document.getElementById("ret");
    objRet.innerText = `Retención del 45%: $${ret}`;

    let total = ((pesos*175)/100).toFixed(2);
    let objTotal = document.getElementById("total");
    objTotal.innerText = `Total con impuestos: $${total}`;   
}

document.getElementById("ars").addEventListener("click", function(){
    console.log("holis");
    let inPesos = document.querySelector(".in-dollar");
    inPesos.placeholder = "Ingresar pesos";
    inPesos.setAttribute("onchange", "getPesos()");
    
})

document.getElementById("usd").addEventListener("click", function(){
    console.log("holis");
    let inDolars = document.querySelector(".in-dollar");
    inDolars.placeholder = "Ingresar dólares";
    inDolars.setAttribute("onchange", "getDolars()");
    
})