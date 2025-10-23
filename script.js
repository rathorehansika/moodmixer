// ---- Mood Data with Activities ----
const moodButtons = document.querySelectorAll('.mood-buttons button');
const moodBoard = document.getElementById('moodBoard');
const downloadBtn = document.getElementById('downloadBtn');

const moodData = {
  happy: {
    colors: ['#FFEB3B','#FFC107','#FF9800'],
    emojis: ['😄','🌞','🍦','🌈','🎉'],
    quotes: ["Smile and the world smiles with you!","Happiness is contagious.","Keep shining bright!"],
    activities: [
      "Dance to your favorite song.",
      "Call or meet a friend to share a laugh.",
      "Treat yourself with a small snack or dessert.",
      "Go outside and enjoy sunlight or nature.",
      "Create a gratitude list."
    ]
  },
  chill: {
    colors: ['#00BCD4','#03A9F4','#2196F3'],
    emojis: ['😎','🛋️','☕','🎶','🌴'],
    quotes: ["Relax and breathe.","Take it easy.","Peace comes from within."],
    activities: [
      "Meditate for 5–10 minutes.",
      "Sip your favorite tea or coffee slowly.",
      "Watch a relaxing video or show.",
      "Draw, doodle, or color something simple.",
      "Take a calm walk outdoors or at home."
    ]
  },
  energetic: {
    colors: ['#FF5722','#FF4081','#E91E63'],
    emojis: ['⚡','🏃','💥','🔥','🏋️‍♂️'],
    quotes: ["Go get it!","Energy flows where attention goes.","Push your limits!"],
    activities: [
      "Go for a run or home workout.",
      "Listen to upbeat music and dance around.",
      "Try a fun DIY project or experiment.",
      "Play an active game or sport.",
      "Challenge yourself with a quick puzzle."
    ]
  },
  sad: {
    colors: ['#90A4AE','#607D8B','#455A64'],
    emojis: ['😢','🌧️','☁️','💧','🖤'],
    quotes: ["It's okay to feel sad.","This too shall pass.","Healing takes time."],
    activities: [
      "Write in a journal or express your feelings.",
      "Watch a comforting or uplifting video.",
      "Hug a pet or talk to a loved one.",
      "Take a warm bath or shower.",
      "Do a small act of kindness for someone."
    ]
  },
  creative: {
    colors: ['#8E24AA','#FF4081','#FFEB3B'],
    emojis: ['🎨','✏️','📸','🎭','💡'],
    quotes: ["Creativity takes courage.","Think outside the box.","Make something amazing today!"],
    activities: [
      "Sketch, paint, or craft something new.",
      "Write a short story, poem, or song.",
      "Try mixing colors, materials, or textures.",
      "Take photos of interesting things around you.",
      "Brainstorm ideas for a personal project."
    ]
  }
};

// ---- Generate Mood Board ----
moodButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const mood = btn.dataset.mood;
    createMoodBoard(mood);
  });
});

function createMoodBoard(mood){
  moodBoard.innerHTML = '';
  const data = moodData[mood];

  // Change background gradient
  const gradient = `linear-gradient(135deg, ${data.colors.join(',')})`;
  moodBoard.style.background = gradient;

  for(let i=0; i<6; i++){
    const tile = document.createElement('div');
    tile.classList.add('mood-tile');
    tile.draggable = true;

    // Random selection
    const emoji = data.emojis[Math.floor(Math.random()*data.emojis.length)];
    const quote = data.quotes[Math.floor(Math.random()*data.quotes.length)];
    const activity = data.activities[Math.floor(Math.random()*data.activities.length)];

    tile.innerHTML = `
      <div class="emoji" style="font-size:2rem;">${emoji}</div>
      <div class="quote">"${quote}"</div>
      <div class="activity">💡 ${activity}</div>
    `;

    // Drag and drop functionality
    tile.addEventListener('dragstart', dragStart);
    tile.addEventListener('dragover', dragOver);
    tile.addEventListener('drop', dropTile);

    moodBoard.appendChild(tile);
  }
}

// ---- Drag & Drop ----
let draggedTile = null;

function dragStart(e){
  draggedTile = e.target;
}

function dragOver(e){
  e.preventDefault();
}

function dropTile(e){
  e.preventDefault();
  if(e.target.classList.contains('mood-tile') && e.target!==draggedTile){
    moodBoard.insertBefore(draggedTile, e.target);
  }
}

// ---- Download ----
downloadBtn.addEventListener('click', () => {
  html2canvas(moodBoard).then(canvas=>{
    const link = document.createElement('a');
    link.download = 'mood-board.png';
    link.href = canvas.toDataURL();
    link.click();
  });
});

// ---- Particles ----
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const colors = ['#ff00ff','#00ffff','#ff6a00','#ee0979'];

class Particle{
  constructor(){
    this.x = Math.random()*canvas.width;
    this.y = Math.random()*canvas.height;
    this.size = Math.random()*5+1;
    this.speedX = Math.random()*2-1;
    this.speedY = Math.random()*2-1;
    this.color = colors[Math.floor(Math.random()*colors.length)];
  }
  update(){
    this.x += this.speedX;
    this.y += this.speedY;

    if(this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if(this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  draw(){
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
    ctx.fill();
  }
}

function initParticles(){
  particlesArray = [];
  for(let i=0;i<100;i++){
    particlesArray.push(new Particle());
  }
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particlesArray.forEach(p=>{
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}

initParticles();
animate();

// Adjust canvas on resize
window.addEventListener('resize', ()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});
