import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Chip from "@mui/material/Chip";
import { Avatar, Button, Tooltip } from "@mui/material";
import { htmlDecode } from "src/utils/convertHtml";
import CustomPopover from "src/components/CustomPopover";
import CustomConfirmation from "../menuIcons/CustomConfirmation";
import { useNavigate } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useSnackbar } from "notistack";
import LockIcon from "@mui/icons-material/Lock";
import moment from "moment";
import {
  DeleteSupportTicket,
  markResolved,
} from "src/DAL/SupportTicket/SupportTicket";
// import EditSupportTicket from "src/pages/SupportTickets/EditSupportTicket";
import CustomDrawer from "../DrawerForm/CustomDrawer";
import TicketsNotFound from "./TicketsNotFound";
import { useContentSetting } from "src/Hooks/ContentSettingState";
import { s3baseUrl } from "src/config/config";
import {
  capitalizeFirst,
  get_date_with_user_time_zone,
} from "src/utils/constants";

export default function TicketList({
  data,
  onClick,
  getTickestsListing,
  setIsLoading,
  isLoading,
}) {
  const [openDelete, setOpenDelete] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [editData, setEditData] = useState({});
  const [openResolved, setOpenResolved] = useState(false);
  const [editDrawerState, setEditDrawerState] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [copied, setCopied] = useState(false);
  const { userInfo, adminTimeZone } = useContentSetting();

  const navigate = useNavigate();
  //Deleting Category
  //console.log(userInfo, "userInfouserInfouserInfo");
  const handleDelete = async () => {
    setOpenDelete(false);
    setIsLoading(true);
    const result = await DeleteSupportTicket(ticketId);
    if (result.code === 200) {
      getTickestsListing("all");
      setIsLoading(false);
      enqueueSnackbar(result.message, { variant: "success" });
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
      setIsLoading(false);
    }
  };
  const setCopiedId = () => {
    enqueueSnackbar("Id Copied To Clipboard", { variant: "success" });
    setCopied(true);
  };
  const hanleChangePage = (value) => {
    //console.log(value, "valuevaluevalue");
    navigate(`/support-ticket/${value._id}`, {
      state: value,
    });
  };
  //console.log(data, "src/componentssrc/componentssrc/components");

  const handleCloseEditDrawer = () => {
    setEditDrawerState(false);
  };
  const handleOpenEditDrawer = () => {
    setEditDrawerState(true);
  };
  const handleEdit = (value) => {
    setEditData(value);
    setEditDrawerState(true);
  };
  const handleMarkResolvedPopup = (value) => {
    setTicketId(value._id);
    setOpenResolved(true);
  };
  const handleMarkResolved = async () => {
    setOpenResolved(false);
    setIsLoading(true);
    const result = await markResolved(ticketId);
    if (result.code === 200) {
      getTickestsListing("all");
      setIsLoading(false);
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
      navigate(`/support-ticket`);
    }
  };
  const handleAgreeDelete = (value) => {
    setTicketId(value._id);
    setOpenDelete(true);
  };
  //Adding Menu options for action
  const MENU_OPTIONS = [
    {
      label: "Detail",
      icon: "gg:details-more",
      handleClick: hanleChangePage,
    },
    // {
    //   label: "Edit",
    //   icon: "akar-icons:edit",
    //   handleClick: handleEdit,
    // },

    // {
    //   label: "Delete",
    //   icon: "ant-design:delete-twotone",
    //   handleClick: handleAgreeDelete,
    // },
    {
      label: "Mark Resolve",
      icon: "emojione-monotone:heavy-check-mark",
      handleClick: handleMarkResolvedPopup,
    },
  ];
  const MENU_OPTIONS1 = [
    {
      label: "Detail",
      icon: "gg:details-more",
      handleClick: hanleChangePage,
    },
    // {
    //   label: "Delete",
    //   icon: "ant-design:delete-twotone",
    //   handleClick: handleAgreeDelete,
    // },
  ];

  const columns = [
    // {
    //   field: "reference_number",
    //   headerName: "ID",
    //   width: 100,
    //   renderCell: (params) => {
    //     //Adding dots for action
    //     return (
    //       <CopyToClipboard
    //         text={params.getValue(params.id, "id")}
    //         onCopy={() => setCopiedId(true)}
    //       >
    //         <Tooltip title="Click to copy Id">
    //           <Chip
    //             label={
    //               <>
    //                 {params.getValue(params.id, "id")}
    //                 <LockIcon />
    //               </>
    //             }
    //             color="primary"
    //             className="float-end me-1"
    //             variant="outlined"
    //           />
    //         </Tooltip>
    //       </CopyToClipboard>
    //     );
    //   },
    // },
    // {
    //   field: "image",
    //   headerName: "Profile",
    //   width: 130,
    //   renderCell: (params) => {
    //     //Adding dots for action
    //     return (
    //       <Avatar
    //         className="top-avatar"
    //         src={s3baseUrl + params.getValue(params.id, "image")}
    //         alt="photoURL"
    //       />
    //     );
    //   },
    // },
    {
      field: "name",
      headerName: "Name",
      width: 250,
      renderCell: (params) => {
        //Adding dots for action
        return (
          <>
            <Avatar
              onClick={() => {
                onClick(params.getValue(params.id, "action1"));
              }}
              className="top-avatar me-3"
              src={s3baseUrl + params.getValue(params.id, "image")}
              alt="photoURL"
            />

            <div
              onClick={() => {
                onClick(params.getValue(params.id, "action1"));
              }}
            >
              {params.getValue(params.id, "name")}
            </div>
          </>
        );
      },
    },
    {
      field: "subject",
      headerName: "Subject",
      flex: 1,
      minWidth: 300,
      renderCell: (params) => {
        return (
          <div
            //Adding On click on Subject
            style={{ width: "100%", textAlign: "left" }}
            onClick={() => {
              onClick(params.getValue(params.id, "action1"));
            }}
          >{`${
            params.getValue(params.id, "subject1").length > 33
              ? `${htmlDecode(
                  params.getValue(params.id, "subject1").substring(0, 33)
                )}...`
              : htmlDecode(params.getValue(params.id, "subject1"))
          }`}</div>
        );
      },
    },
    {
      field: "created",
      headerName: "Created",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => {
        //console.log(
        //   params.getValue(params.id, "created"),
        //   'params.getValue(params.id, "created")'
        // );
        const created_date = get_date_with_user_time_zone(
          params.getValue(params.id, "created"),
          "YYYY-MM-DD HH:mm",
          userInfo.time_zone,
          adminTimeZone
        );
        // console.log(created_date, "created_datecreated_date");

        //Adding dots for action
        return (
          <span className="date-color pt-2 mb-0">
            {capitalizeFirst(
              moment(created_date, "YYYY-MM-DD HH:mm").fromNow()
            )}
          </span>
        );
      },
    },
    // {
    //   field: "last_activity",
    //   headerName: "Last Activity",
    //   flex: 1,
    //   minWidth: 100,
    // },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => {
        return (
          // Making A chip with status
          <Chip
            width="140px"
            className={`${
              params.getValue(params.id, "status1") === 0 &&
              params.getValue(params.id, "response_status1") === 0
                ? "waiting-ticket-color"
                : params.getValue(params.id, "status1") === 0 &&
                  params.getValue(params.id, "response_status1") === 1
                ? "open-ticket-color"
                : params.getValue(params.id, "status1") === 2
                ? "trash-ticket-color"
                : "solved-ticket-color"
            }`}
            label={`${
              params.getValue(params.id, "status1") === 0 &&
              params.getValue(params.id, "response_status1") === 0
                ? "Waiting"
                : params.getValue(params.id, "status1") === 0 &&
                  params.getValue(params.id, "response_status1") === 1
                ? "Answered"
                : params.getValue(params.id, "status1") === 2
                ? "Trash"
                : "Solved"
            }`}
            variant="outlined"
            size="small"
          />
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => {
        //Adding dots for action
        return (
          <CustomPopover
            menu={params.getValue(params.id, "options")}
            data={params.getValue(params.id, "action1")}
          />
        );
      },
    },
  ];

  const getFormattedData = () => {
    const list = data.map((item, i) => {
      // console.log(item.member.profile_image, "item.member.profile_image");
      let menu_options = MENU_OPTIONS;
      if (item.ticket_status === 1 || item.ticket_status === 2) {
        menu_options = MENU_OPTIONS1;
      }
      return {
        id: item._id,
        name: htmlDecode(
          item?.member?.first_name
            ? item?.member?.first_name + " " + item?.member?.last_name
            : "N/A"
        ),
        image: item?.member?.profile_image,
        reference_number: item?.reference_number,
        created: item?.support_ticket_date,
        subject1: htmlDecode(item?.subject),
        last_activity: "2 mins ago",
        status1: item?.ticket_status,
        response_status1: item?.response_status,
        action1: item,
        options: menu_options,
      };
    });
    return list;
  };
  moment.tz.setDefault(userInfo.time_zone);

  return (
    <div
      style={{
        boxSizing: "border-box",
        height: "100%",
        display: "flex",
        width: "100%",
      }}
      className="mt-3"
    >
      <DataGrid
        autoHeight
        {...data}
        components={{
          NoRowsOverlay: TicketsNotFound,
        }}
        className="data-table suppor-ticket-data-table svg-color text-center "
        rows={getFormattedData()}
        columns={columns}
        // rowsPerPageOptions={[5]}
        disableColumnFilter={true}
        disableColumnMenu={true}
        disableSelectionOnClick={true}
        ColumnResizeIcon="none"
        hideFooterPagination={true}
        hideFooter={true}
        ColumnSortedAscendingIcon={null}
        ColumnUnsortedIcon={null}
        ColumnSortedDescendingIcon={null}
        sortIcon={null}
      />
      <CustomConfirmation
        open={openDelete}
        setOpen={setOpenDelete}
        title={"Are you sure you want to delete this Ticket?"}
        handleAgree={handleDelete}
      />
      <CustomConfirmation
        open={openResolved}
        setOpen={setOpenResolved}
        title={"Are you sure you want to mark this Ticket as resolved?"}
        handleAgree={handleMarkResolved}
      />
      {/* <CustomDrawer
        isOpenDrawer={editDrawerState}
        onOpenDrawer={handleOpenEditDrawer}
        onCloseDrawer={handleCloseEditDrawer}
        pageTitle="Edit Support Ticket"
        componentToPassDown={
          <EditSupportTicket
            editData={editData}
            dataList={getTickestsListing}
            onCloseDrawer={handleCloseEditDrawer}
          />
        }
      /> */}
    </div>
  );
}
