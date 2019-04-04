import { Component } from "@angular/core";
import { Task, TaskService } from "./task.service";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  tasks: Task[];
  constructor(private taskService: TaskService, private snack: MatSnackBar) {
    this.tasks = this.taskService.getAllTasks();
  }

  addTask(value: string) {
    if (value) {
      this.taskService.insertTask(value);
    } else {
      this.snack.open("Write something..", "", {
        duration: 2000
      });
    }
  }

  addComment(id: number, value: string) {
    if (value) {
      this.taskService.addCommentToTask(id, value);
    } else {
      this.snack.open("Write something..", "", {
        duration: 2000
      });
    }
  }

  checkTask(index: number, event: Event) {
    event.stopPropagation();
    this.taskService.changeStatusOfTask(index);
  }
}
