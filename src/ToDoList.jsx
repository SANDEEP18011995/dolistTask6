
import React, { useState, useEffect } from 'react';
import { createToDoList, addTaskToToDoList, fetchToDoLists } from './firestore';

const ToDoList = ({ userId }) => {
  const [toDoLists, setToDoLists] = useState([]);
  const [listName, setListName] = useState('');
  const [task, setTask] = useState({ title: '', description: '', dueDate: '', priority: '' });

  useEffect(() => {
    const loadToDoLists = async () => {
      const lists = await fetchToDoLists(userId);
      setToDoLists(lists);
    };
    loadToDoLists();
  }, [userId]);

  const handleCreateList = async () => {
    const listId = await createToDoList(userId, listName);
    setToDoLists([...toDoLists, { id: listId, listName }]);
  };

  const handleAddTask = async (listId) => {
    await addTaskToToDoList(listId, task);
    setTask({ title: '', description: '', dueDate: '', priority: '' });
  };

  return (
    <div>
      <h1>Your To-Do Lists</h1>
      <input placeholder="New List Name" onChange={(e) => setListName(e.target.value)} />
      <button onClick={handleCreateList}>Create List</button>

      {toDoLists.map((list) => (
        <div key={list.id}>
          <h2>{list.listName}</h2>
          <div>
            <input placeholder="Task Title" onChange={(e) => setTask({ ...task, title: e.target.value })} />
            <input placeholder="Description" onChange={(e) => setTask({ ...task, description: e.target.value })} />
            <input type="date" onChange={(e) => setTask({ ...task, dueDate: e.target.value })} />
            <select onChange={(e) => setTask({ ...task, priority: e.target.value })}>
              <option value="">Select Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <button onClick={() => handleAddTask(list.id)}>Add Task</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToDoList;
