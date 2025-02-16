
export const generatePagination = (currentPage: number, totalPages: number) => {
    //if all pages are 7 or less, it's going to show all the pages
    //without ellipsis
    if(totalPages<=7){
        return Array.from({length: totalPages}, (_,i) => i+1)
    }

    //if the actual page is between the first 3 pages, the first 3 pages
    //are going to be shown, then the ellipsis, and then the last 2
    if(currentPage <=3){
        return [1,2,3,'...', totalPages-1,totalPages]
    }

    //if the actual page is in the last 3 pages, show the first 2,
    //then the ellipsis, and then the last 3 pages
    if(currentPage >= totalPages - 2){
        return [1,2, '...', totalPages-2, totalPages-1, totalPages]
    }

    //if the actual page is in the middle, show the first page, the elipsis,
    //the actual page and neighbors
    return [
        1,
        '...',
        currentPage-1,
        currentPage,
        currentPage+1,
        '...',
        totalPages
    ]
}