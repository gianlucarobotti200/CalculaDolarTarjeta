(()=>{
    
    let currencies;

    const listValues = async () => {

        const data = JSON.parse(localStorage.getItem('currencies'));
        const lastUpdate = localStorage.getItem('lastUpdate');
        const now = new Date().getTime();

        if (data && lastUpdate && (now - lastUpdate) < 86400000) { // 86400000 ms = 24 hours
            currencies = data;
        } else {
            const dolarDia = await fetch('https://www.dolarsi.com/api/api.php?type=dolar');
            const chileanPesoDia = await fetch('https://www.dolarsi.com/api/api.php?type=chileno');
            const uruguayanPesoDia = await fetch('https://www.dolarsi.com/api/api.php?type=uruguayo');
            const realDia = await fetch('https://www.dolarsi.com/api/api.php?type=real')
            const euroDia = await fetch('https://www.dolarsi.com/api/api.php?type=euro')

            const dolarObj = await dolarDia.json();
            const chileanPesoObj = await chileanPesoDia.json();
            const uruguayanPesoObj = await uruguayanPesoDia.json();
            const realObj = await realDia.json();
            const euroObj = await euroDia.json();

            currencies = {
                argentinianPeso: 1,
                dollar: (parseFloat(dolarObj[0].casa.compra.replace(",", "."))).toFixed(2),
                chileanPeso: (parseFloat(chileanPesoObj[7].casa.venta.replace(",", "."))).toFixed(3),
                uruguayanPeso:  (parseFloat(uruguayanPesoObj[2].casa.venta.replace(",", "."))).toFixed(3),
                real: (parseFloat(realObj[2].casa.venta.replace(",", "."))).toFixed(3),
                euro: (parseFloat(euroObj[2].casa.venta.replace(",", "."))).toFixed(3)
            };

            localStorage.setItem('currencies', JSON.stringify(currencies));
            localStorage.setItem('lastUpdate', now);
        }

        console.log(currencies);
        let objDolar = document.getElementById("cotizacion");
        objDolar.innerText = `Dólar Oficial hoy: AR$ ${currencies.dollar}`;  
    };

    window.addEventListener("load", function(){
        listValues();
    });

    let calculatePrice = (currencie) =>{
        
        const provinceNum = document.getElementById("provincia").value;

        const payMethodNum = document.getElementById("metodo-pago").value;

        let moreThan300 = document.getElementById("si").checked;
        
        const inputValue = Number(document.getElementById("money").value).toFixed(3);

        const valueList = document.querySelectorAll("#valores");

        const pesosWoutTax= inputValue*currencie;
        valueList[0].innerText = `$${pesosWoutTax.toFixed(2)}`;

        if(pesosWoutTax/currencies.dollar>=300){
            moreThan300 = true;
        }

        const countryTax = calculateCountryTax(pesosWoutTax);
        valueList[1].innerText = `$${countryTax.toFixed(2)}`;

        const retGanBBPP = calculateRetGanBPP(pesosWoutTax, moreThan300);
        valueList[2].innerText = `$${retGanBBPP.toFixed(2)}`;

        let provincePercent = document.querySelector("#perc");

        const percIIBB = calculatePercIIBB(pesosWoutTax, provinceNum, provincePercent); 
        valueList[3].innerText = `$${percIIBB.toFixed(2)}`;

        const sealTax = calculateSealTax(pesosWoutTax, payMethodNum);
        valueList[4].innerText = `$${sealTax.toFixed(2)}`;

        const finalPrice = document.getElementById("total$");
        const totalTaxes = Number(pesosWoutTax)+Number(countryTax)+Number(retGanBBPP)+Number(percIIBB)+Number(sealTax);
        console.log(totalTaxes);
        finalPrice.innerText = `$${totalTaxes.toFixed(2)}`;
    }

    let calculateButton = document.querySelector("button");
    let inputMoney = document.querySelector("#money");
    let currencyInputStatus = document.querySelector("#moneda");

    currencyInputStatus.addEventListener("change", function(){
        const inputState = this.value;

        if(inputState == '1'){
            inputMoney.value = ""
            inputMoney.setAttribute("placeholder", "Ingresar USD");
        } else if(inputState == '2'){
            inputMoney.value = "";
            inputMoney.setAttribute("placeholder", `Ingresar pesos ARS`);
        } else if(inputState == '3'){
            inputMoney.value = "";
            inputMoney.setAttribute("placeholder", "Ingresar pesos CLP");
        } else if(inputState == '4'){
            inputMoney.value = "";
            inputMoney.setAttribute("placeholder", "Ingresar pesos UY");
        } else if(inputState == '5'){
            inputMoney.value = "";
            inputMoney.setAttribute("placeholder", "Ingresar reales");
        } else if(inputState == '6'){
            inputMoney.value = "";
            inputMoney.setAttribute("placeholder", "Ingresar euros");
        }
    })

    calculateButton.addEventListener("click", () =>{
        
        switch(currencyInputStatus.value){
            case '1':
                calculatePrice(currencies.dollar);
                console.log("Calculando Dolar")
                break;
            case '2':
                calculatePrice(currencies.argentinianPeso);
                console.log("Calculando Peso Argentino")
                break;
            case '3':
                calculatePrice(currencies.chileanPeso);
                console.log("Calculando Peso Chileno")
                break;
            case '4':
                calculatePrice(currencies.uruguayanPeso);
                console.log("Calculando Peso Uruguayo")
                break
            case '5':
                calculatePrice(currencies.real);
                console.log("Calculando Reales")
                break;
            case '6':
                calculatePrice(currencies.euro);
                console.log("Calculando Euro")
                break;
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






