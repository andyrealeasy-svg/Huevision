const TRACKS = [
  {
    id: 'track-1',
    artist: 'SiCka',
    title: 'Let Me',
    year: '2025',
    country: 'Revostan',
    audioSrc: 'https://qnozyhiylwmhcmkrvsul.supabase.co/storage/v1/object/sign/Huevision%20mp3/huevision2025.mp3?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NTJjZjAzNy1jZjIzLTRlNDctYTdkYy04MWVhM2EwZWRhZWEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJIdWV2aXNpb24gbXAzL2h1ZXZpc2lvbjIwMjUubXAzIiwiaWF0IjoxNzc3MzcwNjU4LCJleHAiOjIwOTI3MzA2NTh9.e9chH9CoDB4LZgkWnAH_ssm88hBeCXxItvBkEifvE2U',
    coverSrc: 'https://i.postimg.cc/brkbcBDW/IMG-20260428-110522-876.jpg'
  },
  {
    id: 'track-2',
    artist: 'NIK$A',
    title: 'Business',
    year: '2025',
    country: 'Russia',
    audioSrc: 'https://qnozyhiylwmhcmkrvsul.supabase.co/storage/v1/object/sign/Huevision%20mp3/huevision2025%20(1).mp3?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NTJjZjAzNy1jZjIzLTRlNDctYTdkYy04MWVhM2EwZWRhZWEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJIdWV2aXNpb24gbXAzL2h1ZXZpc2lvbjIwMjUgKDEpLm1wMyIsImlhdCI6MTc3NzYzMjE1NSwiZXhwIjoyMDkyOTkyMTU1fQ.FPlhF3rQp6qL8wlCgQdZzcwLgVMv4J82qpQi8SW8EEo',
    coverSrc: 'https://i.postimg.cc/brkbcBDW/IMG-20260428-110522-876.jpg'
  },
  {
    id: 'track-3',
    artist: 'Ksivat',
    title: '5 Minutes',
    year: '2025',
    country: 'Genshinland',
    audioSrc: 'https://qnozyhiylwmhcmkrvsul.supabase.co/storage/v1/object/sign/Huevision%20mp3/huevision2025%20(2).mp3?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NTJjZjAzNy1jZjIzLTRlNDctYTdkYy04MWVhM2EwZWRhZWEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJIdWV2aXNpb24gbXAzL2h1ZXZpc2lvbjIwMjUgKDIpLm1wMyIsImlhdCI6MTc3NzYzMjQ1MywiZXhwIjoyMDkyOTkyNDUzfQ.LX7_32wEa3wQQbTsGjCxkRuuoiie7x7bbcjXIZn-Vr0',
    coverSrc: 'https://i.postimg.cc/brkbcBDW/IMG-20260428-110522-876.jpg'
  },
  {
    id: 'track-4',
    artist: 'Dollova',
    title: 'Tore You Too',
    year: '2025',
    country: 'Kaliningrad',
    audioSrc: 'https://qnozyhiylwmhcmkrvsul.supabase.co/storage/v1/object/sign/Huevision%20mp3/huevision2025%20(3).mp3?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NTJjZjAzNy1jZjIzLTRlNDctYTdkYy04MWVhM2EwZWRhZWEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJIdWV2aXNpb24gbXAzL2h1ZXZpc2lvbjIwMjUgKDMpLm1wMyIsImlhdCI6MTc3NzYzMjY0NiwiZXhwIjoyMDkyOTkyNjQ2fQ.MxR7i_75vLbv5B1FcJvqJrJdNOOwJ01eTGD34zTVw60',
    coverSrc: 'https://i.postimg.cc/brkbcBDW/IMG-20260428-110522-876.jpg'
  }
];

const LINEUP_DATA = {
  participant: [
    { name: 'SiCka', country: 'Revostan' },
    { name: 'NIK$A', country: 'Russia' },
    { name: 'Ksivat', country: 'Genshinland' },
    { name: 'Dollova', country: 'Kaliningrad' }
  ],
  jury: [
    { name: 'Pinky Pie', role: 'jury' }
  ]
};

