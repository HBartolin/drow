class FileUtilsObj extends TemeljniObj {
    novaVerzija() {
        this.pozoviRestServis(mojUrl, this.novaVerzijaRest_)
    }

    novaVerzijaRest_(data) {
        data.forEach((redak, i) => {
            if(redak[currentVersion]!=crtica) {
                redak[previousVersion]=redak[currentVersion];
                redak[currentVersion]='';
            }
        });
    
        FileUtilsObj.downloadJson(data);
    }

    static downloadJson(retci) {
        let rijecnik_ = {
            rijecnik: retci
        }
    
        FileUtilsObj.download(dbJson, JSON.stringify(rijecnik_, null, 2));
    }

    static download(datoteka, retci) {
        let element = document.createElement('a');
        element.setAttribute('href', `data:text/plain;charset=utf-8, ${encodeURIComponent(retci)}`);
        element.setAttribute('download', datoteka);
      
        element.style.display = 'none';
        document.body.appendChild(element);
      
        element.click();
      
        document.body.removeChild(element);
    }

    exportWord() {
        this.pozoviRestServis(mojUrl, this.exportWordRest_);
    } 

    exportWordRest_(data) {
        let vb=`const lPolje = ${data.length}${newLine}`;
        vb+=`${t}Dim polje(lPolje) As String${newLine}`;
    
        data.forEach((redak, i) => {
            let sr=redak.name;
    
            if(i>0) vb+=newLine;
            vb+=`${t}polje(${i}) = "${sr}${hes}${redak.currentVersion}"`;
        });
    
        FileUtilsObj.download(wordVb, vb);
    }
};

let fileUtils=new FileUtilsObj();
