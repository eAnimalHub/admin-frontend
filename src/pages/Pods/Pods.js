import React from "react";
import Pods from "../../components/Pods/Pods";

function GoalStatement(props) {
  const itemData = [
    {
      img: "https://pgi.dynamitelifestyle.co.uk/uploads/room/thumbnail1/20211208121555_--senerityroom.png",
      title: "Virtual Mastermind",
      description: "Virtual Mastermind",
      activeMembers: "Active Members 22",
    },
    {
      img: "https://pgi.dynamitelifestyle.co.uk/uploads/room/thumbnail1/20211208123518_--business101-pods.png",
      title: "Business 101",
      description: "Business 101 Strategies",
      activeMembers: "Active Members 22",
    },
    {
      img: "https://pgi.dynamitelifestyle.co.uk/uploads/room/thumbnail1/20211208123600_--hotseat.png",
      title: "Hot Seat Coaching",
      description: "Start Time 4pm BST",
      activeMembers: "Active Members 22",
    },
    {
      img: "https://pgi.dynamitelifestyle.co.uk/uploads/room/thumbnail1/20211208124543_--tir-pods.png",
      title: "TIR Tuesday Facilitation Call",
      description: "Start Time 8pm BST",
      activeMembers: "Active Members 22",
    },
    {
      img: "https://pgi.dynamitelifestyle.co.uk/uploads/room/thumbnail1/20211208124058_--risetoabundance-pods.jpg",
      title: "Awakening to Abundance with the Associates",
      description: "Start Time 5.55 am BST and 12 USA",
      activeMembers: "Active Members 22",
    },
    {
      img: "https://pgi.dynamitelifestyle.co.uk/uploads/room/thumbnail1/20211208125513_--Ignite-pods1.png",
      title: "Tuesday Morning Ignite Elite Mastermind",
      description: "Start Time 6.30am BST",
      activeMembers: "Active Members 22",
    },
  ];
  return <Pods data={itemData} />;
}

export default GoalStatement;