class VanillaApp {
  constructor() {
    this.audio = new Audio();
    this.currentTrackIndex = 0;
    this.isPlaying = false;
    this.repeatMode = 0;
    this.showPlaylist = false;
    this.audioFilterYear = 'ALL';
    this.duration = 0;
    this.targetDate = new Date('2026-05-10T12:00:00+03:00').getTime();
    
    // Global audio bindings
    this.audio.addEventListener('timeupdate', () => this.updateAudioProgress());
    this.audio.addEventListener('loadedmetadata', () => { this.duration = this.audio.duration; this.updateAudioProgress()});
    this.audio.addEventListener('ended', () => {
      if (this.repeatMode === 2) {
        this.audio.currentTime = 0;
        this.audio.play();
      } else {
        this.nextTrack();
      }
    });

    this.initGlobalAudio();
    this.initRouter();

    lucide.createIcons();
  }

  initRouter() {
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const tab = e.currentTarget.getAttribute('data-tab');
        const href = e.currentTarget.getAttribute('href');
        this.navigate(tab, href);
      });
    });

    // Default route
    const path = window.location.pathname;
    if (path.includes('apply')) this.navigate('form', './apply.html');
    else if (path.includes('media')) this.navigate('audio', './media.html');
    else if (path.includes('lineup')) this.navigate('lineup', './lineup.html');
    else if (path.includes('rules')) this.navigate('rules', './rules.html');
    else this.navigate('hub', './hub.html');
  }

  updateNavState(activeTab) {
    document.querySelectorAll('.nav-links a').forEach(link => {
      const tab = link.getAttribute('data-tab');
      if (tab === activeTab) {
        link.classList.remove('text-white/60');
        link.classList.add('text-red-500');
      } else {
        link.classList.add('text-white/60');
        link.classList.remove('text-red-500');
      }
    });
  }

  async navigate(tab, url) {
    if(!url) {
       if (tab === 'form') url = './apply.html';
       else if (tab === 'audio') url = './media.html';
       else if (tab === 'lineup') url = './lineup.html';
       else if (tab === 'rules') url = './rules.html';
       else url = './hub.html';
    }
    
    this.updateNavState(tab);
    window.history.pushState({}, '', url);

    try {
      const html = await fetch(url).then(res => res.text());
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const text = doc.body.innerHTML; 
      
      // Look for the specific section. Since we fetched the whole file we just use the first section
      const section = doc.querySelector('section');
      
      if(section) {
         document.getElementById('main-content').innerHTML = section.outerHTML;
      } else {
         document.getElementById('main-content').innerHTML = doc.body.innerHTML;
      }
      
      lucide.createIcons();

      // We don't stop the audio when navigating away from media anymore!
      /*
      if (tab !== 'audio' && this.isPlaying) {
        this.toggleReplay(); 
      }
      */

      // Initialize page specific scripts
      if (tab === 'hub') this.initHub();
      if (tab === 'lineup') this.initLineup();
      if (tab === 'form') this.initApply();
      if (tab === 'audio') this.initAudio();

    } catch (e) {
      console.error('Navigation error', e);
    }
  }

  initHub() {
    this.timerInterval = setInterval(() => {
      const now = new Date().getTime();
      const distance = this.targetDate - now;
      const el = document.getElementById('countdown-container');
      if(!el) {
         clearInterval(this.timerInterval);
         return;
      }

      if (distance < 0) {
        clearInterval(this.timerInterval);
        el.innerHTML = '';
        return;
      }

      const d = Math.floor(distance / (1000 * 60 * 60 * 24));
      const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((distance % (1000 * 60)) / 1000);

      const daysRemaining = Math.max(0, distance / (1000 * 60 * 60 * 24));
      let pulse = '3s';
      if (daysRemaining <= 1) pulse = '0.5s';
      else if (daysRemaining <= 3) pulse = '1s';
      else if (daysRemaining <= 7) pulse = '1.5s';
      else if (daysRemaining <= 14) pulse = '2s';

      const renderUnit = (label, val) => `
        <div class="flex flex-col items-center">
          <div class="w-16 h-20 md:w-24 md:h-28 glass-panel animate-intense-glow flex items-center justify-center relative overflow-hidden rounded-md border-red-500/30"
               style="--pulse-duration: ${pulse}">
            <span class="absolute font-display font-medium text-3xl md:text-5xl text-white drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]">
              ${val.toString().padStart(2, '0')}
            </span>
          </div>
          <span class="mt-4 text-xs tracking-widest text-white/40 font-display">${label}</span>
        </div>`;

      el.innerHTML = renderUnit('ДНЕЙ', d) + renderUnit('ЧАСОВ', h) + renderUnit('МИНУТ', m) + renderUnit('СЕКУНД', s);
    }, 1000);
  }

  setLineupFilter(filter) {
    this.currentLineupFilter = filter;
    document.querySelectorAll('.lineup-tab').forEach(b => {
      if(b.getAttribute('data-filter') === filter) {
        b.className = "lineup-tab flex-1 md:flex-none px-6 py-2 text-sm font-display uppercase tracking-widest transition-all bg-red-500 text-white font-bold";
      } else {
        b.className = "lineup-tab flex-1 md:flex-none px-6 py-2 text-sm font-display uppercase tracking-widest transition-all text-white/50 hover:text-white";
      }
    });
    this.renderLineup();
  }

  initLineup() {
    this.currentLineupFilter = 'participant';
    this.renderLineup();
  }
  
  renderLineup() {
    const container = document.getElementById('lineup-grid-container');
    if (!container) return;
    
    const data = LINEUP_DATA[this.currentLineupFilter] || [];
    
    if (data.length === 0) {
      container.innerHTML = `
        <div id="lineup-empty" class="col-span-full w-full h-64 glass-panel border border-dashed border-white/10 flex flex-col items-center justify-center text-center p-6 fade-in">
          <i data-lucide="shield-alert" class="text-red-500/50 mb-4 w-12 h-12"></i>
          <h3 class="font-display font-bold text-2xl text-white/80">НЕТ ДАННЫХ</h3>
          <p class="text-white/40 mt-2 max-w-md">Список пока пуст. Информация появится после окончания приема заявок и отбора.</p>
        </div>
      `;
    } else {
      container.innerHTML = data.map(item => `
        <div class="glass-panel p-6 border-red-500/20 box-glow flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 fade-in">
          <div class="w-32 h-32 rounded-full bg-white/5 border border-white/10 mb-6 flex items-center justify-center overflow-hidden">
            <i data-lucide="user" class="w-12 h-12 text-white/20"></i>
          </div>
          <h3 class="text-xl md:text-2xl font-display font-bold text-white mb-2 whitespace-nowrap overflow-hidden text-clip w-full">
            ${item.name}
          </h3>
          ${item.country ? `<div class="mt-auto pt-4 border-t border-white/10 w-full"><p class="text-xs font-mono tracking-widest text-red-500 uppercase">${item.country}</p></div>` : ''}
          ${item.role === 'jury' ? `<div class="mt-auto pt-4 border-t border-white/10 w-full"><p class="text-xs font-mono tracking-widest text-red-500 uppercase">ЖЮРИ</p></div>` : ''}
        </div>
      `).join('');
    }
    lucide.createIcons();
  }

  initApply() {
    this.isAuthenticated = false;
    this.applyInterval = setInterval(() => {
      const lockOverlay = document.getElementById('apply-lock-overlay');
      const rulesModal = document.getElementById('apply-rules-modal');
      const formContainer = document.getElementById('apply-form-container');

      if(!lockOverlay) {
        clearInterval(this.applyInterval);
        return;
      }

      const isLocked = new Date().getTime() < this.targetDate;
      const rulesAccepted = sessionStorage.getItem('huevision_rules_accepted') === 'true';
      
      if (isLocked && !this.isAuthenticated) {
        lockOverlay.classList.remove('hidden');
        if(rulesModal) rulesModal.classList.add('hidden');
        formContainer.className = "glass-panel p-6 md:p-10 opacity-20 pointer-events-none select-none filter blur-sm";
      } else {
        lockOverlay.classList.add('hidden');
        
        // Show rules if not accepted
        if (!rulesAccepted && rulesModal) {
           rulesModal.classList.remove('hidden');
           rulesModal.classList.add('flex');
           formContainer.className = "glass-panel p-6 md:p-10 opacity-20 pointer-events-none select-none filter blur-sm";
        } else {
           if(rulesModal) {
             rulesModal.classList.add('hidden');
             rulesModal.classList.remove('flex');
           }
           formContainer.className = "glass-panel p-6 md:p-10";
        }
      }
    }, 1000);

    const acceptBtn = document.getElementById('accept-rules-btn');
    if (acceptBtn) {
      acceptBtn.addEventListener('click', () => {
         sessionStorage.setItem('huevision_rules_accepted', 'true');
         // The interval will take care of hiding the modal immediately
         const rulesModal = document.getElementById('apply-rules-modal');
         if(rulesModal) {
            rulesModal.classList.add('hidden');
            rulesModal.classList.remove('flex');
         }
         const formContainer = document.getElementById('apply-form-container');
         if(formContainer) formContainer.className = "glass-panel p-6 md:p-10";
      });
    }

    const bypassForm = document.getElementById('bypass-form');
    if (bypassForm) {
      bypassForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const l = document.getElementById('bypass-login').value;
        const p = document.getElementById('bypass-password').value;
        
        if (l === 'AssQueenGrrah' && p === 'GowkGowkGowk123') {
           this.isAuthenticated = true;
           document.getElementById('bypass-error').classList.add('hidden');
        } else {
           document.getElementById('bypass-error').classList.remove('hidden');
        }
      });
    }

    const mainApplyForm = document.getElementById('main-apply-form');
    if (mainApplyForm) {
      mainApplyForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Generate Unique ID
        const hueId = 'HUE-' + Math.random().toString(36).substring(2, 8).toUpperCase();
        const idInput = document.getElementById('huevision-id-input');
        if (idInput) {
          idInput.value = hueId;
        }

        const button = mainApplyForm.querySelector('button[type="submit"]');
        const originalText = button.innerHTML;
        button.innerHTML = '<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i> Отправка...';
        button.disabled = true;
        lucide.createIcons();

        try {
          const formData = new FormData(mainApplyForm);
          const response = await fetch(mainApplyForm.action, {
            method: mainApplyForm.method,
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
          });

          if (response.ok) {
            mainApplyForm.reset();
            button.innerHTML = originalText;
            button.disabled = false;
            
            // Show Modal
            const modal = document.getElementById('success-modal');
            const idDisplay = document.getElementById('generated-id-display');
            if (modal && idDisplay) {
              idDisplay.innerText = hueId;
              modal.classList.remove('hidden');
              setTimeout(() => {
                modal.classList.remove('opacity-0');
              }, 10);
            }
          } else {
            const data = await response.json().catch(() => ({}));
            console.error('Formspree error:', data);
            
            button.innerHTML = '<i data-lucide="x" class="w-5 h-5 text-red-500"></i> Ошибка: ' + (data.error || 'Не удалось отправить');
            setTimeout(() => {
              button.innerHTML = originalText;
              button.disabled = false;
              lucide.createIcons();
            }, 3000);
          }
        } catch (error) {
          console.error('Submission error:', error);
          button.innerHTML = '<i data-lucide="x" class="w-5 h-5 text-red-500"></i> Сетевая ошибка';
          setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
            lucide.createIcons();
          }, 3000);
        }
        lucide.createIcons();
      });
    }
  }

  setApplyRole(role) {
    document.querySelectorAll('.apply-tab').forEach(b => {
      if(b.getAttribute('data-role') === role) {
        b.className = "apply-tab flex-1 py-3 text-sm font-display uppercase tracking-widest transition-all bg-red-500 text-white font-bold";
      } else {
        b.className = "apply-tab flex-1 py-3 text-sm font-display uppercase tracking-widest transition-all text-white/50 hover:text-white";
      }
    });

    document.getElementById('form-role-input').value = role.toUpperCase();
    
    // Toggle visibilities
    const countryField = document.getElementById('country-field');
    const trackNameField = document.getElementById('track-name-field');
    const audioField = document.getElementById('audio-field');
    const photoFieldCont = document.getElementById('photo-field-container');

    const countryInput = document.getElementById('country-input');
    const trackNameInput = document.getElementById('track-name-input');
    const audioInput = document.getElementById('audio-input');

    if(countryField) {
      countryField.style.display = role === 'participant' ? 'block' : 'none';
      if(countryInput) countryInput.required = role === 'participant';
    }
    if(trackNameField) {
      trackNameField.style.display = role === 'participant' ? 'block' : 'none';
      if(trackNameInput) trackNameInput.required = role === 'participant';
    }
    if(audioField) {
      audioField.style.display = role === 'participant' ? 'block' : 'none';
      if(audioInput) audioInput.required = role === 'participant';
    }
    
    if(photoFieldCont) {
      if (role === 'jury') {
        photoFieldCont.classList.add('md:col-span-2');
      } else {
        photoFieldCont.classList.remove('md:col-span-2');
      }
    }
  }


  // --------- AUDIO SYSTEM --------- //
  initGlobalAudio() {
    this.renderGlobalTrackInfo();
    
    // Global Controls
    const btnPlayPause = document.getElementById('global-btn-play-pause');
    const btnPrev = document.getElementById('global-btn-prev');
    const btnNext = document.getElementById('global-btn-next');
    const btnRepeat = document.getElementById('global-btn-repeat');
    const btnMute = document.getElementById('global-btn-mute');
    const progressContainer = document.getElementById('global-progress-container');

    if (btnPlayPause) btnPlayPause.addEventListener('click', () => this.toggleReplay());
    if (btnPrev) btnPrev.addEventListener('click', () => this.prevTrack());
    if (btnNext) btnNext.addEventListener('click', () => this.nextTrack());
    if (btnRepeat) btnRepeat.addEventListener('click', () => this.toggleRepeat());
    this.updateRepeatUI();
    if (btnMute) btnMute.addEventListener('click', () => {
       this.audio.muted = !this.audio.muted;
       document.getElementById('global-icon-vol-up').classList.toggle('hidden');
       document.getElementById('global-icon-vol-mute').classList.toggle('hidden');
       
       // Update local volume icons if on media page
       const localVolUp = document.getElementById('icon-vol-up');
       const localVolMute = document.getElementById('icon-vol-mute');
       if (localVolUp && localVolMute) {
          if (this.audio.muted) {
            localVolUp.classList.add('hidden');
            localVolMute.classList.remove('hidden');
          } else {
            localVolUp.classList.remove('hidden');
            localVolMute.classList.add('hidden');
          }
       }
    });

    if (progressContainer) {
      progressContainer.addEventListener('click', e => {
        if(!this.duration) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        this.audio.currentTime = pos * this.duration;
      });
    }

    // Always show player on init
    this.showGlobalPlayer();
  }

  showGlobalPlayer() {
    const p = document.getElementById('global-player');
    if (p) p.classList.remove('translate-y-full');
  }

  initAudio() {
    this.renderTrack();
    this.renderPlaylist();

    const localBtnPlayPause = document.getElementById('btn-play-pause');
    const localBtnPrev = document.getElementById('btn-prev');
    const localBtnNext = document.getElementById('btn-next');
    const localBtnRepeat = document.getElementById('btn-repeat');
    const localBtnMute = document.getElementById('btn-mute');
    
    if (localBtnPlayPause) localBtnPlayPause.addEventListener('click', () => this.toggleReplay());
    if (localBtnPrev) localBtnPrev.addEventListener('click', () => this.prevTrack());
    if (localBtnNext) localBtnNext.addEventListener('click', () => this.nextTrack());
    if (localBtnRepeat) localBtnRepeat.addEventListener('click', () => this.toggleRepeat());
    this.updateRepeatUI();
    
    if (localBtnMute) {
      if (this.audio.muted) {
        document.getElementById('icon-vol-up').classList.add('hidden');
        document.getElementById('icon-vol-mute').classList.remove('hidden');
      }
      localBtnMute.addEventListener('click', () => {
         this.audio.muted = !this.audio.muted;
         document.getElementById('icon-vol-up').classList.toggle('hidden');
         document.getElementById('icon-vol-mute').classList.toggle('hidden');
         
         // sync global
         const gVolUp = document.getElementById('global-icon-vol-up');
         const gVolMute = document.getElementById('global-icon-vol-mute');
         if (gVolUp && gVolMute) {
           gVolUp.classList.toggle('hidden');
           gVolMute.classList.toggle('hidden');
         }
      });
    }
    
    document.getElementById('toggle-playlist-btn').addEventListener('click', () => {
       this.showPlaylist = !this.showPlaylist;
       const cl = document.getElementById('playlist-container').classList;
       if (this.showPlaylist) {
          cl.remove('max-h-0', 'opacity-0');
          cl.add('max-h-[500px]', 'opacity-100');
          document.getElementById('toggle-playlist-btn').classList.add('text-red-500');
       } else {
          cl.add('max-h-0', 'opacity-0');
          cl.remove('max-h-[500px]', 'opacity-100');
          document.getElementById('toggle-playlist-btn').classList.remove('text-red-500');
       }
    });

    document.getElementById('progress-container').addEventListener('click', e => {
      if(!this.duration) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      this.audio.currentTime = pos * this.duration;
    });

    this.updateUIForPlayState();

    lucide.createIcons();
  }

  renderTrack() {
    const track = TRACKS[this.currentTrackIndex];
    if(this.audio.src !== track.audioSrc) {
       this.audio.src = track.audioSrc;
       if(this.isPlaying) {
         const playPromise = this.audio.play();
         if (playPromise !== undefined) {
           playPromise.catch(e => console.error(e));
         }
       }
    }

    const tEl = document.getElementById('audio-title');
    if(tEl) {
      tEl.innerText = track.title;
      document.getElementById('audio-artist').innerText = track.artist + (track.country ? ` — ${track.country}` : '');
      document.getElementById('audio-year').innerText = track.year + ' // ENTRY';
      document.getElementById('audio-cover-bg').style.backgroundImage = `url(${track.coverSrc})`;

      // update playlist styles
      this.renderPlaylist();
    }
    
    this.renderGlobalTrackInfo();
  }
  
  renderGlobalTrackInfo() {
    const track = TRACKS[this.currentTrackIndex];
    const gTitle = document.getElementById('global-audio-title');
    if (gTitle) {
      gTitle.innerText = track.title;
      document.getElementById('global-audio-artist').innerText = track.artist + (track.country ? ` — ${track.country}` : '');
      document.getElementById('global-audio-cover').style.backgroundImage = `url(${track.coverSrc})`;
    }
  }

  updateUIForPlayState() {
    this.showGlobalPlayer();

    // Local Media Page UI
    const playIcon = document.getElementById('icon-play');
    if(playIcon) {
       if(this.isPlaying) {
         playIcon.classList.add('hidden');
         document.getElementById('icon-pause').classList.remove('hidden');
         document.getElementById('audio-play-overlay').classList.add('hidden');
         document.getElementById('audio-eq-overlay').classList.remove('hidden');
         
         document.getElementById('audio-cover-bg').style.transform = 'scale(1.05)';
       } else {
         playIcon.classList.remove('hidden');
         document.getElementById('icon-pause').classList.add('hidden');
         document.getElementById('audio-play-overlay').classList.remove('hidden');
         document.getElementById('audio-eq-overlay').classList.add('hidden');
         document.getElementById('audio-cover-bg').style.transform = 'scale(1)';
       }
    }
    
    // Global UI
    const gPlayIcon = document.getElementById('global-icon-play');
    if (gPlayIcon) {
      if(this.isPlaying) {
         gPlayIcon.classList.add('hidden');
         document.getElementById('global-icon-pause').classList.remove('hidden');
         document.getElementById('global-audio-eq').classList.remove('hidden');
      } else {
         gPlayIcon.classList.remove('hidden');
         document.getElementById('global-icon-pause').classList.add('hidden');
         document.getElementById('global-audio-eq').classList.add('hidden');
      }
    }

    this.renderPlaylist(); // to show EQ on playlist
  }

  toggleRepeat() {
    this.repeatMode = (this.repeatMode + 1) % 3;
    this.updateRepeatUI();
  }

  updateRepeatUI() {
    const isRepeat = this.repeatMode > 0;
    const isRepeat1 = this.repeatMode === 2;

    const ids = ['btn-repeat', 'global-btn-repeat'];
    ids.forEach(id => {
      const btn = document.getElementById(id);
      if (btn) {
        if (isRepeat) {
          btn.classList.add('text-red-500', 'shadow-[0_0_10px_rgba(255,0,0,0.3)]');
        } else {
          btn.classList.remove('text-red-500', 'shadow-[0_0_10px_rgba(255,0,0,0.3)]');
        }
      }
    });

    const repIds = [
      { rep: 'icon-repeat', rep1: 'icon-repeat-1' },
      { rep: 'global-icon-repeat', rep1: 'global-icon-repeat-1' }
    ];

    repIds.forEach(({rep, rep1}) => {
      const elRep = document.getElementById(rep);
      const elRep1 = document.getElementById(rep1);
      if (elRep && elRep1) {
        if (isRepeat1) {
          elRep.classList.add('hidden');
          elRep1.classList.remove('hidden');
        } else {
          elRep.classList.remove('hidden');
          elRep1.classList.add('hidden');
        }
      }
    });
  }

  toggleReplay() {
    if (this.isPlaying) {
      this.audio.pause();
      this.isPlaying = false;
    } else {
      const playPromise = this.audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(e => console.error(e));
      }
      this.isPlaying = true;
    }
    this.updateUIForPlayState();
  }

  playTrack(index) {
    if (this.currentTrackIndex === index) {
      this.toggleReplay();
      return;
    }
    this.currentTrackIndex = index;
    this.isPlaying = true;
    this.renderTrack();
    this.updateUIForPlayState();
  }

  nextTrack() {
    if (this.currentTrackIndex < TRACKS.length - 1) {
      this.currentTrackIndex++;
    } else if (this.repeatMode === 1) {
      this.currentTrackIndex = 0;
    } else {
      this.isPlaying = false;
      this.audio.currentTime = 0;
      this.updateUIForPlayState();
      return;
    }
    this.renderTrack();
    this.updateUIForPlayState();
  }

  prevTrack() {
    if (this.audio.currentTime > 3) {
      this.audio.currentTime = 0;
    } else if (this.currentTrackIndex > 0) {
      this.currentTrackIndex--;
    } else {
      this.audio.currentTime = 0;
    }
    this.renderTrack();
    this.updateUIForPlayState();
  }

  updateAudioProgress() {
    const p = (this.audio.currentTime / this.audio.duration) * 100 || 0;
    const fCur = this.formatTime(this.audio.currentTime);
    const fTot = this.formatTime(this.duration);

    // Local Media Page UI
    const pb = document.getElementById('progress-bar');
    if(pb) {
       pb.style.width = p + '%';
       document.getElementById('audio-current-time').innerText = fCur;
       document.getElementById('audio-duration').innerText = fTot;
    }

    // Global UI
    const gPb = document.getElementById('global-progress-bar');
    if (gPb) {
      gPb.style.width = p + '%';
      document.getElementById('global-audio-current-time').innerText = fCur;
      document.getElementById('global-audio-duration').innerText = fTot;
    }
  }

  formatTime(time) {
    if (isNaN(time)) return '00:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  renderPlaylist() {
    const list = document.getElementById('playlist-items');
    const filters = document.getElementById('playlist-filters');
    if(!list) return;
    
    if (filters) {
      const years = Array.from(new Set(TRACKS.map(t => t.year))).sort((a,b) => Number(b) - Number(a));
      let filterHtml = `
        <button
          onclick="window.app.setAudioFilterYear('ALL')"
          class="px-4 py-1.5 text-xs font-mono transition-colors border border-white/10 ${this.audioFilterYear === 'ALL' ? 'bg-red-500 text-white shadow-[0_0_10px_rgba(255,0,0,0.4)]' : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'}"
        >ВСЕ</button>
      `;
      years.forEach(year => {
        const active = this.audioFilterYear === year;
        filterHtml += `
          <button
            onclick="window.app.setAudioFilterYear('${year}')"
            class="px-4 py-1.5 text-xs font-mono transition-colors border border-white/10 ${active ? 'bg-red-500 text-white shadow-[0_0_10px_rgba(255,0,0,0.4)]' : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'}"
          >${year}</button>
        `;
      });
      filters.innerHTML = filterHtml;
    }

    list.innerHTML = TRACKS.map((t, idx) => {
       if (this.audioFilterYear !== 'ALL' && t.year !== this.audioFilterYear) return '';
       const isCurrent = idx === this.currentTrackIndex;
       return `
       <button
         onclick="window.app.playTrack(${idx})"
         class="flex items-center gap-4 w-full p-3 rounded text-left transition-colors ${isCurrent ? "bg-red-500/10 border border-red-500/20 text-white" : "hover:bg-white/5 text-white/60 hover:text-white"}"
       >
         <div class="w-10 h-10 shrink-0 bg-white/5 relative overflow-hidden rounded">
           <div 
             class="absolute inset-0 bg-cover bg-center opacity-70"
             style="background-image: url(${t.coverSrc})"
           ></div>
           ${(isCurrent && this.isPlaying) ? `
             <div class="absolute inset-0 bg-black/40 flex items-center justify-center">
               <i data-lucide="play" class="text-red-500 w-4 h-4 fill-current"></i>
             </div>
           ` : ''}
         </div>
         <div class="flex-1 overflow-hidden">
           <div class="font-medium truncate ${isCurrent ? 'text-red-400 font-display' : ''}">
             ${t.title}
           </div>
           <div class="text-xs truncate font-mono mt-0.5 opacity-60">
             ${t.artist}${t.country ? ` — ${t.country}` : ''}
           </div>
         </div>
       </button>
       `;
    }).join('');
    
    if (list.innerHTML.trim() === '') {
      list.innerHTML = `<div class="text-center text-white/50 py-8 font-mono text-sm">НЕТ ТРЕКОВ ДЛЯ ВЫБРАННОГО ГОДА</div>`;
    }
    
    lucide.createIcons();
  }

  setAudioFilterYear(year) {
    this.audioFilterYear = year;
    this.renderPlaylist();
  }
}

// On load
document.addEventListener('DOMContentLoaded', () => {
   window.app = new VanillaApp();
});
