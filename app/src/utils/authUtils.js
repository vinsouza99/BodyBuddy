// import axios from "axios";

// const API_BASE_URL =
//   import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/";

// Send the access token (JWT) to the server
// export const sendTokenToServer = async (access_token) => {
//   if (access_token) {
//     try {
//       await axios.post(
//         `${API_BASE_URL}set-cookie`,
//         { access_token: access_token },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         }
//       );
//       console.log("Access token sent to server and cookie set.");
//     } catch (error) {
//       console.error("Error setting cookie:", error);
//     }
//   }
// };