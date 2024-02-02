import {shelfEnum} from "./core/enum";

export const BookItem = (props) => {
    function moveShelf(event) {
        const bookData = event.target.value.split(',');
        if(bookData.length < 2) return;
        const payload = {
            bookID: bookData[0],
            shelf: bookData[1]
        }
        props.parentCallback(payload);
    }

    const renderOptional = (book) => {
        const rex = /([A-Z])([A-Z])([a-z])|([a-z])([A-Z])/g;
        const optionalValue = [
           {bookID: book.id, shelf: shelfEnum.READING},
           {bookID: book.id, shelf: shelfEnum.WANT_TO_READ},
           {bookID: book.id, shelf: shelfEnum.READ},
           {bookID: book.id, shelf: shelfEnum.NONE}
        ]
        const data = [];
            optionalValue.filter(optional => (optional.shelf !== book.shelf)).forEach((o, index) => {
                data.push(<option value={[o.bookID, o.shelf]}
                                  key={index}
                                  className={"text-capitalize"}>{o.shelf.replace( rex, '$1$4 $2$3$5' )}</option>)
            }
        )
        return data;
    }

    return (
       <li>
           <div className="book">
               <div className="book-top">
                   <div
                       className="book-cover"
                       style={{backgroundImage: 'url("'+ props.book.imageLinks.thumbnail +'")'}}
                   ></div>
                   <div className="book-shelf-changer">
                       <select onChange={moveShelf} defaultValue={"none"}>
                           <option value="none" disabled>
                               Move to...
                           </option>
                           { renderOptional(props.book) }
                       </select>
                   </div>
               </div>
               <div className="book-title">{ props.book.title }</div>
               <div className="book-authors">{ props.book.authors.toString() }</div>
           </div>
       </li>
    )
}
export default BookItem;
