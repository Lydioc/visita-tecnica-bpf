/* ============ Roteiro ============ */
// kinds: q = pergunta (texto) · v = verificar (status) · a = autorização (status) · r = registrar (foto)
// Para editar o roteiro, altere apenas o array SECTIONS (veja o README).
const SECTIONS = [
 {id:'visita', title:'Dados da visita', intro:'Preencha no início. Entra no cabeçalho do relatório.', fields:true},
 {id:'geral', title:'Visão geral', sub:'Visão geral da operação', groups:[
   {t:'Jornada do alimento', items:[
     ['q','Quais áreas representam melhor a jornada real do alimento na fábrica?'],
     ['q','Quais etapas obrigatoriamente precisam aparecer?'],
     ['q','Existem áreas críticas que não podem ser filmadas?']]},
   {t:'Circulação', items:[
     ['q','Qual é o fluxo real de entrada dos colaboradores?'],
     ['q','Como ocorre o deslocamento entre setores?'],
     ['q','Há horários mais adequados para gravação? Como será no dia?']]},
   {t:'O que registrar', items:[
     ['r','Entrada da fábrica'],['r','Fluxos de circulação'],['r','Corredores produtivos'],
     ['r','Áreas produtivas'],['r','Áreas de apoio'],['r','Sinalizações de segurança e qualidade']]}]},
 {id:'m1', title:'Módulo 1', sub:'Um alimento aparentemente perfeito',
  ref:'<b>Referência da SE:</b> Luiza apresenta um alimento aparentemente adequado e depois demonstra um pequeno desvio para evidenciar o impacto ao consumidor.',
  groups:[
   {t:'Verificar', items:[
     ['v','Existe local adequado para essa demonstração?'],
     ['v','Qual produto da fábrica pode ser utilizado?'],
     ['v','É permitido utilizar produto real?']]},
   {t:'Registrar', items:[['r','Bancadas'],['r','Áreas de qualidade'],['r','Espaços limpos visualmente']]}]},
 {id:'m2', title:'Módulo 2', sub:'Começando na operação',
  ref:'<b>Referência:</b> Bernardo prepara uniforme e itens obrigatórios antes da entrada.',
  groups:[
   {t:'Perguntas', items:[
     ['q','Onde os colaboradores vestem os EPIs?'],
     ['q','Existe armário ou vestiário filmável?'],
     ['q','Quais EPIs são obrigatórios?']]},
   {t:'Atenção', note:'A Brendha comentou que novos colaboradores (caso do Bernardo) utilizam touca amarela.', items:[
     ['v','Confirmar visualmente o padrão da touca amarela e demais diferenciações de uniforme']]},
   {t:'Barreira sanitária', note:'Referência central do treinamento. Gap da cliente: aplicação inconsistente das barreiras sanitárias.', items:[
     ['v','Sequência real das etapas'],['v','Local exato da lavagem das mãos'],
     ['v','Equipamentos utilizados'],['v','Tempo necessário para execução'],
     ['r','Pias'],['r','Dispensadores'],['r','Lavatórios'],['r','Sinalizações'],['r','Controle de acesso']]},
   {t:'Falha de uma barreira', note:'Referência: circulação na fábrica e identificação de possíveis contaminações cruzadas.', items:[
     ['v','Áreas com clara separação física'],['v','Mudanças de ambiente'],
     ['v','Barreiras visuais'],['v','Zonas com diferentes classificações'],
     ['r','Portas'],['r','Divisórias'],['r','Demarcações'],['r','Áreas segregadas']]}]},
 {id:'m3', title:'Módulo 3', sub:'Código de cores, químicos, pragas, vidros', groups:[
   {t:'Código de cores', note:'Referência: sistema visual de prevenção à contaminação cruzada.', items:[
     ['r','Utensílios'],['r','Painéis'],['r','Sinalizações'],['r','Áreas distintas']]},
   {t:'Produtos químicos', note:'Referência: armazenamento e controles.', items:[
     ['v','Locais permitidos para filmagem'],['v','Necessidade de ocultar informações sensíveis'],
     ['v','Restrições relacionadas aos produtos'],
     ['q','O que pode ou não aparecer?'],['q','Há embalagens ou informações confidenciais?']]},
   {t:'Controle de pragas', note:'Referência: armadilhas e monitoramento.', items:[
     ['q','As armadilhas podem ser filmadas?'],['q','Há sinalizações específicas?']]},
   {t:'Política de vidros e acrílicos', items:[
     ['v','Pontos com monitoramento real'],['v','Identificações presentes na fábrica'],
     ['v','Situações que podem servir de referência visual']]}]},
 {id:'riscos', title:'Riscos', sub:'Levantamento de riscos de gravação', groups:[
   {t:'Técnicos', items:[
     ['v','Ruído excessivo?'],['v','Necessidade de microfone especial?'],['v','Iluminação insuficiente?'],
     ['v','Vibração de máquinas?'],['v','Locais apertados para GoPro?']]},
   {t:'Operacionais', items:[
     ['v','Produção pode parar?'],['v','Há horários de pico?'],['v','Existe risco de interromper processos?']]},
   {t:'Segurança', items:[
     ['q','Quais EPIs obrigatórios para a equipe?'],['q','Existem treinamentos prévios exigidos?'],['q','Há áreas de acesso restrito?']]}]},
 {id:'apoio', title:'Captações de apoio', sub:'Solicitar autorização para registrar', groups:[
   {t:'Pessoas', items:[
     ['a','Colaboradores circulando'],['a','Entrada na operação'],['a','Higienização'],['a','Uso de EPIs']]},
   {t:'Ambientes', items:[
     ['a','Linhas de produção'],['a','Equipamentos'],['a','Esteiras'],['a','Produtos'],
     ['a','Áreas segregadas'],['a','Barreiras sanitárias']]},
   {t:'Detalhes', items:[
     ['a','Toucas'],['a','Luvas'],['a','Sinalizações'],['a','Placas'],['a','Código de cores'],
     ['a','Registros e checklists'],['a','Identificações visuais da marca']]}]}
];
const VISIT_FIELDS = [
  ['data','Data da visita','date',''],['hora','Horário','time',''],
  ['unidade','Unidade / cidade','text','w'],
  ['equipe','Equipe de gravação presente','text','w'],
  ['contato','Contato na fábrica (nome / função)','text','w']
];
const STATUS = {
  v:[['ok','Ok'],['warn','Atenção'],['bad','Não']],
  a:[['ok','Autorizado'],['warn','Com restrição'],['bad','Negado']]
};
// index items
const ITEMS=[]; SECTIONS.forEach(s=>(s.groups||[]).forEach((g,gi)=>g.items.forEach((it,ii)=>{
  const id=`${s.id}_${gi}_${ii}`; const o={id,sec:s.id,kind:it[0],label:it[1],group:g.t}; it.obj=o; ITEMS.push(o);
})));

