const db = require('../db/dbConnection')

class chatController {
    async profileInfo(req, res) {
        const userID = req.id
        db.query('SELECT email, name, userID FROM users WHERE userID = ?', [userID])
        .then(data => {
            res.json(data[0])
        })
        .catch(err => {
            console.log(err)
            res.json({message: 'USER NOT FOUND'})
        }) 
    }

    async getUsers(req, res) {
        const userID = req.params.id
        db.query("SELECT email, name, userID FROM users WHERE userID != ?", [userID])
        .then(data => {
            res.json(data[0])
        })
        .catch(err => {
            console.log(err)
        })
    }

    async getUserById(req, res) {
        const userID = req.params.id
        let dataResponse = {}
        db.query("SELECT email, name, userID FROM users WHERE userID = ?", [userID])
        .then(data => {
            dataResponse = {...data[0][0]}
        })
        .catch(err => {
            console.log(err)
            res.json({message: "USER NOT FOUND"})
        })
        db.query("SELECT * FROM profilephotos WHERE userID = ? ORDER BY photoID DESC LIMIT 1", [userID])
        .then(data => {
            if(data[0][0] === undefined) return res.json(dataResponse)
            dataResponse = {...dataResponse, photoPath: data[0][0].photoPath}
            res.json(dataResponse)
        })  
        .catch(err => {
            console.log(err)
            res.json({message: "USER NOT FOUND"})
        })
        
    }

    async getMyChats(req, res) {
        const myID = req.id
        db.query("SELECT * FROM userchats WHERE senderID = ? or recipientID = ?", [myID, myID])
        .then(data => {
            const usersID = data[0].map(c => {
                return Object.values(c)
                .slice(1)
                .filter(c => c !== myID)[0]
            })
            .filter(value => value)
            res.json(usersID)
        })
        .catch(err => {
            console.log(err)
        })
    }

    async searchUsersByEmail(req, res) {
        try {
            const email = req.params.email
            const data = await db.query(`SELECT email, name, userID FROM users WHERE email like '%${email}%'`)
            const params = data[0].map(u => u.userID).join(' OR userID = ')
            const photo = await db.query(`SELECT * FROM profilephotos WHERE userID = ${params} ORDER BY photoID DESC LIMIT ?`, [data[0].length])
            const usersIDWithPhotosArr = photo[0].map(i => i.userID)
            const resArr = []
            data[0].forEach(item => {
                if(usersIDWithPhotosArr.includes(item.userID)) {
                    const indexInPhoto = photo[0].map(i => i.userID).findIndex(i => i === item.userID)
                    resArr.push({...item, photoPath: photo[0][indexInPhoto].photoPath}) 
                } else {
                    resArr.push(item)
                }
            })
            res.json(resArr)
        } catch (error) {
            res.json([])
        }
        
    }

    async setPhoto(req, res) {
        const file = req.files?.file
        if(!file) return res.json({message: 'err'})

        const newFileName = encodeURI(Date.now() + '-userID=' + req.id + '-' + file.name )

        db.query("INSERT INTO profilephotos(userID, photoPath) values(?, ?)", [req.id, ('assets/photos/profile/' + newFileName)])
        .then(() => console.log('file saved'))
        .catch(err => console.log(err))

        file.mv("../client/src/assets/photos/profile/" + newFileName, err => {
            if(err) return console.log(err)

            res.json({
                fileName: file.name,
                filePath: ('assets/photos/profile/' + newFileName),
            })
        })
    }

    async getProfilePhotos(req, res) {
        const userID = req.params.userid
        db.query('SELECT * FROM profilephotos WHERE userID = ?', [userID])
        .then(data => {
            res.json(data[0])
        })
        .catch(err => console.log(err))
    }
}


module.exports = new chatController