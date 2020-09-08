let chai = require('chai');
let app = require('./../app');
const expect = require("chai").expect;

chai.use(require('chai-http'));
chai.should();

// Tests
describe("Diary", () => {
    describe("GET /api/diary", () => {
      let data = [];
      let testTitle = 'Testing Diary Entry 1';
      let testBody = 'For testing.';

      it("Insert a new diary entry", (done) => {
        chai.request(app)
        .post('/api/diary/')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({title: testTitle, body: testBody})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
      });

      it("Get all diary entries", (done) => {
        chai.request(app)
        .get('/api/diary/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          data = JSON.parse(res.text).data;
          done();
        });
       });

       it("Get a specific diary entry", (done) => {
         let entry = data[data.length - 1];

         chai.request(app)
         .get('/api/diary/')
         .end((err, res) => {
           res.should.have.status(200);
           res.body.should.be.a('object');
           expect(entry.title).to.equal(testTitle);
           expect(entry.body).to.equal(testBody);
           done();
         });
        });

       it("Update a diary entry", (done) => {
         let entry = data[data.length - 1];

         let newTitle = "New change to title";
         let newBody = "New change to body";
         chai.request(app)
         .put('/api/diary/' + entry._id)
         .set('content-type', 'application/x-www-form-urlencoded')
         .send({title: newTitle, body: newBody})
         .end((err, res) => {
           res.should.have.status(200);
           res.body.should.be.a('object');
           done();
         });
       });

       it("Delete a diary entry", (done) => {
         let entry = data[data.length - 1];
         chai.request(app)
         .delete('/api/diary/' + entry._id)
         .end((err, res) => {
           res.should.have.status(200);
           res.body.should.be.a('object');
           done();
         });
       });

    });
});
