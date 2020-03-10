import React, { Suspense } from 'react';
import { useResource } from './resource';
import { Posts } from './components/Posts/Posts';
import { Users } from './components/Users/Users';

const resource = useResource();

function App() {
  return (
    <div className="container">
      <h1>Suspense for fetching data</h1>

      <Suspense fallback={<p>...Loading posts</p>}>
        <Posts resource={resource} />
      </Suspense>

      <Suspense fallback={<p>...Loading users</p>}>
        <Users resource={resource} />
      </Suspense>

      <Suspense fallback={<p>...Loading all</p>}>
        <Posts resource={resource} />
        <Users resource={resource} />
      </Suspense>
    </div>
  );
}

export default App;
