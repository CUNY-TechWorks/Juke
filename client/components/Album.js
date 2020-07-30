import React from 'react';
import Songs from './Songs';

export default function Album(props) {
    const { album, playAudio, pauseAudio, showSongFeedback, selectedSong } = props;

    return (
      <div className='container'>

        <div id='single-album' className='column'>
          <div className='album'>
            <a>
              <img src={album.artWorkUrl} />
              <p> {album.name} </p>
              <small> {album.artist.name} </small>
            </a>
          </div>
          <Songs artistName={album.artist.name} songs={album.songs} play={playAudio} pause={pauseAudio} showFeedback={showSongFeedback} currentSong={selectedSong}/>
        </div>

      </div>
    );
}