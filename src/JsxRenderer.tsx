type JSXRendererProps = {
  jsxString: string | null;
};

export function JSXRenderer({ jsxString }: JSXRendererProps) {
  const renderJsx = (htmlString: string | null) => {
    return { __html: htmlString ?? "" };
  };

  return <div dangerouslySetInnerHTML={renderJsx(jsxString)} />;
}
