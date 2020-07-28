import React from 'react';

export default function Sidebar(props) {
   const { resetView } = props;

   return (
      <div id='sidebar'>
        <img src='juke.svg' id='logo' />
        <section>
          <h4>
        <a onClick={() => resetView()}>ALBUMS</a>
          </h4>
        </section>
     </div>
   );
}