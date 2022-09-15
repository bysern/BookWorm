import React from 'react';


const BookCard = (props) => {
    return (
        <div className="card-container">
            <img src={props.image} alt="" />
            <div className="book-description">
                <h2>{props.title}</h2>
                <h3>Author: {props.author}</h3>
                <p>Published Date: {props.published === '0000' ? 'Not available' : props.published.substring(0, 4)}</p>
            </div>
        </div>
    )
}

export default BookCard;