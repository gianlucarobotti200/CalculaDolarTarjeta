function getDolars(){
    
    let dolar = 132.19;
    
    if (document.getElementById('money').value == "") {
        alert("Completa el espacio en blanco")
    }
    
    let pesos = (parseFloat(document.getElementById('money').value))*dolar;
    let impPais = (pesos*.30).toFixed(2);
    let ret = (pesos*.45).toFixed(2);
    let pesosImpuestos = ((pesos*175)/100).toFixed(2);
    
    document.dolartospend.pesosinimp.value = pesos;
    document.dolartospend.imppais.value = impPais;
    document.dolartospend.ret.value = ret;
    document.dolartospend.total.value = pesosImpuestos;
}
