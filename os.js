const apps={
 explorer:{title:"File Explorer",w:680,h:450},
 notepad:{title:"Notepad",w:620,h:430},
 calculator:{title:"Calculator",w:380,h:430},
 settings:{title:"Settings",w:600,h:460},
 about:{title:"About NormalOS",w:420,h:300}
};
let z=30, count=0;

function toggleStart(){const m=document.getElementById("start-menu");m.style.display=m.style.display==="block"?"none":"block"}
document.addEventListener("click",e=>{
 const m=document.getElementById("start-menu");
 if(!m.contains(e.target)&&e.target.id!=="start-btn")m.style.display="none";
});

function openApp(id){
 document.getElementById("start-menu").style.display="none";
 let old=document.querySelector('.window[data-app="'+id+'"]');
 if(old){focusWin(old);return}
 const a=apps[id], win=document.createElement("div");
 win.className="window";win.dataset.app=id;
 win.style.width=a.w+"px";win.style.height=a.h+"px";
 win.style.left=(120+(count++%5)*28)+"px";win.style.top=(55+(count%5)*24)+"px";
 win.innerHTML='<div class="titlebar"><span>'+a.title+'</span><button class="close" onclick="closeWin(this)">×</button></div><div class="content">'+content(id)+'</div>';
 document.getElementById("windows").appendChild(win);
 makeDraggable(win);focusWin(win);addTask(id,win);
}
function content(id){
 if(id==="explorer")return '<h2>This PC</h2><div class="folder"><b>📁</b>Desktop</div><div class="folder"><b>📁</b>Documents</div><div class="folder"><b>📥</b>Downloads</div><div class="folder"><b>🖼️</b>Pictures</div><div class="folder"><b>🎵</b>Music</div><div class="folder"><b>🎬</b>Videos</div>';
 if(id==="notepad")return '<textarea placeholder="Start typing..."></textarea>';
 if(id==="calculator")return '<input class="calc-display" id="calc-display" readonly><div class="calc-grid">'+['C','÷','×','−','7','8','9','+','4','5','6','=','1','2','3','0'].map(x=>'<button onclick="calc('+JSON.stringify(x)+')">'+x+'</button>').join('')+'</div>';
 if(id==="settings")return '<h2>Settings</h2>'+['🖥️ System','📱 Bluetooth & devices','🌐 Network','🎨 Personalization','📦 Apps','👤 Accounts','🔒 Privacy','🔄 Updates'].map(x=>'<div class="setting">'+x+'</div>').join('');
 return '<h2>NormalOS™</h2><p>Version 1.0</p><p>An aggressively normal web operating system.</p><p>No gimmicks. No unnecessary assistants. It just works.</p>';
}
function calc(x){let d=document.getElementById("calc-display");if(!d)return;if(x==="C")d.value="";else if(x==="="){try{d.value=Function("return "+d.value.replaceAll("÷","/").replaceAll("×","*").replaceAll("−","-"))()}catch{d.value="Error"}}else d.value+=x}
function closeWin(btn){const w=btn.closest(".window");const id=w.dataset.app;w.remove();document.getElementById("task-"+id)?.remove()}
function focusWin(w){w.style.zIndex=++z}
function addTask(id,w){let b=document.createElement("button");b.className="task";b.id="task-"+id;b.textContent=apps[id].title;b.onclick=()=>{if(w.isConnected){w.style.display=w.style.display==="none"?"block":"none";focusWin(w)}};document.getElementById("tasks").appendChild(b)}
function makeDraggable(win){
 const bar=win.querySelector(".titlebar");let drag=false,ox=0,oy=0;
 bar.addEventListener("mousedown",e=>{if(e.target.className==="close")return;drag=true;ox=e.clientX-win.offsetLeft;oy=e.clientY-win.offsetTop;focusWin(win)});
 document.addEventListener("mousemove",e=>{if(!drag)return;win.style.left=Math.max(0,e.clientX-ox)+"px";win.style.top=Math.max(0,e.clientY-oy)+"px"});
 document.addEventListener("mouseup",()=>drag=false);
 win.addEventListener("mousedown",()=>focusWin(win));
}
function searchApps(q){const r=document.getElementById("search-results");r.innerHTML="";if(!q)return;Object.entries(apps).filter(([id,a])=>a.title.toLowerCase().includes(q.toLowerCase())).forEach(([id,a])=>{let d=document.createElement("div");d.className="result";d.textContent=a.title;d.onclick=()=>openApp(id);r.appendChild(d)})}
function shutdown(){location.href="shutdown.html"}
function updateClock(){document.getElementById("clock").textContent=new Date().toLocaleTimeString([], {hour:"numeric",minute:"2-digit"})}
setInterval(updateClock,1000);updateClock();
