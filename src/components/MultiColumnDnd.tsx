// // components/CompleteDndBoard.tsx
// 'use client';

// import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
// import { useState } from 'react';
// import { Trash2, Edit, Save, X, Plus } from 'lucide-react';
// import Image from 'next/image';

// type ItemType = 'text' | 'image' | 'form';

// type Item = {
//   id: string;
//   content: string;
//   type: ItemType;
//   data: any;
// };

// type Column = {
//   id: string;
//   title: string;
//   items: Item[];
// };

// const initialItemTemplates: Record<ItemType, Omit<Item, 'id'>> = {
//   text: {
//     content: 'New Text',
//     type: 'text',
//     data: { text: 'Enter your text here' }
//   },
//   image: {
//     content: 'New Image',
//     type: 'image',
//     data: { src: '', alt: 'Image description' }
//   },
//   form: {
//     content: 'New Form',
//     type: 'form',
//     data: { fields: ['field1', 'field2'] }
//   }
// };

// export default function CompleteDndBoard() {
//   const [columns, setColumns] = useState<Record<string, Column>>({
//     todo: {
//       id: 'todo',
//       title: 'To Do',
//       items: []
//     },
//     progress: {
//       id: 'progress',
//       title: 'In Progress',
//       items: []
//     },
//     done: {
//       id: 'done',
//       title: 'Done',
//       items: []
//     }
//   });

//   const [editingItem, setEditingItem] = useState<{id: string, columnId: string} | null>(null);
//   const [editForm, setEditForm] = useState<any>({});
//   const [showAddMenu, setShowAddMenu] = useState<{columnId: string, position: {x: number, y: number}} | null>(null);

//   // Drag and drop logic
//   const onDragEnd = (result: DropResult) => {
//     const { source, destination } = result;

//     if (!destination) return;
//     if (source.droppableId === destination.droppableId && source.index === destination.index) return;

//     const startCol = columns[source.droppableId];
//     const finishCol = columns[destination.droppableId];

//     if (startCol === finishCol) {
//       const newItems = [...startCol.items];
//       const [moved] = newItems.splice(source.index, 1);
//       newItems.splice(destination.index, 0, moved);

//       setColumns({
//         ...columns,
//         [source.droppableId]: {
//           ...startCol,
//           items: newItems
//         }
//       });
//       return;
//     }

//     const startItems = [...startCol.items];
//     const [moved] = startItems.splice(source.index, 1);
//     const finishItems = [...finishCol.items];
//     finishItems.splice(destination.index, 0, moved);

//     setColumns({
//       ...columns,
//       [source.droppableId]: {
//         ...startCol,
//         items: startItems
//       },
//       [destination.droppableId]: {
//         ...finishCol,
//         items: finishItems
//       }
//     });
//   };

//   // Add new item to a column
//   const addItem = (columnId: string, type: ItemType) => {
//     const newItem = {
//       ...initialItemTemplates[type],
//       id: `item-${Date.now()}`
//     };

//     setColumns(prev => ({
//       ...prev,
//       [columnId]: {
//         ...prev[columnId],
//         items: [...prev[columnId].items, newItem]
//       }
//     }));

//     setShowAddMenu(null);
//   };

//   // Delete item from column
//   const deleteItem = (columnId: string, itemId: string) => {
//     setColumns(prev => ({
//       ...prev,
//       [columnId]: {
//         ...prev[columnId],
//         items: prev[columnId].items.filter(item => item.id !== itemId)
//       }
//     }));
//   };

//   // Edit item functions
//   const startEditing = (columnId: string, item: Item) => {
//     setEditingItem({ id: item.id, columnId });
//     setEditForm({ ...item.data });
//   };

//   const cancelEditing = () => {
//     setEditingItem(null);
//     setEditForm({});
//   };

//   const saveEditing = () => {
//     if (!editingItem) return;

//     setColumns(prev => {
//       const newColumns = { ...prev };
//       const column = newColumns[editingItem.columnId];
//       const itemIndex = column.items.findIndex(item => item.id === editingItem.id);
      
