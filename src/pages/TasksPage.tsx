import { useEffect, useMemo, useState } from "react";
import testingData from "./../testingData.json";
import { TypeColumn, TypeTask } from "@/types";
import TaskColumn from "@/components/TaskColumn";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { createPortal } from "react-dom";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import TaskCard from "@/components/TaskCard";
import backendEndpoint from "@/config/config";
import { toast } from "sonner";

const TasksPage = () => {
  const [columns, setColumns] = useState<TypeColumn[]>([]);
  const [tasks, setTasks] = useState<TypeTask[]>([]);
  const [activeTask, setActiveTask] = useState<TypeTask | null>(null);
  const [activeColumn, setActiveColumn] = useState<TypeColumn | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const columnIds = useMemo(() => {
    return columns.map((col) => col.id);
  }, [columns]);

  const getTasksAPI = async () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoading(true);
      try {
        const res = await fetch(`${backendEndpoint}/tasks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.status === 401) {
          toast.error(data.message);
        } else if (res.status !== 200) {
          toast.warning("Something went wrong, Please check the logs");
        }
        setTasks(data.tasks);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("access token does not exist, please login ");
    }
  };

  const createTaskAPI = async (newTask: {
    title: string;
    description: string;
    status: string;
  }): Promise<TypeTask | null> => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      // setIsLoading(true);
      try {
        const res = await fetch(`${backendEndpoint}/task`, {
          method: "POST",
          body: JSON.stringify({
            title: newTask.title,
            description: newTask.description,
            status: newTask.status,
          }),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (res.status === 200) {
          toast.success("Task created");
          return data.newTask;
        } else {
          toast.warning("Something went wrong, Please check the logs");
          return null;
        }
      } catch (err) {
        console.log(err);
      } finally {
        // setIsLoading(false);
      }
    } else {
      console.log("access token does not exist, please login ");
      return null;
    }
    return null;
  };

  const editTaskAPI = async (updatedTask: {
    id: string;
    title: string;
    description: string;
    status: string;
  }): Promise<TypeTask | null> => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      // setIsLoading(true);
      try {
        const res = await fetch(`${backendEndpoint}/task/${updatedTask.id}`, {
          method: "PUT",
          body: JSON.stringify({
            title: updatedTask.title,
            description: updatedTask.description,
            status: updatedTask.status,
          }),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (res.status === 200) {
          toast.success("Task updated");
          return data.task;
        } else {
          toast.warning("Something went wrong, Please check the logs");
          return null;
        }
      } catch (err) {
        console.log(err);
      } finally {
        // setIsLoading(false);
      }
    } else {
      console.log("access token does not exist, please login ");
      return null;
    }
    return null;
  };

  const deleteTaskAPI = async (taskId: string) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      // setIsLoading(true);
      try {
        const res = await fetch(`${backendEndpoint}/task/${taskId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        await res.json();
        if (res.status === 200) {
          toast.warning("Task deleted");
        } else {
          toast.warning("Something went wrong, Please check the logs");
        }
      } catch (err) {
        console.log(err);
      } finally {
        // setIsLoading(false);
      }
    } else {
      console.log("access token does not exist, please login ");
    }
  };

  useEffect(() => {
    setColumns(testingData.columns);
    getTasksAPI();
    // setTasks(testingData.tasks);
  }, []);

  const addNewTask = async (
    taskTitle: string,
    taskDesc: string,
    taskStatus: string
  ) => {
    const newTask = {
      title: taskTitle,
      description: taskDesc,
      status: taskStatus,
    };
    await createTaskAPI(newTask);
    await getTasksAPI();
  };

  const editTask = async (
    taskId: string,
    taskTitle: string,
    taskDesc: string,
    taskStatus: string
  ) => {
    const updatedTask = {
      id: taskId,
      title: taskTitle,
      description: taskDesc,
      status: taskStatus,
    };
    await editTaskAPI(updatedTask);
    await getTasksAPI();
  };

  const deleteTask = async (taskId: string) => {
    await deleteTaskAPI(taskId);
    await getTasksAPI();
  };

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    console.log("drag end running");
    console.log("active", active);
    console.log("over", over);

    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverAColumn = over.data.current?.type === "Column";

    if (isActiveATask && isOverAColumn) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (col) => col.id === activeColumnId
      );
      const overColumnIndex = columns.findIndex(
        (col) => col.id === overColumnId
      );

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    console.log("drag over running");
    console.log("active", active);
    console.log("over", over);

    if (!over) return;

    const activeTaskId = active.id;
    const overTaskId = over.id;

    if (activeTaskId === overTaskId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    // handle case of not dragging a task
    if (!isActiveATask) return;

    // dropping a task over another task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex(
          (task) => task._id === activeTaskId
        );
        const overIndex = tasks.findIndex((task) => task._id === overTaskId);

        tasks[activeIndex].status = tasks[overIndex].status;

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";
    // dropping a task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex(
          (task) => task._id === activeTaskId
        );

        tasks[activeIndex].status = over.data.current?.column.title;

        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  // console.log("tasks", tasks);
  // console.log("active task", activeTask);
  // console.log("active col", activeColumn);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <div className=" grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SortableContext items={columnIds}>
          {columns.map((column) => (
            <TaskColumn
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.status === column.title)}
              editTask={editTask}
              deleteTask={deleteTask}
              addNewTask={addNewTask}
            />
          ))}
        </SortableContext>
      </div>
      {createPortal(
        <DragOverlay>
          {activeColumn && (
            <TaskColumn
              key={activeColumn.id}
              column={activeColumn}
              tasks={tasks.filter((task) => task.status === activeColumn.title)}
              editTask={editTask}
              deleteTask={deleteTask}
              addNewTask={addNewTask}
            />
          )}
          {activeTask && (
            <TaskCard
              key={activeTask._id}
              task={activeTask}
              editTask={editTask}
              deleteTask={deleteTask}
            />
          )}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
};

export default TasksPage;
