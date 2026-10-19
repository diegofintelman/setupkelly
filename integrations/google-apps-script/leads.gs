// Kelly Belem leads · spreadsheet "Leads - SITE e QRCODE KB" (owner gestaofintelman, shared with Kelly).
// One deployment serves two clients:
//   1. Legacy forms (current kellybelem.com QR code page): form-encoded POST, written to "Página1" by header name. Unchanged behavior.
//   2. New Next.js site (/api/leads): JSON POST with a token. QR code → "Página1"; contact and guide requests → "Contatos";
//      newsletter → "Newsletter". Contact and guide requests are also emailed to Kelly.
// Script properties: key (spreadsheet id, set by initialSetup), LEADS_TOKEN (same as LEADS_ENDPOINT_TOKEN in Vercel),
// NOTIFY_EMAIL (kellybelem@kw.com). After editing: Implantar → Gerenciar implantações → editar → Nova versão (URL stays the same).

const sheetName = 'Página1';
const scriptProp = PropertiesService.getScriptProperties();
const TIMEZONE = 'America/New_York';
const SHEETS = {
  contact: {name: 'Contatos', headers: ['DATA', 'TIPO', 'NOME', 'EMAIL', 'TELEFONE', 'INTERESSE', 'MELHOR HORÁRIO', 'MENSAGEM', 'ORIGEM (CTA)', 'PÁGINA', 'REQUEST ID']},
  newsletter: {name: 'Newsletter', headers: ['DATA', 'EMAIL', 'CONSENTIMENTO', 'ORIGEM (CTA)', 'PÁGINA', 'REQUEST ID']},
};

function initialSetup () {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  scriptProp.setProperty('key', activeSpreadsheet.getId());
}

function doGet () {
  return reply({result: 'success', ok: true, service: 'kelly-belem-leads'});
}

function doPost (e) {
  const isJson = e && e.postData && /json/i.test(e.postData.type || '');
  return isJson ? siteLead(e) : legacyLead(e);
}

// ---------- 1. Legacy form-encoded posts (original code, unchanged) ----------
function legacyLead (e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const doc = book();
    const sheet = doc.getSheetByName(sheetName);
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const nextRow = sheet.getLastRow() + 1;

    const newRow = headers.map(function(header) {
      const headerUpper = header.toString().toUpperCase();
      if (headerUpper === 'DATA') {
        return new Date();
      }
      return e.parameter[header] || e.parameter[header.toLowerCase()] || e.parameter[headerUpper] || "";
    });

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);
    return reply({result: 'success', row: nextRow});
  } catch (erro) {
    return reply({result: 'error', error: erro.toString()});
  } finally {
    lock.releaseLock();
  }
}

// ---------- 2. New site (JSON + token) ----------
function siteLead (e) {
  let lead;
  try { lead = JSON.parse(e.postData.contents); } catch (err) { return reply({ok: false, error: 'invalid-json'}); }
  const token = scriptProp.getProperty('LEADS_TOKEN');
  if (!token || !lead || lead.token !== token) return reply({ok: false, error: 'unauthorized'});
  if (!/^[\w-]{8,100}$/.test(String(lead.requestId || ''))) return reply({ok: false, error: 'invalid-request-id'});
  if (['contact', 'qrcode', 'newsletter', 'guide'].indexOf(lead.kind) === -1) return reply({ok: false, error: 'invalid-kind'});

  const receiptId = 'lead-' + lead.requestId;
  const cache = CacheService.getScriptCache();
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    // The site retries with the same requestId; never write the same submission twice.
    if (cache.get(receiptId)) return reply({ok: true, receiptId: receiptId, duplicate: true});
    const doc = book();
    const now = Utilities.formatDate(new Date(), TIMEZONE, 'dd/MM/yyyy HH:mm:ss');
    if (lead.kind === 'qrcode') {
      appendByHeader(doc.getSheetByName(sheetName), {DATA: now, NOME: lead.name, EMAIL: lead.email, TELEFONE: lead.phone, 'ENDEREÇO': lead.address, ENDERECO: lead.address});
    } else if (lead.kind === 'newsletter') {
      sheetFor(doc, SHEETS.newsletter).appendRow([now, lead.email, lead.consent ? 'Sim' : 'Não', lead.source, lead.page, lead.requestId].map(cell));
    } else {
      sheetFor(doc, SHEETS.contact).appendRow([now, lead.kind === 'guide' ? 'Guia (PDF)' : 'Contato', lead.name, lead.email, lead.phone, lead.interest, lead.bestTime, lead.message, lead.source, lead.page, lead.requestId].map(cell));
    }
    SpreadsheetApp.flush();
    cache.put(receiptId, '1', 21600);
  } finally {
    lock.releaseLock();
  }

  // The row is already saved; a failed email must not turn the submission into an error.
  if (lead.kind !== 'newsletter') {
    try { notify(scriptProp.getProperty('NOTIFY_EMAIL'), lead); } catch (err) { console.error('notify failed: ' + err); }
  }
  return reply({ok: true, receiptId: receiptId});
}

function notify (to, lead) {
  if (!to) return;
  const title = {guide: 'New guide download', qrcode: 'New QR code registration'}[lead.kind] || 'New contact';
  const lines = [
    title + ' from kellybelem website',
    '',
    'Name: ' + text(lead.name),
    'Email: ' + text(lead.email),
    'Phone: ' + text(lead.phone),
    'Interested in: ' + text(lead.interest),
    'Best time to reach: ' + text(lead.bestTime),
    'Address: ' + text(lead.address),
    '',
    'Message:',
    text(lead.message),
    '',
    'Form: ' + text(lead.source) + ' · Page: ' + text(lead.page),
    'Spreadsheet: ' + book().getUrl(),
  ];
  MailApp.sendEmail({to: to, replyTo: text(lead.email), subject: title + ': ' + text(lead.name), body: lines.join('\n')});
}

// ---------- helpers ----------
function book () {
  const key = scriptProp.getProperty('key');
  return key ? SpreadsheetApp.openById(key) : SpreadsheetApp.getActiveSpreadsheet();
}

// Writes into an existing sheet following its own header row (DATA, NOME, EMAIL...).
function appendByHeader (sheet, values) {
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  sheet.appendRow(headers.map(function(header) {
    const key = header.toString().trim().toUpperCase();
    return key in values ? cell(values[key]) : '';
  }));
}

function sheetFor (doc, def) {
  let sheet = doc.getSheetByName(def.name);
  if (!sheet) {
    sheet = doc.insertSheet(def.name);
    sheet.appendRow(def.headers);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, def.headers.length).setFontWeight('bold');
  }
  return sheet;
}

function text (value) {
  return value === undefined || value === null ? '' : String(value).slice(0, 2000);
}

// Keeps phone numbers like +1... as text and blocks formula injection (=, +, -, @).
function cell (value) {
  const v = text(value);
  return /^[=+\-@\t\r]/.test(v) ? "'" + v : v;
}

function reply (body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}
