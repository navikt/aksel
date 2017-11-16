import React from 'react';
import AccessibilityGuidelinePage from './content-pages/AccessibilityGuidelinePage';
import AccessibilityMainPage from './content-pages/AccessibilityMainPage';

export default function AccessibilityPage() {
    if (window.location.hash !== '#/accessibility') {
        return (<AccessibilityGuidelinePage />);
    }
    return (<AccessibilityMainPage />);
}

