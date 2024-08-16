const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
    test("Convert 10L", () => {
        chai
            .request(server)
            .get("/api/convert")
            .query({ input: "10L" })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.initNum, 10);
                assert.equal(res.body.initUnit, "L");
                assert.approximately(Number(res.body.returnNum), 2.64172, 0.00001);
                assert.equal(res.body.returnUnit, "gal");
            });
    });

    test("Convert 32g", () => {
        chai
            .request(server)
            .get("/api/convert")
            .query({ input: "32g" })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.initUnit, undefined);
            });
    });

    test("Convert 3/7.2/4kg", () => {
        chai
            .request(server)
            .get("/api/convert")
            .query({ input: "3/7.2/4kg" })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.initNum, undefined);
            });
    });

    test("Convert 3/7.2/4kilomegagram", () => {
        chai
            .request(server)
            .get("/api/convert")
            .query({ input: "3/7.2/4kilomegagram" })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.initNum, undefined);
            });
    });

    test("Convert kg", () => {
        chai
            .request(server)
            .get("/api/convert")
            .query({ input: "kg" })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.body.initNum, 1);
                assert.equal(res.body.initUnit, "kg");
                assert.approximately(Number(res.body.returnNum), 2.20462, 0.00001);
                assert.equal(res.body.returnUnit, "lbs");
            });
    });
});