/* ============ Estado + IndexedDB ============ */
let state={visit:{},items:{},tab:0};
const DBN='visita-bpf', DBS='kv';
let dbp=null;
function idb(){return dbp||(dbp=new Promise((res,rej)=>{try{const r=indexedDB.open(DBN,1);
  r.onupgradeneeded=()=>r.result.createObjectStore(DBS);
  r.onsuccess=()=>{const db=r.result;db.onversionchange=()=>{db.close();dbp=null};res(db)};
  r.onerror=()=>{dbp=null;rej(r.error)};}catch(e){dbp=null;rej(e)}}))}
// aceita só dados bem formados (backup importado ou estado salvo); mantém itens que não existem mais no roteiro
const okPhoto=p=>typeof p==='string'&&p.startsWith('data:image/')&&!/["'<>\s]/.test(p);
function normalize(raw){
  if(!raw||typeof raw!=='object'||!raw.items||typeof raw.items!=='object'||Array.isArray(raw.items))return null;
  const out={visit:{},items:{},tab:0,savedAt:+raw.savedAt||0};
  if(raw.visit&&typeof raw.visit==='object')Object.keys(raw.visit).forEach(k=>{if(typeof raw.visit[k]==='string')out.visit[k]=raw.visit[k]});
  Object.keys(raw.items).forEach(id=>{const s=raw.items[id];if(!s||typeof s!=='object')return;
    out.items[id]={status:['ok','warn','bad'].includes(s.status)?s.status:'',text:typeof s.text==='string'?s.text:'',
      photos:Array.isArray(s.photos)?s.photos.filter(okPhoto):[]}});
  out.tab=Math.min(Math.max(0,parseInt(raw.tab)||0),SECTIONS.length-1);
  return out;
}
async function load(){try{const db=await idb();return await new Promise((res,rej)=>{const t=db.transaction(DBS).objectStore(DBS).get('state');
  t.onsuccess=()=>res(t.result);t.onerror=()=>rej(t.error)})}catch(e){try{return JSON.parse(localStorage.getItem('state'))}catch(_){return null}}}
// salva a cada alteração (debounce 250 ms) e também ao esconder/fechar a página
let saveT=null, dirty=false;
function save(){dirty=true;clearTimeout(saveT);saveT=setTimeout(commit,250)}
async function commit(){
  clearTimeout(saveT);saveT=null;if(!dirty)return;dirty=false;
  state.savedAt=Date.now();
  try{const db=await idb();
    await new Promise((res,rej)=>{const tx=db.transaction(DBS,'readwrite');tx.objectStore(DBS).put(state,'state');
      tx.oncomplete=res;tx.onerror=tx.onabort=()=>rej(tx.error)});
    showSaved(state.savedAt)}
  catch(e){try{localStorage.setItem('state',JSON.stringify(state));showSaved(state.savedAt)}
    catch(_){dirty=true;showSaved(0);if(!commit.warned){commit.warned=true;toast('Não foi possível salvar: armazenamento cheio? Faça um backup.')}}}
}
function showSaved(ts){const el=$('#savedtxt');
  if(!ts){el.textContent='⚠ Não salvo';el.classList.add('err');return}
  el.classList.remove('err');el.textContent='Salvo '+new Date(ts).toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})}
