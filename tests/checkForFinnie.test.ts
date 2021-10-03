import { check } from "../src/check";
import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);

const expect = chai.expect;

describe("finnie verification method", () => {
  const happyMock = () => {
    return true;
  };

  const sadMock = () => {
    return false;
  };

  it("should return a promise if the condition is met", () => {
    expect(check(happyMock)).to.be.a("Promise");
  });

  it("should check that user has finnie", () => {
    expect(check(happyMock)).to.eventually.deep.equal(true);
  });

  it("should return an error if the condition is not met", () => {
    expect(check(sadMock)).to.eventually.be.a("Error");
  });

  it("should check that user doesn't have finnie", () => {
    expect(check(sadMock)).to.eventually.deep.equal(false);
  });
});
