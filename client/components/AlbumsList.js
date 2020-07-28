import React from 'react';

export default function Albums(props) {
    const { albums, handleClick } = props;
    
    return (
      <div id='albums' className='row wrap'>
        {albums.map(el => {
           return (
             <div className='album'>
                <a onClick={() => handleClick(el.id)}>
                  <img src={el.artWorkUrl} />
                  <p> {el.name} </p>
                  <small> {el.artist.name} </small>
                </a>
             </div>
           );
        })}
      </div>
    );
}