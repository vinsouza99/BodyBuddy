import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import NotificationsIcon from "@mui/icons-material/Notifications";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import { useAuth } from "../utils/AuthProvider.jsx";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import "./Notifications.css";

import { Button, Divider, Grid2 as Grid, Typography } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import CloseIcon from "@mui/icons-material/Close";
import filledNotificationIcon from "../assets/NotificationsFilled.png"; // Adjust path based on folder structure
import NewbieNoMoreIcon from "../assets/NewbieNoMore_off.svg";

// Notifications Icon in Header
function Notifications() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  const toggleDrawer = () => {
    setOpen(!open);
  };
  useEffect(() => {
    // Fetch initial data
    const fetchNotifications = async () => {
      const { data: initialNotifications, error } = await supabase
        .from("notification")
        .select("*")
        .eq("user_id", user.id) // Filter by the logged-in user's ID
        .order("created_at", { ascending: false }); // Order by created_at in descending order
      if (error) {
        console.error("Error fetching notifications:", error);
      } else {
        setNotifications(initialNotifications);
        const unreadNotifications = initialNotifications.filter(
          (notification) => !notification.read
        );
        setUnreadNotifications(unreadNotifications.length);
      }
    };
    fetchNotifications();

    // Set up the real-time subscription
    const channel = supabase
      .channel("notification_inserts")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "notification" },
        (payload) => {
          const newNotification = payload.new;

          // Only process notifications for the logged-in user
          if (newNotification.user_id === user.id) {
            setNotifications((prevNotifications) => [
              newNotification,
              ...prevNotifications,
            ]);

            // Update unread count if the new notification is unread
            if (!newNotification.read) {
              setUnreadNotifications((prevCount) => prevCount + 1);
            }
          }
        }
      )
      .subscribe();

    // Clean up the subscription on component unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  const markAllAsRead = async () => {
    for (const notification of notifications) {
      if (!notification.read) await markAsRead(notification.id);
    }
    setUnreadNotifications(0);
  };

  const markAsRead = async (notificationId) => {
    const { data, error } = await supabase
      .from("notification")
      .update({ read: true })
      .eq("id", notificationId)
      .order("created_at", { ascending: false })
      .select(); // Fetch the updated notification after the update
    if (error) {
      console.error("Error marking notification as read:", error);
      return;
    }
    console.log(data);
    if (data && data.length > 0) {
      const updatedNotification = data[0];

      // Update notifications state
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === updatedNotification.id
            ? updatedNotification
            : notification
        )
      );
      if (updatedNotification.read) {
        setUnreadNotifications(unreadNotifications - 1);
      }
    }
  };
  const getNotificationIcon = (icon_id) => {
    switch (icon_id) {
      case 0: {
        return NewbieNoMoreIcon;
      }
      default:
        return NewbieNoMoreIcon;
    }
  };
  return (
    <>
      <Box role="presentation" onClick={() => toggleDrawer()}>
        <div className="notification-wrapper">
          {unreadNotifications > 0 ? (
            <div className="notification-count">
              <Typography variant="body3">{unreadNotifications}</Typography>
            </div>
          ) : (
            ""
          )}
          <IconButton type="button" aria-label="Notifications">
            <NotificationsIcon sx={{ color: "#353E45" }} />
          </IconButton>
        </div>
      </Box>
      <Drawer
        anchor="right"
        open={open}
        BackdropProps={{ invisible: true }}
        onClose={() => toggleDrawer()}
      >
        <Toolbar />
        <Box role="presentation">
          <Box
            container
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            padding=".5rem"
            spacing={2}
          >
            <Typography variant="body" sx={{ alignContent: "center" }}>
              Notifications
            </Typography>
            <Button onClick={() => toggleDrawer()}>
              <CloseIcon />
            </Button>
          </Box>
          <Divider />
          <Grid container>
            <Button
              onClick={markAllAsRead}
              disabled={notifications.length == 0}
            >
              <Typography variant="body">Mark all as read</Typography>
            </Button>
          </Grid>
          <Divider />
          <List sx={{ minWidth: "320px" }}>
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <React.Fragment key={index}>
                  <ListItem
                    key={index}
                    disablePadding
                    alignItems="flex-start"
                    className={notification.read ? "" : "unread-notification"}
                  >
                    <ListItemButton onClick={() => markAsRead(notification.id)}>
                      <ListItemAvatar>
                        <img
                          width="45px"
                          alt="Notification Icon"
                          src={getNotificationIcon(notification.icon_id)}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="h5"
                              sx={{
                                color: "text.primary",
                                display: "inline",
                                fontWeight: 700,
                              }}
                            >
                              {notification.title}
                            </Typography>
                          </React.Fragment>
                        }
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body3"
                              sx={{ color: "text.primary", display: "inline" }}
                            >
                              {`${new Date(notification.created_at).toDateString().toLocaleUpperCase()} - ${new Date(notification.created_at).toLocaleTimeString()}`}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                  {index < notifications.length - 1 && <Divider />}
                </React.Fragment>
              ))
            ) : (
              <Box container textAlign={"center"}>
                <img src={filledNotificationIcon} />
                <Typography variant="body2">No notifications!</Typography>
              </Box>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
export default Notifications;
