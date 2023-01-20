import React, { useState } from "react";
import { no_data_found } from "src/assets";
export default function RecordNotFound(props) {
  const [delayTime, setDelayTime] = useState(false);
  setTimeout(() => setDelayTime(true), 1000);
  return (
    <>
      {delayTime && (
        <div className="no-access-string">
          <img className="mx-auto" src={no_data_found} />
          <p className="mt-3">{`${props.title} Not Found`}</p>
        </div>
      )}
    </>
  );
}
