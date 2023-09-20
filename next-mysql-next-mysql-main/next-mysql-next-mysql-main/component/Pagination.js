function Pagination({itemCount , pageSize , currentPage , onPageChange }){

    const totalPages = Math.ceil(itemCount/pageSize) ;

    if(totalPages == 1) return null;

    const pages = Array.from({length : totalPages},(_,i) => i+1);

    return (
        <>
            <div className="d-flex justify-content-center align-items-center">
				<ul className="pagination">
                    {
                        pages.map(page => {
                            return (
                                <li key = {page} className={`page-item ${
                                    page == currentPage ? 'active' : ''
                                }`}><a className="page-link" onClick = {() => onPageChange(page)} href = "#">{page}</a></li>
                            )
                        })
                    }
				</ul>
			</div>
        </>
    )
}

export default Pagination ;