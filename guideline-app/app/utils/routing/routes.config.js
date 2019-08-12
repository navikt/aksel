import resolveComponentRoutes from './routes.utils';

import GetStartedPage from '../../ui/containers/get-started/GetStartedPage';
import ComponentsMainPage from '../../ui/containers/components/main/ComponentsMainPage';

import GenericSectionStart from '../../ui/containers/GenericSectionStart';
import ColorPage from '../../ui/containers/resources/color/ColorPage';
import LanguagePage from '../../ui/containers/resources/language/LanguagePage';
import NewProjectPage from '../../ui/containers/resources/new-project/NewProjectPage';
import IconPage from '../../ui/containers/resources/icon/IconPage';
import IllustrationPage from '../../ui/containers/resources/illustration/IllustrationPage';
import SubdomainsPage from '../../ui/containers/resources/subdomains/SubdomainsPage';
import InternalUXPrinciplesPage from '../../ui/containers/resources/internal-ux-principles/InternalUXPrinciplesPage';
import AccessibilityOverviewPage from '../../ui/containers/accessibility/overview/AccessibilityOverviewPage';
import AccessibilityAltTextPage from '../../ui/containers/accessibility/alt-text/AccessibilityAltTextPage';
import NotFoundPage from '../../ui/containers/404/NotFoundPage';
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
        component: GenericSectionStart,
        title: 'Ressurser',
        routes: [
            {
                path: '/resources/new-project',
                component: NewProjectPage,
                title: 'Start nytt prosjekt'
            },
            {
                path: '/resources/colors',
                component: ColorPage,
                title: 'Farger'
            },
            {
                path: '/resources/illustrations',
                component: IllustrationPage,
                title: 'Illustrasjoner'
            },
            {
                path: '/resources/icons',
                component: IconPage,
                title: 'Ikoner'
            },
            {
                path: '/resources/language',
                component: LanguagePage,
                title: 'Slik skriver vi'
            },
            {
                path: '/resources/subdomains',
                component: SubdomainsPage,
                title: 'Subdomener'
            },
            {
                path: '/resources/internal-ux-principles',
                component: InternalUXPrinciplesPage,
                title: 'Prinsipper for brukeropplevelse på interne flater'
            }
        ]
    },
    {
        path: '/accessibility',
        component: GenericSectionStart,
        title: 'Tilgjengelighet',
        routes: [
            {
                path: '/accessibility/overview',
                component: AccessibilityOverviewPage,
                title: 'Tilgjengelighet i NAV'
            },
            {
                path: '/accessibility/alt-text',
                component: AccessibilityAltTextPage,
                title: 'Alt-tekster'
            }
        ]
    },
    {
        path: '/community',
        component: CommunityMainPage,
        title: 'Diskusjon'
    },
    {
        component: NotFoundPage,
        title: 'Siden finnes ikke'
    }
];

export default routeConfig;
