// const loader = document.getElementById('custom-loader');
// const video = document.getElementById('loader-video');

// if (!localStorage.getItem('loaderShown')) {
//   loader.style.display = 'flex';
//   video.play();

//   video.addEventListener('ended', function () {
//     loader.classList.add('fade-out');
//     setTimeout(() => {
//       loader.style.display = 'none';
//     }, 1000); // matches fade duration
//     localStorage.setItem('loaderShown', 'true');
//   });
// }

// const parallaxImages = document.querySelectorAll('.parallax');
// window.addEventListener('scroll', () => {
//   parallaxImages.forEach((img) => {
//     const speed = 0.02; // more subtle, similar to Tympanus
//     const rect = img.getBoundingClientRect();
//     const offset = rect.top - window.innerHeight / 2;
//     img.style.transform = `translateY(${offset * speed}px)`;
//   });
// });

let lastScrollY = window.scrollY;
const headerWrapper = document.querySelector('.header-wrapper');
const header = document.querySelector('.header');
const bg = document.querySelector('.header-background-lock');

function syncHeaderBg() {
  if (header && bg) {
    bg.style.height = `${header.offsetHeight}px`;
  }
}

// Run once and on resize
syncHeaderBg();
window.addEventListener('resize', syncHeaderBg);

function updateHeader() {
  const currentScroll = window.scrollY;

  // Add class when at top
  if (currentScroll <= 0) {
    headerWrapper.classList.add('header--at-top');
    bg.classList.add('header--at-top');
  } else {
    headerWrapper.classList.remove('header--at-top');
    bg.classList.remove('header--at-top');
  }

  // Show/hide on scroll direction
  if (currentScroll > lastScrollY && currentScroll > 100) {
    headerWrapper.classList.add('header--hidden'); // Scroll down
    bg.classList.add('header--hidden'); // Scroll down
  } else {
    headerWrapper.classList.remove('header--hidden'); // Scroll up
    bg.classList.remove('header--hidden'); // Scroll up
  }

  lastScrollY = currentScroll;
}

window.addEventListener('scroll', updateHeader);

// Video Playbacks

document.querySelectorAll('video[data-playback-speed]').forEach((video) => {
  const rate = parseFloat(video.dataset.playbackSpeed);
  if (!isNaN(rate)) {
    video.playbackRate = rate;
  }
});

const menuDrawerConnect = document.querySelector('.menu-drawer-connect a');

if (menuDrawerConnect) {
  menuDrawerConnect.addEventListener('click', (ev) => {
    document.querySelector('.header__icon--menu')?.click();
  });
}

// Image Swap

const swapContainers = document.querySelectorAll('.image-side.swap');

swapContainers.forEach((container) => {
  const buttons = container.querySelectorAll('.swap-button');
  const images = container.querySelectorAll('img');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const color = btn.getAttribute('data-color');

      // Update buttons
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      // Update images
      images.forEach((img) => {
        img.classList.toggle('active', img.getAttribute('data-color') === color);
      });
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  if (window.videojs) {
    const videoHero = document.querySelector('#hero-loop');
    if (videoHero) {
      const player = videojs('hero-loop', {
        preload: 'auto',
      });
      player.ready(function () {
        videojs.log('Your player is ready!');

        player.play().catch((e) => console.warn('Autoplay blocked', e));
      });
    }
  }
});
