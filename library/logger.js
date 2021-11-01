class Logger {
    constructor(id) {
        this.id = id;
    }
    log(arg, title) {
        if (typeof(arg) == "string") this.text(arg);
        //if (arg instanceof Vector) this.vector(arg, title);
        if (arg instanceof Matrix) this.table(arg.matrix, title);
    }
    text(txt) {
        let e = document.createElement('div');
        e.innerHTML = txt;
        e.style.cssText += 'margin-top:10px;';
        document.getElementById(this.id).append(e);
    }
    table(array, title) {
            if (title == null) title = "no title";
            var cont = document.createElement('div');
            cont.style.cssText += 'display:inline-block;margin-right:10px;border:1px solid lightgray;padding:5px';

            var tit = document.createElement('div');
            tit.innerHTML = title;

            var table = document.createElement('table');
            table.style.cssText += 'border: 1px solid #ddd;border-collapse: collapse;';
            for (var i = 0; i < array.length; i++) {
                var row = document.createElement('tr');
                for (var j = 0; j < array[i].length; j++) {
                    var cell = document.createElement('td');
                    cell.style.cssText += 'border: 1px solid #ddd;padding:5px';
                    cell.textContent = array[i][j].toFixed(3);
                    row.appendChild(cell);
                }
                table.appendChild(row);
            }
            cont.appendChild(tit);
            cont.append(table);
            let llel = document.getElementById(this.id);
            llel.append(cont);
        }
        // vector(v, title) {
        //     let array = v.elements;
        //     if (title == null) title = "no title";
        //     var cont = document.createElement('div');
        //     cont.style.cssText += 'display:inline-block;margin-right:10px';

    //     var tit = document.createElement('div');
    //     tit.innerHTML = title;

    //     var table = document.createElement('table');
    //     table.style.cssText += 'border: 1px solid #ddd;border-collapse: collapse;';
    //     for (var i = 0; i < array.length; i++) {
    //         var row = document.createElement('tr');
    //         var cell = document.createElement('td');
    //         cell.style.cssText += 'border: 1px solid #ddd;padding:5px';
    //         cell.textContent = array[i].toFixed(3);
    //         row.appendChild(cell);

    //         table.appendChild(row);
    //     }
    //     cont.appendChild(tit);
    //     cont.append(table);
    //     let llel = document.getElementById(this.id);
    //     llel.append(cont);

    // }
}