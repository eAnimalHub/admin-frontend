import React from "react";
import { Box, Card, Link, Typography, Stack, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { s3baseUrl } from "../../../config/config";

function LessonsCard({ lesson }) {
  const navigate = useNavigate();

  return (
    <>
      <Card
        className="lesson-card"
        onClick={() =>
          navigate(`/programmes/lessons_detail/${lesson._id}`, {
            state: lesson,
          })
        }
      >
        <div className="row p-3">
          <div className="col-lg-2 col-md-3 col-sm-12">
            <img
              className="lesson-card-image"
              src={s3baseUrl + lesson.lesson_images.thumbnail_1}
              alt="name"
            />
          </div>
          <div className="col-lg-10 col-md-9 col-sm-12">
            <h4 className="lesson-heading">{lesson.title} </h4>
            <p className="normal-font">{lesson.short_description}</p>
            {/* <p className="programme-duration">5 Lessons &nbsp; | &nbsp; 5 hr 16 min 19 sec</p> */}
          </div>
        </div>
      </Card>
    </>
  );
}

export default LessonsCard;

// import PropTypes from 'prop-types';
// import { Link as RouterLink, useLocation, useNavigate, useParams } from 'react-router-dom';
// import faker from 'faker';
// // material
// import { Box, Card, Container, Link, Typography, Stack, Button, IconButton } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import PlayLessonIcon from '@mui/icons-material/PlayLesson';

// // ----------------------------------------------------------------------

// const ProgrammesImgStyle = styled('img')({
//   top: 0,
//   width: '100%',
//   height: '100%',
//   objectFit: 'cover',
//   position: 'absolute'
// });

// const Lessons = [
//   {
//     id: faker.datatype.uuid(),
//     name: 'Module 1: Secrets of Serenity',
//     description:
//       ' Discover the 5 essential elements to quantum leap your results and create a repeatable winning formula. Freedom is a Mindset. Discover your Purpose'
//   },
//   {
//     id: faker.datatype.uuid(),
//     name: 'Module 2 - Creative Consciousness',
//     description:
//       ' Discover the 5 essential elements to quantum leap your results and create a repeatable winning formula. Freedom is a Mindset 2.Discover your Purpose. Success is a Habit. Lead in the New Economy'
//   },
//   {
//     id: faker.datatype.uuid(),
//     name: 'Module 3: Abundance Accelerator',
//     description:
//       ' Discover the 5 essential elements to quantum leap your results and create a repeatable winning formula.'
//   }
// ];

// // ----------------------------------------------------------------------

// export default function LessonsCard() {
//   const id = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();

//   console.log(id, 'lessons card');
//   return (
//     <>
//       <IconButton
//         className="back-screen-button"
//         onClick={() => navigate('/programmes/programmes_detail')}
//       >
//         <ArrowBackIcon />
//       </IconButton>
//       <p className="programmes-heading">Thinking About Result</p>
//       <div className="row mt-3">
//         {Lessons.map((x, i) => (
//           <div className="col-lg-4 col-md-6 col-sm-12">
//             <Card
//               className="h-100"
//               sx={{ cursor: 'pointer' }}
//               onClick={() =>
//                 navigate(`/programmes/lessons_detail/${x.id}`, {
//                   state: x
//                 })
//               }
//             >
//               <Box sx={{ pt: '100%', position: 'relative', cursor: 'pointer' }}>

//                 <ProgrammesImgStyle
//                   onClick={() => navigate(`/programmes/lessons_detail/${x.id}`, { state: x })}
//                   alt="lessons"
//                   src="https://pgi.dynamitelifestyle.co.uk/uploads/lesson_images/main_image/20210817201024_--CC-Lesson-02.jpg"
//                 />
//               </Box>

//               <Stack
//                 spacing={2}
//                 // sx={{ p: 3 }}
//                 className="lesson-content"
//               >
//                 <h2 className="programme-title text-left">{x.name}</h2>
//                 <p className="programme-card-desc text-left">{x.description}</p>

//               </Stack>
//             </Card>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }
