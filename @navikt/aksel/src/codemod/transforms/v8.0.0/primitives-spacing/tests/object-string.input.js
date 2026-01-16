'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

import {
  BodyLong,
  Box,
  Button,
  HStack,
  Heading,
  Link,
  List,
  VStack,
} from '@navikt/ds-react'

import Substep from './Substep'
import { logger } from './utils/logging'

import stepStyles from './styles/stepStyles.module.css'

export default function LandingPage() {
  const router = useRouter()

  useEffect(() => {
    document.title = 'Start - Uinnlogget pensjonskalkulator'
  }, [])

  useEffect(() => {
    router.prefetch('./uinnlogget-kalkulator/form')
    router.prefetch('https://www.nav.no/pensjon/kalkulator/login')
  }, [router])

  const Icon = ({ color }: { color: string }) => (
    <Box
      width="1rem"
      height="1rem"
      className={`${stepStyles[color]}`}
      borderRadius="full"
      aria-hidden
    ></Box>
  )

  return (
    <Box className={stepStyles.centerBox}>
      <Box
        marginBlock={'auto'}
        width={'100%'}
        maxWidth={'40rem'}
        padding={'4'}
        className={stepStyles.footerSpacing}
      >
        <Heading level="1" size="large" className={stepStyles.overskrift}>
          Uinnlogget pensjonskalkulator
        </Heading>
        <VStack gap={'5'}>
          <Box padding={'0'}>
            <BodyLong size="large">
              Velkommen til forenklet pensjonskalkulator som kan gi deg et
              estimat på:
            </BodyLong>
            <div className={stepStyles.listSpacing}><Box marginBlock="space-16" asChild><List data-aksel-migrated-v8 as="ul" size="large">
                  <List.Item icon={<Icon color="blueIcon" />}>
                    alderspensjon (Nav)
                  </List.Item>
                  <List.Item icon={<Icon color="purpleIcon" />}>
                    AFP i privat sektor (avtalefestet pensjon)
                  </List.Item>
                </List></Box></div>
          </Box>
          <BodyLong size="large">
            For å beregne pensjonen din, må du svare på alle spørsmålene som
            kommer.
          </BodyLong>
          <BodyLong size="small">
            Du oppgir alle opplysninger selv. Vi ber ikke om personopplysninger
            som kan identifisere deg. Ingen opplysninger lagres.
          </BodyLong>
          <HStack gap={'2'}>
            <Button
              onClick={() => {
                logger('button klikk', { tekst: 'Kom i gang' })
                router.push('./uinnlogget-kalkulator/form')
              }}
              variant="primary"
            >
              Kom i gang
            </Button>

            <Button
              onClick={() =>
                router.push('https://www.nav.no/pensjon/kalkulator/login')
              }
              variant="tertiary"
            >
              Avbryt
            </Button>
          </HStack>
        </VStack>
        <Substep>
          <BodyLong size="large">
            Kan du logge inn på Nav, anbefaler vi&nbsp;
            <Link href="https://www.nav.no/pensjon/kalkulator/login">
              innlogget kalkulator
            </Link>
            .
          </BodyLong>
        </Substep>
      </Box>
    </Box>
  );
}