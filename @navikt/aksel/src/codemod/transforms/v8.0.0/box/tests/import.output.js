/*
TODO: Aksel Box migration:
Could not migrate the following:
  - shadow=medium
*/

import { Box as AkselBox } from "@navikt/ds-react"

export const MyComponent = () => {
	return (<>
		<AkselBox background="neutral-soft" borderColor="meta-purple">
			simple rename of import
		</AkselBox>
		<AkselBox shadow="medium">
			simple rename of import
		</AkselBox>
	</>);
}
