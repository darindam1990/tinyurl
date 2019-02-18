const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const map = new Map();
const encodeStr = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,0,1,2,3,4,5,6,7,8,9'.split(',');
const prefix = 'https://tiny.url/c3px29jx';

encode = (id) => {
    const base = encodeStr.length;
    const digits = [];
    while (id) {
        let d = id % base;
        digits.push(encodeStr[d]);
        id = Math.floor(id / base);
    }
    return digits.reverse().join('');
}

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: '../'});
});
app.post('/shorten', (req, res) => {
    const idx = map.size + 1;
    const key = encode(idx);
    const shortUrl = prefix + key;
    const url = req.body.url;
    map.set(shortUrl, url);
    console.log(map);
    res.json({ url: shortUrl });
});
app.post('/getLink', (req, res) => {
    const shortUrl = req.body.url;
    let fullUrl = null;
    if (map.has(shortUrl)) {
        fullUrl = map.get(shortUrl);
    }
    res.json({ url: fullUrl });
});
app.listen(process.env.PORT || 3000)