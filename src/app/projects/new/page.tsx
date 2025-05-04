"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FiPlus,
  FiCalendar,
  FiUsers,
  FiArrowLeft,
  FiTag,
  FiBriefcase,
  FiLink,
  FiFileText,
  FiAlertCircle,
  FiServer,
  FiUser,
  FiLock,
  FiGlobe,
} from "react-icons/fi";
import { BiRupee } from "react-icons/bi";
import { NewProject } from "../../../types";
import { Client } from "../../../types/clients_Type/client";

export default function NewProjectPage() {
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [formData, setFormData] = useState<NewProject>({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    team: [],
    budget: 0,
    tags: [],
    visibility: "private",
    projectUrl: "",
    documents: [""],
    riskAssessment: "",
    dependencies: "",
    server: {
      provider: "",
      userName: "",
      ip: "",
      password: "",
      url: "",
    },
    status: "active",
    balanceAmount: 0,
    paidAmount: 0,
    progress: 0,
    tasks: [],
    clientID:""
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [newTeamMember, setNewTeamMember] = useState<string>("");
  const [newTag, setNewTag] = useState<string>("");
  const [newDocument, setNewDocument] = useState<string>("");

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    const res = await fetch("/api/clients");
    const data = await res.json();
    setClients(data);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name.startsWith("server.")) {
      const serverField = name.split(".")[1];
      setFormData({
        ...formData,
        server: {
          ...formData.server,
          [serverField]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]:
          name === "budget" ? (value ? parseFloat(value) : undefined) : value,
      });
    }
  };

  const addTeamMember = () => {
    if (
      newTeamMember.trim() &&
      !formData.team?.includes(newTeamMember.trim())
    ) {
      setFormData({
        ...formData,
        team: [...(formData.team || []), newTeamMember.trim()],
      });
      setNewTeamMember("");
    }
  };

  const removeTeamMember = (member: string) => {
    setFormData({
      ...formData,
      team: formData.team?.filter((m) => m !== member) || [],
    });
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), newTag.trim()],
      });
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter((t) => t !== tag) || [],
    });
  };

  const addDocument = () => {
    if (
      newDocument.trim() &&
      !formData.documents?.includes(newDocument.trim())
    ) {
      setFormData({
        ...formData,
        documents: [...(formData.documents || []), newDocument.trim()],
      });
      setNewDocument("");
    }
  };

  const removeDocument = (doc: string) => {
    setFormData({
      ...formData,
      documents: formData.documents?.filter((d) => d !== doc) || [],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!formData.name) {
      setError("Project name is required");
      setLoading(false);
      return;
    }

    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      setError("End date must be after start date");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/projectmanagement", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create project");
      }

      setSuccess("Project created successfully! Redirecting...");
      setTimeout(() => router.push("/projects"), 1500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <button
              onClick={() => router.back()}
              className="flex items-center text-blue-600 hover:text-blue-800 mr-4"
            >
              <FiArrowLeft className="mr-2" />
              Back
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Create New Project
            </h1>
          </div>
          <p className="text-gray-600 ml-10">
            Fill out the form to launch your new project
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          {/* Status Messages */}
          {error && (
            <div className="bg-red-50 px-6 py-3 border-b border-red-100">
              <div className="flex items-center text-red-700">
                <FiAlertCircle className="mr-2 flex-shrink-0" />
                <span>{error}</span>
              </div>
            </div>
          )}
          {success && (
            <div className="bg-green-50 px-6 py-3 border-b border-green-100">
              <div className="flex items-center text-green-700">
                <FiPlus className="mr-2 flex-shrink-0" />
                <span>{success}</span>
              </div>
            </div>
          )}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            <div className="space-y-8">
              {/* Section 1: Basic Info */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  Basic Information
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Website Redesign"
                      />
                      <FiBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>



                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Client
                    </label>
                    <div className="relative">
                      <select
                        name="clientID"
                        value={formData.clientID}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                      <option value="">Select Clinet</option>
                        {clients.map((client)=><option value={client._id.toString()} key={client._id.toString()}>{client.name}({client.phone})</option>)}
                      </select>
                      <FiUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>

                  <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[120px]"
                      placeholder="Describe the project goals, deliverables, and key objectives..."
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Section 2: Timeline & Budget */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  Timeline & Budget
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="startDate"
                        required
                        value={formData.startDate}
                        onChange={handleChange}
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="endDate"
                        required
                        value={formData.endDate}
                        onChange={handleChange}
                        min={
                          formData.startDate ||
                          new Date().toISOString().split("T")[0]
                        }
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Budget
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="budget"
                        min="0"
                        step="100"
                        value={formData.budget || ""}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="10,000"
                      />
                      <BiRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>

                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Paid Amount
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="paidAmount"
                        min="0"
                        step="100"
                        value={formData.paidAmount || ""}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="5,000"
                      />
                      <BiRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div> */}

                  {/* Balance Amount */}
                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Balance Amount
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="balanceAmount"
                        min="0"
                        step="100"
                        value={formData.balanceAmount || ""}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="5,000"
                      />
                      <BiRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div> */}
                </div>
              </div>

              {/* Section 3: Team & Tags */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  Team & Categorization
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Team Members
                    </label>
                    <div className="flex mb-2">
                      <div className="relative flex-grow">
                        <input
                          type="text"
                          value={newTeamMember}
                          onChange={(e) => setNewTeamMember(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="team@example.com"
                        />
                        <FiUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                      <button
                        type="button"
                        onClick={addTeamMember}
                        className="px-4 py-2.5 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
                      >
                        Add
                      </button>
                    </div>
                    {formData.team && formData.team.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.team.map((member) => (
                          <span
                            key={member}
                            className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm"
                          >
                            {member}
                            <button
                              type="button"
                              onClick={() => removeTeamMember(member)}
                              className="ml-2 text-gray-500 hover:text-gray-700"
                            >
                              &times;
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags
                    </label>
                    <div className="flex mb-2">
                      <div className="relative flex-grow">
                        <input
                          type="text"
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="web, marketing"
                        />
                        <FiTag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                      <button
                        type="button"
                        onClick={addTag}
                        className="px-4 py-2.5 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
                      >
                        Add
                      </button>
                    </div>
                    {formData.tags && formData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="ml-2 text-blue-500 hover:text-blue-700"
                            >
                              &times;
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Section 4: Additional Information */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  Additional Information
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project URL
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        name="projectUrl"
                        value={formData.projectUrl}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="https://example.com/project"
                      />
                      <FiLink className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Documents
                    </label>
                    <div className="flex mb-2">
                      <div className="relative flex-grow">
                        <input
                          type="text"
                          value={newDocument}
                          onChange={(e) => setNewDocument(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Document URL"
                        />
                        <FiFileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                      <button
                        type="button"
                        onClick={addDocument}
                        className="px-4 py-2.5 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
                      >
                        Add
                      </button>
                    </div>
                    {formData.documents && formData.documents.length > 0 && (
                      <div className="space-y-2 mt-2">
                        {formData.documents.map((doc) => (
                          <div
                            key={doc}
                            className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded"
                          >
                            <a
                              href={doc}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline text-sm truncate"
                            >
                              {doc}
                            </a>
                            <button
                              type="button"
                              onClick={() => removeDocument(doc)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              &times;
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Server Deployment Section */}
                  <div className="lg:col-span-2">
                    <h3 className="text-md font-medium text-gray-700 mb-3 flex items-center">
                      <FiServer className="mr-2" />
                      Server Deployment
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Provider
                        </label>
                        <div className="relative">
                          <select
                            name="server.provider"
                            value={formData.server?.provider || ""}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Select provider</option>
                            <option value="AWS">AWS</option>
                            <option value="Google Cloud">Google Cloud</option>
                            <option value="Azure">Azure</option>
                            <option value="Digital Ocean">Digital Ocean</option>
                            <option value="Other">Other</option>
                          </select>
                          <FiServer className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          UserName
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="server.userName"
                            value={formData.server?.userName || ""}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter UserName"
                          />
                          <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          IP
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="server.ip"
                            value={formData.server?.ip || ""}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="191-192-233-12"
                          />
                          <FiGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Password
                        </label>
                        <div className="relative">
                          <input
                            type="password"
                            name="server.password"
                            value={formData.server?.password || ""}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="*******"
                          />
                          <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Deployment URL
                        </label>
                        <div className="relative">
                          <input
                            type="url"
                            name="server.url"
                            value={formData.server?.url || ""}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="https://deployment.example.com"
                          />
                          <FiLink className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Risk Assessment
                    </label>
                    <textarea
                      name="riskAssessment"
                      value={formData.riskAssessment}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
                      placeholder="Identify potential risks and mitigation strategies..."
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dependencies
                    </label>
                    <textarea
                      name="dependencies"
                      value={formData.dependencies}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
                      placeholder="List any external dependencies or requirements..."
                    ></textarea>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <div className="relative">
                  <select
                    name="status"
                    value={formData?.status || ""}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Status</option>
                    <option value="active">Active</option>
                    <option value="planning">Plannig</option>
                    <option value="on-hold">On-Hold</option>
                    <option value="archived">Archived</option>
                  </select>
                  <FiServer className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {/* Section 5: Visibility */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  Visibility Settings
                </h2>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        formData.visibility === "public"
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {formData.visibility === "public" && (
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      )}
                    </div>
                    <div>
                      <span className="block text-sm font-medium text-gray-700">
                        Public
                      </span>
                      <span className="block text-xs text-gray-500">
                        Visible to all team members
                      </span>
                    </div>
                  </label>
                  <label className="flex items-center space-x-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        formData.visibility === "private"
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {formData.visibility === "private" && (
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      )}
                    </div>
                    <div>
                      <span className="block text-sm font-medium text-gray-700">
                        Private
                      </span>
                      <span className="block text-xs text-gray-500">
                        Visible only to selected members
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="mt-10 pt-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => router.back()}
                disabled={loading}
                className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center disabled:opacity-70 transition-colors"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating...
                  </>
                ) : (
                  <>
                    <FiPlus className="mr-2" />
                    Create Project
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
