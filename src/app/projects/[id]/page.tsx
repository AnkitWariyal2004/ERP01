"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  FiCalendar,
  FiPlus,
  FiAlertTriangle,
  FiServer,
  FiX,
  FiChevronDown,
  FiFilter,
} from "react-icons/fi";
import {  Task } from "../../../types";
import PasswordDisplay from "../../../components/Project-Management/PasswordDisplay";
import ButtonWithForm from "../../../components/Project-Management/Transaction";
import { Client } from "../../../types/clients_Type/client";

export interface NewProject {
  _id?:string;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  team?: string[];
  budget?: number;
  tags?: string[];
  progress?:number;
  visibility?: 'public' | 'private';
  projectUrl?: string;
  documents?: string[];
  riskAssessment?: string;
  dependencies?: string;
  server?: {
    _id?:string;
    provider?: string;
    userName?: string;
    password?: string;
    ip?:string;
    url?: string;
    createdAt?: string;
    updatedAt?: string;
  };
  status?: string;
  balanceAmount?:number,
  paidAmount?:number,
  tasks?: Task[];
  clientID?: Client;
  createdAt?: string;
  updatedAt?: string;
}


type TaskType = "bug" | "feature" | "task" | "improvement";
type TaskStatus = "todo" | "in-progress" | "review" | "done";
type TaskPriority = "low" | "medium" | "high" | "critical";

const typeStyles: Record<TaskType, string> = {
  bug: "bg-red-50 text-red-700 border-red-100",
  feature: "bg-emerald-50 text-emerald-700 border-emerald-100",
  task: "bg-blue-50 text-blue-700 border-blue-100",
  improvement: "bg-violet-50 text-violet-700 border-violet-100",
};

const priorityStyles: Record<TaskPriority, string> = {
  low: "bg-gray-100 text-gray-700",
  medium: "bg-blue-100 text-blue-700",
  high: "bg-amber-100 text-amber-700",
  critical: "bg-red-100 text-red-700",
};

const statusStyles: Record<TaskStatus, string> = {
  todo: "bg-gray-100 text-gray-700",
  "in-progress": "bg-blue-100 text-blue-700",
  review: "bg-amber-100 text-amber-700",
  done: "bg-emerald-100 text-emerald-700",
};

const statusColumns: { id: TaskStatus; title: string }[] = [
  { id: "todo", title: "To Do" },
  { id: "in-progress", title: "In Progress" },
  { id: "review", title: "In Review" },
  { id: "done", title: "Completed" },
];