addEventListener('pagehide',()=>{if(dirty)commit()});
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden'&&dirty)commit()});
function item(id){return state.items[id]||(state.items[id]={status:'',text:'',photos:[]})}

/* ============ Render ============ */
const $=s=>document.querySelector(s);
function esc(s){return String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}
function build(){
  const tabs=$('#tabs'), form=$('#form');
  tabs.innerHTML=SECTIONS.map((s,i)=>`<button data-i="${i}">${s.title}</button>`).join('');
  form.innerHTML=SECTIONS.map((s,i)=>{
    let body='';
    if(s.fields){
      body=`<div class="vis">${VISIT_FIELDS.map(f=>`<label class="${f[3]}">${f[1]}<input type="${f[2]}" data-vf="${f[0]}" value="${esc(state.visit[f[0]])}"></label>`).join('')}</div>
      <div class="ref" style="margin-top:14px"><b>Objetivo da visita:</b> compreender o ambiente operacional da fábrica para identificar locais de gravação, validar fluxos da narrativa, levantar riscos e restrições, registrar referências visuais, confirmar EPIs e comportamento, e antecipar adaptações de roteiro.</div>`;
    } else {
      body=(s.ref?`<div class="ref">${s.ref}</div>`:'')+s.groups.map(g=>`<div class="grp"><h3>${g.t}${g.items[0].obj.kind==='r'?'<small>fotos</small>':g.items[0].obj.kind==='a'?'<small>autorização</small>':''}</h3>
        ${g.note?`<div class="ref">${g.note}</div>`:''}${g.items.map(it=>itemHTML(it.obj)).join('')}</div>`).join('');
    }
    return `<section class="sec" data-i="${i}"><header><h2>${s.sub||s.title}</h2>${s.intro?`<p>${s.intro}</p>`:''}</header>${body}</section>`;
  }).join('');
  tabs.onclick=e=>{const b=e.target.closest('button');if(b)showTab(+b.dataset.i)};
  showTab(state.tab||0,true);
  refreshProgress();
}
function itemHTML(o){
  const d=item(o.id);
  const seg=STATUS[o.kind]?`<div class="seg">${STATUS[o.kind].map(([k,l])=>`<button class="${k}${d.status===k?' on':''}" data-st="${k}" data-id="${o.id}">${l}</button>`).join('')}</div>`:'';
  const ph=o.kind==='r'?'Registro / observação':o.kind==='q'?'Resposta':'Observações';
  return `<div class="item${isDone(o,d)?' done':''}" id="it_${o.id}">
    <p class="lab">${esc(o.label)}</p>${seg}
    <div class="field"><textarea data-id="${o.id}" placeholder="${ph}">${esc(d.text)}</textarea>
      <button class="mic" data-mic="${o.id}" aria-label="Ditar por voz" title="Ditar por voz"${SR?'':' hidden'}>${MIC}</button></div>
    <div class="partial" data-partial="${o.id}"></div>
    <div class="photos" data-ph="${o.id}">${photosHTML(o.id,d)}</div>
  </div>`;
}
const MIC=`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>`;
function photosHTML(id,d){return d.photos.map((p,i)=>`<div class="ph"><button class="thumb" data-zoom="${id}" data-idx="${i}" aria-label="Ver foto ${i+1} em tela cheia"><img src="${p}" alt=""></button><button class="del" data-del="${id}" data-idx="${i}" aria-label="Remover foto">×</button></div>`).join('')
  +`<label>${d.photos.length?'+ foto':'📷<br>foto'}<input type="file" accept="image/*" capture="environment" multiple data-file="${id}"></label>`}
