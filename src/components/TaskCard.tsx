import { TypeTask } from "@/types";
import { Button } from "./ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Dialog, DialogTrigger } from "./ui/dialog";
import EditTaskModal from "./EditTaskModal";
import ViewTaskModal from "./ViewTaskModal";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  task: TypeTask;
  editTask: (
    taskId: string,
    taskTitle: string,
    taskDesc: string,
    status: string
  ) => void;
  deleteTask: (taskId: string) => void;
}
const TaskCard = ({ task, editTask, deleteTask }: Props) => {
  // console.log("finally at ", task);
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task._id,
    data: {
      type: "Task",
      task,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div className="p-2 opacity-50 rounded-md bg-amber-100 border-2  border-amber-300 box-border min-h-36 h-36 cursor-grab flex flex-col justify-between" />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-2 rounded-md bg-amber-100 border-2 border-transparent hover:border-2 hover:border-amber-300 box-border min-h-36 h-36 cursor-grab flex flex-col justify-between"
    >
      <div>
        <p className="font-bold">{task.title}</p>
        <p className="  text-sm truncate">{task.description}</p>
      </div>
      <div>
        <p className="text-xs mb-1">Created At: 01/06/2024, 06:34:22</p>
        <div className="flex items-center gap-2 justify-end">
          <Button
            onClick={() => deleteTask(task._id)}
            className="bg-red-500 hover:bg-red-600 h-fit "
          >
            <Trash2 className="size-4" />
          </Button>
          <Dialog>
            <DialogTrigger asChild className="hover:cursor-pointer">
              <div className="bg-amber-500 hover:bg-amber-600 h-fit p-2 px-4 rounded-md">
                <Pencil className="size-4 text-white" />
              </div>
            </DialogTrigger>
            <EditTaskModal editTask={editTask} task={task} />
          </Dialog>
          <Dialog>
            <DialogTrigger asChild className="hover:cursor-pointer">
              <div className="bg-blue-500 hover:bg-blue-600 h-fit p-2 px-4 rounded-md">
                <Eye className="size-4 text-white" />
              </div>
            </DialogTrigger>
            <ViewTaskModal task={task} />
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
