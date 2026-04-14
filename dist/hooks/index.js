'use strict';

var react = require('react');
var reactRouterDom = require('react-router-dom');

// src/hooks/useScrollToTop.tsx
var ScrollToTop = () => {
  const { pathname } = reactRouterDom.useLocation();
  react.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

exports.ScrollToTop = ScrollToTop;
