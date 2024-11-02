import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import NotificationsIcon from "@mui/icons-material/Notifications";
import IconButton from "@mui/material/IconButton";
// Notifications Icon in Header
function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch initial data
    const fetchData = async () => {
      const { data: initialData, error } = await supabase
        .from("notification")
        .select("*");

      if (error) console.error("Error fetching data:", error);
      else setNotifications([initialData]);
      console.log(notifications);
    };
    fetchData();

    // Set up the real-time subscription
    const channel = supabase
      .channel("table_changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "notification" },
        (payload) => {
          console.log("Change received!", payload);
          fetchData(); // Fetch updated data or handle payload directly for optimized updates
        }
      )
      .subscribe();

    // Clean up the subscription on component unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <>
      <div className="notification-wrapper">
        {notifications && notifications.length > 0 ? (
          <div className="notification-count">{notifications.length}</div>
        ) : (
          ""
        )}
        <IconButton type="button" aria-label="search">
          <NotificationsIcon />
        </IconButton>
      </div>
    </>
  );
}
export default Notifications;
