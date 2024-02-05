import {BrowserRouter as Router,Routes, Route} from "react-router-dom";
import {useState} from "react";
import BookList from "./BookList";
import SearchComponent from "./Search";

function App() {
    const [keyWord,setKeyWord] = useState([''])
    const handleSetKeyWord = (data) => {
        setKeyWord(data)
    };
  return (
      <Router>
        <Routes>
          <Route path="/" element={<BookList />}/>
          <Route path="/search" element={<SearchComponent keyWord={keyWord} parentCallback={handleSetKeyWord} />}/>
        </Routes>
      </Router>
  );
}

export default App;
