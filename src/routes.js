import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { App, NotFound } from 'containers';

// eslint-disable-next-line import/no-dynamic-require
if (typeof System.import === 'undefined') System.import = module => Promise.resolve(require(module));

export default () => (
  <Route path="/" component={App}>
    {/* Home (main) route */}
    <IndexRoute getComponent={() => System.import('./containers/Home/Home')} />
    <Route path="users/:username" getComponent={() => System.import('./containers/User/User')} />

    {/* Catch all route */}
    <Route path="*" component={NotFound} />
  </Route>
);
