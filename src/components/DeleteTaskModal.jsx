import { useContext } from "react";
import { BoardTaskContext } from "../store/board-task-context";
import { ModalContext } from "../store/modal-context";

function DeleteTaskModal() {
  const { currentBoard, currentTask, setTasks } = useContext(BoardTaskContext);
  const { closeDeleteTaskModal } = useContext(ModalContext);

  async function taskDeletionHandler() {
    await deleteTask(currentTask["task_id"]);

    const tasks = await fetchTasksData(currentBoard);
    setTasks(tasks);

    closeTaskInfoModal();
  }

  return (
    <>
      <h1 className="mb-6 text-orange">Delete this task?</h1>
      <p className="my-6 text-platinum">
        Are you sure you want to delete the &apos;{currentTask["task_title"]}
        &apos; task and its subtasks? This action cannot be reversed.
      </p>
      <div className="flex justify-between items-center mt-6">
        <button className={`btn-destructive w-[150px]`}>Delete</button>
        <button
          className={`btn-secondary w-[150px]`}
          onClick={closeDeleteTaskModal}
        >
          Cancel
        </button>
      </div>
    </>
  );
}

export default DeleteTaskModal;
