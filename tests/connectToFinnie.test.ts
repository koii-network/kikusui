import { connectToFinnieMock } from "./connectToFinnieMock";
import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);

const expect = chai.expect;

describe("connect to finnie method", () => {
  const happyProvider = {
    connect() {
      return Promise.resolve(true);
    },
    getAddress() {
      return Promise.resolve({
        data: "-Ama7Gy-AUhL8JkBsk05skgKIRlC_56Kpr2IAeeuqCg",
        status: 200,
      });
    },
  };

  const sadProvider = {
    connect() {
      return Promise.resolve(false);
    },
    getAddress() {
      return Promise.resolve({
        data: "Error",
        status: 401,
      });
    },
  };

  it("should show true if user can connect to finnie", () => {
    expect(connectToFinnieMock(happyProvider)).to.eventually.deep.equal({
      data: "-Ama7Gy-AUhL8JkBsk05skgKIRlC_56Kpr2IAeeuqCg",
      status: 200,
    });
  });

  it("should show false if user cannot connect to finnie", () => {
    expect(connectToFinnieMock(sadProvider)).to.eventually.deep.equal(false);
  });
});
