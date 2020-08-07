import React from 'react';

export default function Footer(props) {
    const { album, showSongFeedback, pause, previous, forward } = props;

    return (
        <div id='player-container'>
          <div id='player-controls'>
            <div className='row center'>
              <i className='fa fa-step-backward' onClick={() => previous() }></i>
              <i className='fa fa-pause-circle' onClick={() => { pause(); showSongFeedback(null); } }></i>
              <i className='fa fa-step-forward' onClick={() => forward() }></i>
            </div>
          </div>
        </div>
    );
}