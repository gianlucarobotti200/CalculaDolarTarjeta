const listValues = async () => {
    //https://www.dolarsi.com/api/api.php?type=valoresprincipales Usar dps
    const dolarDia = await fetch('https://www.dolarsi.com/api/api.php?type=dolar');
   
    const dolarObj = await dolarDia.json();
    console.log("dolarDia: " + dolarObj[0].casa.compra)
    
    let dolar = (parseFloat(dolarObj[0].casa.compra.replace(",", "."))).toFixed(2);
    
    let objDolar = document.getElementById("cotizacion");
    objDolar.innerText = `Dólar Oficial hoy: AR$ ${dolar}`  
};

window.addEventListener("load", function(){
    listValues();
});

let calcularPesos = () =>{

    const provinceNum = document.getElementById("provincia").value;

    const payMethodNum = document.getElementById("metodo-pago").value;

    const moreThan300 = document.getElementById("si").checked;
    
    const inputValue = Number(document.getElementById("money").value).toFixed(3);

    const valueList = document.querySelectorAll("#valores");

    const pesosWoutTax= inputValue;
    valueList[0].innerText = `$${pesosWoutTax}`;

    const countryTax = Number(inputValue*0.3.toFixed(3));
    valueList[1].innerText = `$${countryTax}`;

    let retGanBBPP;
    if(moreThan300){
        retGanBBPP = Number(inputValue*0.7.toFixed(3));
        document.querySelector("span#ret").innerText = "70";
        valueList[2].innerText = `$${retGanBBPP}`;
    } else{
        retGanBBPP = Number(inputValue*0.45.toFixed(3));
        document.querySelector("span#ret").innerText = "45";
        valueList[2].innerText = `$${retGanBBPP}`;
    }

    let provincePercent = document.querySelector("#perc");

    let percIIBB;

    switch(provinceNum){
        case "1":
            percIIBB = 0.00
            valueList[3].innerText = `$${percIIBB}`;
            break;
        case "2":
        case "3":
            percIIBB = Number(inputValue*0.02.toFixed(3));
            valueList[3].innerText = `$${percIIBB}`;
            provincePercent.innerText = 2;
            break;
        case "4":
            percIIBB = Number(inputValue*0.03.toFixed(3));
            valueList[3].innerText = `$${percIIBB}`;
            provincePercent.innerText = 3;
            break;
        case "5":
            percIIBB = Number(inputValue*0.01.toFixed(3));
            valueList[3].innerText = `$${percIIBB}`;
            provincePercent.innerText = 1;
            break;
        case "6":
            percIIBB = Number(inputValue*0.05.toFixed(3));
            valueList[3].innerText = `$${percIIBB}`;
            provincePercent.innerText = 5;
            break;
        case "7":
            percIIBB = Number(inputValue*0.036.toFixed(3));
            valueList[3].innerText = `$${percIIBB}`;
            provincePercent.innerText = 3.6;
            break;
        case "8":
            percIIBB = Number(inputValue*0.055.toFixed(3));
            valueList[3].innerText = `$${percIIBB}`;
            provincePercent.innerText = 5.5;
            break;
        case "9":
            percIIBB = Number(inputValue*0.03.toFixed(3));
            valueList[3].innerText = `$${percIIBB}`;
            provincePercent.innerText = 3;
            break;
    }

    let sealTax;
    if(payMethodNum=='1'){
        sealTax = Number(inputValue*0.012.toFixed(3))
        document.querySelector('span#sello').innerText = 1.2
        valueList[4].innerText = `$${sealTax}`;
    } else{
        sealTax = 0.00;
        document.querySelector('span#sello').innerText = 0
        valueList[4].innerText = `$${sealTax}`;
    }

    const finalPrice = document.getElementById("total$");
    const totalTaxes = Number(pesosWoutTax)+Number(countryTax)+Number(retGanBBPP)+Number(percIIBB)+Number(sealTax);
    console.log(totalTaxes);
    finalPrice.innerText = `$${totalTaxes}`
    return console.log(valueList);
}


document.querySelector("button").addEventListener("click", calcularPesos);



