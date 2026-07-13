class WeddingPage {
  constructor(data) {
    this.validate(data);
    this.id = data.id || `page-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
    this.title = data.title;
    this.coupleName = data.coupleName;
    this.weddingDate = data.weddingDate;
    this.weddingTime = data.weddingTime;
    this.featuredImageUrl = data.featuredImageUrl;
    this.status = data.status || 'draft';
    this.templateId = data.templateId || 'default';
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
  }

  validate(data) {
    if (!data || typeof data !== 'object') {
      throw new Error('Wedding page payload is required');
    }
    if (!data.title || typeof data.title !== 'string' || !data.title.trim()) {
      throw new Error('title is required');
    }
    if (!data.coupleName || typeof data.coupleName !== 'string' || !data.coupleName.trim()) {
      throw new Error('coupleName is required');
    }
    if (!data.weddingDate || typeof data.weddingDate !== 'string' || !data.weddingDate.trim()) {
      throw new Error('weddingDate is required');
    }
    if (!data.weddingTime || typeof data.weddingTime !== 'string' || !data.weddingTime.trim()) {
      throw new Error('weddingTime is required');
    }
    if (!data.featuredImageUrl || typeof data.featuredImageUrl !== 'string' || !data.featuredImageUrl.trim()) {
      throw new Error('featuredImageUrl is required');
    }
  }
}

module.exports = { WeddingPage };
