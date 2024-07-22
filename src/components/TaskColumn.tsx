import { TypeColumn, TypeTask } from "@/types";
import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import { CirclePlus } from "lucide-react";
import { Dialog, DialogTrigger } from "./ui/dialog";
import NewTaskModal from "./NewTaskModal";

interface Props {
  column: TypeColumn;
  tasks: TypeTask[];
  setTasks: (tasks: TypeTask[]) => void;
}

const TaskColumn = ({ column, tasks, setTasks }: Props) => {
  const [currentColumnTasks, setCurrnetColumnTasks] = useState<TypeTask[]>([]);

  const getCurrentColumnTasks = (tasks: TypeTask[], column: TypeColumn) => {
    const filteredTasks = tasks.filter((task) => task.status === column.title);
    setCurrnetColumnTasks(filteredTasks);
  };

  useEffect(() => {
    getCurrentColumnTasks(tasks, column);
  }, [column, tasks]);

  const addNewTask = (
    taskTitle: string,
    taskDesc: string,
    taskStatus: string = column.title
  ) => {
    const newTask: TypeTask = {
      id: tasks.length + 1,
      title: taskTitle,
      description: taskDesc,
      status: taskStatus,
    };
    setTasks([...tasks, newTask]);
  };

  const editTask = (
    taskId: number,
    taskTitle: string,
    taskDesc: string,
    taskStatus: string
  ) => {
    const updatedTask: TypeTask = {
      id: taskId,
      title: taskTitle,
      description: taskDesc,
      status: taskStatus,
    };
    const tempTask = [...tasks];
    const updateIndex = tempTask.findIndex((task) => task.id === taskId);
    tempTask.splice(updateIndex, 1, updatedTask);
    setTasks(tempTask);
  };

  const deleteTask = (taskId: number) => {
    const item = tasks.filter((task) => task.id !== taskId);
    setTasks(item);
  };

  return (
    <div className="border shadow-md  p-1 rounded-md h-[520px] flex flex-col justify-between ">
      <p className="font-semibold text-lg bg-amber-300 p-2 ">{column.title}</p>
      <div className="flex flex-col gap-2 py-2 px-1 flex-grow overflow-scroll ">
        {currentColumnTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            editTask={editTask}
            deleteTask={deleteTask}
          />
        ))}
      </div>
      <Dialog>
        <DialogTrigger asChild className="pt-2 hover:cursor-pointer">
          <div className="flex items-center gap-2 w-full justify-start hover:bg-amber-300 py-1 rounded px-2">
            <CirclePlus className="size-6" />
            <p className="text-lg">Add Task</p>
          </div>
        </DialogTrigger>
        <NewTaskModal addNewTask={addNewTask} tasksCount={tasks.length} />
      </Dialog>
    </div>
  );
};

export default TaskColumn;
