class PromjenaPodatakaObj extends TemeljniObj {
    izmjeni(event, indexRetka) {
        try {
            this.promjenaPodatakaTC(event, indexRetka);
        } catch(e) {
            this.postaviGresku(e);
        }
    }

    promjenaPodatakaTC(event, indexRetka) {
        let projektUrl_=`${mojUrl}/${indexRetka}`;
        const tr_=event.parentNode.parentNode;
        const aTd=Array.from(tr_.getElementsByTagName("td"));

        let data={};
        data[id]=aTd[0].innerHTML;
        data[name]=aTd[1].innerHTML;
        data[currentVersion]=event.value;
        data[previousVersion]=aTd[3].innerHTML;
        
        this.promjenaPodatakaRest_(data, projektUrl_, event);
    }

    promjenaPodatakaRest_(data, projektUrl_, event) {
        PromjenaPodatakaObj.pozoviRestServisPut(projektUrl_, data);
        
        let eStyleBgC=event.style.backgroundColor;
        event.style.backgroundColor = "#3CBC8D";
        
        setTimeout(() => event.style.backgroundColor = eStyleBgC, 1000); 
    }

    izracunajPostotakEotp(event, id, idSve, idTrajne) {
        let redakSve=document.getElementById(idSve);
        let redakTrajne=document.getElementById(idTrajne);

        const trajne=promjenaPodataka.tablicaStupac2(redakTrajne);
        const sve=promjenaPodataka.tablicaStupac2(redakSve);

        let postotak=trajne/sve;
        postotak=Math.round(postotak*100) + "%";
        
        promjenaPodataka.azurirajPostotak(event, id, postotak);
    }

    izracunajPostotak(event, id, toIdName) {
        let redak=document.getElementById(toIdName);

        const trenutno=promjenaPodataka.tablicaStupac2(redak);
        const proslo=promjenaPodataka.tablicaStupac3(redak);
        let postotak=0;

        if(trenutno<proslo) {
            postotak=trenutno/proslo;
        } else {
            postotak=proslo/trenutno;
        }

        postotak=Math.round((1-postotak)*100);

        if(trenutno<proslo) {
            postotak=`${postotak}% manje`;
        } else {
            postotak=`${postotak}% više`;
        }

        promjenaPodataka.azurirajPostotak(event, id, postotak);
    }

    azurirajPostotak(event, id, postotak) {
        const tr_=event.parentNode.parentNode;
        const varTd=Array.from(tr_.getElementsByTagName("td"));
        let varTd2=varTd[2].getElementsByTagName('input')[0];
        varTd2.value=postotak;

//        const evt = new Event("change", {varTd2, id});
//        varTd2.dispatchEvent(evt);
        
        promjenaPodataka.izmjeni(varTd2, id);
    }

    izracunajPostotakEoop(event, id, toIdName) {
        let redak=document.getElementById(toIdName);

        const trenutno=promjenaPodataka.tablicaStupac2(redak);
        const proslo=promjenaPodataka.tablicaStupac3(redak);
        let mv;

        if(trenutno<proslo) {
            let koliko=proslo - trenutno;
            mv=`smanjilo se za ${koliko}`;
        } else {
            let koliko=trenutno - proslo;
            mv=`povećalo se za ${koliko}`;
        }
        
        promjenaPodataka.azurirajPostotak(event, id, promjenaPodataka.numberWithCommas(mv));        
    }

    tablicaStupac2(redak) {
        const stupci=Array.from(redak.getElementsByTagName("td"));
        let stupac2=stupci[2];
        let inputElementValue=stupac2.getElementsByTagName('input')[0].value;
        let replaceIEV=inputElementValue.replace(/\./g, '' );
        
        return parseInt(replaceIEV);
    }

    tablicaStupac3(redak) {
        const stupci=Array.from(redak.getElementsByTagName("td"));
        let stupac3=stupci[3];
        let stupac3Element=stupac3.innerHTML;
        let replaceIEV=stupac3Element.replace(/\./g, '' );
        
        return parseInt(replaceIEV);
    }

    numberWithCommas(x) {
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
    }
};

let promjenaPodataka=new PromjenaPodatakaObj();