function isDone(o,d){return !!(d.status||d.text.trim()||d.photos.length)}
function showTab(i,silent){
  state.tab=i;if(!silent)save();
  document.querySelectorAll('.sec').forEach(s=>s.classList.toggle('on',+s.dataset.i===i));
  document.querySelectorAll('#tabs button').forEach(b=>{b.classList.toggle('on',+b.dataset.i===i);if(+b.dataset.i===i)b.scrollIntoView({inline:'center',block:'nearest',behavior:'smooth'})});
  $('#btnPrev').disabled=i===0;$('#btnNext').disabled=i===SECTIONS.length-1;
  window.scrollTo({top:0});
}
function refreshProgress(){
  let n=0;ITEMS.forEach(o=>{if(isDone(o,item(o.id)))n++});
  $('#progtxt').textContent=`${n} / ${ITEMS.length}`;$('#progbar').style.width=(100*n/ITEMS.length)+'%';
}
function markDone(id){const o=ITEMS.find(x=>x.id===id);const el=document.getElementById('it_'+id);if(o&&el)el.classList.toggle('done',isDone(o,item(id)));refreshProgress()}
function onInput(e){
  const t=e.target;
  if(t.dataset.vf!==undefined){state.visit[t.dataset.vf]=t.value;save();return}
  if(t.dataset.id!==undefined&&t.tagName==='TEXTAREA'){item(t.dataset.id).text=t.value;save();markDone(t.dataset.id)}
}
function onClick(e){
  const st=e.target.closest('[data-st]');
  if(st){const d=item(st.dataset.id);d.status=d.status===st.dataset.st?'':st.dataset.st;save();
    st.parentElement.querySelectorAll('button').forEach(b=>b.classList.toggle('on',b.dataset.st===d.status));markDone(st.dataset.id);return}
  const del=e.target.closest('[data-del]');
  if(del){if(!confirm('Remover esta foto?'))return;
    const d=item(del.dataset.del);d.photos.splice(+del.dataset.idx,1);save();
    document.querySelector(`[data-ph="${del.dataset.del}"]`).innerHTML=photosHTML(del.dataset.del,d);markDone(del.dataset.del);return}
  const z=e.target.closest('[data-zoom]');
  if(z){const p=item(z.dataset.zoom).photos[+z.dataset.idx];if(p)openLB(p);return}
  const mic=e.target.closest('[data-mic]');
  if(mic){toggleMic(mic.dataset.mic,mic);return}
}
async function onChange(e){
  const t=e.target;if(t.dataset.file===undefined)return;
  const id=t.dataset.file,d=item(id);const files=[...t.files];t.value='';
  toast(`Processando ${files.length} foto${files.length>1?'s':''}…`);
  for(const f of files){try{d.photos.push(await shrink(f))}catch(err){toast('Não foi possível ler a foto.')}}
  save();document.querySelector(`[data-ph="${id}"]`).innerHTML=photosHTML(id,d);markDone(id);toast('Foto anexada.');
}
function shrink(file){return new Promise((res,rej)=>{const url=URL.createObjectURL(file);const im=new Image();
  im.onload=()=>{const M=1400;let w=im.width,h=im.height;const k=Math.min(1,M/Math.max(w,h));w=Math.round(w*k);h=Math.round(h*k);
    const c=document.createElement('canvas');c.width=w;c.height=h;c.getContext('2d').drawImage(im,0,0,w,h);
    URL.revokeObjectURL(url);res(c.toDataURL('image/jpeg',.78))};
  im.onerror=()=>{URL.revokeObjectURL(url);rej()};im.src=url})}

