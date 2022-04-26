async function DataTable (config) {
  let usersTable = document.getElementById("usersTable");
	let table = document.createElement('table');
	let thead = document.createElement('thead');
	let tbody = document.createElement('tbody');
  let add_user = document.getElementById('add_user');

  usersTable.appendChild(table);
	table.appendChild(thead);
  let tr = document.createElement('tr'); 
  thead.appendChild(tr);

  for(let i = 0; i < config.columns.length; i++) {
    let th = document.createElement('th');
    th.innerHTML = config.columns[i].title;
    tr.appendChild(th); 
  }
  table.appendChild(tbody);

  const users = await (await fetch(config.apiUrl)).json();

  for(let y = 0; y < Object.keys(users.data).length; y++) {
    let btn_del = document.createElement('button');
    btn_del.classList.add("btn_del");
    btn_del.id = Object.keys(users.data)[y];
    btn_del.innerHTML = "DELETE";
    let btn_del_id = btn_del.id;
    btn_del.addEventListener('click', async function() {
      return fetch(config.apiUrl + '/' + btn_del_id, {
        method: 'delete'
      })
      .then(response => response.json())
      .then(() => window.location.reload());
    })
    let tr = document.createElement('tr');
    let td_n = document.createElement('td');
    td_n.innerHTML = y+1;
    tr.appendChild(td_n);
    for (let i = 0; i < Object.values(Object.values(users.data)[y]).length; i++) {
      let td = document.createElement('td');
      td.innerHTML = Object.values(Object.values(users.data)[y])[i];
      tr.appendChild(td);
    }
    let td_del = document.createElement('td');
    td_del.appendChild(btn_del);
    tr.appendChild(td_del);
    tbody.appendChild(tr);
  }

  add_user.addEventListener('click', function() {
    let tr = document.createElement('tr');
    for(let i = 0; i < config.columns.length; i++) {
      let btn_add = document.createElement('button');
      btn_add.id = "btn_add";
      btn_add.classList.add("btn_add");
      btn_add.innerHTML = "add";
      let btn_add_bd = btn_add.id;
      if(i == 0) {
        let td = document.createElement('td');
        td.innerHTML = Object.keys(users.data).length + 1;
        tr.appendChild(td);
        tbody.insertBefore(tr, tbody.firstChild);
      }
      if(i == 4) {
        let td = document.createElement('td');
        td.appendChild(btn_add);
        tr.appendChild(td);
        tbody.insertBefore(tr, tbody.firstChild);
        break;
      }
      else {
        let td = document.createElement('td');
        let input = document.createElement('input');
        input.classList.add("empty");
        input.classList.add("inp");
        input.setAttribute("id", i);
        td.appendChild(input);
        tr.appendChild(td);
        tbody.insertBefore(tr, tbody.firstChild);
        input.addEventListener('input', function() {
          input.classList.remove("empty");
        })
      }
    }
    btn_add.addEventListener('click', async function() {
      let obj = {};
      let inputs = document.querySelectorAll('input');
      for(let inp of inputs){
        obj[Object.keys(Object.values(users.data)[1])[inp.id]] = inp.value;
        btn_add.classList.remove("empty");
      }
      return fetch(config.apiUrl, {
        method: 'POST',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(obj)
      })
      .then(response => response.json())
      .then(() => window.location.reload());
    })
  })
}

const config1 = {
  parent: '#usersTable',
  columns: [
    {title: '№', value: 'number'},
    {title: 'Name', value: 'name'},
    {title: 'Surname', value: 'surname'},
    {title: 'Avatar', value: 'URL'},
    {title: 'Birthday', value: 'age'},
    {title: 'Action', value: 'action'},
  ],
  apiUrl: "https://mock-api.shpp.me/miksam/users",
};

DataTable(config1);