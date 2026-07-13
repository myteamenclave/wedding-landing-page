const test = require('node:test');
const assert = require('node:assert/strict');
const { createWeddingPage, updateWeddingPage } = require('../src/services/wedding-page-service');

test('createWeddingPage stores the required wedding details', () => {
  const page = createWeddingPage({
    title: 'Sarah & Daniel',
    coupleName: 'Sarah and Daniel',
    weddingDate: '2026-10-10',
    weddingTime: '16:00',
    featuredImageUrl: 'data:image/png;base64,abc123',
    status: 'draft'
  });

  assert.equal(page.title, 'Sarah & Daniel');
  assert.equal(page.status, 'draft');
  assert.ok(page.id);
  assert.equal(page.featuredImageUrl, 'data:image/png;base64,abc123');
});

test('createWeddingPage rejects missing required fields', () => {
  assert.throws(() => createWeddingPage({ title: 'Test Wedding' }), /coupleName/);
});

test('updateWeddingPage changes the stored event details', () => {
  const created = createWeddingPage({
    title: 'Mia & Noah',
    coupleName: 'Mia and Noah',
    weddingDate: '2026-09-09',
    weddingTime: '15:30',
    featuredImageUrl: 'data:image/png;base64,initial'
  });

  const updated = updateWeddingPage(created.id, {
    weddingDate: '2026-09-10',
    weddingTime: '17:00',
    featuredImageUrl: 'data:image/png;base64,updated'
  });

  assert.equal(updated.weddingDate, '2026-09-10');
  assert.equal(updated.weddingTime, '17:00');
  assert.equal(updated.featuredImageUrl, 'data:image/png;base64,updated');
});
