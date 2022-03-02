const rijecnik="rijecnik";
const mojUrl=`http://localhost:3000/${rijecnik}`;
const dbJson="db.json";
const wordVb="wordVb.txt";
const id="id";
const currentVersion="currentVersion";
const previousVersion="previousVersion";
const name="name";
const wordTablica="wordTablicaBody";
const newLine = "\r\n"; 
const hes="####";
const t="\t";
const crtica="-";
const c0=0;
const c2=2;
const c3=3;

export class TemeljniObj {
    postaviGresku(e) {
        console.log(e);
        
        let greskaM=document.getElementById("greska");
        greskaM.style['display'] = 'block';
        greskaM.innerHTML = e;
    }

    pozoviRestServis(mojUrl, ucitaj, event=null) {
        console.log(`[GET] ${mojUrl}`);

        fetch(mojUrl)
            .then(response => response.json())
            .then(data => ucitaj(data, mojUrl, event))
            .catch(error => this.postaviGresku(error));
    }

    static pozoviRestServisPut(mojUrl, data) {
        console.log(`[PUT] ${mojUrl}`);

        let init_ = {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8'
            }), 
            body: JSON.stringify(data)
        };

        fetch(mojUrl, init_)
            .catch(error => this.postaviGresku(error));
    }
}