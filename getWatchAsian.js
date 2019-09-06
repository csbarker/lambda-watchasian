const cheerio = require('cheerio');
const https = require('https');

const getWatchAsianData = function () {
    return new Promise(function(resolve, reject) {
        let data = '';
        let options = new URL('https://www13.watchasian.co/category/chinese-movies');
        let existingMovies = require('./currentList');

        https.get(options, (res) => {
            res.on('data', (d) => {
                data += d;
            });

            res.on('end', function() {
                let $ = cheerio.load(data);
                let movies = $('.year_2019 A');
                let emailHtml = '';

                if (existingMovies.length < movies.length) {
                    movies.each(function(index, el) {
						if (existingMovies.indexOf(el.children[0].data) === -1) {
                            emailHtml += `<li><a href="https://www13.watchasian.co/${el.attribs.href}">${el.children[0].data}</a></li>`;
                        }
                    });
                }

                if (emailHtml !== '') {
                    emailHtml = `<p>There has been a new release on watchasian!</p><ul>${emailHtml}</ul>`
                }

                resolve(emailHtml);
            });
        }).on('error', (e) => {
            reject(e);
        });
    });
}

module.exports = getWatchAsianData;