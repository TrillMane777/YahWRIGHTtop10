const demoPlaylist = [
{ title:"Billions And Eternities 2", artist:"Yah Wright", cover:"https://files.secure.website/wscfus/10123232/33210334/slide1.jpg", audio:"https://files.secure.website/wscfus/10123232/33209159/1-billions-eternities-2-ft-mr-7-yah-wright.mp3" },
{ title:"The Spiritual Boy", artist:"Yah Wright", cover:"https://files.secure.website/wscfus/10123232/33210325/slide2.jpg", audio:"https://files.secure.website/wscfus/10123232/33209160/2-song-2-the-spiritual-boy-3-song-album.mp3" },
{ title:"Supermane For President", artist:"Yah Wright", cover:"https://files.secure.website/wscfus/10123232/33210326/slide3.jpg", audio:"https://files.secure.website/wscfus/10123232/33209161/3-yah-wright-supermane-for-president.mp3" },
{ title:"I Like Yah Wright", artist:"Yah Wright", cover:"https://files.secure.website/wscfus/10123232/33210327/slide4.jpg", audio:"https://files.secure.website/wscfus/10123232/33209163/4-yah-wright-i-like-yah-wright.mp3" },
{ title:"Run Yo Plays Mane", artist:"Yah Wright", cover:"https://files.secure.website/wscfus/10123232/33210328/slide5.jpg", audio:"https://files.secure.website/wscfus/10123232/33209164/5-run-yo-plays-mane-yah-wright.mp3" },
{ title:"YAH The Way", artist:"Yah Wright", cover:"https://files.secure.website/wscfus/10123232/33210329/slide6.jpg", audio:"https://files.secure.website/wscfus/10123232/33209165/6-yah-the-way-yah-wright.mp3" },
{ title:"17", artist:"Yah Wright", cover:"https://files.secure.website/wscfus/10123232/33210330/slide7.jpg", audio:"https://files.secure.website/wscfus/10123232/33209166/7-17-yah-wright.mp3" },
{ title:"Leader Preacher Teacher", artist:"Yah Wright", cover:"https://files.secure.website/wscfus/10123232/33210331/slide8.jpg", audio:"https://files.secure.website/wscfus/10123232/33209168/8-leader-preacher-teacher-yah-wright.mp3" },
{ title:"New Laptops", artist:"Yah Wright", cover:"https://files.secure.website/wscfus/10123232/33210332/slide9.jpg", audio:"https://files.secure.website/wscfus/10123232/33209169/9-yah-wright-new-laptops.mp3" },
{ title:"Pineapple Cold Drank", artist:"Yah Wright", cover:"https://files.secure.website/wscfus/10123232/33210333/slide10.jpg", audio:"https://files.secure.website/wscfus/10123232/33209170/10-pineapple-cold-drank-the-outro-yah-wright.mp3" }
];

let currentIndex=0;
const audio=document.getElementById('audio');
const coverEl=document.getElementById('cover');
const titleEl=document.getElementById('title');
const artistEl=document.getElementById('artist');
const progressFill=document.getElementById('progressFill');
const currentTimeEl=document.getElementById('currentTime');
const durationEl=document.getElementById('duration');
const playlistEl=document.getElementById('playlist');

function fmt(t){const m=Math.floor(t/60);const s=Math.floor(t%60);return `${m}:${String(s).padStart(2,'0')}`;}

function loadTrack(i){
currentIndex=(i+demoPlaylist.length)%demoPlaylist.length;
const track=demoPlaylist[currentIndex];
audio.src=track.audio;
coverEl.style.backgroundImage=`url('${track.cover}')`;
titleEl.textContent=track.title;
artistEl.textContent=track.artist;
highlightPlaylist();
}

function play(){audio.play();}
function pause(){audio.pause();}
function next(){loadTrack(currentIndex+1);play();}
function prev(){loadTrack(currentIndex-1);play();}

function highlightPlaylist(){
document.querySelectorAll('[data-track]').forEach(li=>li.classList.remove('ring-2','ring-amber-300/80','bg-amber-50/10'));
const active=document.querySelector(`[data-track="${currentIndex}"]`);
if(active) active.classList.add('ring-2','ring-amber-300/80','bg-amber-50/10');
}

function renderPlaylist(){
playlistEl.innerHTML='';
demoPlaylist.forEach((t,idx)=>{
const li=document.createElement('li');
li.setAttribute('data-track',idx);
li.className='flex items-center gap-3 p-2 rounded-xl hover:bg-amber-50/10 cursor-pointer transition ring-0';
li.onclick=()=>{loadTrack(idx);play();};

const thumbWrap=document.createElement('div');
thumbWrap.className='gold-ring rounded-lg p-0.5';

const thumb=document.createElement('div');
thumb.className='w-10 h-10 rounded-md overflow-hidden bg-black/60';
thumb.style.backgroundImage=`url('${t.cover}')`;
thumb.style.backgroundSize='cover';
thumb.style.backgroundPosition='center';

thumbWrap.appendChild(thumb);

const meta=document.createElement('div');
meta.className='min-w-0';

const tt=document.createElement('div');
tt.className='text-amber-50 font-semibold truncate';
tt.textContent=t.title;

const ar=document.createElement('div');
ar.className='text-amber-200/80 text-sm truncate';
ar.textContent=t.artist;

meta.appendChild(tt);
meta.appendChild(ar);

li.appendChild(thumbWrap);
li.appendChild(meta);
playlistEl.appendChild(li);
});
}

audio.addEventListener('timeupdate',()=>{
currentTimeEl.textContent=fmt(audio.currentTime);
if(audio.duration) durationEl.textContent=fmt(audio.duration);
const pct=(audio.currentTime/audio.duration)*100;
progressFill.style.width=pct+'%';
});

audio.addEventListener('ended',next);

document.getElementById('playBtn').onclick=play;
document.getElementById('pauseBtn').onclick=pause;
document.getElementById('nextBtn').onclick=next;
document.getElementById('prevBtn').onclick=prev;

renderPlaylist();
loadTrack(0);
