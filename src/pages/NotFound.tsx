import { FunctionComponent } from 'react';

const NotFound: FunctionComponent = () => {
  //#region render
  return (
    <div className="flex-col align-items-center justify-content-center fullscreen">
      <h1>Page Not Found</h1>
      <h3>The resource requested could not be found on this server</h3>
    </div>
  );
  //#endregion
};

export default NotFound;
