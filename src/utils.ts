export function parseStyleString(styleString: string | null) {
  if (!styleString) return {};
  const styleObj = {};
  styleString.split(";").forEach((rule) => {
    const [prop, val] = rule.split(":").map((s) => s && s.trim());
    if (prop && val) (styleObj as any)[prop] = val;
  });
  return styleObj;
}
