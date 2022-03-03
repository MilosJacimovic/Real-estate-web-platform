import multer from "multer";
import fs from 'fs';

const storage: multer.StorageEngine = multer.diskStorage({

    destination: function (req, file, cb) {
        const { username } = req.body;
        console.log('username', username);
        if (!fs.existsSync(`./photos/${username}`)) {
            fs.mkdirSync(`./photos/${username}`);
        }
        cb(null, `./photos/${username}`)
    },
    filename: function (req, file, cb) {
        const { username } = req.body;
        cb(null, file.fieldname + '-' + Date.now() + ".jpeg")
    }
})

const upload: multer.Multer = multer({ storage: storage })

export default upload;