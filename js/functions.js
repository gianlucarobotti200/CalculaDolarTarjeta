
let calculateCountryTax = (value) => {
    return Number(value*0.3.toFixed(3));
}

let calculateRetGanBPP = (value, moreThan300) => {
    
    let retGanBBPP;
    if(moreThan300){
        retGanBBPP = Number(value*0.7.toFixed(3));
        document.querySelector("span#ret").innerText = "70";
        //valueList[2].innerText = `$${retGanBBPP}`;

        return retGanBBPP;
    } else{
        retGanBBPP = Number(value*0.45.toFixed(3));
        document.querySelector("span#ret").innerText = "45";
        //valueList[2].innerText = `$${retGanBBPP}`;

        return retGanBBPP;
    }

}


let calculatePercIIBB = (value, provinceNum,provincePercent) =>{

    switch(provinceNum){
        case "1":
            provincePercent.innerText = 0;
            return  0.00;
        case "2":
        case "3":
            
            provincePercent.innerText = 2;
            return Number(value*0.02.toFixed(3));
        case "4":
            provincePercent.innerText = 3;
            return Number(value*0.03.toFixed(3));
            
        case "5":
            provincePercent.innerText = 1;
            return Number(value*0.01.toFixed(3));
            
        case "6":
            provincePercent.innerText = 5;
            return Number(value*0.05.toFixed(3));
            
        case "7":
            provincePercent.innerText = 3.6;
            return Number(value*0.036.toFixed(3));
            
        case "8":
            provincePercent.innerText = 5.5;
            return Number(value*0.055.toFixed(3));
            
        case "9":
            provincePercent.innerText = 3;
            return Number(value*0.03.toFixed(3));
            
    }
}

let calculateSealTax = (value, payMethodNum) =>{

    if(payMethodNum=='1'){
        document.querySelector('span#sello').innerText = 1.2
        return Number(value*0.012.toFixed(3))
        
    } else{
        document.querySelector('span#sello').innerText = 0
        return 0.00;
    }

}
