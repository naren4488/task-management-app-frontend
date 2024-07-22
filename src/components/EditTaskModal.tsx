import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";
import { TypeTask } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Props {
  editTask: (
    taskId: number,
    taskTitle: string,
    taskDesc: string,
    status: string
  ) => void;
  task: TypeTask;
}

const EditTaskModal = ({ editTask, task }: Props) => {
  const [title, setTitle] = useState<string>(task.title);
  const [desc, setDesc] = useState<string>(task.description);
  const [status, setStatus] = useState<string>(task.status);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(e.target.value);
  };
  const handleStatusChange = (e: string) => {
    setStatus(e);
  };

  const handleUpdate = () => {
    editTask(task.id, title, desc, status);
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogDescription>
          Please update the details to edit the task
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="title" className="text-right">
            Title
          </Label>
          <Input
            id="title"
            value={title}
            className="col-span-3"
            onChange={(e) => handleTitleChange(e)}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-right">
            Description
          </Label>
          <Input
            id="description"
            value={desc}
            className="col-span-3"
            onChange={(e) => handleDescChange(e)}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="status" className="text-right">
            Status
          </Label>
          <Select value={status} onValueChange={(e) => handleStatusChange(e)}>
            <SelectTrigger className=" col-span-3">
              <SelectValue placeholder={status} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="To Do">To Do</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Done">Done</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter className="flex flex-col gap-2 ">
        <DialogClose asChild className="">
          <Button
            type="submit"
            className="bg-amber-400 hover:bg-amber-500 text-black"
            onClick={handleUpdate}
          >
            Save Changes
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button
            type="button"
            variant="ghost"
            className="border border-amber-300 hover:bg-amber-100"
          >
            Close
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default EditTaskModal;
