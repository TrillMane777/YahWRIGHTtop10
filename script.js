
const demoPlaylist = [
  { title:"Billions And Eternities 2", artist:"Yah Wright",
    cover:"https://files.secure.website/wscfus/10123232/33210334/slide1.jpg",
    audio:"https://files.secure.website/wscfus/10123232/33209159/1-billions-eternities-2-ft-mr-7-yah-wright.mp3" }
];

let currentIndex=0;
const audio=document.getElementById('audio');
const coverEl=document.getElementById('cover');
const titleEl=document.getElementById('title');
const artistEl=document.getElementById('artist');

function loadTrack(i){
  currentIndex=i;
  const track=demoPlaylist[currentIndex];
  audio.src=track.audio;
  coverEl.style.backgroundImage=`url('${track.cover}')`;
  titleEl.textContent=track.title;
  artistEl.textContent=track.artist;
}

document.getElementById('playBtn').onclick=()=>audio.play();
document.getElementById('pauseBtn').onclick=()=>audio.pause();
document.getElementById('nextBtn').onclick=()=>loadTrack(0);
document.getElementById('prevBtn').onclick=()=>loadTrack(0);

loadTrack(0);
