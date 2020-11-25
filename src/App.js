import React from 'react';
import './App.css';

//HTML Drag and Drop API

class App extends React.Component {
  state = {
    tasks: [
      {
        id: 1,
        title: "Buy Milk",
        description: "order online on big basket",
        status: "todo"
      },
      {
        id: 2,
        title: "book",
        description: "return library book",
        status: "inprocess"
      },
      {
        id: 3,
        title: "exercise",
        description: "do yoga and go on a walk",
        status: "blocked"
      },
      {
        id: 4,
        title: "water",
        description: "drink 4l water everyday",
        status: "completed"
      },
      {
        id: 5,
        title: "cat",
        description: "feed the cat",
        status: "todo"
      }]
  };

  onDragStart = (event, taskid) => {
    event.dataTransfer.setData("taskid", taskid);
  }

  onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  }

  onDrop = (event, newtaskstatus) => {
    let taskid = event.dataTransfer.getData("taskid");

    let tasks = this.state.tasks.filter((task) => {
      if (task.id == taskid) {
        task.status = newtaskstatus;
      }
      return task;
    });

    this.setState({
      ...this.state,
      tasks
    });
  }
  

  render() {
    const tasks = {
      todo: [],
      inprocess: [],
      blocked: [],
      completed: []
    };

    this.state.tasks.forEach(task => {
      tasks[task.status].push(<div id={task.id} className="task" draggable onDragStart={(event) => this.onDragStart(event, task.id)}>
        <div draggable="false" className="title">{task.title}</div>
        <div draggable="false" className="description">{task.description}</div>
      </div>)
    })
    

    return (
      <React.Fragment>
        <h1 className="top-header">Kanban Board</h1>
        <div class="kanban-board">
          <div class="kanban">
            <h2> + To Do</h2>
            <div onDrop={(event) => this.onDrop(event, "todo")} onDragOver={(event) => this.onDragOver(event)}> {tasks.todo}</div>
          </div>
          <div class="kanban">
            <h2> + In Process</h2>
            <div onDrop={(event) => this.onDrop(event, "inprocess")} onDragOver={(event) => this.onDragOver(event)}>{tasks.inprocess}</div>
          </div>
          <div class="kanban" onDrop={(event) => this.onDrop(event, "blocked")} onDragOver={(event) => this.onDragOver(event)}>
            <h2> + Blocked</h2>
            <div onDrop={(event) => this.onDrop(event, "blocked")} onDragOver={(event) => this.onDragOver(event)}>{tasks.blocked}</div>
          </div>
          <div class="kanban" onDrop={(event) => this.onDrop(event, "completed")} onDragOver={(event) => this.onDragOver(event)}>
            <h2> + Completed</h2>
            <div onDrop={(event) => this.onDrop(event, "completed")} onDragOver={(event) => this.onDragOver(event)}>{tasks.completed}</div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default App;
