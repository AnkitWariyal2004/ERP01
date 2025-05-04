"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  FiCalendar,
  FiUsers,
  FiBarChart2,
  FiArrowRight,
  FiPlus,
  FiSearch,
  FiFilter,
  FiTrendingUp,
} from "react-icons/fi";
import { NewProject } from "../../types";

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [projects, setProjects] = useState<NewProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projectmanagement");
        if (!response.ok) throw new Error("Failed to fetch projects");
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load projects"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusOptions = [...new Set(projects.map((p) => p.status))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex justify-center">
        <div className="animate-pulse max-w-7xl w-full">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 h-64 animate-pulse"
              >
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded w-full mb-2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Projects Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Overview of all active projects
            </p>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <Link
              href="/projects/new"
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FiPlus className="mr-2" />
              New Project
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search projects..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 items-center">
            <FiFilter className="text-gray-500" />
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={statusFilter || ""}
              onChange={(e) => setStatusFilter(e.target.value || null)}
            >
              <option value="">All Statuses</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-blue-500">
            <div className="text-gray-500 text-sm">Active Projects</div>
            <div className="text-2xl font-bold mt-1">
              {projects.filter((p) => p.status === "active").length}
            </div>
            <div className="flex items-center text-green-500 text-xs mt-1">
              <FiTrendingUp className="mr-1" />
              {projects.filter((p) => p.status === "active").length} running
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-yellow-500">
            <div className="text-gray-500 text-sm">In Planning</div>
            <div className="text-2xl font-bold mt-1">
              {projects.filter((p) => p.status === "planning").length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-purple-500">
            <div className="text-gray-500 text-sm">On Hold</div>
            <div className="text-2xl font-bold mt-1">
              {projects.filter((p) => p.status === "on-hold").length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-green-500">
            <div className="text-gray-500 text-sm">Total Projects</div>
            <div className="text-2xl font-bold mt-1">{projects.length}</div>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <p className="text-gray-500">
              No projects found matching your criteria.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter(null);
              }}
              className="mt-4 text-blue-600 hover:text-blue-800"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project._id}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="p-6 flex-grow">
                  {/* Project Header */}
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 line-clamp-1">
                      {project.name}
                    </h2>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                        project.status === "active"
                          ? "bg-green-100 text-green-800"
                          : project.status === "planning"
                          ? "bg-blue-100 text-blue-800"
                          : project.status === "on-hold"
                          ? "bg-yellow-100 text-yellow-800"
                          : project.status === "completed"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>

                  {/* Project Description */}
                  <p className="text-gray-600 mb-5 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Project Meta */}
                  <div className="space-y-4">
                    {/* Timeline */}
                    <div className="flex items-center text-gray-600">
                      <FiCalendar className="mr-2 text-gray-400 flex-shrink-0" />
                      <div className="text-sm">
                        <div>
                          {new Date(project.startDate).toLocaleDateString()} -{" "}
                          {new Date(project.endDate).toLocaleDateString()}
                        </div>
                        {project.updatedAt && (
                          <div className="text-xs text-gray-400">
                            Updated:{" "}
                            {new Date(project.updatedAt).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Progress */}
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span className="flex items-center">
                          <FiBarChart2 className="mr-2 text-gray-400" />
                          Progress
                        </span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            project.progress && project.progress > 75
                              ? "bg-green-500"
                              : project.progress && project.progress > 40
                              ? "bg-blue-500"
                              : "bg-yellow-500"
                          }`}
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Team */}
                    {project.team && project.team.length > 0 && (
                      <div className="flex items-center text-gray-600">
                        <FiUsers className="mr-2 text-gray-400 flex-shrink-0" />
                        <div className="flex -space-x-2">
                          {project.team.slice(0, 5).map((member, index) => (
                            <div
                              key={index}
                              className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-medium text-gray-700 border-2 border-white"
                            >
                              {member.charAt(0)}
                            </div>
                          ))}
                          {project.team.length > 5 && (
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-500 border-2 border-white">
                              +{project.team.length - 5}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Server Information */}
                    {project.server && (
                      <div className="flex items-center text-gray-600">
                        <svg
                          className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                          />
                        </svg>
                        <div className="text-sm">
                          <div>
                            Deployed on{" "}
                            <span className="font-medium">
                              {project.server.provider}
                            </span>{" "}
                            ({project.server.userName})
                          </div>
                          {project.server.updatedAt && (
                            <div className="text-xs text-gray-400">
                              Last deploy:{" "}
                              {new Date(
                                project.server.updatedAt
                              ).toLocaleDateString()}
                            </div>
                          )}
                          {project.server.url && (
                            <a
                              href={project.server.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-blue-600 hover:underline"
                            >
                              {project.server.url}
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
                  <Link
                    href={`/projects/${project._id}`}
                    className="flex items-center justify-between group"
                  >
                    <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                      View project details
                    </span>
                    <FiArrowRight className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
