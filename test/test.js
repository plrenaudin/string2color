import sut from "..";

describe("generate color base test suite", () => {
  it("generates a color based on a string", () => {
    expect(sut("hello")).toEqual("hsl(172, 100%, 75%)");
  });
  it("returns black if no string provided or invalid", () => {
    expect(sut()).toEqual("hsl(0, 100%, 0%)");
  });
});

describe("generate color extended test suite", () => {
  it("generate rgb color", () => {
    expect(sut("hello", { format: "rgb" })).toEqual("#80ffee");
  });
  it("generate rgb achromatic color", () => {
    expect(sut("hello", { format: "rgb", saturation: 0 })).toEqual("#bfbfbf");
  });
  it("generates hsl color with a custom saturation percentage", () => {
    expect(sut("hello", { saturation: 22 })).toEqual("hsl(172, 22%, 75%)");
  });
  it("generates hsl color with a custom lightness percentage", () => {
    expect(sut("hello", { lightness: 22 })).toEqual("hsl(172, 100%, 22%)");
  });
});

describe("generate color error test suite", () => {
  it("does not fail with empty option object", () => {
    expect(sut("hello", {})).toEqual("hsl(172, 100%, 75%)");
  });

  it("throws an error on invalid saturation", () => {
    let caught = false;
    try {
      sut("hello", { saturation: "plop" });
    } catch (e) {
      caught = true;
      expect(e.message).toEqual("Invalid saturation plop");
    }
    expect(caught).toBe(true);
    caught = false;
    try {
      sut("hello", { saturation: -23 });
    } catch (e) {
      caught = true;
      expect(e.message).toEqual("Invalid saturation -23");
    }
    expect(caught).toBe(true);
    caught = false;
    try {
      sut("hello", { saturation: 9999 });
    } catch (e) {
      caught = true;
      expect(e.message).toEqual("Invalid saturation 9999");
    }
    expect(caught).toBe(true);
  });

  it("throws an error on invalid lightness", () => {
    let caught = false;
    try {
      sut("hello", { lightness: "plop" });
    } catch (e) {
      caught = true;
      expect(e.message).toEqual("Invalid lightness plop");
    }
    expect(caught).toBe(true);
    caught = false;
    try {
      sut("hello", { lightness: -23 });
    } catch (e) {
      caught = true;
      expect(e.message).toEqual("Invalid lightness -23");
    }
    expect(caught).toBe(true);
    caught = false;
    try {
      sut("hello", { lightness: 101 });
    } catch (e) {
      caught = true;
      expect(e.message).toEqual("Invalid lightness 101");
    }
    expect(caught).toBe(true);
  });

  it("throws an error on invalid format", () => {
    let caught = false;
    try {
      sut("hello", { format: "plop" });
    } catch (e) {
      caught = true;
      expect(e.message).toEqual("Unsupported format plop");
    }
    expect(caught).toBe(true);
  });
});
