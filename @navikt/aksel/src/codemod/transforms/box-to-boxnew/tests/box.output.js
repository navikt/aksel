export const MyComponent = () => {
  return ( <>
    <Box background="bg-neutral-soft" borderColor="border-meta-purple" shadow="large">
      this is a box with props that need migration
    </Box>
    <Box borderWidth="4" padding={{ lg: "10", sm: "8" }} height="200rem">
      this is a box without
    </Box>
  </> );
}
