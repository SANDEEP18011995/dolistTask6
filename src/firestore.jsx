
import { db } from './firebase';
import { collection, addDoc, updateDoc, doc, getDocs, query, where } from 'firebase/firestore';


export const createToDoList = async (userId, listName) => {
  const docRef = await addDoc(collection(db, 'toDoLists'), {
    userId,
    listName,
    createdAt: new Date()
  });
  return docRef.id;
};

// Add a task to a to-do list
export const addTaskToToDoList = async (listId, task) => {
  const docRef = await addDoc(collection(db, 'tasks'), {
    listId,
    title: task.title,
    description: task.description,
    dueDate: task.dueDate,
    priority: task.priority,
    createdAt: new Date()
  });
  return docRef.id;
};

// Fetch all to-do lists for a user
export const fetchToDoLists = async (userId) => {
  const q = query(collection(db, 'toDoLists'), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

