const SMTPServer = require("smtp-server").SMTPServer

const server = new SMTPServer({
   allowInsecureAuth: true,
   authOptional: true,
   // @ts-ignore
   onConnect(session, callback) {
      console.log("Session", session.id)
      callback()
   },

   // @ts-ignore
   onMailForm(address, session, callback) {
      console.log("On mail From", address.address, session.id)
      callback()
   },

   // @ts-ignore
   onRcptTo(address, session, callback) {
      console.log("On Rcpt To", address.address, session.id)
      callback()
   },

   // @ts-ignore
   onData(stream, session, callback) {
      // @ts-ignore
      stream.on("data", (data) => console.log("Data", data.toString()))
      // @ts-ignore
      stream.on("end", () => {
         console.log("End of message")
         callback()
      })
   },
})

server.listen(25, () => console.log("SMTP server started on port 25."))
