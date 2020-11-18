const { visitPuppeteer }  = require('./visit-puppeteer');
const { visitFetch }  = require('./visit-fetch');

exports.visitPuppeteer = visitPuppeteer
exports.visitFetch = visitFetch

module.exports = {
	visitPuppeteer,
	visitFetch
}
