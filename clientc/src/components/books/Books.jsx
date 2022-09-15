import { Component } from 'react';
import './App.css';
import SearchArea from './SearchArea';
import request from 'superagent';
import BookList from './BookList';

class Books extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            searchField: '',
            sort: ''
        }
    }

    searchBook = (e) => {
        e.preventDefault();
        request
            .get("https://www.googleapis.com/books/v1/volumes")
            .query({ q: this.state.searchField })
            .then((data) => {
                const cleanData = this.cleanData(data)
                this.setState({ books: cleanData })
            })
    }

    handleSearch = (e) => {
        this.setState({ searchField: e.target.value })
    }

    handleSort = (e) => {
        this.setState({ sort: e.target.value })
    }

    cleanData = (data) => {
        const cleanedData = data.body.items.map((book) => {
            if (book.volumeInfo.hasOwnProperty('publishedDate') === false) {
                book.volumeInfo['publishedDate'] = '0000';
            }
            else if (book.volumeInfo.hasOwnProperty('imageLinks') === false) {
                book.volumeInfo['imageLinks'] = { thumbnail: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fdepositphotos.com%2Fvector-images%2Fno-image-available.html&psig=AOvVaw3BzRZCRwpaIHuNAfnVVoj7&ust=1632864380107000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMji8P2LoPMCFQAAAAAdAAAAABAI" }
            }
            return book;

        })
        return cleanedData;
    }

    render() {
        const sortedBooks = this.state.books.sort((a, b) => {
            if (this.state.sort === 'Newest') return parseInt(b.volumeInfo.publishedDate.substring(0, 4)) - parseInt(a.volumeInfo.publishedDate.substring(0, 4))
            if (this.state.sort === 'Oldest') return parseInt(a.volumeInfo.publishedDate.substring(0, 4)) - parseInt(b.volumeInfo.publishedDate.substring(0, 4))
        })
        return (
            <div>
                <SearchArea searchBook={this.searchBook} handleSearch={this.handleSearch} handleSort={this.handleSort} />
                <BookList books={sortedBooks} />
            </div>
        );
    }
}


export default Books;
