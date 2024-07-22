import { useEffect, useMemo, useState } from "react";
import testingData from "./../testingData.json";
import { TypeColumn, TypeTask } from "@/types";
import TaskColumn from "@/components/TaskColumn";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { createPortal } from "react-dom";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";

const TasksPage = () => {
  const [columns, setColumns] = useState<TypeColumn[]>([]);
  const [tasks, setTasks] = useState<TypeTask[]>([]);
  // const [activeTask, setActiveTask] = useState<TypeTask | null>(null);
  const [activeColumn, setActiveColumn] = useState<TypeColumn | null>(null);

  const columnIds = useMemo(() => {
    return columns.map((col) => col.id);
  }, [columns]);

  useEffect(() => {
    setColumns(testingData.columns);
    setTasks(testingData.tasks);
  }, []);

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

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

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div className=" grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SortableContext items={columnIds}>
          {columns.map((column) => (
            <TaskColumn
              key={column.id}
              column={column}
              tasks={tasks}
              setTasks={setTasks}
              // activeTask={activeTask}
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
              tasks={tasks}
              setTasks={setTasks}
              // activeTask={activeTask}
            />
          )}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
};

export default TasksPage;
