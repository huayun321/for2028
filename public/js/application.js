// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {

  var winScore = {
    's1024'   : 'pkrUcwEs1cKVPQnyeNsHpYOELSF4',
    's2048' : 'pkrUcwMKzNtWO_13VldWTRuzZNHU',
    's4096': 'pkrUcwA6LPaBNkiB_-QJSdbH07f4',
  }

  var gm = new GameManager(winScore, 4, KeyboardInputManager, HTMLActuator, LocalStorageManager);
  window.gm = gm;
});
