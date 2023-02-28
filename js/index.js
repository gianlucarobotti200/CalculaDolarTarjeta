let dollar;

const listValues = async () => {
    //https://www.dolarsi.com/api/api.php?type=valoresprincipales Usar dps
    const dolarDia = await fetch('https://www.dolarsi.com/api/api.php?type=dolar');
   
    const dolarObj = await dolarDia.json();
    console.log("dolarDia: " + dolarObj[0].casa.compra)
    
    dollar = (parseFloat(dolarObj[0].casa.compra.replace(",", "."))).toFixed(2);
    
    let objDolar = document.getElementById("cotizacion");
    objDolar.innerText = `Dólar Oficial hoy: AR$ ${dollar}`  
};

window.addEventListener("load", function(){
    listValues();
});

let calculatePesos = () =>{

    const provinceNum = document.getElementById("provincia").value;

    const payMethodNum = document.getElementById("metodo-pago").value;

    const moreThan300 = document.getElementById("si").checked;
    
    const inputValue = Number(document.getElementById("money").value).toFixed(3);

    const valueList = document.querySelectorAll("#valores");

    const pesosWoutTax= inputValue;
    valueList[0].innerText = `$${pesosWoutTax}`;

    const countryTax = calculateCountryTax(inputValue)
    valueList[1].innerText = `$${countryTax}`;

    const retGanBBPP = calculateRetGanBPP(inputValue, moreThan300);
    valueList[2].innerText = `$${retGanBBPP}`

    let provincePercent = document.querySelector("#perc");

    const percIIBB = calculatePercIIBB(inputValue, provinceNum, provincePercent); 
    valueList[3].innerText = `$${percIIBB}`

    const sealTax = calculateSealTax(inputValue, payMethodNum);
    valueList[4].innerText = `$${sealTax}`

    const finalPrice = document.getElementById("total$");
    const totalTaxes = Number(pesosWoutTax)+Number(countryTax)+Number(retGanBBPP)+Number(percIIBB)+Number(sealTax);
    console.log(totalTaxes);
    finalPrice.innerText = `$${totalTaxes}`
}

let calculateDollars = () =>{

    const provinceNum = document.getElementById("provincia").value;

    const payMethodNum = document.getElementById("metodo-pago").value;

    const moreThan300 = document.getElementById("si").checked;
    
    const inputValue = Number(document.getElementById("money").value).toFixed(3);

    const valueList = document.querySelectorAll("#valores");

    const pesosWoutTax= inputValue*dollar;
    valueList[0].innerText = `$${pesosWoutTax}`;

    const countryTax = calculateCountryTax(pesosWoutTax);
    valueList[1].innerText = `$${countryTax}`;

    const retGanBBPP = calculateRetGanBPP(pesosWoutTax, moreThan300);
    valueList[2].innerText = `$${retGanBBPP}`

    let provincePercent = document.querySelector("#perc");

    const percIIBB = calculatePercIIBB(pesosWoutTax, provinceNum, provincePercent); 
    valueList[3].innerText = `$${percIIBB}`

    const sealTax = calculateSealTax(pesosWoutTax, payMethodNum);
    valueList[4].innerText = `$${sealTax}`

    const finalPrice = document.getElementById("total$");
    const totalTaxes = Number(pesosWoutTax)+Number(countryTax)+Number(retGanBBPP)+Number(percIIBB)+Number(sealTax);
    console.log(totalTaxes);
    finalPrice.innerText = `$${totalTaxes}`

}







