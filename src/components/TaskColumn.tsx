import { TypeColumn, TypeTask } from "@/types";
import testingData from "./../testingData.json";
import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import { Button } from "./ui/button";
import { CirclePlus } from "lucide-react";
interface Props {
  column: TypeColumn;
}
const TaskColumn = ({ column }: Props) => {
  const [tasks, setTasks] = useState<TypeTask[]>([]);
  const [currentColumnTasks, setCurrnetColumnTasks] = useState<TypeTask[]>([]);
  const getCurrentColumnTasks = (tasks: TypeTask[], column: TypeColumn) => {
    const res = tasks.filter((task) => task.status === column.title);
    console.log(column.title, res);
    setCurrnetColumnTasks(res);
  };

  useEffect(() => {
    setTasks(testingData.tasks);
  }, []);

  useEffect(() => {
    getCurrentColumnTasks(tasks, column);
  }, [column, tasks]);

  return (
    <div className="border shadow-md  p-1 rounded-md h-[520px] flex flex-col justify-between ">
      <p className="font-semibold text-lg bg-amber-300 p-2 ">{column.title}</p>
      <div className="flex flex-col gap-2 py-2 px-1 flex-grow">
        {currentColumnTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
      <Button
        className="flex items-center gap-2 w-full justify-start hover:bg-amber-300"
        variant={"ghost"}
      >
        <CirclePlus className="size-6" />
        <p className="text-lg">Add Task</p>
      </Button>
    </div>
  );
};

export default TaskColumn;
