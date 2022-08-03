
const listValues = async () => {
    const dolarDia = await fetch('https://www.dolarsi.com/api/api.php?type=dolar');
    const values = await dolarDia.json();
    console.log("funcion listValues: " + values[0].casa.venta)
    return((values[0].casa.venta))
};

window.addEventListener("load", function(){
    listValues();
})

async function getDolars(){
    
    let dolar = await listValues();
    dolar = parseFloat(dolar.replace(",", "."))
    console.log("funcion getDolars " + dolar)
    
    if (document.getElementById('money').value == "") {
        alert("Completa el espacio en blanco")
    }
    
    let pesos = ((parseFloat(document.getElementById('money').value))*dolar).toFixed(2);
    let impPais = (pesos*.30).toFixed(2);
    let ret = (pesos*.45).toFixed(2);
    let pesosImpuestos = ((pesos*175)/100).toFixed(2);
    
    document.dolartospend.pesosinimp.value = pesos;
    document.dolartospend.imppais.value = impPais;
    document.dolartospend.ret.value = ret;
    document.dolartospend.total.value = pesosImpuestos;
}

