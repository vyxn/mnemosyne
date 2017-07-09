import io from 'socket.io-client';
const socket = io.connect('/');

export default (store) => {
  socket.on('todo:insert', (todo) => {
    store.dispatch({
      type: 'todo:insert',
      todo: todo
    });
  });
};