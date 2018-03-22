
export function worker(workerEv) {
  let Worker = this;
  http(workerEv.data.URL);
  function http(url) {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function (e) {

      Worker.postMessage({
        result: JSON.parse(xhr.response),
        index: workerEv.data.index
      });
      close();
    };

    xhr.send();
  }
}
