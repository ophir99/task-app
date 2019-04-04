import { Injectable } from "@angular/core";

export interface Task {
  title: string;
  completed: boolean;
  comments?: Comment[];
}
export interface Comment {
  text: string;
  date: string;
}
@Injectable({
  providedIn: "root"
})
export class TaskService {
  tasks: Task[];
  constructor() {
    if (localStorage.getItem("tasks")) {
      this.tasks = JSON.parse(localStorage.getItem("tasks"));
    } else {
      this.tasks = [];
    }
  }

  insertTask(value: string) {
    const tasks: Task = {
      title: value,
      comments: [],
      completed: false
    };
    this.tasks.push(tasks);
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  getAllTasks = (): Task[] => this.tasks;

  changeStatusOfTask(id: number) {
    this.tasks[id].completed = !this.tasks[id].completed;
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  addCommentToTask = (id: number, value: string) => {
    const task = {
      text: value,
      date: new Date().toISOString().split("T")[0]
    };
    this.tasks[id].comments.push(task);
    const tasks: Task[] = JSON.parse(localStorage.getItem("tasks"));
    tasks[id].comments.push(task);

    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  };
}
