import "./App.css";
import { useState, useEffect } from "react";
import * as BooksApi from "./BooksAPI"
import {shelfEnum} from "./core/enum";
import BookItem from "./BookItem";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [bookList,setBookList] = useState([])
  const [bookResultList,setBookResultList] = useState([])
  const [keyWord,setKeyWord] = useState('')

  const getBookList = async () => {
    const res = await BooksApi.getAll();
    if(res) {
      setBookList(res)
    }
  };

  useEffect(() => {
    if(showSearchPage) {
      const delayDebounceFn = setTimeout(() => {
        try {
          BooksApi.search(keyWord, 100).then(res => {
            if(res) {
              BooksApi.search(keyWord, 100).then(res => {
                setBookResultList(res);
              });
            } else {
              setBookResultList([])
            }
          })
        } catch (e) {
          setBookResultList([])
        }
      }, 1000)
      return () => clearTimeout(delayDebounceFn)
    } else {
      getBookList().then(r => {});
    }

  }, [keyWord])

  const handleCallBackChangeShelf = (data) => {
    if(!data) return;
    BooksApi.update(data.bookID, data.shelf).then(res => {
      if(res) {
        getBookList().then();
      }
    })

  };

  const handleChangeKeyWord = (event) => {
    setKeyWord(event.target.value);
  };

  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
                onChange={handleChangeKeyWord}
                value={keyWord}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {
                bookResultList.length > 0 ? (
                bookResultList.map((book, index) =>
                    (<BookItem book={book} key={index} parentCallback={handleCallBackChangeShelf}/>))) : null
              }
            </ol>
          </div>
        </div>
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {
                      bookList.filter(book => book.shelf === shelfEnum.READING).map((book, index) =>
                          (<BookItem book={book} key={index} parentCallback={handleCallBackChangeShelf}/>))
                    }
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {
                      bookList.filter(book => book.shelf === shelfEnum.WANT_TO_READ).map((book, index) =>
                          (<BookItem book={book} key={index} parentCallback={handleCallBackChangeShelf}/>))
                    }
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {
                      bookList.filter(book => book.shelf === shelfEnum.READ).map((book, index) =>
                          (<BookItem book={book} key={index} parentCallback={handleCallBackChangeShelf}/>))
                    }
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
