import React, { useState } from 'react';

const User = () => {
  // Sample data with status as 1 (Active) or 0 (Inactive)
  const [data, setData] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 1 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 0 },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com', status: 1 },
    { id: 4, name: 'Bob Brown', email: 'bob@example.com', status: 0 },
    { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', status: 1 },
    { id: 6, name: 'David Evans', email: 'david@example.com', status: 0 },
    { id: 7, name: 'Eva Foster', email: 'eva@example.com', status: 1 },
    { id: 8, name: 'Frank Green', email: 'frank@example.com', status: 0 },
    { id: 9, name: 'Grace Hill', email: 'grace@example.com', status: 1 },
    { id: 10, name: 'Hank Ingram', email: 'hank@example.com', status: 0 },
    { id: 11, name: 'Ivy Jackson', email: 'ivy@example.com', status: 1 },
    { id: 12, name: 'Jack King', email: 'jack@example.com', status: 0 },
    { id: 13, name: 'Kara Lee', email: 'kara@example.com', status: 1 },
    { id: 14, name: 'Liam Miller', email: 'liam@example.com', status: 0 },
    { id: 15, name: 'Mia Nelson', email: 'mia@example.com', status: 1 },
    { id: 16, name: 'Noah Owens', email: 'noah@example.com', status: 0 },
    { id: 17, name: 'Olivia Parker', email: 'olivia@example.com', status: 1 },
    { id: 18, name: 'Paul Quinn', email: 'paul@example.com', status: 0 },
    { id: 19, name: 'Quinn Rogers', email: 'quinn@example.com', status: 1 },
    { id: 20, name: 'Rita Scott', email: 'rita@example.com', status: 0 },
    { id: 21, name: 'Sam Taylor', email: 'sam@example.com', status: 1 },
    { id: 22, name: 'Tina Underwood', email: 'tina@example.com', status: 0 }
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isStatusConfirmOpen, setIsStatusConfirmOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);
  const [newStatus, setNewStatus] = useState(1);

  const [filterName, setFilterName] = useState('');
  const [filterEmail, setFilterEmail] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);

  const handleOpenCreateModal = () => setIsCreateModalOpen(true);
  const handleCloseCreateModal = () => setIsCreateModalOpen(false);

  const handleOpenEditModal = (user) => {
    setCurrentUser(user);
    setIsEditModalOpen(true);
  };
  const handleCloseEditModal = () => {
    setCurrentUser(null);
    setIsEditModalOpen(false);
  };

  const handleOpenDeleteConfirm = (user) => {
    setCurrentUser(user);
    setIsDeleteConfirmOpen(true);
  };
  const handleCloseDeleteConfirm = () => {
    setCurrentUser(null);
    setIsDeleteConfirmOpen(false);
  };

  const handleOpenStatusConfirm = (user) => {
    setCurrentUser(user);
    setNewStatus(user.status === 1 ? 0 : 1);
    setIsStatusConfirmOpen(true);
  };
  const handleCloseStatusConfirm = () => {
    setCurrentUser(null);
    setIsStatusConfirmOpen(false);
  };

  const handleDeleteUser = () => {
    setData(data.filter(user => user.id !== currentUser.id));
    handleCloseDeleteConfirm();
  };

  const handleChangeStatus = () => {
    setData(data.map(user =>
      user.id === currentUser.id ? { ...user, status: newStatus } : user
    ));
    handleCloseStatusConfirm();
  };

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
  };

  const getSortedData = (data) => {
    if (!sortField) return data;
    return [...data].sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const filteredData = data.filter(user =>
    user.name.toLowerCase().includes(filterName.toLowerCase()) &&
    user.email.toLowerCase().includes(filterEmail.toLowerCase()) &&
    (filterStatus === '' || user.status === Number(filterStatus))
  );

  const sortedData = getSortedData(filteredData);

  const totalRecords = sortedData.length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  const paginatedData = sortedData.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage);

  const getStatusText = (status) => status === 1 ? 'Active' : 'Inactive';

  const getStatusButtonClass = (status) => status === 1 ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600';

  return (
    <div className="p-6">
      <button
        onClick={handleOpenCreateModal}
        className="mb-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Create User
      </button>

      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Filter by name"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="Filter by email"
          value={filterEmail}
          onChange={(e) => setFilterEmail(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All</option>
          <option value="1">Active</option>
          <option value="0">Inactive</option>
        </select>
      </div>

      <div className="mb-4 flex justify-between">
        <span>Total Records: {totalRecords}</span>
        <span>Records Per Page: {recordsPerPage}</span>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('id')}>ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('name')}>Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('email')}>Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('status')}>Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {paginatedData.map(user => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <button
                  onClick={() => handleOpenStatusConfirm(user)}
                  className={`ml-2 px-2 py-1 text-white rounded hover:bg-gray-600 ${getStatusButtonClass(user.status)}`}
                >
                  {getStatusText(user.status)}
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <button
                  onClick={() => handleOpenEditModal(user)}
                  className="px-2 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleOpenDeleteConfirm(user)}
                  className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Create Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-500 opacity-50" onClick={handleCloseCreateModal}></div>
          <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-full max-w-md mx-4">
            <h2 className="text-lg font-bold mb-4">Create User</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="create-name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="create-name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="create-email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="create-email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div className="flex gap-4">
                <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Save</button>
                <button type="button" onClick={handleCloseCreateModal} className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && currentUser && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-500 opacity-50" onClick={handleCloseEditModal}></div>
          <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-full max-w-md mx-4">
            <h2 className="text-lg font-bold mb-4">Edit User</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="edit-name"
                  defaultValue={currentUser.name}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="edit-email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="edit-email"
                  defaultValue={currentUser.email}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div className="flex gap-4">
                <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Save</button>
                <button type="button" onClick={handleCloseEditModal} className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmOpen && currentUser && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-500 opacity-50" onClick={handleCloseDeleteConfirm}></div>
          <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-full max-w-sm mx-4">
            <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete {currentUser.name}?</p>
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleDeleteUser}
                className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={handleCloseDeleteConfirm}
                className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Status Confirmation Modal */}
      {isStatusConfirmOpen && currentUser && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-500 opacity-50" onClick={handleCloseStatusConfirm}></div>
          <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-full max-w-sm mx-4">
            <h2 className="text-lg font-bold mb-4">Confirm Status Change</h2>
            <p>Are you sure you want to change the status to {newStatus === 1 ? 'Active' : 'Inactive'}?</p>
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleChangeStatus}
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Change
              </button>
              <button
                onClick={handleCloseStatusConfirm}
                className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
