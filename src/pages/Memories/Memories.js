import React from "react";
import PinterestLayout from "src/components/PinterestLayout/Pinterest";

function Memories(props) {
  const itemData = [
    {
      img: "https://pgi.dynamitelifestyle.co.uk/uploads/cateogry/20210920103619_--img-neil.png",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, ",
      title: "Memory",
    },
    {
      img: "https://pgi.dynamitelifestyle.co.uk/uploads/cateogry/20210920115240_--Layer_1_(3).png",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      title: "Memory",
    },
    {
      img: "https://pgi.dynamitelifestyle.co.uk/uploads/cateogry/20210920115240_--Layer_1_(3).png",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      title: "Memory",
    },
    {
      img: "https://pgi.dynamitelifestyle.co.uk/uploads/cateogry/20210920115240_--Layer_1_(3).png",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      title: "Memory",
    },
    {
      img: "https://pgi.dynamitelifestyle.co.uk/uploads/cateogry/20210920115240_--Layer_1_(3).png",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      title: "Memory",
    },
  ];
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-6">
            <h2 className="quotes-heading pt-1">Memories</h2>
          </div>
          <div className="col-6">
            {/* <button
              className="small-contained-button float-end"
              onClick={handleChange}
            >
              ADD GRATITUDE
            </button> */}
          </div>
        </div>
      </div>
      <PinterestLayout data={itemData} />
    </div>
  );
}

export default Memories;
