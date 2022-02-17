const location = require("../../../models/location");
const Location = require("../../../models/location");
const authenticated = require("../utility/check_authenticate");

module.exports = {
  getCityNames: async (props, req) => {
    // if (req.user) {
    //   await authenticated(req).then((result) => {
    //     if (!result) {
    //       const error = new Error("Not authorised");
    //       error.code = 401;
    //       throw error;
    //     }
    //   });
    // } else {
    //   const error = new Error("Not authorised");
    //   error.code = 401;
    //   throw error;
    // }
    const locations = await Location.find();

    return {
        cityNames: locations.map((location, index) => {
            return {
                ...location._doc,
                ID: location._id.toString()
            }
        })
    }
  },

  getSitesByCityId: async ({ID}, req) => {
    if (req.user) {
      await authenticated(req).then((result) => {
        if (!result) {
          const error = new Error("Not authorised");
          error.code = 401;
          throw error;
        }
      });
    } else {
      const error = new Error("Not authorised");
      error.code = 401;
      throw error;
    }

    const location = await Location.findById(ID);

    return {
      ...location._doc,
    }
  }
};
