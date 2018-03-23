
export function worker(workerEv) {
  let Worker = this;
  http(workerEv.data.URL);
  function http(url) {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function (e) {
      console.log('close')
      Worker.postMessage({
        result: JSON.parse(xhr.response),
        index: workerEv.data.index,
      });

      // Worker.postMessage(JSON.parse(xhr.response));
      // close();
    };

    xhr.send();
  }
}
