import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import { v4 } from "uuid";
import Title from "./components/Title";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    async function fetchTasks() {
      //CHAMAR A API
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10",
        {
          method: "GET",
        }
      );
      //PEGAR OS DADOS QUE ELA RETORNA
      const data = await response.json();

      //SALVAR/PERSISTIR OS DADOS NO STATE
      setTasks(data);
    }
    //SE QUISER PODE CHAMAR A FUNÇÃO PARA PEGAR AS TAREFAS DA API FAKE
    //fetchTasks();
  }, []);

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      //preciso atualizar esta tarefa
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      //Não preciso atualizar esta tarefa
      return task;
    });
    setTasks(newTasks);
  }
  /*função que eu criei sem a aula
  function deleteTask(taskId) {
    const allTasks = tasks.map((task) => {
      //preciso apagar esta tarefa
      if (task.id === taskId) {
        return { ...task, title: "", description: "" };
      }
      return task;
    });
    setTasks(allTasks);
  }*/
  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(),
      title,
      description,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center ">
      <div className="w-[500px] space-y-4">
        <Title>Gerenciador de Tarefas</Title>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}
export default App;
