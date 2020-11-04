import { expect, server, BASE_URL } from "./setup";

const TEST_DATA = {
  NEW_CATEGORY_ID: 1,
  WRONG_CATEGORY_ID: 10,
  NEW_CATEGORY: {
    name: "TestCategory",
    description: "My new long desc"
  },
  NEW_CATEGORY2: {
    name: "TestCategory2",
    description: "My new long desc 2"
  },
  EDIT_CATEGORY: {
    name: "Test Category Modified"
  },
  INVALID_CATEGORY: {
    description: "Missing name"
  }
};

describe("[CATEGORIES]", () => {
  it("it reads categories and should have status code 200 and empty list", (done) => {
    server
      .get(`${BASE_URL}/categories`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.categories).to.be.an('array').that.have.lengthOf(0);
        done();
      });
  });
  it("it creates a new category and should have status code 201", (done) => {
    server
      .post(`${BASE_URL}/categories`)
      .send(TEST_DATA.NEW_CATEGORY)
      .expect(201)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('name');
        expect(res.body).to.have.property('description');
        expect(res.body).to.have.property('parent_id');
        expect(res.body).to.have.property('createdAt');
        expect(res.body).to.have.property('updatedAt');
        done();
      });
  });
  it("it creates an invalid new category and should have status code 400", (done) => {
    server
      .post(`${BASE_URL}/categories`)
      .send(TEST_DATA.INVALID_CATEGORY)
      .expect(400)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message').that.is.equal("Name cannot be empty");
        done();
      });
  });
  it("it reads categories and should have status code 200 and one element in it", (done) => {
    server
      .get(`${BASE_URL}/categories`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.categories).to.be.an('array').that.have.lengthOf(1);
        res.body.categories.forEach(c => {
          expect(c).to.have.property('id').that.is.equal(TEST_DATA.NEW_CATEGORY_ID);
          expect(c).to.have.property('name').that.is.equal(TEST_DATA.NEW_CATEGORY.name);
          expect(c).to.have.property('description').that.is.equal(TEST_DATA.NEW_CATEGORY.description);
          expect(c).to.have.property('parent_id').that.is.equal(null);
          expect(c).to.have.property('createdAt');
          expect(c).to.have.property('updatedAt');
        });
        done();
      });
  });
  it(`it read category by ID (${TEST_DATA.NEW_CATEGORY_ID}) and should have status code 200`, (done) => {
    server
      .get(`${BASE_URL}/categories/${TEST_DATA.NEW_CATEGORY_ID}`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('id').that.is.equal(TEST_DATA.NEW_CATEGORY_ID);
        expect(res.body).to.have.property('name').that.is.equal(TEST_DATA.NEW_CATEGORY.name);
        expect(res.body).to.have.property('description').that.is.equal(TEST_DATA.NEW_CATEGORY.description);
        expect(res.body).to.have.property('parent_id').that.is.equal(null);
        expect(res.body).to.have.property('createdAt');
        expect(res.body).to.have.property('updatedAt');
        done();
      });
  });
  it(`it searches categories by name (${TEST_DATA.NEW_CATEGORY.name}) and should have status code 200`, (done) => {
    server
      .get(`${BASE_URL}/categories/?query=${TEST_DATA.NEW_CATEGORY.name}`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.categories).to.be.an('array').that.have.lengthOf(1);
        res.body.categories.forEach(c => {
          expect(c).to.have.property('id').that.is.equal(TEST_DATA.NEW_CATEGORY_ID);
          expect(c).to.have.property('name').that.is.equal(TEST_DATA.NEW_CATEGORY.name);
          expect(c).to.have.property('description').that.is.equal(TEST_DATA.NEW_CATEGORY.description);
          expect(c).to.have.property('parent_id').that.is.equal(null);
          expect(c).to.have.property('createdAt');
          expect(c).to.have.property('updatedAt');
        });
        done();
      });
  });
  it(`it search category by ID (${TEST_DATA.WRONG_CATEGORY_ID}) and should have status code 404`, (done) => {
    server
      .get(`${BASE_URL}/categories/${TEST_DATA.WRONG_CATEGORY_ID}`)
      .expect(404)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });
  it(`it updates category with ID (${TEST_DATA.NEW_CATEGORY_ID}) and should have status code 200`, (done) => {
    server
      .put(`${BASE_URL}/categories/${TEST_DATA.NEW_CATEGORY_ID}`)
      .send(TEST_DATA.EDIT_CATEGORY)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message').that.is.equal("Category was updated successfully.");
        done();
      });
  });
  it(`it updates invalid category with ID (${TEST_DATA.WRONG_CATEGORY_ID}) and should have status code 404`, (done) => {
    server
      .put(`${BASE_URL}/categories/${TEST_DATA.WRONG_CATEGORY_ID}`)
      .send(TEST_DATA.EDIT_CATEGORY)
      .expect(404)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('message').that.is.equal(`Cannot update Category with id=${TEST_DATA.WRONG_CATEGORY_ID}. Maybe Category was not found or req.body is empty!`);
        done();
      });
  });
  it(`it read modified category with ID (${TEST_DATA.NEW_CATEGORY_ID}) and should have status code 200`, (done) => {
    server
      .get(`${BASE_URL}/categories/${TEST_DATA.NEW_CATEGORY_ID}`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('id').that.is.equal(TEST_DATA.NEW_CATEGORY_ID);
        expect(res.body).to.have.property('name').that.is.equal(TEST_DATA.EDIT_CATEGORY.name);
        expect(res.body).to.have.property('description').that.is.equal(TEST_DATA.NEW_CATEGORY.description);
        expect(res.body).to.have.property('parent_id').that.is.equal(null);
        expect(res.body).to.have.property('createdAt');
        expect(res.body).to.have.property('updatedAt');
        done();
      });
  });
  it(`it deletes category with ID (${TEST_DATA.NEW_CATEGORY_ID}) and should have status code 200`, (done) => {
    server
      .delete(`${BASE_URL}/categories/${TEST_DATA.NEW_CATEGORY_ID}`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message').that.is.equal("Category was deleted successfully!");
        done();
      });
  });
  it(`it deletes category with ID (${TEST_DATA.WRONG_CATEGORY_ID}) and should have status code 404`, (done) => {
    server
      .delete(`${BASE_URL}/categories/${TEST_DATA.WRONG_CATEGORY_ID}`)
      .expect(404)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('message').that.is.equal(`Cannot delete Category with id=${TEST_DATA.WRONG_CATEGORY_ID}. Maybe Category was not found!`);
        done();
      });
  });
  it("it creates new category one that should have status code 201", (done) => {
    server
      .post(`${BASE_URL}/categories`)
      .send(TEST_DATA.NEW_CATEGORY)
      .expect(201)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  });
  it("it creates new category two that should have status code 201", (done) => {
    server
      .post(`${BASE_URL}/categories`)
      .send(TEST_DATA.NEW_CATEGORY2)
      .expect(201)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  });
  it("it deletes all categories that should have status code 200", (done) => {
    server
      .delete(`${BASE_URL}/categories`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message').that.is.equal("2 Category/ies were deleted successfully!");
        done();
      });
  });
});