/* ============ Foto em tela cheia ============ */
let lbOpen=false;
function openLB(src){
  $('#lbimg').src=src;$('#lb').hidden=false;lbOpen=true;
  try{history.pushState({lb:1},'')}catch(_){}   // o botão "voltar" do Android fecha a foto, não o app
}
function hideLB(){lbOpen=false;$('#lb').hidden=true;$('#lbimg').removeAttribute('src')}
function closeLB(){if(!lbOpen)return;hideLB();if(history.state&&history.state.lb)history.back()}
addEventListener('popstate',()=>{if(lbOpen)hideLB()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLB()});
$('#lb').onclick=closeLB;

/* ============ Voz (Web Speech API) ============ */
let recog=null, micActive=null; // micActive = {id, btn}
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
function setPartial(id,t){const p=document.querySelector(`[data-partial="${id}"]`);if(p)p.textContent=t}
function stopMic(){
  if(!micActive)return;const m=micActive;micActive=null;
  m.btn.classList.remove('rec');setPartial(m.id,'');
  if(recog){try{recog.stop()}catch(_){}}
}
function toggleMic(id,btn){
  if(micActive){const same=micActive.id===id;stopMic();if(same)return}
  if(!SR){toast('Use o microfone do teclado do celular para ditar.');return}
  recog=new SR();recog.lang='pt-BR';recog.continuous=true;recog.interimResults=true;
  micActive={id,btn};btn.classList.add('rec');
  // O Chrome/Android reenvia resultados já finalizados (e às vezes repete a frase crescendo), então
  // nada é "anexado" a cada evento: recalculamos o ditado inteiro a partir de ev.results e
  // regravamos base + ditado, o que é idempotente.
  let base=item(id).text, wrote=base, lastCount=0, skip=0;
  recog.onresult=ev=>{
    const segs=[];let part='';
    for(let i=0;i<ev.results.length;i++){
      const r=ev.results[i],t=r[0].transcript.trim();
      if(!r.isFinal){if(t)part+=(part?' ':'')+t;continue}
      if(!t)continue;
      const last=segs.length?segs[segs.length-1]:'',tl=t.toLowerCase(),ll=last.toLowerCase();
      if(last&&tl.startsWith(ll))segs[segs.length-1]=t;      // repetição que só estende a anterior
      else if(last&&ll.startsWith(tl))continue;              // repetição mais curta
      else segs.push(t);
    }
    const d=item(id);
    if(d.text!==wrote){base=d.text;skip=lastCount}           // a pessoa editou o campo durante o ditado
    const dictated=segs.slice(skip).join(' ');
    d.text=dictated?(base&&!/\s$/.test(base)?base+' ':base)+dictated:base;
    wrote=d.text;lastCount=segs.length;
    const ta=document.querySelector(`textarea[data-id="${id}"]`);if(ta)ta.value=d.text;
    save();markDone(id);setPartial(id,part)};
  recog.onerror=ev=>{
    if(ev.error==='not-allowed'||ev.error==='service-not-allowed')toast('Permissão de microfone negada.');
    else if(ev.error==='network')toast('Ditado precisa de internet. Sem sinal, use o microfone do teclado.');
    else if(ev.error!=='no-speech'&&ev.error!=='aborted')toast('Erro no reconhecimento de voz.');
    stopMic()};
  recog.onend=()=>{if(micActive&&micActive.id===id){micActive=null;btn.classList.remove('rec');setPartial(id,'')}};
  try{recog.start()}catch(_){toast('Não foi possível iniciar o microfone.');stopMic()}
}
function initVoiceTip(){
  if(SR)return;let off=false;try{off=localStorage.getItem('tipVoz')==='1'}catch(_){}
  $('#tip').hidden=off;
  $('#tipX').onclick=()=>{$('#tip').hidden=true;try{localStorage.setItem('tipVoz','1')}catch(_){}};
}

