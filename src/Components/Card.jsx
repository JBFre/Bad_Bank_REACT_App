import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Card(props) {
  function classes() {
    const bg = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
    const txt = props.txtcolor ? ' text-' + props.txtcolor : ' text-white';
    return 'card mb-3 ' + bg + txt;
  }

  return (
    <div className={classes()} style={{ maxWidth: "26rem", border: '2px solid red' }}>
      <div className="card-header">{props.header}</div>
      <div className="card-body">
        {props.title && (<div className="card-title">{props.title}</div>)}
        {props.text && (<div className="card-text">{props.text}</div>)} {/* Changed p to div */}
        {props.body}
        {props.status && (<div id='createStatus'>{props.status}</div>)}
      </div>
    </div>
  );
}
