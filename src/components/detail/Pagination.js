import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

const Pagination = ({ page, setPage, totalPages }) => {
  if(totalPages === []) return;
  return (
    <div className='pagination inner'>
      <button className='pagingArrow leftPagingArrow' onClick={() => setPage(page - 1)} disabled={page === 1}><IoIosArrowBack /></button>
      <div>
        {Array(totalPages)
          .fill()
          .map((_, i) => (
            <button className={`pagingBtn ${page === i + 1 ? 'currentPage' : ''}`}
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? "page" : null}
            >
              {i + 1}
            </button>
          ))}
      </div>
      <button className='pagingArrow rightPagingArrow' onClick={() => setPage(page + 1)} disabled={page === totalPages}><IoIosArrowForward /></button>
    </div>
  );
};

export default Pagination;