/* ============ Relatório ============ */
function badge(kind,st){if(!st)return '';const l=STATUS[kind].find(x=>x[0]===st)[1];return `<span class="badge ${st}">${l}</span>`}
function reportHTML(){
  const v=state.visit;const dt=v.data?new Date(v.data+'T12:00').toLocaleDateString('pt-BR'):'';
  const flagged=ITEMS.filter(o=>['warn','bad'].includes(item(o.id).status));
  const done=ITEMS.filter(o=>isDone(o,item(o.id))).length;
  const photos=ITEMS.reduce((n,o)=>n+item(o.id).photos.length,0);
  let h=`<h2>Relatório de visita técnica · BPF Grupo Piracanjuba</h2>
  <div class="meta">${[dt,v.hora,v.unidade].filter(Boolean).map(esc).join(' — ')||'Sem data informada'}<br>
  ${v.equipe?`Equipe: ${esc(v.equipe)}<br>`:''}${v.contato?`Contato na fábrica: ${esc(v.contato)}`:''}</div>
  <div class="sum"><b>${done} de ${ITEMS.length}</b> itens preenchidos · <b>${photos}</b> foto${photos===1?'':'s'}
  ${flagged.length?`<br><b>Pontos de atenção (${flagged.length}):</b><ul>${flagged.map(o=>`<li>${esc(o.label)} ${badge(o.kind,item(o.id).status)} <span style="color:var(--ink-2)">— ${esc(o.group)}</span></li>`).join('')}</ul>`:'<br>Nenhum item marcado como atenção ou negado.'}</div>`;
  SECTIONS.filter(s=>s.groups).forEach(s=>{
    h+=`<h3>${esc(s.sub||s.title)}</h3>`;
    s.groups.forEach(g=>{h+=`<h4>${esc(g.t)}</h4>`;g.items.forEach(it=>{const o=it.obj,d=item(o.id);
      h+=`<div class="ri"><div class="l">${esc(o.label)}${badge(o.kind,d.status)}</div>
      ${d.text.trim()?`<div class="t">${esc(d.text)}</div>`:(d.status||d.photos.length?'':'<div class="empty">não preenchido</div>')}
      ${d.photos.length?`<div class="rph">${d.photos.map(p=>`<img src="${p}" alt="">`).join('')}</div>`:''}</div>`})});
  });
  return h;
}
function fullReportDoc(){
  const css=document.querySelector('style').textContent;
  return `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Relatório visita técnica BPF Piracanjuba</title><style>${css}</style></head>
  <body><main><div class="rep">${reportHTML()}</div></main></body></html>`;
}
function fname(ext,pre='relatorio-visita-bpf'){const d=state.visit.data||new Date().toISOString().slice(0,10);return `${pre}-${d}.${ext}`}
function showReport(){$('#form').style.display='none';$('#tip').style.display='none';$('#bar').style.display='none';$('#repBody').innerHTML=reportHTML();$('#report').classList.add('on');window.scrollTo({top:0})}
function hideReport(){$('#report').classList.remove('on');$('#form').style.display='';$('#tip').style.display='';$('#bar').style.display='';}
let toastT;function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('on'),2600)}

