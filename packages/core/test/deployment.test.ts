import { hello_fixture } from "./fixtures/paymaster.fixture";
describe("deploy", () => {
  beforeEach(async () => {
    await hello_fixture();
  });

  it("test deploy", async () => {});
});
