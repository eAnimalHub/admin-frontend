import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import { styled, StyledEngineProvider } from "@mui/material/styles";
import q1 from "../../assets/images/q1.jpg";
import q2 from "../../assets/images/q2.jpg";
import q3 from "../../assets/images/q3.jpg";
import q4 from "../../assets/images/q4.jpg";
import q5 from "../../assets/images/q5.jpg";
import PinterestLayout from "src/components/PinterestLayout/Pinterest";

function Quotes() {
  const itemData = [
    {
      img: "https://pgi.dynamitelifestyle.co.uk/uploads/quotes/20210831163444_--2.jpg",
      description: "Become a priority in your own life.",
    },
    {
      img: "https://pgi.dynamitelifestyle.co.uk/uploads/quotes/20201022050647_--quote-6-test.jpg",
      description: "Kim",
    },
    {
      img: "https://pgi.dynamitelifestyle.co.uk/uploads/quotes/20210831163618_--8.jpg",
      description:
        "There is no inspiration in going after something you already know you can do.⁠ Commit to stepping outside of your comfort zone, aim higher, and stretch yourself.⁠ It's time for you to start dreaming out loud.⁠",
    },
    {
      img: "https://pgi.dynamitelifestyle.co.uk/uploads/quotes/20201104055920_--quote-1.jpg",
      description:
        "To believe in the things you can see ad touch is no belief at all; But to believe in the unseen is a triumph and a blessing.",
    },
    {
      img: "https://pgi.dynamitelifestyle.co.uk/uploads/quotes/20210831163510_--9.jpg",
      description: "Kim",
    },
    {
      img: "https://pgi.dynamitelifestyle.co.uk/uploads/quotes/20210831163534_--5.jpg",
      description:
        "The universe responds to what we believe, not what we wish for.",
    },
    {
      img: "https://pgi.dynamitelifestyle.co.uk/uploads/quotes/20210831163632_--4.jpg",
      description:
        "Only YOU can control the quality of your life and your future by what you do today. ✨⁠ Below are the two best ways you can start to close this gap:⁠ 👉 Spend at least 1 hour a day learning⁠ 👉 Invest in Yourself⁠ ⠀⠀I believe in you. 🙏",
    },
    {
      img: "https://pgi.dynamitelifestyle.co.uk/uploads/quotes/20210831163510_--9.jpg",
      description: "Kim",
    },
    {
      img: "https://pgi.dynamitelifestyle.co.uk/uploads/quotes/20210831163534_--5.jpg",
      description:
        "The universe responds to what we believe, not what we wish for.",
    },
    {
      img: "https://pgi.dynamitelifestyle.co.uk/uploads/quotes/20210831163632_--4.jpg",
      description:
        "Only YOU can control the quality of your life and your future by what you do today. ✨⁠ Below are the two best ways you can start to close this gap:⁠ 👉 Spend at least 1 hour a day learning⁠ 👉 Invest in Yourself⁠ ⠀⠀I believe in you. 🙏",
    },
    {
      img: "https://pgi.dynamitelifestyle.co.uk/uploads/quotes/20210831163510_--9.jpg",
      description: "Kim",
    },
    {
      img: "https://pgi.dynamitelifestyle.co.uk/uploads/quotes/20210831163534_--5.jpg",
      description:
        "The universe responds to what we believe, not what we wish for.",
    },
    {
      img: "https://pgi.dynamitelifestyle.co.uk/uploads/quotes/20210831163632_--4.jpg",
      description:
        "Only YOU can control the quality of your life and your future by what you do today. ✨⁠ Below are the two best ways you can start to close this gap:⁠ 👉 Spend at least 1 hour a day learning⁠ 👉 Invest in Yourself⁠ ⠀⠀I believe in you. 🙏",
    },
  ];
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-6">
            <h2 className="quotes-heading margin-quotes">Quotes</h2>
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
      {/* <div className="grid-container">
        <h2>Quotes</h2>
      </div>

      <div className="grid-container mt-4">
        {itemData.map((value, index) => {
          console.log(value, "data of map");
          return (
            <div>
              <img className="grid-item" src={value.img} alt="" />
              <p>{value.description}</p>
            </div>
          );
        })}
      </div> */}
    </>
  );
}

export default Quotes;
