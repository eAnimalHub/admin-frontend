import React, { useState } from "react";
import no_data_found from "src/assets/images/no_data_found.png";
export default function TicketsNotFound(props) {
  const [delayTime, setDelayTime] = useState(false);
  setTimeout(() => setDelayTime(true), 1000);
  return (
    <>
      {delayTime && (
        <div className="no-access-string no-access-ticket-string">
          <img className="mx-auto" src={no_data_found} />
          <p className="mt-3">Tickets Not Found</p>
        </div>
      )}
    </>
  );
}
