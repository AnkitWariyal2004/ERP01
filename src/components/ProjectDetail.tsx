import { Task, NewProject } from '../types';
import { useState } from 'react';
import { FiPlus, FiCalendar, FiClock } from 'react-icons/fi';

export default function ProjectDetail({ project }: { project: NewProject }) {
  const [tasks, setTasks] = useState<Task[]>(project.tasks || []);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium'
  });

  // Calculate progress
  const progress = Math.round(
    (tasks.filter(task => task.status === 'done').length / tasks.length) * 100
  ) || 0;

  const addTask = () => {
    if (!newTask.title.trim()) return;
    
    const task: Task = {
      _id: Math.random().toString(),
      title: newTask.title,
      description: newTask.description,
      dueDate: new Date().toISOString(),
      status: 'pending',
      priority: 'medium',   
      // newTask.priority
    };
    
    setTasks([...tasks, task]);
    setNewTask({ title: '', description: '', priority: 'medium' });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'done': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Project Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Project Header */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{project.name}</h1>
                <p className="text-gray-600 mt-2">{project.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                  {project.status}
                </span>
              </div>
            </div>

            {/* Project Meta */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Start Date</p>
                <p className="font-medium flex items-center gap-1">
                  <FiCalendar className="text-gray-400" />
                  {new Date(project.startDate).toLocaleDateString()}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">End Date</p>
                <p className="font-medium flex items-center gap-1">
                  <FiCalendar className="text-gray-400" />
                  {new Date(project.endDate).toLocaleDateString()}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Total Tasks</p>
                <p className="font-medium">{tasks.length}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Completion</p>
                <p className="font-medium">{progress}%</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Project Progress</span>
                <span className="text-sm text-gray-500">{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Tasks List */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Tasks</h2>
              <span className="text-sm text-gray-500">{tasks.length} tasks</span>
            </div>

            {tasks.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No tasks yet. Add your first task!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div key={task._id} className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-gray-900">{task.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                    {task.description && (
                      <p className="text-gray-600 text-sm mt-1">{task.description}</p>
                    )}
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                      <span className={`px-2 py-1 rounded-full ${getStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                      {task.dueDate && (
                        <span className="flex items-center text-gray-500">
                          <FiClock className="mr-1" />
                          {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Add Task Panel */}
        <div className="bg-white rounded-xl shadow-sm p-6 h-fit sticky top-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Add New Task</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
              <input
                type="text"
                placeholder="What needs to be done?"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                placeholder="Add details..."
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              ></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            
            <button
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              onClick={addTask}
            >
              <FiPlus />
              Add Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}