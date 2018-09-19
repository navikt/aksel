import resolveComponentRoutes from './routes.utils';

import ColorPage from '../../ui/containers/color/ColorPage';
import GetStartedPage from '../../ui/containers/get-started/GetStartedPage';
import ComponentMainPage from '../../ui/containers/component/main/ComponentMainPage';
import LayoutPage from '../../ui/containers/layout/LayoutPage';
import AccessibilityPage from '../../ui/containers/accessibility/AccessibilityPage';
import AccessibilityGuidelinePage from '../../ui/containers/accessibility/content-pages/AccessibilityGuidelinePage';
import TypographyPage from '../../ui/containers/typography/TypographyPage';
import IconPage from '../../ui/containers/icon/IconPage';
import OurValuesPage from '../../ui/containers/our-values/OurValuesPage';
import StyleMainPage from '../../ui/containers/style/StyleMainPage';
import HowWeWrite from '../../ui/containers/how-we-write/HowWeWrite';

const componentRoutes = resolveComponentRoutes('components');

console.log('componentRoutes', componentRoutes);

const routeConfig = [
    {
        path: '/',
        component: GetStartedPage,
        title: 'Kom i gang',
        exact: true
    },
    {
        path: '/components',
        component: ComponentMainPage,
        title: 'Komponenter',
        routes: componentRoutes
    },
    {
        path: '/graphics',
        component: ComponentMainPage,
        title: 'Grafikk'
    },
    {
        path: '/guides',
        component: StyleMainPage,
        title: 'Veiledning',
        routes: [
            {
                path: '/guides/layout',
                component: LayoutPage,
                title: 'Layout'
            },
            {
                path: '/guides/typography',
                component: TypographyPage,
                title: 'Typografi'
            },
            {
                path: '/guides/farger',
                component: ColorPage,
                title: 'Farger'
            },
            {
                path: '/guides/ikoner',
                component: IconPage,
                title: 'Ikoner'
            },
            {
                path: '/how-we-write',
                component: HowWeWrite,
                title: 'Slik skriver vi'
            },
            {
                path: '/values',
                component: OurValuesPage,
                title: 'Våre verdier'
            },
            {
                path: '/accessibility',
                component: AccessibilityPage,
                title: 'Tilgjengelighet',
                routes: [
                    {
                        path: '/accessibility/guidelines',
                        component: AccessibilityGuidelinePage,
                        title: 'Retningslinjer'
                    }
                ]
            }
        ]
    },
    {
        path: '/community',
        component: ComponentMainPage,
        title: 'Diskusjon'
    }
];

export default routeConfig;
