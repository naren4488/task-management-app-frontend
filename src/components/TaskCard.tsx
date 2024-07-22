import { TypeTask } from "@/types";

interface Props {
  task: TypeTask;
}
const TaskCard = ({ task }: Props) => {
  return (
    <div className="p-2 rounded-md bg-amber-100 border-2 border-transparent hover:border-2 hover:border-amber-300 box-border h-32 cursor-grab">
      <p className="font-semibold">{task.title}</p>
      <p className=" text-gray-500">{task.description}</p>
    </div>
  );
};

export default TaskCard;
