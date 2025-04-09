const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// 랜덤으로 배열을 섞는 함수 (Fisher-Yates 알고리즘)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Grid page. */
router.get('/news/grid', function (req, res, next) {
  const filePath = path.join(__dirname, '../public/data/gridData.json');

  const limit = parseInt(req.query.limit) || 96;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('파일을 읽는 데 오류가 발생했습니다.');
    }

    const jsonData = JSON.parse(data);

    const shuffledData = shuffleArray(jsonData);

    const slicedData = shuffledData.slice(0, limit);

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(slicedData, null, 2));
  });
});

module.exports = router;
