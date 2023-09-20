export const Paginate = (data, pageNumber , pageSize) => {
    const startIndex = (pageNumber - 1)*pageSize ; 
    return data.slice(startIndex , startIndex + pageSize);
}