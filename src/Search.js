import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import BookItem from "./BookItem";
import * as BooksApi from "./BooksAPI";


export const SearchComponent = (props) => {
    const {keyWord} = props;
    // search stage
    const [bookResultList,setBookResultList] = useState([])

    const handleChangeKeyWord = (event) => {
        props.parentCallback(event.target.value);
    };

    const search = () => {
        try {
            BooksApi.search(keyWord, 100).then(listSearch => {
                if(listSearch?.length > 0) {
                    // get all book
                    BooksApi.getAll().then(listAll => {
                        const arrTemp = new Map(listAll.map(e => [e.id, e.shelf]));
                        listSearch.forEach((book) => book.shelf = arrTemp.get(book.id) ?? 'none')
                        setBookResultList(listSearch);
                    });
                } else {
                    setBookResultList([])
                }
            })
        } catch (e) {
            setBookResultList([])
        }
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            search();
        }, 1000)
        return () => clearTimeout(delayDebounceFn)

    },[keyWord])

    return (
        <div className="app">
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title, author, or ISBN"
                            onChange={handleChangeKeyWord}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            bookResultList.length > 0 ? (
                                bookResultList.map((book, index) =>
                                    (<BookItem book={book} key={index} parentCallback={search}/>))) : null
                        }
                    </ol>
                </div>
            </div>
        </div>

    )
}
export default SearchComponent;