export default function ProjectPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFormOpen2, setIsFormOpen2] = useState(false);
  const { id } = useParams();
  const [project, setProject] = useState<NewProject | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterType, setFilterType] = useState<TaskType | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [taskForm, setTaskForm] = useState<Partial<Task>>({
    title: "",
    description: "",
    type: "task",
    status: "todo",
    priority: "medium",
    dueDate: "",
    assignee: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projectmanagement/${id}`);
        if (!response.ok) throw new Error("Failed to fetch project");
        const data = await response.json();
        setProject(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load project");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setTaskForm({
      title: task.title,
      description: task.description,
      type: task.type,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate,
      assignee: task.assignee,
    });
    setIsModalOpen(true);
  };

  const handleAddTask = (status: TaskStatus) => {
    setSelectedTask(null);
    setTaskForm({
      title: "",
      description: "",
      type: "task",
      status,
      priority: "medium",
      dueDate: "",
      assignee: project?.team?.[0] || "",
    });
    setIsModalOpen(true);
  };

  const handleSaveTask = async () => {
    if (!project) return;

    try {
      const method = selectedTask ? "PUT" : "POST";
      const url = selectedTask
        ? `/api/projectmanagement/${id}/tasks/${selectedTask._id}`
        : `/api/projectmanagement/${id}/tasks`;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskForm),
      });

      if (!response.ok) throw new Error("Failed to save task");

      const updatedProject = await response.json();
      setProject(updatedProject);
      setIsModalOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save task");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setTaskForm((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <FiAlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="mt-3 text-lg font-medium text-gray-900">
            Error loading project
          </h3>
          <p className="mt-2 text-sm text-gray-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-6 text-center">
          <h3 className="text-lg font-medium text-gray-900">
            Project not found
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            The requested project could not be found.
          </p>
        </div>
      </div>
    );
  }

  const filteredTasks = filterType
    ? project.tasks.filter((task) => task.type === filterType)
    : project.tasks;

  return (
    <div className="h-full bg-gray-50">
      {/* Project Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
  <div className="px-6 py-5">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>

          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
              project.status === "active"
                ? "bg-emerald-100 text-emerald-800"
                : project.status === "planning"
                ? "bg-blue-100 text-blue-800"
                : project.status === "on-hold"
                ? "bg-amber-100 text-amber-800"
                : project.status === "completed"
                ? "bg-violet-100 text-violet-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {project.status.replace("-", " ")}
          </span>

          {/* ✅ Client Name as Tag */}
          {project.clientID?.name && (
            <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-slate-100 text-slate-800">
              {project.clientID.name}
            </span>
          )}
        </div>

        <p className="mt-2 text-gray-600 w-full">{project.description}</p>

        {/* ✅ Client Name Below Description */}
        {project.clientID?.name && (
          <p className="mt-1 text-sm text-gray-500">
            <span className="font-medium text-gray-700">Client:</span>{" "}
            {project.clientID.name}
          </p>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-4">
          <div className="flex items-center text-sm text-gray-500">
            <FiCalendar className="mr-2 text-gray-400" size={14} />
            <span>
              {new Date(project.startDate).toLocaleDateString()} -{" "}
              {new Date(project.endDate).toLocaleDateString()}
            </span>
          </div>

          <div className="flex items-center">
            <div className="flex -space-x-2">
              {project.team.slice(0, 5).map((member, index) => (
                <div
                  key={index}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-700 ring-2 ring-white"
                >
                  {member.charAt(0).toUpperCase()}
                </div>
              ))}
              {project.team.length > 5 && (
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-500 ring-2 ring-white">
                  +{project.team.length - 5}
                </div>
              )}
            </div>
            <span className="ml-2 text-sm text-gray-500">
              {project.team.length} team members
            </span>
          </div>

          <ButtonWithForm
            isFormOpen={isFormOpen}
            setIsFormOpen={setIsFormOpen}
            isFormOpen2={isFormOpen2}
            setIsFormOpen2={setIsFormOpen2}
          />
        </div>
      </div>

      <div className="flex flex-col items-end">
        <div className="w-full sm:w-56">
          <div className="flex justify-between text-sm text-gray-600 mb-1.5">
            <span>Project progress</span>
            <span className="font-medium">{project.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


      {/* Main Content */}
      <div className="px-6 py-6">
        {/* Server Deployment Information */}
        {project.server && (
          <div className="mb-8 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <FiServer className="mr-2 text-blue-600" size={18} />
                Server Deployment
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  Provider
                </p>
                <p className="font-medium text-gray-900">
                  {project.server.provider}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  UserName
                </p>
                <p className="font-medium text-gray-900 capitalize">
                  {project.server.userName}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                  IP
                </p>
                <p className="font-medium text-gray-900">
                  {project.server.ip || "Not specified"}
                </p>
              </div>

              {/* <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-700">
                    Server Password
                  </h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() =>
                        navigator.clipboard.writeText(project.server.password)
                      }
                      className="text-xs text-blue-600 hover:text-blue-800"
                      title="Copy password"
                    >
                      Copy
                    </button>
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-xs text-blue-600 hover:text-blue-800"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                <div
                  className={`font-mono text-sm p-2 rounded ${
                    showPassword
                      ? "bg-gray-100 text-gray-900"
                      : "bg-gray-50 text-gray-600"
                  }`}
                >
                  {showPassword ? (
                    <span className="break-all">{project.server.password}</span>
                  ) : (
                    <span className="tracking-widest">••••••••••</span>
                  )}
                </div>

                {showPassword && (
                  <div className="flex items-start text-xs text-yellow-700">
                    <svg
                      className="w-3 h-3 mt-0.5 mr-1 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <span>
                      Password is visible. Copy it if needed, then hide it.
                    </span>
                  </div>
                )}
              </div> */}
              <PasswordDisplay password={project.server.password} />

              {project.server.url && (
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    URL
                  </p>
                  <a
                    href={project.server.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-600 hover:text-blue-800 hover:underline truncate block"
                  >
                    {project.server.url}
                  </a>
                </div>
              )}
              {project.server.updatedAt && (
                <div className="md:col-span-2 lg:col-span-1">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    Last Deployed
                  </p>
                  <p className="font-medium text-gray-900">
                    {new Date(project.server.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              )}
              <div className="flex gap-8">
                <button className="flex-1 inline-flex items-center justify-center border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-300">
                  Deploy
                </button>
                <button className="flex-1 inline-flex items-center justify-center border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white transition px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-yellow-300">
                  Publish
                </button>
                <button className="flex-1 inline-flex items-center justify-center border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-red-300">
                  Stop
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Task Board Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl font-semibold text-gray-900">Task Board</h2>

          <div className="relative">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center rounded-lg bg-white px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors"
            >
              <FiFilter className="mr-2 text-gray-500" size={14} />
              Filter tasks
              <FiChevronDown
                className={`ml-2 transition-transform ${
                  showFilters ? "rotate-180" : ""
                }`}
                size={14}
              />
            </button>

            {showFilters && (
              <div className="absolute right-0 mt-2 z-10 w-48 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <button
                    onClick={() => setFilterType(null)}
                    className={`block px-4 py-2 text-sm w-full text-left ${
                      !filterType
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    All Tasks
                  </button>
                  <button
                    onClick={() => setFilterType("bug")}
                    className={`block px-4 py-2 text-sm w-full text-left ${
                      filterType === "bug"
                        ? "bg-red-50 text-red-700"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Bugs
                  </button>
                  <button
                    onClick={() => setFilterType("feature")}
                    className={`block px-4 py-2 text-sm w-full text-left ${
                      filterType === "feature"
                        ? "bg-emerald-50 text-emerald-700"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Features
                  </button>
                  <button
                    onClick={() => setFilterType("task")}
                    className={`block px-4 py-2 text-sm w-full text-left ${
                      filterType === "task"
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Tasks
                  </button>
                  <button
                    onClick={() => setFilterType("improvement")}
                    className={`block px-4 py-2 text-sm w-full text-left ${
                      filterType === "improvement"
                        ? "bg-violet-50 text-violet-700"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Improvements
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Task Board */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {statusColumns.map((column) => (
            <div
              key={column.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200"
            >
              <div
                className={`px-5 py-3.5 border-b border-gray-200 flex justify-between items-center ${
                  statusStyles[column.id]
                }`}
              >
                <div className="flex items-center">
                  <h3 className="font-medium text-gray-900">{column.title}</h3>
                  <span className="ml-2 inline-flex items-center justify-center rounded-full bg-white bg-opacity-80 px-2 py-0.5 text-xs font-medium">
                    {filteredTasks.filter((t) => t.status === column.id).length}
                  </span>
                </div>
                <button
                  onClick={() => handleAddTask(column.id)}
                  className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-1 rounded-md"
                >
                  <FiPlus size={18} />
                </button>
              </div>
              <div className="p-4 space-y-3">
                {filteredTasks
                  .filter((task) => task.status === column.id)
                  .map((task) => (
                    <div
                      key={task._id}
                      onClick={() => handleTaskClick(task)}
                      className="group p-4 border border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer transition-colors bg-white hover:shadow-xs"
                    >
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <h4 className="font-medium text-gray-900 group-hover:text-blue-600 line-clamp-2">
                          {task.title}
                        </h4>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            priorityStyles[task.priority]
                          }`}
                        >
                          {task.priority}
                        </span>
                      </div>

                      <div className="flex items-center mb-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${
                            typeStyles[task.type]
                          }`}
                        >
                          {task.type.charAt(0).toUpperCase() +
                            task.type.slice(1)}
                        </span>
                      </div>

                      {task.description && (
                        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                          {task.description}
                        </p>
                      )}

                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>
                          {task.dueDate
                            ? new Date(task.dueDate).toLocaleDateString()
                            : "No due date"}
                        </span>
                        {task.assignee && (
                          <span className="inline-flex items-center">
                            <span className="inline-block h-2 w-2 rounded-full bg-gray-400 mr-1.5"></span>
                            {task.assignee}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}

                <button
                  onClick={() => handleAddTask(column.id)}
                  className="w-full flex items-center justify-center p-3 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors border border-dashed border-gray-300 hover:border-gray-400"
                >
                  <FiPlus className="mr-2" size={14} />
                  Add Task
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-28 px-4 sm:px-8 md:left-64 md:w-[calc(100%-16rem)]">
          {/* Blurred backdrop */}
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal container */}
          <div className="relative z-50 w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-xl">
            {/* Header */}
            <div className="sticky top-0 z-10 px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">
                {selectedTask ? "Edit Task" : "Create New Task"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 rounded-full p-1 transition-colors hover:bg-gray-100"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Form Content */}
            <div className="p-6 space-y-6">
              {/* Title */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Title<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={taskForm.title}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                  placeholder="Enter task title"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={taskForm.description}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                  rows={3}
                  placeholder="Enter task description"
                />
              </div>

              {/* Type & Priority */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Type */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Type<span className="text-red-500">*</span>
                  </label>
                  <select
                    name="type"
                    value={taskForm.type}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all appearance-none"
                    required
                  >
                    <option value="bug">Bug</option>
                    <option value="feature">Feature</option>
                    <option value="task">Task</option>
                    <option value="improvement">Improvement</option>
                  </select>
                </div>

                {/* Priority */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Priority<span className="text-red-500">*</span>
                  </label>
                  <select
                    name="priority"
                    value={taskForm.priority}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all appearance-none"
                    required
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>

              {/* Status & Due Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Status<span className="text-red-500">*</span>
                  </label>
                  <select
                    name="status"
                    value={taskForm.status}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all appearance-none"
                    required
                  >
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="review">In Review</option>
                    <option value="done">Completed</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Due Date
                  </label>
                  <input
                    type="date"
                    name="dueDate"
                    value={
                      taskForm.dueDate
                        ? new Date(taskForm.dueDate).toISOString().split("T")[0]
                        : ""
                    }
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>
              </div>

              {/* Assignee */}
              {project.team && project.team.length > 0 && (
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Assignee<span className="text-red-500">*</span>
                  </label>
                  <select
                    name="assignee"
                    value={taskForm.assignee || project.team[0]}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all appearance-none"
                    required
                  >
                    {project.team.map((member) => (
                      <option key={member} value={member}>
                        {member}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveTask}
                className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:from-blue-700 hover:to-indigo-700 transition-all focus-visible:outline focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                {selectedTask ? "Update Task" : "Create Task"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
