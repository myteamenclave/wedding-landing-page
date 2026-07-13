const { createWeddingPage, getWeddingPage, updateWeddingPage } = require('../services/wedding-page-service');

function createWeddingPageHandler(req, res) {
  try {
    const page = createWeddingPage(req.body || {});
    return {
      statusCode: 201,
      body: {
        status: page.status,
        page: pageToResponse(page)
      }
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: {
        error: error.message
      }
    };
  }
}

function getWeddingPageHandler(req, res) {
  try {
    const page = getWeddingPage(req.params.id);
    return {
      statusCode: 200,
      body: {
        page: pageToResponse(page)
      }
    };
  } catch (error) {
    return {
      statusCode: 404,
      body: {
        error: error.message
      }
    };
  }
}

function updateWeddingPageHandler(req, res) {
  try {
    const page = updateWeddingPage(req.params.id, req.body || {});
    return {
      statusCode: 200,
      body: {
        page: pageToResponse(page)
      }
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: {
        error: error.message
      }
    };
  }
}

function pageToResponse(page) {
  return {
    id: page.id,
    title: page.title,
    coupleName: page.coupleName,
    weddingDate: page.weddingDate,
    weddingTime: page.weddingTime,
    featuredImageUrl: page.featuredImageUrl,
    status: page.status,
    templateId: page.templateId,
    createdAt: page.createdAt,
    updatedAt: page.updatedAt,
    publicUrl: `/wedding-page.html?id=${encodeURIComponent(page.id)}`
  };
}

module.exports = {
  createWeddingPageHandler,
  getWeddingPageHandler,
  updateWeddingPageHandler
};
