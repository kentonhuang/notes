import React from 'react';
import { Link } from 'react-router-dom'

export default () => {
    return (
      <div class="boxed-view">
        <div class="boxed-view__box">
          <h1>Page Not Found</h1>
          <p>We're unable to find that page.</p>
          <Link to="/" className="button button--link">HEAD HOME</Link>
        </div>
      </div>

    )
};
