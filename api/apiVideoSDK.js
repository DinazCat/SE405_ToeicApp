export const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJhMzgxYWJlMS01ODc1LTQwNDEtOGY2ZC0wOTdkMzQ2NDNkM2EiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcxMDU5MTkyNiwiZXhwIjoxODY4Mzc5OTI2fQ.O-nDX7-tEHkuYXIosxmmFqUcyfdM97VhJOgUrlMl5Zw";
// API call to create meeting
export const createMeeting = async ({ token }) => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: {
      authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });

  const { roomId } = await res.json();
  return roomId;
};

