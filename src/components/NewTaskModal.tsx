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

interface Props {
  addNewTask: (taskTitle: string, taskDesc: string) => void;
  tasksCount: number;
}

const NewTaskModal = ({ addNewTask, tasksCount }: Props) => {
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(e.target.value);
  };

  const handleSubmit = () => {
    if (title && desc) {
      addNewTask(title, desc);
      setTitle("");
      setDesc("");
    } else {
      // in case of user does not enter task details - default values
      const title = `Task ${tasksCount + 1}`;
      const desc = `Description ${tasksCount + 1}`;
      addNewTask(title, desc);
    }
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogDescription>
          Please enter the details to create a new task
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="title" className="text-right">
            Title
          </Label>
          <Input
            id="title"
            placeholder="Enter task title here..."
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
            placeholder="Enter task description here..."
            value={desc}
            className="col-span-3"
            onChange={(e) => handleDescChange(e)}
          />
        </div>
      </div>
      <DialogFooter className="flex flex-row justify-end mt-20 gap-2 ">
        <DialogClose asChild className="">
          <Button
            type="submit"
            className="bg-amber-400 hover:bg-amber-500 text-black"
            onClick={handleSubmit}
          >
            Add Task
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

export default NewTaskModal;
