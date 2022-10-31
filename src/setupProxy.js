const multer = require("multer")
const path = require("path")
const fs = require("fs")
const md5 = require("md5")

const uploadTempPath = path.resolve(__dirname, "../temp")
const uploadSavePath = path.resolve(__dirname, "../public/img")
const subDirPathUnderPublic = "uploaded"

const upload = multer({ dest: uploadTempPath })

module.exports = function(app) {
  app.post(
    "/image/upload",
    upload.single("file" /* name attribute of <file> element in your form */),
    (req, res) => {
      const tempPath = req.file.path
      const bytes = req.file.size
      const newFileName = `${bytes}-${Date.now()}.` + req.file.originalname.split(".").pop();
      const mimetype = req.file.mimetype

      if (!/image/.test(mimetype)) {
        return res.status(401)
          .contentType("text/json")
          .end(JSON.stringify({
            msg: `mimetype not supported : ${mimetype}`,
          }))
      }

      const targetPath = path.resolve(uploadSavePath, subDirPathUnderPublic, newFileName)

      fs.rename(tempPath, targetPath, err => {
        if (err) {
          console.log(err)
          return res.status(401)
            .contentType("text/json")
            .end(JSON.stringify({
              msg: err.message,
            }))
        }

        res
          .status(200)
          .contentType("text/json")
          .end(JSON.stringify({
            img: `/${subDirPathUnderPublic}/${newFileName}`,
          }))
      })
    },
  )
}
