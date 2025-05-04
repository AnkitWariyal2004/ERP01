// import React from 'react'

// const NewOrEditTask = () => {
//   return (
//     <div className="fixed inset-0 bg-opacity-100 flex items-center justify-center p-4 z-50">
//     <div className="bg-white rounded-xl p-6 w-full max-w-md">
//       <h3 className="text-lg font-medium mb-4">
//         {selectedTask ? 'Edit Task' : 'Add New Task'}
//       </h3>
//       <div className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
//           <input
//             type="text"
//             name="title"
//             value={taskForm.title}
//             onChange={handleInputChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//           <textarea
//             name="description"
//             value={taskForm.description}
//             onChange={handleInputChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md"
//             rows={3}
//           />
//         </div>
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Type*</label>
//             <select
//               name="type"
//               value={taskForm.type}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//               required
//             >
//               <option value="bug">Bug</option>
//               <option value="feature">Feature</option>
//               <option value="task">Task</option>
//               <option value="improvement">Improvement</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Priority*</label>
//             <select
//               name="priority"
//               value={taskForm.priority}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//               required
//             >
//               <option value="low">Low</option>
//               <option value="medium">Medium</option>
//               <option value="high">High</option>
//               <option value="critical">Critical</option>
//             </select>
//           </div>
//         </div>
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Status*</label>
//             <select
//               name="status"
//               value={taskForm.status}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//               required
//             >
//               <option value="todo">To Do</option>
//               <option value="in-progress">In Progress</option>
//               <option value="review">In Review</option>
//               <option value="done">Done</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
//             <input
//               type="date"
//               name="dueDate"
//               value={taskForm.dueDate ? new Date(taskForm.dueDate).toISOString().split('T')[0] : ''}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//             />
//           </div>
//         </div>
//         {project.team && (
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Assignee*</label>
//             <select
//               name="assignee"
//               value={taskForm.assignee || ''}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//               required
//             >
//               {project.team.map(member => (
//                 <option key={member} value={member}>{member}</option>
//               ))}
//             </select>
//           </div>
//         )}
//         <div className="flex justify-end space-x-3 pt-4">
//           <button
//             onClick={() => setIsModalOpen(false)}
//             className="px-4 py-2 text-gray-600 hover:text-gray-800"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSaveTask}
//             className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
//   )
// }

// export default NewOrEditTask
