const routes = require('next-routes');

module.exports = routes().add('article', '/news/:code', 'news/article');