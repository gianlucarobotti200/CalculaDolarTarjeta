(()=>{
    
    let dollar;
    let chileanPeso;

    const listValues = async () => {
        //https://www.dolarsi.com/api/api.php?type=valoresprincipales Usar dps
        const dolarDia = await fetch('https://www.dolarsi.com/api/api.php?type=dolar');
        const chileanPesoDia = await fetch('https://www.dolarsi.com/api/api.php?type=chileno')

        const chileanPesoObj = await chileanPesoDia.json();
        const dolarObj = await dolarDia.json();
        console.log("dolarDia: " + dolarObj[0].casa.compra)
        
        dollar = (parseFloat(dolarObj[0].casa.compra.replace(",", "."))).toFixed(2);
        chileanPeso = (parseFloat(chileanPesoObj[2].casa.venta.replace(",", "."))).toFixed(3)
        console.log(chileanPeso);
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
        valueList[0].innerText = `$${Number(pesosWoutTax).toFixed(2)}`;

        const countryTax = calculateCountryTax(inputValue)
        valueList[1].innerText = `$${countryTax.toFixed(2)}`;

        const retGanBBPP = calculateRetGanBPP(inputValue, moreThan300);
        valueList[2].innerText = `$${retGanBBPP.toFixed(2)}`

        let provincePercent = document.querySelector("#perc");

        const percIIBB = calculatePercIIBB(inputValue, provinceNum, provincePercent); 
        valueList[3].innerText = `$${percIIBB.toFixed(2)}`

        const sealTax = calculateSealTax(inputValue, payMethodNum);
        valueList[4].innerText = `$${sealTax.toFixed(2)}`

        const finalPrice = document.getElementById("total$");
        const totalTaxes = Number(pesosWoutTax)+Number(countryTax)+Number(retGanBBPP)+Number(percIIBB)+Number(sealTax);
        console.log(totalTaxes);
        finalPrice.innerText = `$${totalTaxes.toFixed(2)}`
    }

    let calculateDollars = () =>{

        const provinceNum = document.getElementById("provincia").value;

        const payMethodNum = document.getElementById("metodo-pago").value;

        let moreThan300 = document.getElementById("si").checked;
        
        const inputValue = Number(document.getElementById("money").value).toFixed(3);

        const valueList = document.querySelectorAll("#valores");

        if(inputValue>=300){
            moreThan300 = true;
        }

        const pesosWoutTax= inputValue*dollar;
        valueList[0].innerText = `$${pesosWoutTax.toFixed(2)}`;

        const countryTax = calculateCountryTax(pesosWoutTax);
        valueList[1].innerText = `$${countryTax.toFixed(2)}`;

        const retGanBBPP = calculateRetGanBPP(pesosWoutTax, moreThan300);
        valueList[2].innerText = `$${retGanBBPP.toFixed(2)}`

        let provincePercent = document.querySelector("#perc");

        const percIIBB = calculatePercIIBB(pesosWoutTax, provinceNum, provincePercent); 
        valueList[3].innerText = `$${percIIBB.toFixed(2)}`

        const sealTax = calculateSealTax(pesosWoutTax, payMethodNum);
        valueList[4].innerText = `$${sealTax.toFixed(2)}`

        const finalPrice = document.getElementById("total$");
        const totalTaxes = Number(pesosWoutTax)+Number(countryTax)+Number(retGanBBPP)+Number(percIIBB)+Number(sealTax);
        console.log(totalTaxes);
        finalPrice.innerText = `$${totalTaxes.toFixed(2)}`

    }

    let calculateChilean = () =>{
        
        const provinceNum = document.getElementById("provincia").value;

        const payMethodNum = document.getElementById("metodo-pago").value;

        let moreThan300 = document.getElementById("si").checked;
        
        const inputValue = Number(document.getElementById("money").value).toFixed(3);

        const valueList = document.querySelectorAll("#valores");
    }

    let calculateButton = document.querySelector("button");
    let inputMoney = document.querySelector("#money");
    let currencyInputStatus = document.querySelector("#moneda");
    const banderaArg = '\ud83c\udde6\ud83c\udde7'

    currencyInputStatus.addEventListener("change", function(){
        const inputState = this.value;

        if(inputState == '1'){
            inputMoney.value = ""
            inputMoney.setAttribute("placeholder", "Ingresar dólares");
            
        } else if(inputState == '2'){
            inputMoney.value = "";
            inputMoney.setAttribute("placeholder", "Ingresar pesos ARS");
        } else if(inputState == '3'){
            inputMoney.value = "";
            inputMoney.setAttribute("placeholder", "Ingresar pesos CLP");
        }
    })

    calculateButton.addEventListener("click", () =>{
        if(currencyInputStatus.value == '1'){
            
            calculateDollars();

        } else if(currencyInputStatus.value == '2'){
            
            calculatePesos();
        }
    })

    let listaImpuestos = document.querySelectorAll(".imp");

    listaImpuestos.forEach(impuesto => {
        impuesto.classList.add("mostrarImp");
    });

    const botonDesplegable = document.getElementById("mostrarImp")
    let ulLista = document.querySelector("#ullista");

    botonDesplegable.addEventListener("click", ()=>{
        ulLista.classList.toggle("despliegue");
        if(botonDesplegable.innerHTML == `Mostrar impuestos <i class="fa-sharp fa-solid fa-arrow-down"></i>`){
            botonDesplegable.innerHTML = `Ocultar impuestos <i class="fa-solid fa-arrow-up"></i>`
        } else{
            botonDesplegable.innerHTML = `Mostrar impuestos <i class="fa-sharp fa-solid fa-arrow-down"></i>`
        }
        listaImpuestos.forEach(impuesto => {
            impuesto.classList.toggle("mostrarImp");
        });
    })
})()






