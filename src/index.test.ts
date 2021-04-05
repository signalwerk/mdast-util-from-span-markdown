import fromMarkdown from "./index";

test("Minimal one test", () => {
  expect(1).toBe(1);
});

test("text", () => {
  expect(fromMarkdown("Hello World!")).toMatchObject([
    { type: "text", value: "Hello World!" },
  ]);
});

test("text empty", () => {
  expect(fromMarkdown("")).toMatchObject([{ type: "text", value: "" }]);
});

test("text null", () => {
  expect(fromMarkdown(null)).toBeNull();
});

test("text undefined", () => {
  expect(fromMarkdown(undefined)).toBeUndefined();
});

test("emphasis", () => {
  expect(fromMarkdown("*Hello World!*")).toMatchObject([
    {
      type: "emphasis",
      children: [{ type: "text", value: "Hello World!" }],
    },
  ]);
});

test("emphasis", () => {
  expect(fromMarkdown("_Hello World!_")).toMatchObject([
    {
      type: "emphasis",
      children: [{ type: "text", value: "Hello World!" }],
    },
  ]);
});

test("strong", () => {
  expect(fromMarkdown("**Hello World!**")).toMatchObject([
    {
      type: "strong",
      children: [{ type: "text", value: "Hello World!" }],
    },
  ]);
});

test("strong", () => {
  expect(fromMarkdown("__Hello World!__")).toMatchObject([
    {
      type: "strong",
      children: [{ type: "text", value: "Hello World!" }],
    },
  ]);
});

test("Link", () => {
  expect(fromMarkdown("Hello [World](https://example.com)!")).toMatchObject([
    { type: "text", value: "Hello " },
    {
      type: "link",
      url: "https://example.com",
      children: [{ type: "text", value: "World" }],
    },
    { type: "text", value: "!" },
  ]);
});

test("inline code", () => {
  expect(fromMarkdown("Hello `World`!")).toMatchObject([
    { type: "text", value: "Hello " },
    {
      type: "inlineCode",
      value: "World",
    },
    { type: "text", value: "!" },
  ]);
});

test("Combinded", () => {
  expect(
    fromMarkdown(
      "Say **Hello** [World](https://example.com) in `code`! *Thanks!*"
    )
  ).toMatchObject([
    { type: "text", value: "Say " },
    {
      type: "strong",
      children: [{ type: "text", value: "Hello" }],
    },
    { type: "text", value: " " },
    {
      type: "link",
      url: "https://example.com",
      children: [{ type: "text", value: "World" }],
    },
    { type: "text", value: " in " },
    {
      type: "inlineCode",
      value: "code",
    },
    { type: "text", value: "! " },
    {
      type: "emphasis",
      children: [{ type: "text", value: "Thanks!" }],
    },
  ]);
});
