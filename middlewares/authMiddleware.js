import jwt from 'jsonwebtoken'

export default async (req, res, next) => {

    try {
        console.log("Authorization Header:", req.headers["authorization"]);
        // get token
        const token = req.headers["authorization"].split(" ")[1];
        console.log("error", token);
        
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
          if (err) {
            return res.status(401).send({
              success: false,
              message: "Un-Authorize User",
            });
          } else {
            req.body.id = decode.id;
            next();
          }
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Please provide Auth Token",
          error,
        });
      }
}
