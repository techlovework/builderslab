import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function PaginationControls({ currentPage, totalPages, onPageChange }) {
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

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    const halfPages = Math.floor(maxPagesToShow / 2);

    if (totalPages <= maxPagesToShow + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      if (currentPage > halfPages + 2) {
        pageNumbers.push('...');
      }

      let start = Math.max(2, currentPage - halfPages);
      let end = Math.min(totalPages - 1, currentPage + halfPages);

      if (currentPage <= halfPages + 1) {
        start = 2;
        end = maxPagesToShow;
      }
      
      if (currentPage >= totalPages - halfPages) {
          start = totalPages - maxPagesToShow + 1;
          end = totalPages - 1;
      }

      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }

      if (currentPage < totalPages - halfPages - 1) {
        pageNumbers.push('...');
      }
      pageNumbers.push(totalPages);
    }
    return pageNumbers;
  };
  
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-2 mt-12">
      <Button variant="outline" size="icon" onClick={handlePrevious} disabled={currentPage === 1}>
        <span className="sr-only">Previous</span>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      {getPageNumbers().map((page, index) =>
        typeof page === 'number' ? (
          <Button
            key={index}
            variant={currentPage === page ? 'default' : 'outline'}
            onClick={() => onPageChange(page)}
            className="hidden md:inline-flex"
          >
            {page}
          </Button>
        ) : (
          <span key={index} className="px-3 py-2 text-slate-500 hidden md:inline-flex">
            ...
          </span>
        )
      )}
      
      <Button variant="outline" size="icon" onClick={handleNext} disabled={currentPage === totalPages}>
        <span className="sr-only">Next</span>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}