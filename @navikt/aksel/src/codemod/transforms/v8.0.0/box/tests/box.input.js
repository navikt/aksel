import { Box } from "@navikt/ds-react"

export const MyComponent = () => {
	return (<>
		<Box background="bg-subtle" borderColor="border-alt-1">
      migratable
		</Box>
		<Box background="bg-subtle" borderColor="border-alt-1" shadow="large">
      migratable + unmigratable (no comment)
		</Box>
		<Box background="surface-alt-3-strong">
      unmigratable (with comment)
		</Box>
		<Box borderWidth="4" padding={{ lg: "10", sm: "8" }} height="200rem">
      old
		</Box>
		<Box borderWidth="4" background="bg-subtle">
      old + migratable
		</Box>
	</>);
}
