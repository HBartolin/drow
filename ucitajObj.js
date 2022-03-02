class UcitajObj extends TemeljniObj {
    static ucitajRedakTablice(redak) {
        let table = document.getElementById(wordTablica);
        
        let row = table.insertRow(-1);
        row.id = redak.name;

        let i=0;
        let cell1 = row.insertCell(i++);
        let cell2 = row.insertCell(i++);
        let cell3 = row.insertCell(i++);
        let cell4 = row.insertCell(i++);
    
        cell1.innerHTML = redak.id;
        cell1.className = "align-middle text-right text-secondary";
        cell2.innerHTML = redak.name;
        cell2.className = "align-middle";
        cell3.innerHTML = `<input type="text" value="${redak.currentVersion}" class="form-control" onchange="promjenaPodataka.izmjeni(this, ${redak.id})" >`; 
        cell3.className = "align-middle";

        if(redak.name=="ePredmet_posjete_porast") {
            cell3.innerHTML += ` <button type="button" onclick="promjenaPodataka.izracunajPostotak(this, ${redak.id}, 'ePredemet_posjete')"  class="btn btn-light btn-sm">?</button>`;
            cell3.className += " input-group";
        } else if(redak.name=="eOglasna_posjete_porast") {
            cell3.innerHTML += ` <button type="button" onclick="promjenaPodataka.izracunajPostotak(this, ${redak.id}, 'eOglasna_posjete')"  class="btn btn-light btn-sm">?</button>`;
            cell3.className += " input-group";
        } else if(redak.name=="eOglasna_objave_trajne_posto") {
            cell3.innerHTML += ` <button type="button" onclick="promjenaPodataka.izracunajPostotakEotp(this, ${redak.id}, 'eOglasna_objave_sve', 'eOglasna_objave_trajne')"  class="btn btn-light btn-sm">?</button>`;
            cell3.className += " input-group";
        } else if(redak.name=="eOglasna_objave_porast") {
            cell3.innerHTML += ` <button type="button" onclick="promjenaPodataka.izracunajPostotakEoop(this, ${redak.id}, 'eOglasna_objave_sve')"  class="btn btn-light btn-sm">?</button>`;
            cell3.className += " input-group";
        } 
        
        cell4.innerHTML = redak.previousVersion;
        cell4.className = "align-middle";  
    }

    ucitajSve(data) {
        data.forEach(redak => UcitajObj.ucitajRedakTablice(redak));
    } 

    ucitajWord() {
        try {
            this.pozoviRestServis(mojUrl, this.ucitajSve);
        } catch(e) {
            this.postaviGresku(e);
        }
    }
};

let ucitaj=new UcitajObj();