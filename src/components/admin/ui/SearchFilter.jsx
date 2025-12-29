import { Search, Filter } from 'lucide-react';

const SearchFilter = ({ searchTerm, setSearchTerm, onFilter }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <div className="flex space-x-3">
        <button 
          onClick={onFilter}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          <Filter className="w-5 h-5 mr-2" />
          Filter
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;