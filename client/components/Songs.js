import React from 'react';

export default function Songs(props) {
    const { artistName, songs, play } = props;

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
              <tr>
                <td> <i className='fa fa-play-circle' onClick={() => play(el.audioUrl)}/></td>
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