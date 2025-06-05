import { useEffect, useState } from 'react';
import axios from 'axios';
const Vercel_PATH = import.meta.env.PATH

interface Todo {
  _id: string;
  title: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    axios.get<Todo[]>(`${Vercel_PATH}/todos`)
      .then((res) => setTodos(res.data))
      .catch(err => console.error(err));
  }, []);

  const addTodo = () => {
    axios.post(`${Vercel_PATH}/todos`, { title })
      .then(res => {
        setTodos([...todos, res.data]);
        setTitle('');
      });
  };

  const deleteTodo = (id: string) => {
    axios.delete(`${Vercel_PATH}/todos/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo._id !== id));
      });
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">ToDo App</h1>
      <div className="flex gap-2 mb-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add todo"
          className="border p-2 flex-1"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white px-4 rounded"
        >
          Add
        </button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo._id} className="flex justify-between items-center border-b py-2">
            <span>{todo.title}</span>
            <button
              onClick={() => deleteTodo(todo._id)}
              className="text-red-500"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
