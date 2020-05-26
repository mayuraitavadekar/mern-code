const Vimeo = require("vimeo").Vimeo;
const client = new Vimeo(
  process.env.V_CLIENT_ID,
  process.env.V_CLIENT_SECRET,
  process.env.V_ACCESS_TOKEN
);

exports.getCourseDataFromCloud = (req, res) => {
  let projectId = req.body.courseurl;
  let userId = process.env.V_USERID;

  client.request(
    {
      method: "GET",
      path: "/users/" + userId + "/projects/" + projectId + "/videos",
      headers: {
        Authorization: `Bearer ${process.env.V_ACCESS_TOKEN}`,
      },
    },

    function (error, body, status_code, headers) {
      if (error) {
        return res.status(400).json({
          error: "error in getting course data from cloud.",
        });
      } else {
        return res.status(200).json(body);
      }
    }
  );
};
