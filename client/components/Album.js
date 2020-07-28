import React from 'react';
import Songs from './Songs';

export default function Album(props) {
    const { album } = props;

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
          <Songs artistName={album.artist.name} songs={album.songs}/>
        </div>

      </div>
    );
}