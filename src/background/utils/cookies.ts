// Check if the user is already logged in when extension is loaded
// browser.cookies.getAll({}).then((cookies) => {
//   console.log("DEBUGGER[COOKIES]:", cookies);
//   const accessTokenCookie = cookies.find(
//     (cookie) => cookie.name === "access_token"
//   );
//   if (!accessTokenCookie) {
//     console.log("DEBUGGER[COOKIES]:", "No access token found");
//     removeUserInfoFromStorage();
//     return;
//   }
//   saveUserInfo();
// });

// Monitor changes in cookies to detect when the user logs in or logs out
// browser.cookies.onChanged.addListener((changeInfo) => {
//   if (changeInfo.cookie.name === "access_token") {
//     if (changeInfo.removed) {
//       console.log("DEBUGGER[COOKIES]:", "Access token was removed");
//       removeUserInfoFromStorage();
//       return;
//     }
//     saveUserInfo();
//   }
// });
