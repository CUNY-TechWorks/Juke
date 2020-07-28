import React from 'react';
import AlbumsList from './AlbumsList';

export default function AllAlbums(props) {
    const { array, changeToAlbumView } = props;

    return (
        <div className='container'>

           <AlbumsList albums={array} handleClick={changeToAlbumView}/>
           
        </div>
    )
}