const http = require('http');
const dayjs = require('dayjs');

const server = http.createServer((req, res) => {
  console.log(`İstek Yöntemi: ${req.method}, Yol: ${req.url}`);

  // Eğer istek GET değilse 405 döndür
  if (req.method !== 'GET') {
    res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8', 'Allow': 'GET' });
    res.end('Metot desteklenmiyor');
    return;
  }

  // Ana sayfa
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1>Farkli Baslik</h1><p>Hos geldiniz</p><a href="/hakkimda">Hakkimda Sayfasi</a>');
  } 
  // Hakkımda sayfası
  else if (req.url === '/hakkimda') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1>Hakkimda</h1><p>Ben Bilgisayar Muhendisligi ogrencisiyim.</p>');
  } 
  // API ders
  else if (req.url === '/api/ders') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ kod: "BMH231", adi: "Web Programlama", gun: "Cuma" }));
  } 
  // API agep (Kalan gün hesaplama)
  else if (req.url === '/api/agep') {
    const teslimTarihi = dayjs('2026-11-01');
    const bugun = dayjs();
    const kalanGun = teslimTarihi.diff(bugun, 'day');
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ son_teslim: "01.11.2026", kalan_gun: kalanGun }));
  } 
  // Diğer tüm yollar (404)
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Sayfa bulunamadi');
  }
});

// Sunucuyu 3000 portunda dinlemeye başla
server.listen(3000, () => {
  console.log('Sunucu 3000 numarali portta calisiyor...');
});
