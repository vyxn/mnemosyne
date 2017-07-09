import React from 'react';
import FlatButton from 'material-ui/FlatButton';

import io from 'socket.io-client';

// eslint-disable-next-line
const socket = io();
socket.on('todo:insert', function (data) {
  console.log('NEW');
  console.log(data);
});
socket.on('todo:update', function (data) {
  console.log('UPDATE');
  console.log(data);
});
socket.on('todo:delete', function (data) {
  console.log('DELETE');
  console.log(data);
});

class Hi extends React.Component {
  props: { location: { pathname: string } }
  render() {
    return (
      <div className="hi">
        <h1>Hello, {this.props.location.pathname}!</h1>
        <FlatButton label="Default" />
        <FlatButton label="Primary" primary={true} />
      </div>
    );
  }
}

// Hi.propTypes = {
//   name: React.PropTypes.string
// };

export default Hi;