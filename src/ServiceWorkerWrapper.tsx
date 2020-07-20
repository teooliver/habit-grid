import React, { useState, useEffect } from "react";
import * as serviceWorker from "./serviceWorker";

const ServiceWorkerWrapper: React.FC = () => {
  const [showReload, setShowReload] = useState(false);
  const [
    waitingWorker,
    setWaitingWorker,
  ] = React.useState<ServiceWorker | null>(null);

  const onSWUpdate = (registration: ServiceWorkerRegistration) => {
    setShowReload(true);
    setWaitingWorker(registration.waiting);
  };

  useEffect(() => {
    serviceWorker.register({ onUpdate: onSWUpdate });
  }, []);

  const reloadPage = () => {
    waitingWorker?.postMessage({ type: "SKIP_WAITING" });
    setShowReload(false);
    window.location.reload(true);
  };

  return (
    <>
      {showReload && (
        <div className='ServiceWorkerMessage'>
          <h2>A new version is available!</h2>
          <button onClick={() => reloadPage()}>Reload Page!!!</button>
        </div>
      )}
    </>
  );
};

export default ServiceWorkerWrapper;
