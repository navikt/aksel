function PropsSeksjonHighlight({
  type,
  prev = "",
}: {
  type: string;
  prev?: string;
}) {
  const isString = type === "string" || type.match(/^["][^"]+"$/) !== null;

  const isType =
    type.match(/^[A-Z][A-Za-z]+$/) || type === "any" || type === "void";

  if (isString) {
    return <span className="text-[#ab05d9]">{type}</span>;
  }
  if (type === "boolean") {
    return <span className="text-[#9a050f]">{type}</span>;
  }
  if (type === "number" || !Number.isNaN(parseInt(type))) {
    return <span className="text-deepblue-600">{type}</span>;
  }
  if (isType) {
    return (
      <span className="text-blue-700">
        <span>{type}</span>
      </span>
    );
  }
  if (type.match(/^[a-z]+$/gi) !== null) {
    return <span className="text-deepblue-600">{type}</span>;
  }

  if (prev === type) {
    return <>{type}</>;
  }

  const tokenRegex = /([^a-z0-9'"/-]+)/gi;
  const tokens = type.split(tokenRegex);

  return tokens.map((token, i) => (
    <PropsSeksjonHighlight key={prev + token + i} type={token} prev={type} />
  ));
}

export { PropsSeksjonHighlight };
