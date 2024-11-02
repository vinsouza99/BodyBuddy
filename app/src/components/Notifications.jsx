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
        .eq("user_id", user.id); // Filter by the logged-in user's ID

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
              ...prevNotifications,
              newNotification,
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
  const markAllAsRead = () => {
    for (const notification of notifications) markAsRead(notification.id);
  };

  const markAsRead = async (notificationId) => {
    const { error } = await supabase
      .from("notification")
      .update({ read: true })
      .eq("id", notificationId);

    if (error) {
      console.error("Error marking notification as read:", error);
    } else {
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === notificationId
            ? { ...notification, read: true }
            : notification
        )
      );
      setUnreadNotifications((prevCount) => prevCount - 1);
    }
  };

  return (
    <>
      <Box role="presentation" onClick={() => toggleDrawer()}>
        <div className="notification-wrapper">
          {unreadNotifications > 0 ? (
            <div className="notification-count">{unreadNotifications}</div>
          ) : (
            ""
          )}
          <IconButton type="button" aria-label="search">
            <NotificationsIcon />
          </IconButton>
        </div>
      </Box>
      <Drawer
        anchor="right"
        open={open}
        sx={{ minWidth: "330px" }}
        onClose={() => toggleDrawer()}
      >
        <Toolbar />
        <Box role="presentation">
          <Divider />
          <Grid container spacing={2}>
            <Grid size={8}>
              <Button onClick={markAllAsRead}>
                <Typography variant="body">Mark all as read</Typography>
              </Button>
            </Grid>
            <Grid size={4}>
              <Button onClick={() => toggleDrawer()}>
                <CloseIcon />
              </Button>
            </Grid>
          </Grid>

          <Divider />
          <List>
            {notifications.map((notification, index) => (
              <>
                <ListItem
                  key={index}
                  disablePadding
                  alignItems="flex-start"
                  className={notification.read ? "" : "unread-notification"}
                >
                  <ListItemButton onClick={() => markAsRead(notification.id)}>
                    <ListItemAvatar>
                      <Avatar
                        alt="Notification Icon"
                        src={"../assets/badge_id_01.png"}
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
                            {new Date(notification.created_at).toDateString()}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
export default Notifications;
