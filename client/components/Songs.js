import React from 'react';

export default function Songs(props) {
    const { artistName, songs, play, pause, showFeedback, currentSong } = props;

    return (
      <table id='songs'>
        <tbody>
          <tr className='gray'>
            <td />
            <td>#</td>
            <td>Name</td>
            <td>Artist</td>
            <td>Genre</td>
          </tr>
          {songs.map(el => {
             return (
              <tr className={el.id === currentSong ? "pressed" : ''}>
                <td> <i className={el.id === currentSong ? `fa fa-pause-circle` : 'fa fa-play-circle'} onClick={el.id === currentSong ? () => { pause(); showFeedback(null); } : () => { play(el.audioUrl); showFeedback(el.id); }}/> </td>
                <td> {el.id} </td>
                <td> {el.name} </td>
                <td> {artistName} </td>
                <td> {el.genre} </td>
              </tr>
             );
          })}
        </tbody>
      </table>
    );
}