import * as React from "react";
import PinterestLayout from "src/components/PinterestLayout/Pinterest";
import {
  Container,
  Grid,
  Typography,
  Button,
  IconButton,
  Divider,
  Box,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  useNavigate,
  useParams,
  Link as RouterLink,
  useLocation,
} from "react-router-dom";

function AffirmationList() {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(-1);
  };
  const itemData = [
    {
      img: "https://pgi.dynamitelifestyle.co.uk/uploads/default_affirmation/20210930094856_--20210727124503_--214495307_315945126935187_2425555970238975892_n.jpg",
      description:
        "Cras id dui. Ut non enim eleifend felis pretium feugiat. Sed aliquam ultrices mauris. Praesent egestas neque eu enim. ",
    },
    {
      img: "https://pgi.dynamitelifestyle.co.uk/uploads/default_affirmation/20210930043008_--20210929064005_--20210717035755_--download.jpeg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor  anim id est laborum.",
    },
    {
      img: "https://pgi.dynamitelifestyle.co.uk/uploads/default_affirmation/20210929064119_--20210723001801_--masterkettoriches.jpeg",
      description:
        "Proin faucibus arcu quis ante. Sed a libero. Vestibulum volutpat pretium libero. Etiam sollicitudin,  Praesent blandit laoreet nibh.⁠",
    },
    {
      img: "https://pgi.dynamitelifestyle.co.uk/uploads/default_affirmation/20210930043008_--20210929064005_--20210717035755_--download.jpeg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,",
    },
    {
      img: "https://pgi.dynamitelifestyle.co.uk/uploads/default_affirmation/20210929064119_--20210723001801_--masterkettoriches.jpeg",
      description: "Proin faucibus arcu quis ante. Sed a libero. Vestibulum .⁠",
    },
    {
      img: "https://pgi.dynamitelifestyle.co.uk/uploads/default_affirmation/20210930094856_--20210727124503_--214495307_315945126935187_2425555970238975892_n.jpg",
      description:
        "Cras id dui. Ut non enim eleifend felis pretium feugiat. Sed aliquam ultrices mauris. Praesent egestas neque eu enim. Phasellus blandit leo ut odio.Suspendisse feugiat. Phasellus nec sem in justo pellentesque facilisis. Praesent nec nisl a purus blandit viverra. Aenean massa. Ut id nisl quis enim dignissim sagittis.",
    },
    {
      img: "https://pgi.dynamitelifestyle.co.uk/uploads/default_affirmation/20210930043008_--20210929064005_--20210717035755_--download.jpeg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      img: "https://pgi.dynamitelifestyle.co.uk/uploads/default_affirmation/20210929064119_--20210723001801_--masterkettoriches.jpeg",
      description:
        "Proin faucibus arcu quis ante. Sed a libero. Vestibulum volutpat pretium libero. Etiam sollicitudin, ipsum eu pulvinar rutrum, tellus ipsum laoreet sapien, quis venenatis ante odio sit amet eros. Vestibulum eu odio.   Sed libero. Etiam sit amet orci eget eros faucibus tincidunt. Fusce fermentum odio nec arcu. Nunc nonummy metus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.Sed a libero. Donec elit libero, sodales nec, volutpat a, suscipit non, turpis.⁠",
    },
    {
      img: "https://pgi.dynamitelifestyle.co.uk/uploads/default_affirmation/20210930094856_--20210727124503_--214495307_315945126935187_2425555970238975892_n.jpg",
      description:
        "Cras id dui. Ut non enim eleifend felis pretium feugiat. Sed aliquam ultrices mauris. Praesent egestas neque eu enim. Phasellus blandit leo ut odio.Suspendisse feugiat. Phasellus nec sem in justo pellentesque facilisis. Praesent nec nisl a purus blandit viverra. Aenean massa. Ut id nisl quis enim dignissim sagittis.",
    },
    {
      img: "https://pgi.dynamitelifestyle.co.uk/uploads/default_affirmation/20210930043008_--20210929064005_--20210717035755_--download.jpeg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,",
    },
    {
      img: "https://pgi.dynamitelifestyle.co.uk/uploads/default_affirmation/20210929064119_--20210723001801_--masterkettoriches.jpeg",
      description:
        "Proin faucibus arcu quis ante. Sed a libero. Vestibulum volutpat pretium libero. Etiam sollicitudin, ipsum eu pulvinar rutrum, tellus ipsum laoreet sapien, quis venenatis ante odio sit amet eros. Vestibulum eu odio.   Sed libero. Etiam sit amet orci eget eros faucibus tincidunt. Fusce fermentum odio nec arcu. Nunc nonummy metus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.Sed a libero. Donec elit libero, sodales nec, volutpat a, suscipit non, turpis. Phasellus consectetuer vestibulum elit. Fusce fermentum odio nec arcu. Phasellus ullamcorper ipsum rutrum nunc.Etiam ultricies nisi vel augue. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Curabitur suscipit suscipit tellus. Aliquam erat volutpat. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci.Morbi ac felis. Fusce ac felis sit amet ligula pharetra condimentum. Nulla porta dolor. Suspendisse pulvinar, augue ac venenatis condimentum, sem libero volutpat nibh, nec pellentesque velit pede quis nunc. Praesent blandit laoreet nibh.⁠",
    },
    {
      img: "https://pgi.dynamitelifestyle.co.uk/uploads/default_affirmation/20210930094856_--20210727124503_--214495307_315945126935187_2425555970238975892_n.jpg",
      description:
        "Cras id dui. Ut non enim eleifend felis pretium feugiat. Sed aliquam ultrices mauris. Praesent egestas neque eu enim. Phasellus blandit leo ut odio.Suspendisse feugiat. Phasellus nec sem in justo pellentesque facilisis. Praesent nec nisl a purus blandit viverra. Aenean massa. Ut id nisl quis enim dignissim sagittis.",
    },
    {
      img: "https://pgi.dynamitelifestyle.co.uk/uploads/default_affirmation/20210930043008_--20210929064005_--20210717035755_--download.jpeg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      img: "https://pgi.dynamitelifestyle.co.uk/uploads/default_affirmation/20210929064119_--20210723001801_--masterkettoriches.jpeg",
      description:
        "Proin faucibus arcu quis ante. Sed a libero. Vestibulum volutpat pretium libero. Etiam sollicitudin, ipsum eu pulvinar rutrum, tellus ipsum laoreet sapien, quis venenatis ante odio sit amet eros. Vestibulum eu odio.   Sed libero. Etiam sit amet orci eget eros faucibus tincidunt. Fusce fermentum odio nec arcu. Nunc nonummy metus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.Sed a libero. Donec elit libero, sodales nec, volutpat a, suscipit non, turpis.⁠",
    },
  ];
  return (
    <>
      <div className="container-fluid">
        <div className="row mobile-margin display-flex">
          <div className="col-12">
            <IconButton
              className="back-screen-button mb-4"
              onClick={() => handleNavigate()}
            >
              <ArrowBackIcon />
            </IconButton>
            <button
              className="small-contained-button float-end me-4"
              // onClick={() => navigate(`/programmes/lessons_card/${id}`, { state: location.state })}
            >
              Add Affirmation
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <h2 className="quotes-heading ">Affirmation List</h2>
          </div>
        </div>
      </div>
      <PinterestLayout data={itemData} />
    </>
  );
}

export default AffirmationList;
