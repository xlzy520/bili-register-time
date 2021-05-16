const Cors = require('micro-cors');
const cors = Cors({
  allowedMethods: ['GET', 'HEAD', 'OPTION', 'POST'],
});

const preFlightReqHandler = (req, res) => { res.status(200).end(); };

module.exports = {
  cors: (handler) => {
    const retHandler = (req, res, ...rest) => {
      const preFlight = req.method === "OPTIONS";
      if (preFlight) {
        return preFlightReqHandler(req, res, ...rest);
      }
      return handler(req, res, ...rest);
    };
    
    return cors(retHandler);
  },
};
