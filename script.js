// Title generator
const GAMES = {
  'rocket-league': [
    'I Scored The Most Ridiculous Ceiling Shot In Rocket League',
    'Ranked Clutch: 1v3 Overtime Win (Rocket League)',
    'My New Loadout Broke Rocket League Physics',
  ],
  'valorant': [
    'Insane 1v5 Clutch in Valorant (Unbelievable)',
    'Ranked to Radiant: How I Did It - Valorant Tips',
    'The Most Satisfying Operator Flicks Ever - Valorant Montage',
  ],
  'yomi-hustle': [
    '5 Reads That Always Work In Yomi Hustle',
    'How To Hustle Your Opponent: Yomi Hustle Mindgame Guide',
    'Comeback Win With 1 HP Left — Yomi Hustle Highlights',
    'The Layered Read That Changed My Matchup (Yomi Hustle)',
    'Top 3 Gambits You Need To Know In Yomi Hustle',
    'Baiting 101: Force The Wrong Response (Yomi Hustle)',
    'Reading Patterns: Predicting Your Opponent’s Move',
    'How To Convert A Guess Into A Guaranteed Win',
    'Advanced Parry Timing For Consistent Hustles',
    'The Bluff That Won Me The Tournament (Yomi Hustle)',
    'I Won With Only Mixups — Yomi Hustle Breakdown',
    'The Psychology Of Layered Reads In Turn-Based Fights',
    'How To Make Risky Gambits Pay Off (Yomi Hustle)',
    'Mastering Tempo Control: Stop Reacting, Start Forcing',
    'Counter-Hustles: Turning Your Opponent’s Read Against Them',
    'One Move, Two Layers: Multilevel Mindgames Explained',
    'Why Forcing Mistakes Beats Pure Execution (Yomi Hustle)',
    'The Perfect Gamble: When To Go All In',
    'Reading The Read: Meta-Level Play For Beginners',
    'How To Practice Reads Without A Partner',
    'Matchup Secrets: What Top Players Won’t Tell You',
    'From Tilt To Triumph: Mental Resets Between Rounds',
  ],
  'deltarune': [
    'I Solved The Secret Door In Deltarune (You Won’t Believe It)',
    'All Secrets Found: Deltarune Deep Dive',
    'I Played Deltarune Without Talking Once',
  ],
  'undertale': [
    'Pacifist Run Gone Wrong - Undertale',
    'I Tried Undertale Genocide in 10 Minutes',
    'How To Make Friends With The Hardest Boss - Undertale Tips',
  ],
  'hypixel': [
    'Hypixel INSANITY: 100 Wins In A Row?',
    'Hidden Hypixel Update You Missed',
    'I Found The Rarest Item On Hypixel',
  ],
  'skyblock': [
    'I Became The Richest Player On Skyblock In 24 Hours',
    'Insane Skyblock Money-Making Strategy (No AFK)',
    'Skyblock: The Farm That Made Me Millions',
  ],
  'skywars': [
    'Clutch SkyWars 1v4 Win (Insane)',
    'SkyWars: How I Turned A Bridge Into A Trap',
    'Best SkyWars Loadouts For Fast Wins',
  ],
  'bedwars': [
    'BedWars Final Killcam - Last Second Defuse',
    'Solo Queue To Victory - BedWars Highlights',
    'The Strategy That Broke BedWars Meta',
  ]
};

let currentGame = 'rocket-league';
const YOMI_TUTORIALS = [
  'Intro To Reads: Knowing When To Predict',
  'Baiting Basics: Make Them Walk Into It',
  'Layered Mindgames: How To Think Multiple Steps Ahead',
  'Parry Timing Exercises For Consistency',
  'Meter Management: When To Spend The Hustle',
  'How To Create A Mixup That Actually Works',
  'Edgecases: Beating Common Anti-Hustle Patterns',
  'The Art Of Bluffing In Turn-Based Fights',
  'Punish Windows: Turning Mistakes Into Wins',
  'Tempo Control: Dictate The Round Pace',
  'Reading Habits: Spotting Tells And Patterns',
  'The 2-Move Gambit: Simplicity Wins',
  'Comeback Mechanics: Small Mistakes, Big Gains',
  'Practice Drills For Reaction And Prediction',
  'How To Study Opponents Efficiently',
  'Risk Vs Reward: When To Be Greedy',
  'How To Use Misdirection Effectively',
  'Mental Reset Techniques Between Rounds',
  'Mirror Match Strategies: Outthink Your Clone',
  'Tournament Prep: Simulating Real Pressure'
];

function $(s){return document.querySelector(s)}

function pickRandom(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

function setActiveGame(game){
  currentGame = game;
  document.querySelectorAll('.game-btn').forEach(b=> b.classList.toggle('active', b.dataset.game===game));
}

function generateTitle(){
  const list = GAMES[currentGame] || ['No templates for this game yet.'];
  const title = pickRandom(list);
  $('#titleOutput').innerHTML = title;
  $('#titleOutput').focus();
}

function copyTitle(){
  const text = $('#titleOutput').innerText.trim();
  if(!text) return alert('No title to copy — generate one first.');
  navigator.clipboard?.writeText(text).then(()=>{
    const old = document.getElementById('copy');
    // small feedback
    const btn = document.getElementById('copy');
    const prev = btn.innerText;
    btn.innerText = 'Copied!';
    setTimeout(()=> btn.innerText = prev, 1200);
  }).catch(()=>alert('Copy failed — select the text and press Cmd/Ctrl+C'));
}

// Wire up UI
document.addEventListener('DOMContentLoaded', ()=>{
  // game buttons
  document.querySelectorAll('.game-btn').forEach(btn=>{
    btn.addEventListener('click', ()=> setActiveGame(btn.dataset.game));
  });
  
  // Tutorials toggle for Yomi Hustle
  const tutToggle = document.getElementById('yomi-tutorial-toggle');
  const tutPanel = document.createElement('div');
  tutPanel.className = 'tutorials-panel';
  // populate tutorials
  YOMI_TUTORIALS.forEach(t => {
    const el = document.createElement('div');
    el.className = 'tutorial-item';
    el.tabIndex = 0;
    el.innerText = t;
    el.addEventListener('click', ()=>{ $('#titleOutput').innerText = t; });
    el.addEventListener('keydown', (e)=>{ if(e.key==='Enter') el.click(); });
    tutPanel.appendChild(el);
  });
  // insert after game buttons
  const gameButtonsContainer = document.querySelector('.game-buttons');
  gameButtonsContainer.parentNode.insertBefore(tutPanel, gameButtonsContainer.nextSibling);

  tutToggle.addEventListener('click', ()=>{
    // Make the Tutorials button generate a random tutorial idea and select Yomi Hustle
    if(currentGame !== 'yomi-hustle'){
      setActiveGame('yomi-hustle');
    }
    const rnd = pickRandom(YOMI_TUTORIALS);
    $('#titleOutput').innerText = rnd;
    const descEl = document.getElementById('titleDesc');
    if(descEl) descEl.innerText = 'Random tutorial idea — click a tutorial below for more.';
  });
  // default active
  setActiveGame(currentGame);

  $('#generate').addEventListener('click', generateTitle);
  $('#copy').addEventListener('click', copyTitle);

  // keyboard: G to generate, C to copy
  document.addEventListener('keydown', (e)=>{
    if(e.key.toLowerCase()==='g') generateTitle();
    if(e.key.toLowerCase()==='c') copyTitle();
  });
});
