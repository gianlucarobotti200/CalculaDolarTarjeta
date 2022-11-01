let objDollar;
let objCurrencies;
const otherValues = async () =>{
    const dollar = await fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales');
    objDollar = await dollar.json();
    const otherCurrencies = await fetch ("https://www.dolarsi.com/api/api.php?type=cotizador");// otras monedas
    objCurrencies = await otherCurrencies.json();
    console.log(objDollar);
    console.log(objCurrencies);
}

window.addEventListener("load", function(){
    otherValues();
})

document.getElementById("cotizacion").addEventListener("change", function(){
    let e = document.getElementById("cotizacion");
    let valueCotizacion = e.value;
    let tipoDolar = document.getElementById("tipo-cambio");
    let priceCompra = document.getElementById("compra");
    let priceVenta = document.getElementById("venta");

    switch(valueCotizacion){
        case "1":
            tipoDolar.innerText = "Dólar Oficial"
            priceCompra.innerText = objDollar[0].casa.compra;
            priceVenta.innerText = objDollar[0].casa.venta;
            console.log("oficial")
            break;
        case "2":
            tipoDolar.innerText = "Dólar Blue"
            priceCompra.innerText = objDollar[1].casa.compra;
            priceVenta.innerText = objDollar[1].casa.venta;
            console.log("blue")
            break;
        case "3":
            tipoDolar.innerText = "Dólar CCL"
            priceCompra.innerText = objDollar[3].casa.compra;
            priceVenta.innerText = objDollar[3].casa.venta;
            console.log("ccl")
            break;
        case "4":
            tipoDolar.innerText = "Dólar Tarjeta"
            priceCompra.innerText = "-";
            priceVenta.innerText = "-";
            console.log("tarjeta")
            break;
        case "5":
            tipoDolar.innerText = "Dólar Bolsa"
            priceCompra.innerText = objDollar[4].casa.compra;
            priceVenta.innerText = objDollar[4].casa.venta;
            console.log("bolsa")
            break;
        case "6":
            tipoDolar.innerText = "Dólar Turista"
            priceCompra.innerText = "-";
            priceVenta.innerText = objDollar[6].casa.venta;
            console.log("turista")
            break;
        case "7":
            tipoDolar.innerText = "Bitcoin"
            priceCompra.innerText = objDollar[5].casa.compra;
            priceVenta.innerText = "-";
            console.log("bitcoin")
            break;
    }
})

    


