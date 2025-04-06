export function toDoList(parentElement) {
    let todos = [];
 
    return {
        
        send: function (todo) {
            return fetch("/todo/add", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(todo)
            })
            .then(response => response.json())
            .catch(error => { throw error; });
        },
 
        load: function () {
            return fetch("/todo")
                .then(response => response.json())
                .then(json => {
                    todos = json.todos;
                    this.render();
                    return json;
                })
                .catch(error => { throw error; });
        },
 
        complete: function (todo) {
            return fetch("/todo/complete", {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(todo)
            })
            .then(response => response.json())
            .catch(error => { throw error; });
        },
 
        delete: function (id) {
            return fetch("/todo/"+ id, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .catch(error => { throw error; });
        },
       render: function () {
          let html = "";
          html += todos.map((n) => {
              if (!n.completed) {
                
                  return `<li >
                              <span >`+n.name+`</span>
                              <div>
                                 <button type="button" class="complete" > COMPLETA</button>
                                  <button type="button" class="delete">ELIMINA</button>
                              </div>
                          </li>`;
              } else {
                
                  return `<li class="completed-task" >
                              <span>`+n.name+`</span>
                              <div>
                                  <button type="button" class="complete" > COMPLETA</button>
                                  <button type="button" class="delete">ELIMINA</button>
                              </div>
                          </li>`;
              }
          }).join("");
 
          parentElement.innerHTML = `<ul >`+html+`</ul>`;
          document.querySelectorAll(".delete").forEach((button, index) => {
            button.onclick = () => {
                this.delete(todos[index].id).then(() => this.load()).catch(console.error);
            };
        });

          document.querySelectorAll(".complete").forEach((button, index) => {
              button.onclick = () => {
                console.info("ho cliccato");
                  this.complete(todos[index]).then(() => this.load()).catch(console.error);
              };
          });
 
         
      }
 
    };
 }
 