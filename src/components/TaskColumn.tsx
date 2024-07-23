import { TypeColumn, TypeTask } from "@/types";
import { useEffect, useMemo, useState } from "react";
import TaskCard from "./TaskCard";
import { CirclePlus } from "lucide-react";
import { Dialog, DialogTrigger } from "./ui/dialog";
import NewTaskModal from "./NewTaskModal";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  column: TypeColumn;
  tasks: TypeTask[];
  addNewTask: (taskTitle: string, taskDesc: string, taskStatus: string) => void;
  editTask: (
    taskId: string,
    taskTitle: string,
    taskDesc: string,
    taskStatus: string
  ) => void;
  deleteTask: (taskId: string) => void;
  taskCount: number;
}

const TaskColumn = ({
  column,
  tasks,
  addNewTask,
  editTask,
  deleteTask,
  taskCount,
}: Props) => {
  const [currentColumnTasks, setCurrnetColumnTasks] = useState<TypeTask[]>([]);

  const tasksId = useMemo(() => {
    return tasks.map((task) => task._id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  useEffect(() => {
    setCurrnetColumnTasks(tasks);
  }, [column, tasks]);

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="border border-amber-300 shadow-md  p-1 rounded-md h-[520px] flex flex-col justify-between bg-white"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border p-1 rounded-md h-[520px] flex flex-col justify-between bg-white "
    >
      <div
        {...attributes}
        {...listeners}
        className="font-semibold text-lg bg-amber-300 p-2 hover:cursor-grab"
      >
        {column.title}
      </div>
      <div className="flex flex-col gap-2 py-2 px-1 flex-grow overflow-y-auto overflow-x-hidden ">
        <SortableContext items={tasksId}>
          {currentColumnTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              editTask={editTask}
              deleteTask={deleteTask}
            />
          ))}
        </SortableContext>
      </div>

      <Dialog>
        <DialogTrigger asChild className="pt-2 hover:cursor-pointer">
          <div className="flex items-center gap-2 w-full justify-start hover:bg-amber-300 py-1 rounded px-2">
            <CirclePlus className="size-6" />
            <p className="text-lg">Add Task</p>
          </div>
        </DialogTrigger>
        <NewTaskModal
          addNewTask={addNewTask}
          tasksCount={taskCount}
          status={column.title}
        />
      </Dialog>
    </div>
  );
};

export default TaskColumn;
