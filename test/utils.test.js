import { expect, server, BASE_URL } from "./setup";

describe("[UTILS]", () => {
  describe("health", () => {
    it('it should have status code 200 and message "Running"', (done) => {
      server
        .get(`${BASE_URL}/health`)
        .expect(200)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal("Running");
          done();
        });
    });
  });
});
