const axios = require("axios");

const getShortUrl = async (url) => {
  try {
    let response = await axios({
      url: "https://api.bilibili.com/x/share/click",
      method: "POST",
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        // 'Referer':'https://www.bilibili.com;',
        // 'Origin':'https://www.bilibili.com',
      },
      transformRequest: [
        function(data) {
          let ret = ''
          for (const it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          ret = ret.substring(0, ret.length - 1)
          return ret
        }
      ],
      data: {
        build: 9333,
        buvid: 'abc1234abc1234abc1234abc1234abc1',
        platform: 'ios',
        share_channel: 'COPY',
        share_content: '执笔看墨花开',
        share_id: 'public.webview.0.0.pv',
        share_mode: 3,
        share_title: '执笔看墨花开',
        oid: url
      }
    });
    console.log(response.data);
    return response.data.data
  } catch (e) {
    console.log(e);
  }
  
}

// getShortUrl('https://i0.hdslb.com/bfs/album/d8fd43a41bd32b22addbb966036c582d1296298f.jpg')

module.exports = async(req, res) => {
  const { url } = req.query;
  if (!url) {
    res.send({
      msg: '链接呢？',
      success: false
    });
    res.end();
  } else {
    const data =  await getShortUrl(url)
    if (!data.content) {
      res.send({
        msg: '找不到你呢!',
        success: false
      });
      res.end()
    } else {
      res.send({
        short_url: data.content,
        success: true
      });
      res.end()
    }
  }
  
  res.end();
}
