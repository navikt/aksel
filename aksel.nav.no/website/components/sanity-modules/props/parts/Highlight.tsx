export const Highlighter = ({
  type,
  prev = "",
}: {
  type: string;
  prev?: string;
}) => {
  const isString = type === "string" || type.match(/^["][^"]+"$/) !== null;

  const isType =
    type.match(/^[A-Z][A-Za-z]+$/) || type === "any" || type === "void";

  if (isString) {
    return <span className="text-[#ab05d9]">{type}</span>;
  } else if (type === "boolean") {
    return <span className="text-[#9a050f]">{type}</span>;
  } else if (type === "number" || !Number.isNaN(parseInt(type))) {
    return <span className="text-deepblue-600">{type}</span>;
  } else if (isType) {
    const referencedType = null;

    let autoInlinedValue =
      referencedType &&
      !referencedType.members &&
      typeof referencedType.value === "string"
        ? referencedType.value
        : undefined;

    if (autoInlinedValue) {
      const needsParenthesesToMakeSense =
        prev.includes("&") || prev.includes("|");
      if (needsParenthesesToMakeSense) {
        autoInlinedValue = `(${autoInlinedValue})`;
      }
    }

    if (autoInlinedValue) {
      return <Highlighter type={autoInlinedValue} prev={type} />;
    }

    return (
      <span className="text-blue-700">
        <span>{type}</span>
      </span>
    );
  } else if (type.match(/^[a-z]+$/gi) !== null) {
    return <span className="text-deepblue-600">{type}</span>;
  } else {
    if (prev === type) return <>{type}</>;
    const tokenRegex = /([^a-z0-9'"/-]+)/gi;
    const tokens = type.split(tokenRegex);
    return (
      <>
        {tokens.map((token, i) => (
          <Highlighter key={prev + token + i} type={token} prev={type} />
        ))}
      </>
    );
  }
};
