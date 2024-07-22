import { TypeTask } from "@/types";
import { Button } from "./ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";

interface Props {
  task: TypeTask;
}
const TaskCard = ({ task }: Props) => {
  return (
    <div className="p-2 rounded-md bg-amber-100 border-2 border-transparent hover:border-2 hover:border-amber-300 box-border min-h-36 h-36 cursor-grab flex flex-col justify-between">
      <div>
        <p className="font-bold">{task.title}</p>
        <p className="  text-sm truncate">{task.description}</p>
      </div>
      <div>
        <p className="text-xs mb-1">Created At: 01/06/2024, 06:34:22</p>
        <div className="flex items-center gap-2 justify-end">
          <Button className="bg-red-500 hover:bg-red-600 h-fit ">
            <Trash2 className="size-4" />
          </Button>
          <Button className="bg-amber-500 hover:bg-amber-600 h-fit">
            <Pencil className="size-4" />
          </Button>
          <Button className="bg-blue-500 hover:bg-blue-600 h-fit">
            <Eye className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