/* ============ Arquivos: baixar / compartilhar / restaurar ============ */
function download(name,data,mime){
  const u=URL.createObjectURL(new Blob([data],{type:mime}));const a=document.createElement('a');
  a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),60000);
}
async function shareReport(){
  const name=fname('html'),html=fullReportDoc();
  try{const file=new File([html],name,{type:'text/html'});
    if(navigator.canShare&&navigator.canShare({files:[file]})){
      await navigator.share({files:[file],title:'Relatório de visita técnica · BPF Grupo Piracanjuba'});return}
  }catch(e){if(e&&e.name==='AbortError')return}
  download(name,html,'text/html;charset=utf-8');toast('Compartilhar indisponível aqui — arquivo baixado.');
}
async function restoreBackup(f){
  let s=null;try{s=normalize(JSON.parse(await f.text()))}catch(_){}
  if(!s){toast('Arquivo inválido: não é um backup desta ferramenta.');return}
  const n=Object.values(s.items).filter(d=>d.status||d.text.trim()||d.photos.length).length;
  if(!confirm(`Restaurar o backup "${f.name}" (${n} itens preenchidos)?\nIsso substitui TODOS os dados atuais deste aparelho.`))return;
  state=s;dirty=true;await commit();hideReport();build();toast('Backup restaurado.');
}

/* ============ Botões ============ */
$('#btnReport').onclick=showReport;$('#btnBack').onclick=hideReport;
$('#btnPrev').onclick=()=>showTab(Math.max(0,state.tab-1));$('#btnNext').onclick=()=>showTab(Math.min(SECTIONS.length-1,state.tab+1));
$('#btnPrint').onclick=()=>window.print();
$('#btnShare').onclick=shareReport;
$('#btnSave').onclick=()=>{download(fname('html'),fullReportDoc(),'text/html;charset=utf-8');toast('Relatório baixado.')};
$('#btnBackup').onclick=async()=>{dirty=true;await commit();download(fname('json','backup-visita-bpf'),JSON.stringify(state),'application/json');toast('Backup baixado.')};
$('#btnRestore').onclick=()=>$('#fileRestore').click();
$('#fileRestore').onchange=e=>{const f=e.target.files[0];e.target.value='';if(f)restoreBackup(f)};
$('#btnReset').onclick=async()=>{if(!confirm('Apagar todas as respostas e fotos deste aparelho?'))return;
  state={visit:{},items:{},tab:0};dirty=true;await commit();hideReport();build();toast('Dados apagados.')};
$('#repBody').addEventListener('click',e=>{const im=e.target.closest('.rph img');if(im)openLB(im.src)});
$('#form').addEventListener('input',onInput);
$('#form').addEventListener('click',onClick);
$('#form').addEventListener('change',onChange);

/* ============ PWA: armazenamento persistente + service worker ============ */
async function askPersist(){
  try{if(!navigator.storage||!navigator.storage.persist)return;
    if(await navigator.storage.persisted())return;
    // o Chrome decide em silêncio (instalado/engajado → concede); tenta nas 3 primeiras aberturas
    let n=0;try{n=+localStorage.getItem('persistTries')||0}catch(_){}
    if(n>=3)return;
    try{localStorage.setItem('persistTries',String(n+1))}catch(_){}
    await navigator.storage.persist();
  }catch(_){}
}
function initSW(){
  if(!('serviceWorker' in navigator)||!/^https?:$/.test(location.protocol))return;
  let accepted=false,reloading=false;
  navigator.serviceWorker.addEventListener('controllerchange',()=>{if(accepted&&!reloading){reloading=true;location.reload()}});
  navigator.serviceWorker.register('sw.js',{updateViaCache:'none'}).then(reg=>{
    const offer=()=>{if(reg.waiting&&navigator.serviceWorker.controller){
      $('#upd').hidden=false;
      $('#updBtn').onclick=async()=>{await commit();accepted=true;reg.waiting&&reg.waiting.postMessage({type:'SKIP_WAITING'})}}};
    offer();
    reg.addEventListener('updatefound',()=>{const w=reg.installing;if(w)w.addEventListener('statechange',()=>{if(w.state==='installed')offer()})});
    const check=()=>{reg.update().catch(()=>{})};
    document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')check()});
    setInterval(check,60*60*1000);
  }).catch(()=>{});
}

/* ============ Início ============ */
(async()=>{
  askPersist();
  try{const s=normalize(await load());if(s)state=s}catch(_){}
  if(state.savedAt)showSaved(state.savedAt);
  build();initVoiceTip();initSW();
})();
