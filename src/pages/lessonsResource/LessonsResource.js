import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Link as RouterLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Button,
  IconButton,
  Divider,
  Box,
} from "@mui/material";
import ResourcesCard from "src/components/_dashboard/programmes/ResourcesCard";

const LessonsResource = (props) => {
  let pdf =
    "https://play-lh.googleusercontent.com/3tLaTWjP9kz56OwkbnbAnZoNp4HL28zcDMt5DEjt-kfuVhraWJBYC5XQRuMBf084JQ";

  const params = useParams();
  const navigate = useNavigate();
  console.log(props, "resource list of lesssons on resource page");

  const sourcedata = {
    program: {
      _id: "61ced812fe0e741a4c07c018",
      title: "Testing",
      status: false,
      short_description:
        "Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Nam adipiscing. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce pharetra convallis urna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
      detailed_description:
        "&lt;p style=&quot;text-align: center;&quot;&gt;&lt;strong&gt;&lt;span style=&quot;font-size:22px;&quot;&gt;Lorem Ipsum&lt;/span&gt;&lt;/strong&gt;&lt;/p&gt;\r\n\r\n&lt;p&gt;&lt;span style=&quot;font-size:18px;&quot;&gt;&lt;strong&gt;Aliquam lorem&lt;/strong&gt;&lt;/span&gt; ante, dapibus in, viverra quis, feugiat a, tellus. Nam adipiscing. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce pharetra convallis urna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.&lt;/p&gt;\r\n\r\n&lt;p&gt;Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Nam adipiscing. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce pharetra convallis urna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.&lt;/p&gt;\r\n\r\n&lt;p&gt;&lt;em&gt;Aliquam lorem ante, dapibus in, viverra quis&lt;/em&gt;, feugiat a, tellus. Nam adipiscing. &lt;em&gt;&lt;strong&gt;&lt;span style=&quot;font-size:16px;&quot;&gt;Pellentesque habitant&lt;/span&gt;&lt;/strong&gt;&lt;/em&gt; morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce pharetra convallis urna. &lt;u&gt;Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.&lt;/u&gt;&lt;/p&gt;",
      program_images: {
        thumbnail_1: "program/a68e03f6-a9d8-4726-83b3-edcce017c7a5.jpg",
        thumbnail_2: "program/a9e81420-035a-44cf-94ec-6753c5be5787.jpg",
        thumbnail_3: "program/031d6a62-d1f9-4e5d-bffc-cff2ede7c9ba.jpg",
        thumbnail_4: "program/3d4f3179-3cf2-4e02-9621-0e97c81e80a1.jpg",
      },
      video_url: "",
      audio_file: "",
      program_slug: "testing",
      action_by: "admin_user",
      action_id: "5ea92b2978bdf925d4149070",
      is_default: false,
      order: 1,
      locked_program_info: {
        image: "",
        video_url: null,
        short_description: "test",
        detailed_description: "CK Editor",
      },
      createdAt: "2021-12-31T10:14:42.583Z",
      updatedAt: "2022-01-06T05:51:03.394Z",
    },
    lesson: [
      {
        _id: "61d7c79bb22910618d2077cd",
        title: "test",
        status: true,
        audio_file: "",
        lesson_duration: "00:00:00",
        lesson_duration_seconds: 0,
        short_description: "kjds",
        detailed_description: "jksds",
        order: 1,
        lesson_slug: "test",
        program: [
          {
            _id: "61ced812fe0e741a4c07c018",
          },
        ],
        lesson_images: {
          thumbnail_1: "lesson/1f7b5060-9faf-4ad0-8ae3-09255632c1ec.jpg",
          thumbnail_2: "lesson/9ccba09a-f87c-479d-bcc1-820d614e4214.jpg",
          thumbnail_3: "lesson/3f5829da-ac0d-4622-81cc-d438fbe0c432.jpg",
          thumbnail_4: "lesson/10d6aaa6-f2b7-4c1a-9739-b227e577883a.jpg",
        },
        action_by: "admin_user",
        action_id: "5ea92b2978bdf925d4149070",
        updatedAt: "2022-01-07T06:13:27.909Z",
        createdAt: "2022-01-07T04:54:51.086Z",
        __v: 3,
      },
      {
        _id: "61d6ee49f1a2865f0a7d2c54",
        title: "test case 3",
        status: true,
        landing_lesson_video_url: "",
        audio_file: "",
        lesson_duration: "00:00:00",
        lesson_duration_seconds: 0,
        short_description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
        detailed_description:
          "<strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
        order: 1,
        lesson_slug: "test-case-3",
        program: [
          {
            _id: "61ced812fe0e741a4c07c018",
          },
        ],
        lesson_images: {
          thumbnail_1: "lesson/e929ece5-af2b-400b-b8ad-fd75598b6bd0.jpg",
          thumbnail_2: "lesson/4787f929-ac65-4e74-9f02-7a83976d62e5.jpg",
          thumbnail_3: "lesson/0d8487a6-ed3b-4854-a187-d1e5d4840842.jpg",
          thumbnail_4: "lesson/dd4e95ab-4b2b-477b-b845-dcc3fd7d7ee0.jpg",
        },
        action_by: "admin_user",
        action_id: "5ea92b2978bdf925d4149070",
        updatedAt: "2022-01-06T13:27:37.604Z",
        createdAt: "2022-01-06T13:27:37.604Z",
        __v: 0,
      },
      {
        _id: "61d3e861eede3d34e2dd3912",
        title: "Test 2",
        status: true,
        audio_file: "",
        lesson_duration: "12:00:00",
        lesson_duration_seconds: 43200,
        short_description:
          "Morbi mollis tellus ac sapien. Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. Vivamus quis mi. Phasellus viverra nulla ut metus varius laoreet. Nullam dictum felis eu pede mollis pretium.\r\n\r\nAliquam eu nunc. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Curabitur a felis in nunc fringilla tristique. Praesent porttitor, nulla vitae posuere iaculis, arcu nisl dignissim dolor, a pretium mi sem ut ipsum. Fusce vulputate eleifend sapien.",
        detailed_description:
          "<p>Morbi mollis tellus ac sapien. Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. Vivamus quis mi. Phasellus viverra nulla ut metus varius laoreet. Nullam dictum felis eu pede mollis pretium.</p>\r\n\r\n<p>Aliquam eu nunc. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Curabitur a felis in nunc fringilla tristique. Praesent porttitor, nulla vitae posuere iaculis, arcu nisl dignissim dolor, a pretium mi sem ut ipsum. Fusce vulputate eleifend sapien.</p>",
        order: 1,
        lesson_slug: "test-2",
        program: [
          {
            _id: "61ced812fe0e741a4c07c018",
          },
        ],
        lesson_images: {
          thumbnail_1: "lesson/bd130b36-9c82-4f6b-8412-694c4def9987.jpg",
          thumbnail_2: "lesson/08e452d1-9353-4f2f-9d39-cb4ae39d7444.jpg",
          thumbnail_3: "lesson/57f40843-182a-4c0e-92cc-d1b174ec09fd.jpg",
          thumbnail_4: "lesson/71f4b082-d42b-4c3c-86be-ba41099c7e80.jpg",
        },
        action_by: "admin_user",
        action_id: "5ea92b2978bdf925d4149070",
        updatedAt: "2022-01-04T06:26:12.773Z",
        createdAt: "2022-01-04T06:25:37.770Z",
        __v: 1,
      },
    ],
    program_section: [
      {
        _id: "61d6a4368d248461864c9cb0",
        program: "61ced812fe0e741a4c07c018",
        title: "happy flow ok",
        status: true,
        button_text: "happy flow ok",
        button_url: "https://www.youtube.com/watch?v=fJEbVCrEMSE",
        video_url: "https://www.youtube.com/watch?v=fJEbVCrEMSE",
        detailed_description: "happy flow ok",
        section_slug: "happy-flow-ok",
        order: 1,
        action_by: "admin_user",
        action_id: "5ea92b2978bdf925d4149070",
        createdAt: "2022-01-06T08:11:34.096Z",
        updatedAt: "2022-01-06T08:11:57.487Z",
      },
      {
        _id: "61d6a2848d248461864c9bf4",
        program: "61ced812fe0e741a4c07c018",
        title: "testing program section 2",
        status: true,
        button_text: "button",
        button_url:
          "https://hinaadmin.dynamitedigital.info/modules/program_section/section.php",
        video_url:
          "https://hinaadmin.dynamitedigital.info/modules/program_section/section.php",
        detailed_description: "this is detail decsription of program section",
        section_slug: "testing-program-section-2",
        order: 1,
        action_by: "admin_user",
        action_id: "5ea92b2978bdf925d4149070",
        createdAt: "2022-01-06T08:04:20.589Z",
        updatedAt: "2022-01-06T08:04:20.589Z",
      },
    ],
    program_document: [
      {
        _id: "61d7cc41b22910618d20785f",
        program: "61ced812fe0e741a4c07c018",
        title: "testing document 21",
        status: true,
        document_type: "other_document",
        document_file_url:
          "program_document/e0586da7-ec52-472d-b773-872c1bb6db2e.pdf",
        detailed_description: "add by the admin",
        document_slug: "testing-document-21",
        order: 1,
        action_by: "admin_user",
        action_id: "5ea92b2978bdf925d4149070",
        createdAt: "2022-01-07T05:14:41.685Z",
        updatedAt: "2022-01-07T05:14:41.685Z",
      },
      {
        _id: "61d7c4c1b22910618d207778",
        program: "61ced812fe0e741a4c07c018",
        title: "testing document 2",
        status: true,
        document_type: "other_document",
        document_file_url:
          "program_document/d077dcc7-bc5a-4d98-9e30-8c2e58f6ec9b.jpg",
        detailed_description: "add by the admin",
        document_slug: "testing-document-2",
        order: 1,
        action_by: "admin_user",
        action_id: "5ea92b2978bdf925d4149070",
        createdAt: "2022-01-07T04:42:41.975Z",
        updatedAt: "2022-01-07T05:09:47.715Z",
      },
      {
        _id: "61d7c493b22910618d20776e",
        program: "61ced812fe0e741a4c07c018",
        title: "testing document 1",
        status: true,
        document_type: "other_document",
        document_file_url:
          "program_document/e932990f-30a3-4087-ad91-90c81357eae4.jpg",
        detailed_description: "add by the admin",
        document_slug: "testing-document-1",
        order: 1,
        action_by: "admin_user",
        action_id: "5ea92b2978bdf925d4149070",
        createdAt: "2022-01-07T04:41:55.887Z",
        updatedAt: "2022-01-07T04:41:55.887Z",
      },
      {
        _id: "61d541e96134c8434b54b11a",
        program: "61ced812fe0e741a4c07c018",
        title: "ADd",
        status: true,
        document_type: "image",
        document_file_url:
          "program_document/ff5be71d-6adc-4e4b-bc5e-a81e5b6b60b4.jpg",
        detailed_description: "add by the admin",
        document_slug: "add",
        order: 1,
        action_by: "admin_user",
        action_id: "5ea92b2978bdf925d4149070",
        createdAt: "2022-01-05T06:59:53.275Z",
        updatedAt: "2022-01-05T06:59:53.275Z",
      },
      {
        _id: "61d541706134c8434b54b102",
        program: "61ced812fe0e741a4c07c018",
        title: "Test By Fatima",
        status: true,
        document_type: "image",
        document_file_url:
          "program_document/269475f2-dc4b-43f4-b1aa-b32804dc76f7.jpg",
        detailed_description: "add by the admin",
        document_slug: "test-by-fatima",
        order: 1,
        action_by: "admin_user",
        action_id: "5ea92b2978bdf925d4149070",
        createdAt: "2022-01-05T06:57:52.677Z",
        updatedAt: "2022-01-05T06:57:52.677Z",
      },
      {
        _id: "61d43a9afe1eb646d3e7b4e0",
        program: "61ced812fe0e741a4c07c018",
        title: "test 4",
        status: true,
        document_type: "image",
        document_file_url:
          "program_document/9070f94f-e9f5-49cf-aeb6-f9ff57a0dccb.png",
        detailed_description:
          "Ut tincidunt tincidunt erat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce id purus. Cras varius. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. Donec vitae orci sed dolor rutrum auctor.",
        document_slug: "test-4",
        order: 1,
        action_by: "admin_user",
        action_id: "5ea92b2978bdf925d4149070",
        createdAt: "2022-01-04T12:16:26.875Z",
        updatedAt: "2022-01-05T06:19:23.289Z",
      },
      {
        _id: "61d43a6ffe1eb646d3e7b4d5",
        program: "61ced812fe0e741a4c07c018",
        title: "test 3",
        status: true,
        document_type: "image",
        document_file_url:
          "program_document/06d17fd5-04c3-47b4-ad2e-55202155f009.jpg",
        detailed_description:
          "Ut tincidunt tincidunt erat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce id purus. Cras varius. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. Donec vitae orci sed dolor rutrum auctor.",
        document_slug: "test-3",
        order: 1,
        action_by: "admin_user",
        action_id: "5ea92b2978bdf925d4149070",
        createdAt: "2022-01-04T12:15:43.582Z",
        updatedAt: "2022-01-05T06:20:02.677Z",
      },
      {
        _id: "61d43a5bfe1eb646d3e7b4ce",
        program: "61ced812fe0e741a4c07c018",
        title: "test 2",
        status: true,
        document_type: "image",
        document_file_url:
          "program_document/3841d693-b6b1-4fd9-a573-7d5fcf104acb.jpg",
        detailed_description:
          "Ut tincidunt tincidunt erat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce id purus. Cras varius. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. Donec vitae orci sed dolor rutrum auctor.",
        document_slug: "test-2",
        order: 1,
        action_by: "admin_user",
        action_id: "5ea92b2978bdf925d4149070",
        createdAt: "2022-01-04T12:15:23.480Z",
        updatedAt: "2022-01-05T06:19:51.378Z",
      },
      {
        _id: "61d43a49fe1eb646d3e7b4c7",
        program: "61ced812fe0e741a4c07c018",
        title: "test 1",
        status: true,
        document_type: "image",
        document_file_url:
          "program_document/20b6828a-dacf-40fc-9c94-b0f38370cdb2.jpg",
        detailed_description:
          "Ut tincidunt tincidunt erat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce id purus. Cras varius. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. Donec vitae orci sed dolor rutrum auctor.",
        document_slug: "test-1",
        order: 1,
        action_by: "admin_user",
        action_id: "5ea92b2978bdf925d4149070",
        createdAt: "2022-01-04T12:15:05.578Z",
        updatedAt: "2022-01-05T06:19:40.176Z",
      },
    ],
    program_review: [
      {
        _id: "61d5263ffe1eb646d3e7c137",
        program: "61ced812fe0e741a4c07c018",
        client_name: "Mustansar Ali",
        status: true,
        review_type: "image",
        review_file_url:
          "program_review/ef6b402d-5893-4618-848d-38df5894e12b.jpg",
        short_description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially",
        order: 1,
        action_by: "admin_user",
        action_id: "5ea92b2978bdf925d4149070",
        createdAt: "2022-01-05T05:01:51.286Z",
        updatedAt: "2022-01-05T06:08:07.675Z",
      },
      {
        _id: "61d52593fe1eb646d3e7c12d",
        program: "61ced812fe0e741a4c07c018",
        client_name: "B Preak",
        status: true,
        review_type: "image",
        review_file_url:
          "program_review/7421c967-f9df-4c20-b19d-09802ca1134c.jpg",
        short_description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially",
        order: 1,
        action_by: "admin_user",
        action_id: "5ea92b2978bdf925d4149070",
        createdAt: "2022-01-05T04:58:59.184Z",
        updatedAt: "2022-01-05T04:58:59.184Z",
      },
      {
        _id: "61d52579fe1eb646d3e7c126",
        program: "61ced812fe0e741a4c07c018",
        client_name: "Karan ojala",
        status: true,
        review_type: "image",
        review_file_url:
          "program_review/a2046477-0cf1-47e3-8a0e-a5e9bdf0dda9.jpg",
        short_description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially",
        order: 1,
        action_by: "admin_user",
        action_id: "5ea92b2978bdf925d4149070",
        createdAt: "2022-01-05T04:58:33.189Z",
        updatedAt: "2022-01-05T04:58:33.189Z",
      },
      {
        _id: "61d52558fe1eb646d3e7c11e",
        program: "61ced812fe0e741a4c07c018",
        client_name: "Ameer Hamza Lilly",
        status: true,
        review_type: "image",
        review_file_url:
          "program_review/d96e628f-dbe8-470c-983d-934f40f85aff.png",
        short_description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially",
        order: 1,
        action_by: "admin_user",
        action_id: "5ea92b2978bdf925d4149070",
        createdAt: "2022-01-05T04:58:00.190Z",
        updatedAt: "2022-01-05T06:10:22.781Z",
      },
      {
        _id: "61d440befe1eb646d3e7b691",
        program: "61ced812fe0e741a4c07c018",
        client_name: "Fatima Hassan",
        status: true,
        review_type: "image",
        review_file_url:
          "program_review/b60081c1-2b25-4c83-82e4-d6b3f24a56e9.jpg",
        short_description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially",
        order: 1,
        action_by: "admin_user",
        action_id: "5ea92b2978bdf925d4149070",
        createdAt: "2022-01-04T12:42:38.685Z",
        updatedAt: "2022-01-05T06:09:57.483Z",
      },
    ],
    recording_list: [],
  };
  console.log(params.programslug, "params hain ye  ");
  console.log(params.lessonSlug, "params hain ye  ");
  return (
    // <div className="container">
    //   <div className="row mobile-margin display-flex">
    //     <div className="col-12">
    //       <IconButton
    //         className="back-screen-button"
    //         onClick={() => navigate(-1)}
    //       >
    //         <ArrowBackIcon />
    //       </IconButton>
    //     </div>
    //   </div>
    //   {sourcedata.program_document.length > 0
    //     ? sourcedata.program_document.map((review, i) => (
    //         <div className="col-lg-4 col-md-6 col-sm-12 mt-4">
    //           {/* <RatingCard review={review} /> */}
    //           <ResourcesCard imageLink={pdf} resource={review} />
    //         </div>
    //       ))
    //     : ""}
    // </div>

    <div className="container">
      <div className="row mobile-margin display-flex">
        <div className="col-12">
          <IconButton
            className="back-screen-button"
            onClick={() =>
              navigate(
                `/programmes/lessons_detail/${
                  params.programslug + "/" + params.lessonSlug
                }`
              )
            }
          >
            <ArrowBackIcon />
          </IconButton>
          <button
            className="small-contained-button float-end mt-1"
            onClick={() => navigate(`/lessons/addlessonsDocument/${params.id}`)}
          >
            Add Document
          </button>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12">
          <h2>Sources Files</h2>
          {/* <p className="normal-font">
          It is for anyone who wants calmness and serenity in their life, and
          it’s perfect for people that crave clarity and direction and are
          ready to uplevel their thinking and results.
        </p> */}
        </div>
        {sourcedata.program_document.length > 0
          ? sourcedata.program_document.map((review, i) => (
              <div className="col-lg-4 col-md-6 col-sm-12 mt-4">
                {/* <RatingCard review={review} /> */}
                <ResourcesCard imageLink={pdf} resource={review} />
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

export default LessonsResource;
