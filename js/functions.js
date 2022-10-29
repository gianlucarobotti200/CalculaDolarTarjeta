export function calcularImpPais(pesos);
export function calcularRetencionGanancias(pesos);
export function calcularPercepcionIIBB(pesos);
export function calcularImpSello(pesos);
export function calcularTotal(pesos);

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

let calcularImpPais = (pesos) =>{
    return Number((pesos*.30).toFixed(2));
}

let calcularRetencionGanancias = (pesos) =>{
    return Number((pesos*.45).toFixed(2));
}

let calcularPercepcionIIBB = (pesos) =>{
    let e = document.getElementById("provincia");
    let valueProvincial = e.value;
    let perc;
    switch(valueProvincial){
        case "1":
            perc = 0;
            break;
        case "2":
        case "3":
            perc = Number((pesos*(provincias[1].tasa/100)).toFixed(2));
            break;
        case "4":
            perc = Number((pesos*(provincias[2].tasa/100)).toFixed(2));
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
    return perc;
}

let calcularImpSello = (pesos) =>{
    let e = document.getElementById("metodo-pago");
    valueMetodoPago = e.value;

    if(valueMetodoPago == "1"){
        return Number((pesos*(.012)).toFixed(2));
    } else{
        return 0;
    }
}

let calcularTotal = (pesos, impPais, ret, perc, impSello) =>{
    return (pesos+impPais+ret+perc+impSello);  
} 