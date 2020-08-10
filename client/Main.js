import React, { Component } from 'react';
import { Sidebar, AllAlbums, Footer, Album } from './components/';
import Axios from 'axios';

// make our audio element global, so it can be used throughout (on all methods!)
const audio = document.createElement('audio');

export default class Main extends Component {
  constructor() {
     super();
     
     // we have to bind since these methods since they aren't arrow functions
     this.changeToAlbumView = this.changeToAlbumView.bind(this);
     this.resetView = this.resetView.bind(this);
     this.playAudio = this.playAudio.bind(this);
     this.pauseAudio = this.pauseAudio.bind(this);
     this.prevAudio = this.prevAudio.bind(this);
     this.nextAudio = this.nextAudio.bind(this);
     this.showSongFeedback = this.showSongFeedback.bind(this);

     this.state = {
        albums: [],
        isLoading: true,
        selectedAlbum: {},
        selectedSong: null,
     };
  }

async componentDidMount() {
   // if a song has ended, just play the next one
   audio.addEventListener('ended', () => {
      this.nextAudio();
   });

   try {
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
         });
      })
      .catch(err => {
         console.error(err.stack);
      });
}

resetView() {
   this.setState({
      selectedAlbum: {},
   });
}

playAudio(url) {
   audio.src = url;
   audio.load();
   audio.play();
}
pauseAudio() {
   audio.pause();
}

prevAudio() {
   const { selectedSong, selectedAlbum } = this.state;

   let currentSongIndex = selectedAlbum.songs.findIndex(el => {
       return el.id === selectedSong;
   });
   
   // make sure the song index doesn't go out of bounds
   // when the prev button is clicked, go to the previous song
   if(currentSongIndex !== 0) {
      const prevSong = selectedAlbum.songs[--currentSongIndex];

      this.playAudio(prevSong.audioUrl);

      this.setState({
         selectedSong: prevSong.id,
      });
   }
   // if song index is at 0, then go to the end of the song list
   else {
      // go to the last song of the songs array
      currentSongIndex = selectedAlbum.songs.length-1;

      const lastSong = selectedAlbum.songs[currentSongIndex];

      this.playAudio(lastSong.audioUrl);

      this.setState({
         selectedSong: lastSong.id,
      });
   }
}

// runs only if a song has ended (eventListener) or the user clicks on the forward button. 
nextAudio() {
   const { selectedSong, selectedAlbum } = this.state;

   let currentSongIndex = selectedAlbum.songs.findIndex(el => {
       return el.id === selectedSong;
   });

   // make sure the selectedSong id doesn't go out of bounds
   // when a song ends, play the next one. 
   if(currentSongIndex !== selectedAlbum.songs.length-1) {
      const nextSong = selectedAlbum.songs[++currentSongIndex];

      this.playAudio(nextSong.audioUrl);
      
      this.setState({
        selectedSong: nextSong.id,
      });
   }
   // if it is, then just go from the beginning
   else {
      // go back to the first index of the songs array
      currentSongIndex %= (selectedAlbum.songs.length-1); 

      const firstSong = selectedAlbum.songs[currentSongIndex];

      this.playAudio(firstSong.audioUrl);
      
      this.setState({
         selectedSong: firstSong.id,
      });
   }
}

showSongFeedback(currentSongId) {
   this.setState({
       selectedSong: currentSongId,
   });
}

render() {
     const { albums, isLoading, selectedAlbum, selectedSong } = this.state;

     if(isLoading) {
       return (
         <div> Loading... </div>
       );
     }
     else {
        return (
          <div id='main' className='row container'>
            <Sidebar resetView={this.resetView}/>
            { Object.keys(selectedAlbum).length === 0 ? <AllAlbums array={albums} changeToAlbumView={this.changeToAlbumView}/> : <Album album={selectedAlbum} playAudio={this.playAudio} pauseAudio={this.pauseAudio} showSongFeedback={this.showSongFeedback} selectedSong={selectedSong}/>}
            { selectedSong === null ? '' : <Footer album={selectedAlbum} showSongFeedback={this.showSongFeedback} play={this.playAudio} pause={this.pauseAudio} previous={this.prevAudio} forward={this.nextAudio} />}
          </div>
        );
    }
  }
}
