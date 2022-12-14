async function postImage(req, res) {
  const imageFiles = req.files.map((file) => {
    return file.path;
  });
  res.status(200).send(imageFiles);
}

module.exports = {
  postImage,
};
