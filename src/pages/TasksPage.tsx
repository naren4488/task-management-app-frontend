import { useEffect, useState } from "react";
import testingData from "./../testingData.json";
import { TypeColumn, TypeTask } from "@/types";
import TaskColumn from "@/components/TaskColumn";
const TasksPage = () => {
  const [columns, setColumns] = useState<TypeColumn[]>([]);
  const [tasks, setTasks] = useState<TypeTask[]>([]);

  useEffect(() => {
    setColumns(testingData.columns);
    setTasks(testingData.tasks);
  }, []);

  return (
    <div className=" grid grid-cols-1 lg:grid-cols-3 gap-4">
      {columns.map((column) => (
        <TaskColumn
          key={column.id}
          column={column}
          tasks={tasks}
          setTasks={setTasks}
        />
      ))}
    </div>
  );
};

export default TasksPage;
