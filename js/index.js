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
        let objPesos = document.getElementById("pesosinimp$");
        objPesos.innerText = `${pesos}`;
        console.log("funcion getPesos " + pesos);

        //IMPUESTO PAIS
        let impPais = Number((pesos*.30).toFixed(2));
        let objImpPais = document.getElementById("imppais$");
        objImpPais.innerText = `${impPais}`;

        console.log("Impuesto pais " + impPais)
        //RETENCION GANANCIAS
        let ret = (pesos*.45).toFixed(2);
        let objRet = document.getElementById("ret$");
        objRet.innerText = `${ret}`;

        
        //PERCEPCION IIBB
        let b = document.getElementById("provincia");
        let valueProvincial = b.value;
        let perc;
        switch(valueProvincial){
            case "1":
                perc = 0;
                break;
            case "2":
            case "3":
                perc = Number((pesos*(provincias[1].tasa/100)).toFixed(2));
                console.log("hola");
                break;
            case "4":
                perc = number((pesos*(provincias[2].tasa/100)).toFixed(2));
                break;
            case "5":
                perc = Number((pesos*(provincias[3].tasa/100)).toFixed(2));
                break;
            case "6":
                perc = Number((pesos*(provincias[4].tasa/100)).toFixed(2));
                break;
            case "7":
                perc = Number((pesos*(provincias[5].tasa/100)).toFixed(2));
                break;
            case "8":
                perc = Number((pesos*(provincias[6].tasa/100)).toFixed(2));
                break;
            case "9":
                perc = Number((pesos*(provincias[7].tasa/100)).toFixed(2));
                break;
        }

        let objPerc = document.getElementById("perc$");
        objPerc.innerText = `${perc}`;

        //IMPUESTO SELLO

        let impSello;
        let a = document.getElementById("metodo-pago");
        valueMetodoPago = a.value;

        if(valueMetodoPago == 1){
            impSello = (pesos*(.012)).toFixed(2);
        } else {
            impSello = 0;
        }

        let objImpSello = document.getElementById("sello$");
        objImpSello.innerText = `${impSello}`

        //TOTAL
        let total = ((Number(pesos)+Number(impPais)+Number(ret)+Number(perc)+Number(impSello))).toFixed(2);
        let objTotal = document.getElementById("total$");
        objTotal.innerText = `${total}`;
    }
}

let getDolars = () =>{
      
    console.log("funcion getDolars " + dolar);
    
    if (document.getElementById('money').value == "") {
        alert("Completa el espacio en blanco");
    } else {
        let pesos = ((parseFloat(document.getElementById('money').value))*dolar).toFixed(2);
        let objPesos = document.getElementById("pesosinimp$");
        objPesos.innerText = `${pesos}`;
    
        let impPais = (pesos*.30).toFixed(2);
        let objImpPais = document.getElementById("imppais$");
        objImpPais.innerText = `${impPais}`;

        let ret = (pesos*.45).toFixed(2);
        let objRet = document.getElementById("ret$");
        objRet.innerText = `${ret}`;

        //PERCEPCION IIBB
        let b = document.getElementById("provincia");
        let valueProvincial = b.value;
        let perc;
        switch(valueProvincial){
            case "1":
                perc = 0;
                break;
            case "2":
            case "3":
                perc = (pesos*(provincias[1].tasa/100)).toFixed(2);
                console.log("hola");
                break;
            case "4":
                perc = (pesos*(provincias[2].tasa/100)).toFixed(2);
                break;
            case "5":
                perc = (pesos*(provincias[3].tasa/100)).toFixed(2);
                break;
            case "6":
                perc = (pesos*(provincias[4].tasa/100)).toFixed(2);
                break;
            case "7":
                perc = (pesos*(provincias[5].tasa/100)).toFixed(2);
                break;
            case "8":
                perc = (pesos*(provincias[6].tasa/100)).toFixed(2);
                break;
            case "9":
                perc = (pesos*(provincias[7].tasa/100)).toFixed(2);
                break;
        }

        let objPerc = document.getElementById("perc$");
        objPerc.innerText = `${perc}`

        //IMPUESTO SELLO

        let impSello;
        let a = document.getElementById("metodo-pago");
        valueMetodoPago = a.value;

        if(valueMetodoPago == 1){
            impSello = (pesos*(.012)).toFixed(2);
        } else {
            impSello = 0;
        }

        let objImpSello = document.getElementById("sello$");
        objImpSello.innerText = `${impSello}`

        //TOTAL
        let total = ((pesos*175)/100).toFixed(2);
        let objTotal = document.getElementById("total$");
        objTotal.innerText = `${total}`;
    }  
}


document.getElementById("moneda").addEventListener("change", function(){
    
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

let provincias = [
    {
        nombre: "CABA",
        tasa: "2"
    },
    {
        nombre: "Buenos Aires",
        tasa: 2
    },
    {
        nombre: "Córdoba",
        tasa: 3
    },
    {
        nombre: "La Pampa",
        tasa: 1
    },
    {
        nombre: "Río Negro",
        tasa: 5
    },
    {
        nombre: "Salta",
        tasa: 3.6
    },
    {
        nombre: "Chaco",
        tasa: 5.5
    },
    {
        nombre: "Neuquén",
        tasa: 3
    }
]

document.getElementById("provincia").addEventListener("change", function(){
    let impProvincial = document.getElementById("perc");
    let e = document.getElementById("provincia");
    let valueProvincial = e.value;
    console.log(valueProvincial);
    console.log(provincias);
    switch(valueProvincial){
        case "1":
            impProvincial.innerText = `0`;
            break;
        case "2":
        case "3":
            impProvincial.innerText = `${provincias[0].tasa}`;
            break;
        case "4":
            impProvincial.innerText = `${provincias[2].tasa}`;
            break;
        case "5":
            impProvincial.innerText = `${provincias[3].tasa}`;
            break;
        case "6":
            impProvincial.innerText = `${provincias[4].tasa}`;
            break;
        case "7":
            impProvincial.innerText = `${provincias[5].tasa}`;
            break;
        case "8":
            impProvincial.innerText = `${provincias[6].tasa}`;
            break;
        case "9":
            impProvincial.innerText = `${provincias[7].tasa}`;
            break;
    }
})

document.getElementById("metodo-pago").addEventListener("change", function(){
    let impSello = document.getElementById("sello");
    let e = document.getElementById("metodo-pago");
    valueMetodoPago = e.value;

    if(valueMetodoPago == 1){
        impSello.innerText = "Impuesto a los sellos 1,2%";
    } else {
        impSello.innerText = "Impuesto a los sellos 0%";
    }
})
