const response = {
  success: (message, data, res) => {
    res.status(200).json({
      status: 200,
      message: message,
      data: data,
      isSuccess: true,
    });
    res.end();
  },
  failure: (err, res) => {
    console.log(err);
    res.status(500).json({
      status: 500,
      message: err.message,
      data: null,
      isSuccess: false,
    });
    res.end();
  },
  badRequest: (message, res) => {
    res.status(400).json({
      status: 400,
      message: message,
      data: null,
      isSuccess: false,
    });
    res.end();
  },
  unAuthorized: (res) => {
    res.status(401).json({
      status: 401,
      message: "You are not authorized to access the request!",
      data: null,
      isSuccess: false,
    });
    res.end();
  },
  notFound: (message, res) => {
    res.status(404).json({
      status: 404,
      message: message ||"Resource not found!",
      data: null,
      isSuccess: false,
    });
    res.end();
  },
  validationErr: (message, res) => {
    res.status(422).json({
      status: 422,
      message: message,
      data: null,
      isSuccess: false,
    });
    res.end();
  },
};

export default response;
