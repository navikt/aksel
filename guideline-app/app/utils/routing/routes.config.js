import resolveComponentRoutes from './routes.utils';

import GetStartedPage from '../../ui/containers/get-started/GetStartedPage';
import ComponentsMainPage from '../../ui/containers/components/main/ComponentsMainPage';

import ResourcesMainPage from '../../ui/containers/resources/ResourcesMainPage';
import ColorPage from '../../ui/containers/resources/color/ColorPage';
import LanguagePage from '../../ui/containers/resources/language/LanguagePage';
import AccessibilityPage from '../../ui/containers/resources/accessibility/AccessibilityPage';
import TempPage from '../../ui/containers/temp/TempPage';

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
        component: ResourcesMainPage,
        title: 'Ressurser',
        routes: [
            {
                path: '/resources/colors',
                component: ColorPage,
                title: 'Farger'
            },
            {
                path: '/resources/illustrations',
                component: TempPage,
                title: 'Illustrasjoner'
            },
            {
                path: '/resources/icons',
                component: TempPage,
                title: 'Ikoner'
            },
            {
                path: '/resources/accessibility',
                component: AccessibilityPage,
                title: 'Tilgjengelighet'
            },
            {
                path: '/resources/language',
                component: LanguagePage,
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
