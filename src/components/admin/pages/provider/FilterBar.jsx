// src/components/providers/FilterBar.jsx
import { useState } from 'react';

const FilterBar = ({ onFilter, onSearch }) => {
  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all',
    minScore: 0,
    maxScore: 100
  });

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handleSearch = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6 border border-[#333333]">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#000000] mb-1">Search</label>
          <input
            type="text"
            placeholder="Search providers..."
            onChange={handleSearch}
            className="w-full px-3 py-2 border border-[#333333] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF4F00] text-[#000000]"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[#000000] mb-1">Status</label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-[#333333] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF4F00] text-[#000000] bg-white appearance-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23333333' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 0.5rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.5em 1.5em',
              paddingRight: '2.5rem'
            }}
          >
            <option value="all" className="text-[#000000]">All Status</option>
            <option value="verified" className="text-[#000000]">Verified</option>
            <option value="pending_review" className="text-[#000000]">Pending Review</option>
            <option value="denied" className="text-[#000000]">Denied</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[#000000] mb-1">Provider Type</label>
          <select
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className="w-full px-3 py-2 border border-[#333333] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF4F00] text-[#000000] bg-white appearance-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23333333' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 0.5rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.5em 1.5em',
              paddingRight: '2.5rem'
            }}
          >
            <option value="all" className="text-[#000000]">All Types</option>
            <option value="institutional" className="text-[#000000]">Institutional</option>
            <option value="professional" className="text-[#000000]">Professional</option>
            <option value="new_talent" className="text-[#000000]">New Talent</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[#000000] mb-1">
            Trust Score: {filters.minScore} - {filters.maxScore}
          </label>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0"
                max="100"
                value={filters.minScore}
                onChange={(e) => handleFilterChange('minScore', parseInt(e.target.value))}
                className="w-full h-2 bg-[#333333] rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#FF4F00]"
              />
              <span className="text-sm font-medium text-[#000000] min-w-[2rem]">{filters.minScore}</span>
            </div>
            <div className="flex justify-between text-xs text-[#333333]">
              <span>0</span>
              <span>50</span>
              <span>100</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;