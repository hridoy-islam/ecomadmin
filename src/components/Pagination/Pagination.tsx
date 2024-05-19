const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="p-4 sm:p-6 xl:p-7.5">
      <nav>
        <ul className="flex flex-wrap items-center gap-2">
          <li>
            <a
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`${
                currentPage === 1
                  ? 'disabled bg-primary text-white'
                  : 'bg-[#EDEFF1]'
              }  cursor-pointer flex items-center justify-center rounded px-3 py-1.5 text-xs font-medium text-black hover:bg-primary hover:text-white dark:bg-graydark dark:text-white dark:hover:bg-primary dark:hover:text-white`}
            >
              Previous
            </a>
          </li>
          {[...Array(totalPages).keys()].map((index) => (
            <li key={index}>
              <a
                onClick={() => onPageChange(index + 1)}
                className={`${
                  index + 1 === currentPage ? 'bg-primary text-white' : ''
                }  cursor-pointer flex items-center justify-center rounded px-3 py-1.5 font-medium hover:bg-primary hover:text-white`}
              >
                {index + 1}
              </a>
            </li>
          ))}

          <li>
            <a
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`${
                currentPage === totalPages
                  ? 'disabled bg-primary text-white'
                  : 'bg-[#EDEFF1]'
              }  cursor-pointer  flex items-center justify-center rounded  px-3 py-1.5 text-xs font-medium text-black hover:bg-primary hover:text-white dark:bg-graydark dark:text-white dark:hover:bg-primary dark:hover:text-white`}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
