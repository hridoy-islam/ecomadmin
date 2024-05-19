export const SearchFilter = ({ onSearch, onEntriesPerPageChange }) => {
  return (
    <div className="flex justify-between px-7 py-4">
      <div className="">
        <input
          onChange={onSearch}
          placeholder="Search..."
          type="search"
          className="py-2 px-3 w-96 border border-gray-300 rounded-md bg-transparent outline-none"
        />
      </div>
      <div className="">
        <label>
          <select
            onChange={onEntriesPerPageChange}
            className="z-20 inline-flex bg-transparent p-0 font-medium text-gray-500 outline-none outline-offset-2"
          >
            <option value="5">5</option>
            <option value="10" selected>
              10
            </option>
            <option value="15">15</option>
          </select>{' '}
          entries per page
        </label>
      </div>
    </div>
  );
};
