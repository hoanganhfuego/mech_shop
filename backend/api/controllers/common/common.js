async function postImage(req, res) {
  console.log(req.file);
  res.status(200).send(req.file.path);
}

module.exports = {
  postImage,
};