//       if (itemIndex !== -1) {
//         column.items[itemIndex] = {
//           ...column.items[itemIndex],
//           data: { ...editForm }
//         };
//       }

//       return newColumns;
//     });

//     setEditingItem(null);
//     setEditForm({});
//   };

//   const handleEditFormChange = (field: string, value: any) => {
//     setEditForm(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   // Render item content based on type
//   const renderItemContent = (columnId: string, item: Item) => {
//     if (editingItem?.id === item.id && editingItem.columnId === columnId) {
//       return (
//         <div className="p-3 bg-yellow-50 rounded border border-yellow-200 shadow-sm">
//           <div className="flex justify-between items-center mb-3">
//             <h3 className="font-medium text-yellow-800">Editing: {item.content}</h3>
//             <div className="flex gap-2">
//               <button 
//                 onClick={saveEditing}
//                 className="p-1 text-green-600 hover:text-green-800 rounded-full hover:bg-green-50"
//                 title="Save"
//               >
//                 <Save size={16} />
//               </button>
//               <button 
//                 onClick={cancelEditing}
//                 className="p-1 text-red-600 hover:text-red-800 rounded-full hover:bg-red-50"
//                 title="Cancel"
//               >
//                 <X size={16} />
//               </button>
//             </div>
//           </div>
          
//           {item.type === 'text' && (
//             <textarea
//               value={editForm.text || ''}
//               onChange={(e) => handleEditFormChange('text', e.target.value)}
//               className="w-full p-2 border rounded text-sm mb-2"
//               rows={3}
//             />
//           )}
          
//           {item.type === 'image' && (
//             <div className="space-y-2">
//               <input
//                 type="text"
//                 value={editForm.src || ''}
//                 onChange={(e) => handleEditFormChange('src', e.target.value)}
//                 placeholder="Image URL"
//                 className="w-full p-2 border rounded text-sm"
//               />
//               <input
//                 type="text"
//                 value={editForm.alt || ''}
//                 onChange={(e) => handleEditFormChange('alt', e.target.value)}
//                 placeholder="Alt text"
//                 className="w-full p-2 border rounded text-sm mt-2"
//               />
//             </div>
//           )}
          
//           {item.type === 'form' && (
//             <div className="space-y-2">
//               <div className="text-sm font-medium mb-1">Form Fields:</div>
//               <textarea
//                 value={editForm.fields?.join(', ') || ''}
//                 onChange={(e) => handleEditFormChange('fields', e.target.value.split(',').map(f => f.trim()))}
//                 placeholder="Comma separated fields"
//                 className="w-full p-2 border rounded text-sm"
//                 rows={3}
//               />
//             </div>
//           )}
//         </div>
//       );
//     }

//     return (
//       <div className="group relative">
//         <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 bg-white/80 backdrop-blur-sm p-1 rounded">
//           <button 
//             onClick={() => startEditing(columnId, item)}
//             className="p-1 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-50"
//             title="Edit"
//           >
//             <Edit size={16} />
//           </button>
//           <button 
//             onClick={() => deleteItem(columnId, item.id)}
//             className="p-1 text-red-600 hover:text-red-800 rounded-full hover:bg-red-50"
//             title="Delete"
//           >
//             <Trash2 size={16} />
//           </button>
//         </div>
        
//         {item.type === 'text' && (
//           <div className="p-3 bg-blue-50 rounded border border-blue-100">
//             <h3 className="font-medium text-blue-800">{item.content}</h3>
//             <p className="text-sm text-blue-600 mt-1 whitespace-pre-wrap">{item.data.text}</p>
//           </div>
//         )}
        
