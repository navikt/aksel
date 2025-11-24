/*
TODO: Aksel box migration:
Could not migrate the following:
  - shadow=medium
*/

import { Box as AkselBox } from "@navikt/ds-react"

export const MyComponent = () => {
	return (<>
		<AkselBox background="bg-neutral-soft" borderColor="border-meta-purple">
			simple rename of import
		</AkselBox>
		<AkselBox shadow="medium">
			simple rename of import
		</AkselBox>
	</>);
}
