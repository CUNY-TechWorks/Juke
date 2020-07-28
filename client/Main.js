import React, { Component } from 'react';
import { Sidebar, AllAlbums, Footer, Album } from './components/';
import Axios from 'axios';

export default class Main extends Component {
  constructor() {
     super();
     
     // we have to bind since these methods aren't arrow functions
     this.changeToAlbumView = this.changeToAlbumView.bind(this);
     this.resetView = this.resetView.bind(this);

     this.state = {
        albums: [],
        isLoading: true,
        selectedAlbum: {},
     };
  }

changeToAlbumView(albumId) {
   // good practice with async chaining without the async/await keyword

   // we could also just use fetch
   // fetch stringifies data, and axios performs automatic transforms to JSON data
   // fetch uses the body prop, while axios uses the data prop

   Axios.get(`/api/albums/${albumId}`)
      .then(res => {
         // res.data is an array with only one element, which is the album we want
         return res.data[0];
      })
      .then(data => {
         this.setState({
            selectedAlbum: data,
         })
      })
      .catch(err => {
         console.error(err.stack)
      });
}

resetView() {
   this.setState({
      selectedAlbum: {},
   })
}

async componentDidMount() {
     try {
        // AJAX request
        const res = await fetch('/api/albums', { method: 'GET' });
        const data = await res.json();

        this.setState({
           albums: data,
           isLoading: false,
        });
     }
     catch(err) {
        console.error(err.stack);
     }
  }

  render() {
     const { albums, isLoading, selectedAlbum } = this.state;

     if(isLoading) {
       return (
         <div> Loading... </div>
       );
     }
     else {
        return (
         <div id='main' className='row container'>
          <Sidebar resetView={this.resetView}/>
          { Object.keys(selectedAlbum).length === 0 ? <AllAlbums array={albums} changeToAlbumView={this.changeToAlbumView}/> : <Album album={selectedAlbum}/>}
          <Footer />
         </div>
        );
    }
  }
}
