import React from 'react';

export default function Footer() {
    return (
        <div id='player-container'>
          <div id='player-controls'>
            <div className='row center'>
              <i className='fa fa-step-backward'></i>
              <i className='fa fa-pause-circle'></i>
              <i className='fa fa-step-forward'></i>
            </div>
          </div>
        </div>
    );
}