
export default (socket, entityName) => (rows) => {
  rows.each((err, row) => {
    if (err) return console.log(err);
    else if (row.new_val && !row.old_val) {
      socket.emit(entityName+':insert', row.new_val);
    } else if (row.new_val && row.old_val) {
      socket.emit(entityName+':update', row.new_val);
    } else if (row.new_val && !row.old_val) {
      socket.emit(entityName+':delete', { id: row.old_val.id });
    }
  });
};