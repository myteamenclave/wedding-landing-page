const test = require('node:test');
const assert = require('node:assert/strict');
const { createWeddingPageHandler, getWeddingPageHandler, updateWeddingPageHandler } = require('../src/api/wedding-pages');

test('createWeddingPageHandler returns a created page payload', () => {
  const req = {
    method: 'POST',
    body: {
      title: 'Ava & Leo',
      coupleName: 'Ava and Leo',
      weddingDate: '2026-11-11',
      weddingTime: '18:00',
      featuredImageUrl: 'data:image/png;base64,new'
    }
  };

  const response = createWeddingPageHandler(req, {});
  assert.equal(response.statusCode, 201);
  assert.equal(response.body.status, 'draft');
  assert.ok(response.body.page.id);
  assert.match(response.body.page.publicUrl, /wedding-page\.html\?id=/);
});

test('getWeddingPageHandler returns the stored page payload', () => {
  const created = createWeddingPageHandler({
    method: 'POST',
    body: {
      title: 'Lina & Max',
      coupleName: 'Lina and Max',
      weddingDate: '2026-12-12',
      weddingTime: '14:00',
      featuredImageUrl: 'data:image/png;base64,hero'
    }
  }, {}).body.page;

  const response = getWeddingPageHandler({ params: { id: created.id } }, {});
  assert.equal(response.statusCode, 200);
  assert.equal(response.body.page.title, 'Lina & Max');
  assert.match(response.body.page.publicUrl, /wedding-page\.html\?id=/);
});

test('updateWeddingPageHandler returns the updated page payload', () => {
  const created = createWeddingPageHandler({
    method: 'POST',
    body: {
      title: 'Noah & Emma',
      coupleName: 'Noah and Emma',
      weddingDate: '2026-08-08',
      weddingTime: '13:00',
      featuredImageUrl: 'data:image/png;base64,old'
    }
  }, {}).body.page;

  const response = updateWeddingPageHandler({ params: { id: created.id }, body: { weddingDate: '2026-08-09' } }, {});
  assert.equal(response.statusCode, 200);
  assert.equal(response.body.page.weddingDate, '2026-08-09');
});
