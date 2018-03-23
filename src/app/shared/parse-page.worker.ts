
export function worker(workerEv) {

  http(workerEv.data.URL);

  function http(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = (e) => {
      this.postMessage({
        result: JSON.parse(xhr.response),
        index: workerEv.data.index,
      });

      // Worker.postMessage(JSON.parse(xhr.response));
      // close();
    };

    xhr.send();
  }
}
