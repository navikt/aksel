import resolveComponentRoutes from './routes.utils';

import ColorPage from '../../ui/containers/color/ColorPage';
import AboutPage from '../../ui/containers/about/AboutPage';
import ComponentMainPage from '../../ui/containers/component/main/ComponentMainPage';
import LayoutPage from '../../ui/containers/layout/LayoutPage';
import AccessibilityPage from '../../ui/containers/accessibility/AccessibilityPage';
import AccessibilityGuidelinePage from '../../ui/containers/accessibility/content-pages/AccessibilityGuidelinePage';
import TypographyPage from '../../ui/containers/typography/TypographyPage';
import IconPage from '../../ui/containers/icon/IconPage';
import OurValuesPage from '../../ui/containers/our-values/OurValuesPage';
import StyleMainPage from '../../ui/containers/style/StyleMainPage';

const componentRoutes = resolveComponentRoutes('components');

const routeConfig = [
    {
        path: '/',
        component: AboutPage,
        title: 'Om Designsystemet',
        exact: true
    },
    {
        path: '/components',
        component: ComponentMainPage,
        title: 'Komponenter',
        routes: componentRoutes
    },
    {
        path: '/styling',
        component: StyleMainPage,
        title: 'Styling',
        routes: [
            {
                path: '/styling/layout',
                component: LayoutPage,
                title: 'Layout'
            },
            {
                path: '/styling/typography',
                component: TypographyPage,
                title: 'Typografi'
            },
            {
                path: '/styling/farger',
                component: ColorPage,
                title: 'Farger'
            },
            {
                path: '/styling/ikoner',
                component: IconPage,
                title: 'Ikoner'
            }
        ]
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
];

export default routeConfig;
