import resolveComponentRoutes from './routes.utils';

import GetStartedPage from '../../ui/containers/get-started/GetStartedPage';
import ComponentsMainPage from '../../ui/containers/components/main/ComponentsMainPage';

import ResoucesMainPage from '../../ui/containers/resources/ResourcesMainPage';
import ColorPage from '../../ui/containers/resources/color/ColorPage';
import AccessibilityPage from '../../ui/containers/resources/accessibility/AccessibilityPage';
import TypographyPage from '../../ui/containers/resources/typography/TypographyPage';
import IconPage from '../../ui/containers/resources/icon/IconPage';
import HowWeWrite from '../../ui/containers/resources/how-we-write/HowWeWrite';

import TemplatesMainPage from '../../ui/containers/templates/TemplatesMainPage';
import CommunityMainPage from '../../ui/containers/community/CommunityMainPage';

const componentRoutes = resolveComponentRoutes('components');

const routeConfig = [
    {
        path: '/',
        component: GetStartedPage,
        title: 'Kom i gang',
        exact: true
    },
    {
        path: '/components',
        component: ComponentsMainPage,
        title: 'Komponenter',
        routes: componentRoutes
    },
    {
        path: '/resources',
        component: ComponentsMainPage,
        title: 'Ressurser',
        routes: [
            {
                path: '/resources/profile',
                component: TypographyPage,
                title: 'NAV logo'
            },
            {
                path: '/resources/colors',
                component: TypographyPage,
                title: 'Farger'
            },
            {
                path: '/resources/illustrations',
                component: TypographyPage,
                title: 'Illustrasjoner'
            },
            {
                path: '/resources/icons',
                component: TypographyPage,
                title: 'Ikoner'
            },
            {
                path: '/resources/typography',
                component: TypographyPage,
                title: 'Typografi'
            },
            {
                path: '/resources/accessibility',
                component: HowWeWrite,
                title: 'Tilgjengelighet'
            },
            {
                path: '/resources/how-we-write',
                component: HowWeWrite,
                title: 'Slik skriver vi'
            }
        ]
    },
    {
        path: '/templates',
        component: TemplatesMainPage,
        title: 'Maler',
    },
    {
        path: '/community',
        component: CommunityMainPage,
        title: 'Diskusjon'
    }
];

export default routeConfig;
