(function() {
  var async_if, root;

  async_if = function(fn, args, timeout) {
    var curr_probe, dfd, probe;
    dfd = new jQuery.Deferred();
    curr_probe = null;
    probe = function() {
      if (fn(args)) {
        dfd.resolve(args);
        return curr_probe = null;
      } else {
        return curr_probe = setTimeout(probe, 5);
      }
    };
    if (timeout) {
      setTimeout(function() {
        curr_probe && clearTimeout(curr_probe);
        return dfd.reject(args);
      }, timeout);
    }
    probe();
    return dfd.promise();
  };

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.async_if = async_if;

}).call(this);
