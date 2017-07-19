import React from 'react';

import { resolveComponentRoutes } from './routes.utils';

import { ColorPage } from '../../ui/containers/color/ColorPage';
import { HomePage } from '../../ui/containers/home/HomePage';
import { ComponentPage } from '../../ui/containers/component/main/ComponentPage.main';
import { LayoutPage } from '../../ui/containers/layout/LayoutPage';
import { AccessibilityPage } from '../../ui/containers/accessibility/AccessibilityPage';
import { TypographyPage } from '../../ui/containers/typography/TypographyPage';

export const routeConfig = [
    {
        path: '/',
        component: HomePage,
        title: 'Hjem',
        exact: true
    },
    {
        path: '/components',
        component: ComponentPage,
        title: 'Komponenter',
        routes: resolveComponentRoutes('components')
    },
    {
        path: '/layout',
        component: LayoutPage,
        title: 'Layout'
    },
    {
        path: '/accessibility',
        component: AccessibilityPage,
        title: 'Tilgjengelighet'
    },
    {
        path: '/typography',
        component: TypographyPage,
        title: 'Typografi'
    },
    {
        path: '/farger',
        component: ColorPage,
        title: 'Farger'
    }
];
