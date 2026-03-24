/* ============================================================
   Digital Confidence Centre
   Accessible Video Player Controller — dc-video-wrap
   Version 1.0

   Features:
   - Auto-initialises on .dc-video-wrap elements
   - Keyboard controls: Space, Left/Right arrows, M, F
   - Speed selector: 0.5×, 0.75×, 1×, 1.25×, 1.5×
   - Captions toggle
   - Transcript panel toggle
   - Large play overlay (fades on play)
   - Progress bar with click-to-seek
   - Chapter markers from data-chapters attribute (JSON)
   - All controls: aria-labelled, keyboard-operable
   - Dark mode aware
   - Pure vanilla JS, zero dependencies
   ============================================================ */

(function () {
  'use strict';

  /* ---- Utility: format seconds as M:SS ---- */
  function formatTime(seconds) {
    var m = Math.floor(seconds / 60);
    var s = Math.floor(seconds % 60);
    return m + ':' + (s < 10 ? '0' : '') + s;
  }

  /* ---- Build the player UI around a <video> element ---- */
  function buildPlayer(wrap) {
    var video = wrap.querySelector('video, iframe');
    if (!video) return;

    /* For YouTube iframes we provide minimal controls (no JS API without extra lib).
       We still inject the wrapper structure and transcript toggle.
       Full keyboard/progress controls apply to native <video> only. */
    var isNative = video.tagName.toLowerCase() === 'video';

    /* Read chapters from data attribute */
    var chapters = [];
    try {
      var raw = wrap.getAttribute('data-chapters');
      if (raw) chapters = JSON.parse(raw);
    } catch (e) {
      chapters = [];
    }

    /* ---- Build control bar ---- */
    var controls = document.createElement('div');
    controls.className = 'dc-video-controls';
    controls.setAttribute('role', 'toolbar');
    controls.setAttribute('aria-label', 'Video controls');

    /* Play / Pause button */
    var playBtn = document.createElement('button');
    playBtn.className = 'dc-btn dc-play-btn';
    playBtn.setAttribute('aria-label', 'Play');
    playBtn.setAttribute('aria-pressed', 'false');
    playBtn.innerHTML = '&#9654;'; /* ▶ */

    /* Time display */
    var timeDisplay = document.createElement('span');
    timeDisplay.className = 'dc-time-display';
    timeDisplay.setAttribute('aria-live', 'off');
    timeDisplay.textContent = '0:00 / 0:00';

    /* Progress bar container */
    var progressWrap = document.createElement('div');
    progressWrap.className = 'dc-progress-wrap';
    progressWrap.setAttribute('role', 'slider');
    progressWrap.setAttribute('aria-label', 'Video progress');
    progressWrap.setAttribute('aria-valuemin', '0');
    progressWrap.setAttribute('aria-valuemax', '100');
    progressWrap.setAttribute('aria-valuenow', '0');
    progressWrap.setAttribute('tabindex', '0');

    var progressBar = document.createElement('div');
    progressBar.className = 'dc-progress-bar';

    var progressFill = document.createElement('div');
    progressFill.className = 'dc-progress-fill';

    /* Chapter markers on progress bar */
    progressBar.appendChild(progressFill);
    progressWrap.appendChild(progressBar);

    /* Mute button */
    var muteBtn = document.createElement('button');
    muteBtn.className = 'dc-btn dc-mute-btn';
    muteBtn.setAttribute('aria-label', 'Mute');
    muteBtn.setAttribute('aria-pressed', 'false');
    muteBtn.innerHTML = '&#128266;'; /* 🔊 */

    /* Speed selector */
    var speedLabel = document.createElement('label');
    speedLabel.className = 'dc-speed-label';
    speedLabel.textContent = 'Speed:';

    var speedSelect = document.createElement('select');
    speedSelect.className = 'dc-speed-select';
    speedSelect.setAttribute('aria-label', 'Playback speed');
    [0.5, 0.75, 1, 1.25, 1.5].forEach(function (s) {
      var opt = document.createElement('option');
      opt.value = s;
      opt.textContent = s + '×';
      if (s === 1) opt.selected = true;
      speedSelect.appendChild(opt);
    });

    /* Captions toggle */
    var captionsBtn = document.createElement('button');
    captionsBtn.className = 'dc-btn dc-captions-btn';
    captionsBtn.setAttribute('aria-label', 'Toggle captions');
    captionsBtn.setAttribute('aria-pressed', 'false');
    captionsBtn.textContent = 'CC';

    /* Transcript toggle */
    var transcriptBtn = document.createElement('button');
    transcriptBtn.className = 'dc-btn dc-transcript-btn';
    transcriptBtn.setAttribute('aria-label', 'Show transcript');
    transcriptBtn.setAttribute('aria-pressed', 'false');
    transcriptBtn.textContent = 'Transcript';

    /* Fullscreen button */
    var fsBtn = document.createElement('button');
    fsBtn.className = 'dc-btn dc-fs-btn';
    fsBtn.setAttribute('aria-label', 'Enter fullscreen');
    fsBtn.innerHTML = '&#x26F6;'; /* ⛶ */

    /* Assemble controls */
    if (isNative) {
      controls.appendChild(playBtn);
      controls.appendChild(progressWrap);
      controls.appendChild(timeDisplay);
      controls.appendChild(muteBtn);
    }
    speedLabel.appendChild(speedSelect);
    controls.appendChild(speedLabel);
    controls.appendChild(captionsBtn);
    controls.appendChild(transcriptBtn);
    if (isNative) controls.appendChild(fsBtn);

    wrap.appendChild(controls);

    /* ---- Large play overlay (native video only) ---- */
    var overlay = null;
    if (isNative) {
      overlay = document.createElement('button');
      overlay.className = 'dc-play-overlay';
      overlay.setAttribute('aria-label', 'Play video');
      overlay.innerHTML = '&#9654;';
      wrap.insertBefore(overlay, controls);

      overlay.addEventListener('click', function () {
        video.play();
      });
    }

    /* ---- Chapter markers ---- */
    if (isNative && chapters.length > 0) {
      chapters.forEach(function (ch) {
        var marker = document.createElement('button');
        marker.className = 'dc-chapter-marker';
        marker.setAttribute('aria-label', 'Jump to ' + ch.label + ' (' + ch.time + ')');
        marker.setAttribute('title', ch.label + ' — ' + ch.time);
        marker.style.left = '0%'; /* Will be calculated after metadata loads */
        marker.setAttribute('data-seconds', timeToSeconds(ch.time));
        progressBar.appendChild(marker);

        marker.addEventListener('click', function (e) {
          e.stopPropagation();
          var t = parseFloat(marker.getAttribute('data-seconds'));
          if (!isNaN(t)) video.currentTime = t;
        });
      });
    }

    /* ---- Wire up native video events ---- */
    if (isNative) {
      /* Metadata loaded — position chapter markers */
      video.addEventListener('loadedmetadata', function () {
        var dur = video.duration;
        controls.querySelectorAll('.dc-chapter-marker').forEach(function (m) {
          var t = parseFloat(m.getAttribute('data-seconds'));
          if (!isNaN(t) && dur > 0) {
            m.style.left = ((t / dur) * 100) + '%';
          }
        });
        timeDisplay.textContent = '0:00 / ' + formatTime(dur);
      });

      /* Time update — progress bar and time display */
      video.addEventListener('timeupdate', function () {
        if (!video.duration) return;
        var pct = (video.currentTime / video.duration) * 100;
        progressFill.style.width = pct + '%';
        progressWrap.setAttribute('aria-valuenow', Math.round(pct));
        timeDisplay.textContent = formatTime(video.currentTime) + ' / ' + formatTime(video.duration);
      });

      /* Play state */
      video.addEventListener('play', function () {
        playBtn.innerHTML = '&#9646;&#9646;'; /* ⏸ */
        playBtn.setAttribute('aria-label', 'Pause');
        playBtn.setAttribute('aria-pressed', 'true');
        if (overlay) {
          overlay.style.opacity = '0';
          overlay.style.pointerEvents = 'none';
        }
      });

      video.addEventListener('pause', function () {
        playBtn.innerHTML = '&#9654;';
        playBtn.setAttribute('aria-label', 'Play');
        playBtn.setAttribute('aria-pressed', 'false');
        if (overlay) {
          overlay.style.opacity = '1';
          overlay.style.pointerEvents = 'auto';
        }
      });

      video.addEventListener('ended', function () {
        playBtn.innerHTML = '&#9654;';
        playBtn.setAttribute('aria-label', 'Replay');
        playBtn.setAttribute('aria-pressed', 'false');
        if (overlay) {
          overlay.style.opacity = '1';
          overlay.style.pointerEvents = 'auto';
        }
      });

      /* Play/Pause button */
      playBtn.addEventListener('click', function () {
        if (video.paused) { video.play(); } else { video.pause(); }
      });

      /* Mute button */
      muteBtn.addEventListener('click', function () {
        video.muted = !video.muted;
        muteBtn.setAttribute('aria-pressed', video.muted ? 'true' : 'false');
        muteBtn.setAttribute('aria-label', video.muted ? 'Unmute' : 'Mute');
        muteBtn.innerHTML = video.muted ? '&#128263;' : '&#128266;';
      });

      /* Fullscreen */
      fsBtn.addEventListener('click', function () {
        if (document.fullscreenElement) {
          document.exitFullscreen();
          fsBtn.setAttribute('aria-label', 'Enter fullscreen');
        } else {
          wrap.requestFullscreen && wrap.requestFullscreen();
          fsBtn.setAttribute('aria-label', 'Exit fullscreen');
        }
      });

      /* Progress bar click-to-seek */
      progressWrap.addEventListener('click', function (e) {
        var rect = progressBar.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var pct = Math.max(0, Math.min(1, x / rect.width));
        if (video.duration) video.currentTime = pct * video.duration;
      });

      /* Progress bar keyboard control */
      progressWrap.addEventListener('keydown', function (e) {
        if (!video.duration) return;
        if (e.key === 'ArrowRight') {
          video.currentTime = Math.min(video.duration, video.currentTime + 5);
          e.preventDefault();
        } else if (e.key === 'ArrowLeft') {
          video.currentTime = Math.max(0, video.currentTime - 5);
          e.preventDefault();
        }
      });

      /* Keyboard controls on the wrap element */
      wrap.setAttribute('tabindex', '-1');
      wrap.addEventListener('keydown', function (e) {
        switch (e.key) {
          case ' ':
          case 'k':
            e.preventDefault();
            if (video.paused) { video.play(); } else { video.pause(); }
            break;
          case 'ArrowRight':
            e.preventDefault();
            video.currentTime = Math.min(video.duration || 0, video.currentTime + 10);
            break;
          case 'ArrowLeft':
            e.preventDefault();
            video.currentTime = Math.max(0, video.currentTime - 10);
            break;
          case 'm':
          case 'M':
            video.muted = !video.muted;
            muteBtn.innerHTML = video.muted ? '&#128263;' : '&#128266;';
            muteBtn.setAttribute('aria-pressed', video.muted ? 'true' : 'false');
            break;
          case 'f':
          case 'F':
            if (document.fullscreenElement) {
              document.exitFullscreen();
            } else {
              wrap.requestFullscreen && wrap.requestFullscreen();
            }
            break;
        }
      });
    }

    /* ---- Speed selector (works for native video and as preference indicator) ---- */
    speedSelect.addEventListener('change', function () {
      if (isNative) video.playbackRate = parseFloat(speedSelect.value);
    });

    /* ---- Captions toggle (native <track> elements) ---- */
    captionsBtn.addEventListener('click', function () {
      if (!isNative) return;
      var tracks = video.textTracks;
      var active = captionsBtn.getAttribute('aria-pressed') === 'true';
      for (var i = 0; i < tracks.length; i++) {
        if (tracks[i].kind === 'captions' || tracks[i].kind === 'subtitles') {
          tracks[i].mode = active ? 'disabled' : 'showing';
        }
      }
      var next = !active;
      captionsBtn.setAttribute('aria-pressed', next ? 'true' : 'false');
      captionsBtn.setAttribute('aria-label', next ? 'Hide captions' : 'Show captions');
      captionsBtn.classList.toggle('dc-btn-active', next);
    });

    /* ---- Transcript panel toggle ---- */
    transcriptBtn.addEventListener('click', function () {
      var panel = wrap.closest('.dc-video-section')
        ? wrap.closest('.dc-video-section').querySelector('.video-transcript')
        : document.querySelector('.video-transcript');

      if (!panel) return;
      var isOpen = transcriptBtn.getAttribute('aria-pressed') === 'true';
      panel.hidden = isOpen;
      transcriptBtn.setAttribute('aria-pressed', isOpen ? 'false' : 'true');
      transcriptBtn.setAttribute('aria-label', isOpen ? 'Show transcript' : 'Hide transcript');
      transcriptBtn.classList.toggle('dc-btn-active', !isOpen);
    });
  }

  /* ---- Helper: convert "M:SS" or "H:MM:SS" to seconds ---- */
  function timeToSeconds(str) {
    if (!str) return 0;
    var parts = str.split(':').map(Number);
    if (parts.length === 2) return parts[0] * 60 + parts[1];
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    return 0;
  }

  /* ---- Init: find all .dc-video-wrap elements ---- */
  function init() {
    document.querySelectorAll('.dc-video-wrap').forEach(function (wrap) {
      buildPlayer(wrap);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
