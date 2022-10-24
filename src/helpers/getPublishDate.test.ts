import { getPublishDate } from "./getPublishDate";
import { expect, test } from "@jest/globals";

test("get publish date", () => {
  return expect(getPublishDate(1666649361)).toBe("25.10.2022, 01:09:21");
});
