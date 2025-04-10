/*
TODO: aksel box migration:
Could not migrate the following:
  - shadow=medium
*/

import { BoxNew } from "@navikt/ds-react/Box";
import { Box as AkselBox } from "@navikt/ds-react"

export const MyComponent = () => {
	return (<>
		<BoxNew background="bg-neutral-soft" borderColor="border-meta-purple">
			simple rename of import
		</BoxNew>
		<AkselBox shadow="medium">
			simple rename of import
		</AkselBox>
	</>);
}
