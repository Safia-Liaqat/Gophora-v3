import { Edit, Trash2, Eye, MoreVertical } from 'lucide-react';
import { useState } from 'react';

const DataTable = ({ 
  columns, 
  data, 
  onEdit, 
  onDelete, 
  onView,
  actions = true,
  selectable = false
}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSelectAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((_, index) => index));
    }
  };

  const handleSelectRow = (index) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter(i => i !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden text-gray-900"> {/* ADD text-gray-900 here */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {selectable && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                  <input
                    type="checkbox"
                    checked={selectedRows.length === data.length && data.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
              )}
              
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort(column.key)}
                >
                  <div className="flex items-center text-gray-700"> {/* ADD text-gray-700 */}
                    {column.label}
                    {sortColumn === column.key && (
                      <span className="ml-1">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              
              {actions && (
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr 
                key={rowIndex} 
                className={`hover:bg-gray-50 ${selectedRows.includes(rowIndex) ? 'bg-blue-50' : ''}`}
              >
                {selectable && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(rowIndex)}
                      onChange={() => handleSelectRow(rowIndex)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                )}
                
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4 whitespace-nowrap text-gray-900"> {/* ADD text-gray-900 here */}
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>
                ))}
                
                {actions && (
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900"> {/* ADD text-gray-900 */}
                    <div className="flex justify-end space-x-2">
                      {onView && (
                        <button
                          onClick={() => onView(row)}
                          className="text-blue-600 hover:text-blue-900 p-1"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      )}
                      
                      {onEdit && (
                        <button
                          onClick={() => onEdit(row)}
                          className="text-green-600 hover:text-green-900 p-1"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      )}
                      
                      {onDelete && (
                        <button
                          onClick={() => onDelete(row)}
                          className="text-red-600 hover:text-red-900 p-1"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                      
                      <button className="text-gray-600 hover:text-gray-900 p-1">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No data available
        </div>
      )}
    </div>
  );
};

export default DataTable;