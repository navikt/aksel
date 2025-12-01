const snippets = [
  {
    group: "Templates",
    name: "Single Component",
    code: `<Button variant="primary">Button</Button>`,
  },
  {
    group: "Templates",
    name: "Multiple Components",
    code: ` <Button variant="primary">First</Button>
  <Button>Second</Button>`,
  },
  {
    group: "Templates",
    name: "Component with state",
    code: `{
  (() => {
    const [count, setCount] = React.useState(0);

    return (
      <Button variant="primary" onClick={() => setCount(count + 1)}>Count: {count}</Button>
    )
  })()
}
    `,
  },
];

export default snippets;
