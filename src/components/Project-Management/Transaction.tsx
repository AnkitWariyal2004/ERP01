"use client";

import { useState } from "react";

interface ButtonWithFormProps {
  isFormOpen: boolean;
  isFormOpen2: boolean;
  setIsFormOpen: (value: boolean) => void;
  setIsFormOpen2: (value: boolean) => void;
}

interface formData_1{
  title?: string;
  amount?:string;
  paymentMethod?:string;
  date?:string;
}

interface formData_2{
  customerName?:string,
  amountPaid?: string,
  paymentDate?: string,
  paymentMethod?: string,
  receiptNumber?: number,
  installmentNumber?:number,
  remainingBalance?:number,
  nextDueDate?:string,
  paymentStatus?: string,
}

export default function ButtonWithForm({
  isFormOpen,
  setIsFormOpen,
  isFormOpen2,
  setIsFormOpen2,
}: ButtonWithFormProps) {
  // const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState<formData_1>({
    title: '',
    amount: '',
    paymentMethod: 'credit',
    date: new Date().toISOString().split('T')[0],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would process the payment receipt
    console.log('Payment receipt data:', formData);
    alert('Payment receipt generated!');
    setIsFormOpen(false);
  };


  const [formData2, setFormData2] = useState<formData_2>({
    customerName: '',
    amountPaid: '',
    paymentDate: new Date().toISOString().split('T')[0],
    paymentMethod: 'credit',
    receiptNumber: 0,
    installmentNumber:0,
    remainingBalance: 0,
    nextDueDate: '',
    paymentStatus: 'completed',
  });

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setFormData2(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    // Here you would store the installment record in the database
    console.log('Installment payment record:', formData);
    alert('Installment payment recorded successfully!');
    setIsFormOpen2(false);
  };

  return (
    <div className="p-8 relative">
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => setIsFormOpen(true)}
          className="w-full sm:w-auto text-left font-medium text-indigo-600 hover:text-indigo-800 
               transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 
               focus:ring-offset-2 rounded-md px-3 py-1.5 text-sm lg:px-4 lg:py-2 lg:text-base
               hover:bg-indigo-50 flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Additional Payment
        </button>

        <button
          className="w-full sm:w-auto text-left font-medium text-gray-600 hover:text-gray-800 
               transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 
               focus:ring-offset-2 rounded-md px-3 py-1.5 text-sm lg:px-4 lg:py-2 lg:text-base
               hover:bg-gray-50 flex items-center gap-2"
               onClick={()=>setIsFormOpen2(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
              clipRule="evenodd"
            />
          </svg>
          Installment
        </button>
      </div>

      {/* Slide-in Form */}
      
      <div
        className={`fixed top-24 sm:top-[100px] md:top-24 lg:top-14 right-0 w-full sm:w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${isFormOpen ? 'translate-x-0' : 'translate-x-full'} h-full`}
      >
        <div className="p-6 h-full flex flex-col overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Payment Receipt</h2>
            <button
              onClick={() => setIsFormOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="Enter customer name"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Amount (&#8377;)</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="0.00"
                step="0.01"
                min="0"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Payment Method</label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
              >
                <option value="credit">Credit Card</option>
                <option value="debit">Debit Card</option>
                <option value="cash">Cash</option>
                <option value="bank">Bank Transfer</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
              />
            </div>


            <div className="">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
              >
                Add Payment
              </button>
            </div>
          </form>
        </div>
      </div>

      {isFormOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={() => setIsFormOpen(false)}
        />
      )}

      <div
        className={`fixed top-24 sm:top-[100px] md:top-24 lg:top-14 right-0 w-full sm:w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${isFormOpen2 ? 'translate-x-0' : 'translate-x-full'} h-full`}
      >
        <div className="p-6 h-full flex flex-col overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Record Installment Payment</h2>
            <button
              onClick={() => setIsFormOpen2(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit2} className="flex-1 flex flex-col">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Customer Name</label>
              <input
                type="text"
                name="customerName"
                value={formData2.customerName}
                onChange={handleChange2}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="Enter customer name"
                required
              />
            </div>

           
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Installment Number</label>
              <input
                type="number"
                name="installmentNumber"
                value={formData2.installmentNumber}
                onChange={handleChange2}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="e.g., 2 of 12"
                min="1"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Amount Paid (&#8377;)</label>
              <input
                type="number"
                name="amountPaid"
                value={formData2.amountPaid}
                onChange={handleChange2}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="0.00"
                step="0.01"
                min="0"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Payment Date</label>
              <input
                type="date"
                name="paymentDate"
                value={formData2.paymentDate}
                onChange={handleChange2}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Payment Method</label>
              <select
                name="paymentMethod"
                value={formData2.paymentMethod}
                onChange={handleChange2}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
              >
                <option value="credit">Credit Card</option>
                <option value="debit">Debit Card</option>
                <option value="cash">Cash</option>
                <option value="bank">Bank Transfer</option>
                <option value="check">Check</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Receipt Number</label>
              <input
                type="text"
                name="receiptNumber"
                value={formData2.receiptNumber}
                onChange={handleChange2}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="Enter receipt number"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Remaining Balance (&#8377;)</label>
              <input
                type="number"
                name="remainingBalance"
                value={formData2.remainingBalance}
                onChange={handleChange2}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                placeholder="0.00"
                step="0.01"
                min="0"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Payment Status</label>
              <select
                name="paymentStatus"
                value={formData2.paymentStatus}
                onChange={handleChange2}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
              >
                <option value="completed">Completed</option>
                <option value="partial">Partial</option>
                <option value="late">Late</option>
                <option value="processing">Processing</option>
              </select>
            </div>

            <div className="mb-12">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
              >
                Record Payment
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Overlay */}
      {isFormOpen2 && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={() => setIsFormOpen2(false)}
        />
      )}
    </div>
  );
}
