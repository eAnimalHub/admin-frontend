import * as React from "react";
import Member from "../members";
import DeletedModal from "src/components/modal/DeleteModal";

export default function Members() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  return (
    <>
      <Member />
    </>
  );
}
