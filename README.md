# Visita BPF — checklist de visita técnica (PWA offline)

Checklist da visita técnica pré-gravação (BPF Grupo Piracanjuba). Texto, voz e fotos; no fim gera o relatório.
Projeto estático: sem build, sem frameworks, **nenhum dado sai do aparelho** (fica no IndexedDB).

## Publicar no GitHub Pages
1. Crie um repositório no GitHub e envie **o conteúdo desta pasta** para a branch `main`.
2. No repositório: **Settings → Pages → Source: GitHub Actions**.
3. O workflow `.github/workflows/pages.yml` publica a cada push (ou rode manualmente em *Actions*).
   O site fica em `https://<usuario>.github.io/<repositorio>/`.

> Sem o workflow (publicando a branch direto)? Troque `VERSION` no topo de `sw.js` a cada alteração (`'2'`, `'3'`…); com o workflow isso é automático.

## Instalar na tela inicial
- **Android (Chrome):** abra o link → menu ⋮ → **Instalar app** / *Adicionar à tela inicial*.
- **iPhone (Safari):** abra o link → botão Compartilhar → **Adicionar à Tela de Início**.

**Abra uma vez com internet** antes de ir a campo: é nessa primeira visita que o app é guardado no aparelho. Depois funciona em modo avião.

## Em campo
- Tudo é salvo sozinho a cada alteração (indicador “Salvo HH:MM” no topo). O app pede ao navegador armazenamento persistente para o Android/iOS não apagar os dados.
- Antes de limpar dados do navegador ou trocar de aparelho: **Gerar relatório → Backup (JSON)**; para voltar, **Restaurar backup**.
- Ditado por voz: Chrome/Android (precisa de internet — é o reconhecimento do Google). No iPhone, ou sem sinal, use o **microfone do teclado**.
- Relatório: **Compartilhar** (WhatsApp, e-mail…), **Imprimir / PDF** ou **Baixar HTML**.

## Atualizar o roteiro
O roteiro está no array `SECTIONS`, no início de `app.js` (e os campos da visita em `VISIT_FIELDS`). Edite, faça push — os aparelhos recebem a atualização em segundo plano e mostram **“Nova versão disponível — recarregar”**; as respostas já preenchidas não são perdidas.

Cuidado: as respostas são ligadas à **posição** do item (`seção_grupo_item`). Para visitas já em andamento, acrescente itens **no fim de um grupo** e não reordene/remova itens — senão as respostas ficam deslocadas.

## Testar localmente
```bash
python -m http.server 8080
```
Abra `http://localhost:8080` (service worker só funciona em `localhost` ou HTTPS).
