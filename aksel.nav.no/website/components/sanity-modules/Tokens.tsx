import { SanityT } from "@/lib";
import { BodyShort, Detail, Heading, Label } from "@navikt/ds-react";
import { withErrorBoundary } from "@/error-boundary";
import Color from "color";
import cl from "classnames";
import { capitalize } from "@/utils";
import copy from "copy-to-clipboard";
import { Copy } from "@navikt/ds-icons";

const RadiusBlock = ({ token }: { token: SanityT.Schema.ds_tokens }) => {
  return (
    <div className="flex w-full gap-6">
      <div
        style={{ borderRadius: token.token }}
        className="relative h-20 w-20 min-w-20 rounded border border-border-muted"
      ></div>
      <div className="w-32">
        <Label size="small" spacing className="mt-1 break-words" as="p">
          {capitalize(token.title.replace("font-size-", ""))}
        </Label>
        <BodyShort size="small">{token.token}</BodyShort>
      </div>
    </div>
  );
};

const ShadowBlock = ({ token }: { token: SanityT.Schema.ds_tokens }) => {
  return (
    <div className="flex w-full gap-6">
      <div
        style={{ boxShadow: token.raw ?? token.token }}
        className="relative h-24 w-24 min-w-24 rounded"
      ></div>
      <div>
        <Label size="small" spacing className="mt-1 break-words" as="p">
          {capitalize(token.title.replace("font-size-", ""))}
        </Label>
        <BodyShort size="small">{token.raw ?? token.token}</BodyShort>
      </div>
    </div>
  );
};

const FontSizeBlock = ({ token }: { token: SanityT.Schema.ds_tokens }) => {
  return (
    <div className="flex w-full flex-col justify-end">
      <div
        style={{
          fontSize: token.token,
        }}
        className="truncate"
      >
        The quick brown fox jumps over the lazy dog
      </div>
      <div>
        <Label size="small" className="mt-1 break-words" as="p">
          {capitalize(token.title.replace("font-size-", ""))}
        </Label>
        <Detail size="small">{`${
          Number(token.token.replace("rem", "")) * 16
        }px`}</Detail>
      </div>
    </div>
  );
};

const SemanticColorBlock = ({ token }: { token: SanityT.Schema.ds_tokens }) => {
  const text = token.title.replace("semantic-color-", "");
  const isText =
    text.startsWith("text") ||
    text.startsWith("link") ||
    text.endsWith("-text");

  return (
    <div>
      {!isText && (
        <div
          style={{ background: token.raw }}
          className="relative h-32 w-32 min-w-32 rounded border border-gray-900/20"
        >
          <button
            onClick={() => copy(`var(--navds-${token.title});`)}
            className="absolute bottom-[-1px] right-[-1px] grid h-8 w-8 place-items-center rounded-tl-md rounded-br-[4px] border border-gray-900/20 bg-white ring-inset hover:bg-gray-100 focus:outline-none focus-visible:border-blue-800 focus-visible:ring-1 focus-visible:ring-blue-800 active:bg-gray-200"
          >
            <Copy title="kopier token" />
          </button>
        </div>
      )}
      {isText && (
        <div
          style={{
            color: token.raw,
            background:
              Color(token.raw).luminosity() > 0.9
                ? "rgba(64,64,64,1)"
                : "transparent",
          }}
          className="rounded px-2"
        >
          <Heading as="span" size="xlarge" className="text-5xl">
            A
          </Heading>
          <Heading as="span" size="xlarge" className="text-4xl">
            a
          </Heading>
        </div>
      )}
      <div
        className={cl({
          "w-32": !isText,
          "px-2": Color(token.raw).luminosity() <= 0.9 && isText,
        })}
      >
        <Label size="small" className="mt-2 break-words" as="p">
          {capitalize(token.title.replace("semantic-color-", ""))}
        </Label>
        <Detail size="small" className="mt-1">
          {token.parent.replace("--navds-global-color-", "")}
        </Detail>
        <Detail size="small">{Color(token.raw).hex().toString()}</Detail>
      </div>
    </div>
  );
};

const TokenBlock = ({ token }: { token: SanityT.Schema.ds_tokens }) => {
  if (token.title.startsWith("semantic-color")) {
    return <SemanticColorBlock token={token} />;
  }
  if (token.title.startsWith("font-size")) {
    return <FontSizeBlock token={token} />;
  }
  if (token.title.startsWith("shadow")) {
    return <ShadowBlock token={token} />;
  }
  if (token.title.startsWith("border-radius")) {
    return <RadiusBlock token={token} />;
  }
  return (
    <div>
      Ikke laget støtte for denne token-typen enda:
      <code>{token.title}</code>. Ta kontakt med utivkler før publisering
    </div>
  );
};

const TokenBlocks = ({
  node: { tokenlist },
}: {
  node: { tokenlist: SanityT.Schema.ds_tokens[] };
}) => {
  if (!tokenlist || tokenlist.length === 0) {
    return null;
  }

  return (
    <div className="mb-8 flex flex-wrap gap-4">
      {tokenlist.map((tok, i) => (
        <TokenBlock key={tok.title + i} token={tok} />
      ))}
    </div>
  );
};

export default withErrorBoundary(TokenBlocks, "Tokens");
