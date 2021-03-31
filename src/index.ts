const EMPHASIS_STRONG_REGEX = /([\*_]{1,2})(.*?)\1/g;
const LINK_REGEX = /\[([^[]*)\]\(([^)]*)\)/g;
const INLINE_CODE_REGEX = /(`)(.*?)(\1)/g;

export enum mdTypes {
  INLINE_CODE = "inlineCode",
  EMPHASIS = "emphasis",
  STRONG = "strong",
  LINK = "link",
  TEXT = "text",
}

export type Emphasis = {
  type: mdTypes.EMPHASIS;
  children: Array<InlineCode | Text>;
};

export type InlineCode = {
  type: mdTypes.INLINE_CODE;
  value: string;
};

export type Text = {
  type: mdTypes.TEXT;
  value: string;
};

export type Link = {
  type: mdTypes.LINK;
  url: string;
  children: Array<Emphasis | InlineCode | Text>;
};

export type mdToken = Link | Emphasis | InlineCode | Text;
export type mdTokens = Array<mdToken>;

export type toketPosition = {
  start: number;
  end: number;
};

type intermediateMdToken =
  | toketPosition
  | (Link & toketPosition)
  | (Emphasis & toketPosition)
  | (InlineCode & toketPosition)
  | (Text & toketPosition);

const md2obj = (md: string, rule = 0): mdTokens => {
  // all the regex rules
  const rules = [
    // link
    {
      match: LINK_REGEX,
      tokenize: (item: RegExpMatchArray) => ({
        type: mdTypes.LINK,
        children: md2obj(item[1]),
        url: item[2],
      }),
    },
    // bold
    {
      match: EMPHASIS_STRONG_REGEX,
      tokenize: (item: RegExpMatchArray) => ({
        type: item[1].length == 2 ? mdTypes.STRONG : mdTypes.EMPHASIS,
        children: md2obj(item[2]),
      }),
    },
    // inline code
    {
      match: INLINE_CODE_REGEX,
      tokenize: (item: RegExpMatchArray) => ({
        type: mdTypes.INLINE_CODE,
        value: item[2],
      }),
    },
  ];

  if (rule === rules.length) {
    return [
      {
        type: mdTypes.TEXT,
        value: md,
      },
    ];
  }

  // including start and end
  const rawToken: intermediateMdToken[] = [
    {
      start: 0,
      end: 0,
    },
    ...Array.from(md.matchAll(rules[rule].match)).map((item) => ({
      start: (item && item.index) || 0,
      end: ((item && item.index) || 0) + item[0].length,
      ...rules[rule].tokenize(item),
    })),
    {
      start: md.length,
      end: md.length,
    },
  ];

  const tokens: mdTokens = [];

  rawToken.forEach((item, index) => {
    // we have a gap we need to fill with text
    if (index > 0 && rawToken[index - 1].end < item.start) {
      tokens.push(
        ...md2obj(md.slice(rawToken[index - 1].end, item.start), rule + 1)
      );
    }
    if ("type" in item) {
      const { start, end, ...rest } = item;
      tokens.push(rest);
    }
  });

  return tokens;
};

export default md2obj;
