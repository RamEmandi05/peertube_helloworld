const pjson = require("./package.json");
const express = require('express');

async function register ({
  registerHook,
  registerSetting,
  settingsManager,
  storageManager,
  videoCategoryManager,
  videoLicenceManager,
  videoLanguageManager,
  getRouter,
  peertubeHelpers
}) {
  registerMenuSettings(registerSetting);
  const router = getRouter();
  router.post("/", async (req, res) => {
    try {
      // Get current user
      const user = await peertubeHelpers.user.getAuthUser(res);
      if (!res) {
        res.json({ status: "failure", message: "You are not allowed to do that." });
        return;
      }
 
      const { session_id } = req.body;
      if(!session_id) {
        res.json({ status: "failure", message: "No session ID to save." });
        return;
      }

      storageManager.storeData("orion-sub-session-id-" + user.id, session_id)
      
      res.json({
        status: "success",
        data: { session_id }
      });

    } catch (error) {
      peertubeHelpers.logger.error(error.message, { error });
      res.json({ status: "failure", message: error.message });
    }
  });
}

async function unregister () {
  return
}

module.exports = {
  register,
  unregister
}

function registerMenuSettings(registerSetting) {
  // Stripe settings
  registerSetting({
    type: 'html',
    html: '<h3>Custom HELLO WORLD-RAM Settings</h3>'
  })

}
