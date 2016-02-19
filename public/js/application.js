// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {

  var winScore = {
    's8'   : 'pkrUcwEs1cKVPQnyeNsHpYOELSF4',
    's16' : 'p83Xcs0a56gO1RtcAthkn9wC68tg',
    's32' : 'p83Xcs5WNCIJxXiA7DuWEi69Pcbg',
    's1024': 'p83Xcs0TuD-sZebI1cgOQSzhtS_Q',
    's2048': 'p83Xcs9Qv86hPvVsCdr0nIc52r_Y'
  }

  var gm = new GameManager(winScore, 4, KeyboardInputManager, HTMLActuator, LocalStorageManager);
  window.gm = gm;
});
