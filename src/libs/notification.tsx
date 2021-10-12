import React from 'dom-chef';

export const banner = text => {
  document.querySelector('#header').prepend(
    <div
      className="aui-banner aui-banner-error"
      role="banner"
      aria-hidden="false"
    >
      {text}
    </div>
  );
};
