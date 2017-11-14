import React from 'react';
import { // eslint-disable-line import/no-extraneous-dependencies
    Undertittel,
    Normaltekst,
    Ingress
} from 'NavFrontendModules/nav-frontend-typografi'; // eslint-disable-line import/extensions, import/no-unresolved
import SectionTitle from './../../components/section-title/SectionTitle';
import ikoninteraksjonImg from './../../../assets/images/icon/ikon-interaksjon.png';
import stotteikonerImg from './../../../assets/images/icon/stotteikoner.png';
import basisikonerImg from './../../../assets/images/icon/basisikoner.png';
import editionImg from './../../../assets/images/icon/edition.png';
import commentAndChatImg from './../../../assets/images/icon/comment-chat.png';
import './styles.less';

const IconPage = () => (
    <div className="iconPage">
        <SectionTitle title="Prinsipper for ikonbruk" />

        <div className="section">
            <Ingress>
                Ikonografi er en viktig del av visuell kommunikasjon på digitale platformer, det bidrar blandt annet
                ved å visualisere ideer, simplifisere navigasjon, optimalisere interaksjon og støtte tekst innhold.
                Fellestrekk ved ikonene er essensielt for å sørge for et helhetlig visuelt språk.

                NAV bruker Streamline icons v.2.5.
            </Ingress>
        </div>

        <div className="section">
            <Undertittel>
                Universell utforming
            </Undertittel>
            <Normaltekst>
                Meningsbærende ikoner skal forholde seg til WCAG 2.0 med AA 4.5 kontrastverdi som minimum.
                Ikoner som har en ornamental eller støttende funksjon til tekst kan vises med en 3.0 kontrastverdi.
            </Normaltekst>
        </div>

        <div className="smallSection">
            <Undertittel>Interaksjon</Undertittel>
            <Normaltekst>
                Interaksjon med et ikon skal markeres ved å bruke mer enn to visuelle virkemidler. Forandring av form
                og farge, form og bevegelse, farge og bevegelse osv.
                I en NAV-sammenheng brukes form og farge som hovedform for markering av interaksjon.
            </Normaltekst>
        </div>
        <div className="smallSection">
            <Normaltekst>
                I praksis betyr dette av ikonene vises i sin “linje” versjon frem til man hoverer over dem. Ved
                hover blir ikonene erstattet med sin tilsvarende fylte versjon av det samme ikonet.
            </Normaltekst>
        </div>
        <div className="smallSection">
            <Normaltekst>
                Eksempel:
            </Normaltekst>
        </div>
        <div className="smallSection">
            <img
                className="interaksjonImg"
                src={ikoninteraksjonImg}
                alt="tannhjul-ikon i states normal, hover, aktiv, og med fokusmarkering"
            />
        </div>

        <div className="section">
            <Undertittel>Sammensatte ikoner</Undertittel>
            <Normaltekst>
                Det finnes ikoner som kan settes sammen for å kommunisere to eller flere ideer samtidig. Noen ikoner
                kan brukes som substantiver, mens andre kan fungere som et verb som tilsetter en handling over en
                annen konkret betydning. Selv om dette er noe som kan gjøres med de fleste av ikonene så skal man
                være forsiktig at ikonen beskriver en handling som medfører en tydelig handling til base ikonen
            </Normaltekst>
        </div>

        <div className="section">
            <Undertittel>Støtteikoner</Undertittel>
            <Normaltekst>
                Disse er noen av støtteikonene man kan bruke for å tilsette ekstra betydning til et basisikon.
                Det er ikke alltid at støtteikonene skal ha en sirkel rundt seg, men det er en effektiv måte å skille
                ikonene fra hverandre på, spesielt når av enkel form.
            </Normaltekst>
        </div>
        <div className="smallSection">
            <img
                className="stotteikonerImg"
                src={stotteikonerImg}
                alt="Diverse støtteikoner, som advarsel, låst eller favoritt"
            />
        </div>

        <div className="section">
            <Undertittel>Baseikoner</Undertittel>
            <Normaltekst>
                Stort sett alle ikonene, så lenge de ikke er altfor komplekse i betydningen, kan fungere som
                basisikoner. Vurdering om de kommuniserer tydelig nok skal gjennomgås med kommunikasjonsavdelingen og
                gjennomført av
                en visuell designer.
            </Normaltekst>
        </div>
        <div className="smallSection">
            <Normaltekst>Eksempel:</Normaltekst>
        </div>
        <div className="smallSection">
            <img
                className="stotteikonerImg"
                src={basisikonerImg}
                alt="
                    Konvolutt som basisikon for melding, med støtteikoner som et hengelås for en låst melding eller
                    forstørringsglas for søk melding
                "
            />
        </div>

        <div className="section">
            <img
                className="iconsImg"
                src={editionImg}
                alt="Ikoner fra kategori edition. For eksempel slett, låst, rediger, vedlegg"
            />
        </div>

        <div className="section">
            <img
                className="iconsImg"
                src={commentAndChatImg}
                alt="Ikoner fra kategori comment & chat, som kommentar eller dialog"
            />
        </div>
    </div>
);

export default IconPage;
