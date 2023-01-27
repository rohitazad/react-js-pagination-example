import React, {useState, useEffect} from 'react';

const ReactPaginationCOmponents = ()=>{
    const [userData, setUserData] =useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] =useState(0);

    const APIURL = 'https://jsonplaceholder.typicode.com/posts';
    
    useEffect(()=>{
        fetch(APIURL)
        .then((res)=> res.json())
        .then((data)=>{
            setUserData(data);
            setTotalPages(Math.ceil(data.length / 5));
        })
    }, [])
    // current pages function
    const handlePageChange = (newPage)=>{
        setCurrentPage(newPage)
    }
    const handleNextClick = ()=>{
        if(currentPage < totalPages){
            setCurrentPage(currentPage + 1)
        }
    }
    const handlePrevClick = ()=>{
        if(currentPage > 1){
            setCurrentPage(currentPage - 1)
        }
    }
    const preDisabled = currentPage === 1;
    const nextDisabled = currentPage === totalPages

    const itemsPerPage = 5;
    const startIndex = (currentPage-1)* itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToDiaplay = userData.slice(startIndex, endIndex);
    return (
        <>
            <p>Learn Coding with Bhai React Pagination </p>
            {
                itemsToDiaplay && itemsToDiaplay.length > 0 ? itemsToDiaplay.map((item)=>{
                    return (
                        <h3 key={item.id}>{item.id} {item.title}</h3>
                    )
                }) : ''
            }
            <button 
                    onClick={handlePrevClick}
                    disabled={preDisabled}
                    >
                    Prev
                </button>
            {
                Array.from({length:totalPages},(_,i)=>{
                    return (
                        <button 
                            onClick={()=>handlePageChange(i+1)} 
                            key={i}
                            disabled={i+1 === currentPage}
                            >
                            {i+1}
                        </button>
                    )
                })
            }
            
                
                <button 
                    onClick={handleNextClick}
                    disabled={nextDisabled}
                    >
                    Next
                </button>
            
        </>
    )
}

export default ReactPaginationCOmponents;