class crud{
    constructor(){
    this.store = [];
    this.i = 0;
    this.frm = document.querySelector("#frm");
    this.nam = document.querySelector("#nam");
    this.phn = document.querySelector("#phn");
    this.btn = document.querySelector("#btn");
    this.tbl = document.querySelector("#tbl");
    }

    insert(){
    event.preventDefault();
    this.i += 1;
    let detail = {
        id: this.i,
        nam: this.nam.value,
        phn: this.phn.value
    }
    this.store = [detail, ...this.store];
    localStorage.setItem("record", JSON.stringify(this.store));
    this.nam.value = this.phn.value = "";
    this.show();
    return false;
    }

    show(){
    localStorage.setItem("record", JSON.stringify(this.store));
    let dt = '';
    this.store = JSON.parse(localStorage.getItem("record"));
    this.store.map((d)=>{
        dt += `
        <tr>
            <th>${d.id}</th>
            <td>${d.nam}</td>
            <td>${d.phn}</td>
            <td>
            <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-warning" onclick="x.edit(${d.id})"><i class="fas fa-edit"></i></button>
                <button type="button" class="btn btn-danger" onclick="x.del(${d.id})"><i class="fas fa-trash"></i></button>
            </div>
            </td>
        </tr>
        `;
    });
    this.tbl.innerHTML = dt;
    }

    del(id){
    this.store = JSON.parse(localStorage.getItem("record"));
    this.store.forEach((s,i)=>{
        if(s.id === id){
        this.store.splice(i, 1);
        }
    });
    localStorage.setItem("record", JSON.stringify(this.store));
    this.show();
    }

    edit(id){
    this.store = JSON.parse(localStorage.getItem("record"));
    this.store.forEach((s)=>{
        if(s.id === id){
        this.nam.value = s.nam;
        this.phn.value = s.phn;
        this.btn.innerHTML = "Update <i class='fas fa-upload'></i>";
        this.frm.setAttribute("onsubmit", `return x.update(${id})`);
        }
        if(this.btn.innerHTML == "Update <i class='fas fa-upload'></i>"){
        this.frm.onsubmit = ()=>{
            this.update(id);
        }
        }
    });
    }

    update(id){
    event.preventDefault();
    this.store = JSON.parse(localStorage.getItem("record"));
    this.store.forEach((s)=>{
        if(s.id === id){
        s.id = id;
        s.nam = this.nam.value;
        s.phn = this.phn.value;
        this.btn.innerHTML = "Save <i class='fas fa-save'></i>";
        this.frm.setAttribute("onsubmit", `return x.insert()`);
        }
        if(this.btn.innerHTML == "Save <i class='fas fa-save'></i>"){
        this.frm.onsubmit = ()=>{
            this.insert();
        }
        }
    });
    localStorage.setItem("record", JSON.stringify(this.store));
    this.nam.value = this.phn.value = "";
    this.show();
    }
}

    let x = new crud();
    x.show();