function Content({ children }: { children: React.ReactNode }) {
  return (
    <div className="decorator-content">
      <style>
        {`.decorator-content {
          padding-block: 5rem;
          padding-inline: 0.25rem;
          display: grid;
          place-content: center;
          background: repeating-linear-gradient(
            45deg,
            var(--ax-bg-neutral-moderate),
            var(--ax-bg-neutral-moderate) 10px,
            transparent 10px,
            transparent 20px
          );`}
      </style>
      {children}
    </div>
  );
}

export { Content };
