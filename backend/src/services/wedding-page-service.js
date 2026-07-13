const { WeddingPage } = require('../models/wedding-page');

const pagesById = new Map();

function createWeddingPage(input) {
  const page = new WeddingPage(input);
  pagesById.set(page.id, page);
  return page;
}

function getWeddingPage(id) {
  const page = pagesById.get(id);
  if (!page) {
    throw new Error('Wedding page not found');
  }
  return page;
}

function updateWeddingPage(id, updates) {
  const existingPage = getWeddingPage(id);
  const nextPage = new WeddingPage({
    ...existingPage,
    ...updates,
    id: existingPage.id,
    createdAt: existingPage.createdAt,
    updatedAt: new Date().toISOString()
  });
  pagesById.set(id, nextPage);
  return nextPage;
}

module.exports = {
  createWeddingPage,
  getWeddingPage,
  updateWeddingPage
};
