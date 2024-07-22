import { useEffect, useState } from "react";
import testingData from "./../testingData.json";
import { TypeColumn } from "@/types";
import TaskColumn from "@/components/TaskColumn";
const TasksPage = () => {
  const [columns, setColumns] = useState<TypeColumn[]>([]);

  useEffect(() => {
    setColumns(testingData.columns);
  }, []);

  return (
    <div className=" grid grid-cols-1 lg:grid-cols-3 gap-4">
      {columns.map((column) => (
        <TaskColumn key={column.id} column={column} />
      ))}
    </div>
  );
};

export default TasksPage;