//         {item.type === 'image' && (
//           <div className="p-3 bg-green-50 rounded border border-green-100">
//             <h3 className="font-medium text-green-800">{item.content}</h3>
//             <div className="mt-2 bg-gray-200 h-20 flex items-center justify-center text-gray-500">
//               {item.data.src ? (
//                 <img src={item.data.src} alt={item.data.alt} className="max-h-full max-w-full"/>
//               ) : (
//                 `[Image: ${item.data.alt}]`
//               )}
//             </div>
//           </div>
//         )}
        
//         {item.type === 'form' && (
//           <div className="p-3 bg-purple-50 rounded border border-purple-100">
//             <h3 className="font-medium text-purple-800">{item.content}</h3>
//             <div className="mt-2 space-y-2">
//               {item.data.fields?.map((field: string, idx: number) => (
//                 <div key={idx} className="text-sm text-purple-600 bg-white px-2 py-1 rounded">
//                   {field}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">Complete Drag and Drop Board</h1>
      
//       <DragDropContext onDragEnd={onDragEnd}>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {Object.values(columns).map((column) => (
//             <div key={column.id} className="bg-gray-50 rounded-lg p-4 relative">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="font-semibold text-lg">{column.title}</h2>
//                 <button
//                   onClick={(e) => setShowAddMenu({
//                     columnId: column.id,
//                     position: { x: e.clientX, y: e.clientY }
//                   })}
//                   className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-full"
//                   title="Add Item"
//                 >
//                   <Plus size={18} />
//                 </button>
//               </div>
              
//               <Droppable droppableId={column.id}>
//                 {(provided) => (
//                   <div
//                     {...provided.droppableProps}
//                     ref={provided.innerRef}
//                     className="min-h-[150px] space-y-3"
//                   >
//                     {column.items.map((item, index) => (
//                       <Draggable key={item.id} draggableId={item.id} index={index}>
//                         {(provided) => (
//                           <div
//                             ref={provided.innerRef}
//                             {...provided.draggableProps}
//                             {...provided.dragHandleProps}
//                             className="cursor-move"
//                           >
//                             {renderItemContent(column.id, item)}
//                           </div>
//                         )}
//                       </Draggable>
//                     ))}
//                     {provided.placeholder}
//                   </div>
//                 )}
//               </Droppable>
//             </div>
//           ))}
//         </div>
//       </DragDropContext>

//       {/* Add Item Menu */}
//       {showAddMenu && (
//         <div 
//           className="fixed z-10 bg-white shadow-lg rounded-md p-2 w-40 border"
//           style={{
//             left: `${showAddMenu.position.x}px`,
//             top: `${showAddMenu.position.y}px`,
//             transform: 'translate(-50%, 10px)'
//           }}
//           onClick={(e) => e.stopPropagation()}
//         >
//           <div className="text-sm font-medium text-gray-700 px-2 py-1">Add Component</div>
//           <hr className="my-1" />
//           <button 
//             onClick={() => addItem(showAddMenu.columnId, 'text')}
//             className="w-full text-left px-2 py-1.5 text-sm hover:bg-blue-50 rounded flex items-center gap-2"
//           >
//             <span className="w-3 h-3 bg-blue-500 rounded-sm"></span>
//             Text Block
//           </button>
//           <button 
//             onClick={() => addItem(showAddMenu.columnId, 'image')}
//             className="w-full text-left px-2 py-1.5 text-sm hover:bg-green-50 rounded flex items-center gap-2"
//           >
//             <span className="w-3 h-3 bg-green-500 rounded-sm"></span>
//             Image
//           </button>
//           <button 
//             onClick={() => addItem(showAddMenu.columnId, 'form')}
//             className="w-full text-left px-2 py-1.5 text-sm hover:bg-purple-50 rounded flex items-center gap-2"
//           >
//             <span className="w-3 h-3 bg-purple-500 rounded-sm"></span>
//             Form
//           </button>
//         </div>
//       )}

//       {/* Click outside to close menu */}
//       {showAddMenu && (
//         <div 
//           className="fixed inset-0 z-0" 
//           onClick={() => setShowAddMenu(null)}
//         />
//       )}
//     </div>
//   );
// }