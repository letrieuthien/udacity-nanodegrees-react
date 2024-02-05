import {shelfEnum} from "./core/enum";
import * as BooksApi from "./BooksAPI";

export const BookItem = (props) => {
    const book = props.book;
    function moveShelf(e) {
        const bookData = e.split(',');
        if(bookData.length < 2) return;
        BooksApi.update(bookData[0], bookData[1]).then(res => {
            if(!res) return;
            props.parentCallback();
        })
    }

    let bgImg = book?.imageLinks?.thumbnail ?? 'imgs/no-img.jpg';

    return (
       <li>
           <div className="book">
               <div className="book-top">
                   <div
                       className="book-cover"
                       style={{backgroundImage: 'url("'+ bgImg +'")'}}
                   ></div>
                   <div className="book-shelf-changer">
                       <select onChange={e => moveShelf(e.target.value)} defaultValue={(book.id+','+book.shelf) ?? "none"}>
                           <option value="none" disabled> Move to...</option>
                           <option value={[book.id, shelfEnum.READING]}> Currently Reading </option>
                           <option value={[book.id, shelfEnum.WANT_TO_READ]}> Want To Read </option>
                           <option value={[book.id, shelfEnum.READ]}> Read </option>
                           <option value={[book.id, shelfEnum.NONE]}> None </option>
                       </select>
                   </div>
               </div>
               <div className="book-title">{ book.title }</div>
               <div className="book-authors">{ book?.authors?.toString() ?? '' }</div>
           </div>
       </li>
    )
}
export default BookItem;
