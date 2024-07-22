import { TypeTask } from "@/types";
import { Button } from "./ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface Props {
  task: TypeTask;
}

const ViewTaskModal = ({ task }: Props) => {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Task Details</DialogTitle>
        <DialogDescription>Below are the details of the task</DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-3 mt-6">
        <h3 className="text-lg">Title: {task.title}</h3>
        <p className="">Description: {task.description}</p>
        <div>
          <p className="text-gray-600 text-sm">Status: {task.status}</p>
          <p className="text-gray-600 text-sm">
            Create at: 02/03/2024, 12:32:11
          </p>
        </div>
      </div>
      <DialogFooter className="flex flex-col gap-2 ">
        <DialogClose asChild>
          <Button
            type="button"
            variant="ghost"
            className="border  bg-amber-500 hover:bg-amber-600"
          >
            Close
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default ViewTaskModal;
